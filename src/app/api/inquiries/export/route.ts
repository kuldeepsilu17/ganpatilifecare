// Ganpati Lifecare - CSV Inquiries Exporter
import { NextResponse } from "next/server";
import { getInquiries } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const cookie = request.headers.get("cookie");
  let cookieToken: string | null = null;
  if (cookie) {
    const match = cookie.match(/glc_admin_session=([^;]+)/);
    if (match) cookieToken = match[1];
  }

  const token = authHeader?.replace("Bearer ", "") || cookieToken;
  const auth = verifySessionToken(token);

  if (!auth.valid) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const inquiries = await getInquiries();
    const headers = [
      "Inquiry ID",
      "Date",
      "Customer Name",
      "Phone",
      "Email",
      "Product Required",
      "Quantity",
      "Status",
      "Source",
      "Customer Message",
    ];

    const rows = inquiries.map((i) => [
      `"${i.inquiry_id}"`,
      `"${new Date(i.created_at).toLocaleString("en-IN")}"`,
      `"${(i.name || "").replace(/"/g, '""')}"`,
      `"${(i.phone || "").replace(/"/g, '""')}"`,
      `"${(i.email || "").replace(/"/g, '""')}"`,
      `"${(i.product_name || "").replace(/"/g, '""')}"`,
      `"${(i.quantity || "").replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${(i.source || "Website").replace(/"/g, '""')}"`,
      `"${(i.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const dateStr = new Date().toISOString().split("T")[0];
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="glc_inquiries_${dateStr}.csv"`,
      },
    });
  } catch (err) {
    console.error("CSV Export error:", err);
    return new NextResponse("Failed to export inquiries", { status: 500 });
  }
}
