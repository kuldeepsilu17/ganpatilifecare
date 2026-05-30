import { NextResponse } from "next/server";
import { updateInquiryStatus, deleteInquiry } from "@/lib/db";

// Helper to authenticate admin panel requests
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  const expectedPassword = process.env.ADMIN_PASSWORD || "glcadmin123";
  return authHeader === expectedPassword;
}

// PATCH: Update status of an inquiry
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["New Inquiry", "In Progress", "Completed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value provided" }, { status: 400 });
    }

    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid ID parameter" }, { status: 400 });
    }

    const updated = await updateInquiryStatus(numericId, status);
    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (err) {
    console.error("PATCH inquiry error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Delete an inquiry
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid ID parameter" }, { status: 400 });
    }

    const success = await deleteInquiry(numericId);
    if (!success) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE inquiry error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
