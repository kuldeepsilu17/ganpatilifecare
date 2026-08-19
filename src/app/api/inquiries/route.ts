import { NextResponse } from "next/server";
import { getInquiries, createInquiry } from "@/lib/db";
import { sendAdminNotification } from "@/lib/mailer";

// Helper to authenticate admin panel requests
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  const expectedPassword = process.env.ADMIN_PASSWORD || "glcadmin123";
  return authHeader === expectedPassword;
}

// GET: Fetch all inquiries (Secured)
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const inquiries = await getInquiries();
    const sorted = [...inquiries].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return NextResponse.json(sorted);
  } catch (err) {
    console.error("GET inquiries route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Create a new website inquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, product_name, quantity, message, source } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone Number are required fields." },
        { status: 400 }
      );
    }

    // Save in the database
    const newInquiry = await createInquiry({
      name,
      phone,
      email: email || "",
      product_name: product_name || "General Inquiry",
      quantity: quantity || "1",
      message: message || "",
      source: source || "Website",
    });

    if (!newInquiry) {
      return NextResponse.json(
        { error: "Failed to create inquiry in the database." },
        { status: 500 }
      );
    }

    // Send admin notification in the background
    sendAdminNotification(newInquiry).catch((err) => {
      console.error("Async admin notification error:", err);
    });

    // 1. Compose Email prefilled client text according to spec
    const emailSubject = "Product Inquiry - Ganpati Lifecare";
    const emailBody = `Hello Ganpati Lifecare Team,\n\nI would like to inquire about your products.\n\nName: ${newInquiry.name}\nPhone: ${newInquiry.phone}\nEmail: ${newInquiry.email || "Not Provided"}\nProduct: ${newInquiry.product_name}\nQuantity: ${newInquiry.quantity}\nMessage:\n${newInquiry.message || "Please provide quotation and availability details."}\n\nPlease share product details and quotation.\n\nThank you.`;

    // 2. Compose Customer Direct WhatsApp text according to spec
    const whatsappMessage = `Hello Ganpati Lifecare,\n\nI am interested in your products.\n\nName: ${newInquiry.name}\nPhone: ${newInquiry.phone}\nProduct: ${newInquiry.product_name}\nQuantity: ${newInquiry.quantity}\n\nPlease share availability and pricing.\n\nThank you.`;

    return NextResponse.json({
      success: true,
      inquiry: newInquiry,
      emailSubject,
      emailBody,
      whatsappMessage,
    });
  } catch (err) {
    console.error("POST inquiries route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
