"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { LOGO } from "@/lib/brand";
import { Inquiry } from "@/lib/db";

export function AdminDashboardClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passkey, setPasskey] = useState("");
  const [loginError, setLoginError] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [viewingInquiry, setViewingInquiry] = useState<Inquiry | null>(null);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        headers: { Authorization: token },
      });

      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
        localStorage.setItem("glc-admin-token", token);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("glc-admin-token");
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("glc-admin-token");
    setTimeout(() => {
      if (savedToken) {
        verifyToken(savedToken);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    }, 0);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) return;

    setLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/inquiries", {
        headers: { Authorization: passkey.trim() },
      });

      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
        localStorage.setItem("glc-admin-token", passkey.trim());
        setIsAuthenticated(true);
      } else {
        setLoginError("Incorrect passkey. Please try again.");
      }
    } catch {
      setLoginError("Server communication error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("glc-admin-token");
    setIsAuthenticated(false);
    setInquiries([]);
    setPasskey("");
  };

  const fetchInquiries = async () => {
    const token = localStorage.getItem("glc-admin-token") || "";
    try {
      const res = await fetch("/api/inquiries", {
        headers: { Authorization: token },
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Error refreshing inquiries:", err);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    const token = localStorage.getItem("glc-admin-token") || "";

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        await fetchInquiries();
      } else {
        alert("Failed to update status.");
      }
    } catch {
      alert("Error contacting server.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number, inquiryId: string) => {
    const firstConfirm = window.confirm(`Are you sure you want to delete inquiry ${inquiryId}?`);
    if (!firstConfirm) return;

    const token = localStorage.getItem("glc-admin-token") || "";

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      if (res.ok) {
        await fetchInquiries();
      } else {
        alert("Failed to delete inquiry.");
      }
    } catch {
      alert("Error contacting server.");
    }
  };

  const handleCopySummary = (inquiry: Inquiry) => {
    const summary = `Inquiry ID: ${inquiry.inquiry_id}\nName: ${inquiry.name}\nPhone: ${inquiry.phone}\nEmail: ${inquiry.email || "Not Provided"}\nProduct: ${inquiry.product_name}\nQuantity: ${inquiry.quantity}\nMessage: ${inquiry.message || "No message."}`;

    navigator.clipboard
      .writeText(summary)
      .then(() => alert(`Summary for ${inquiry.inquiry_id} copied to clipboard!`))
      .catch(() => alert("Failed to copy summary."));
  };

  // Filter and Search computation
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.inquiry_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.phone.includes(searchQuery) ||
      (inquiry.email && inquiry.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inquiry.product_name.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === "All") return matchesSearch;
    if (filterStatus === "New") return matchesSearch && (inquiry.status === "New" || inquiry.status === "New Inquiry");
    if (filterStatus === "Contacted") return matchesSearch && (inquiry.status === "Contacted" || inquiry.status === "In Progress");
    if (filterStatus === "Quoted") return matchesSearch && inquiry.status === "Quoted";
    if (filterStatus === "Completed") return matchesSearch && inquiry.status === "Completed";
    if (filterStatus === "Cancelled") return matchesSearch && inquiry.status === "Cancelled";
    return matchesSearch;
  });

  // Calculate Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New" || i.status === "New Inquiry").length;
  const contactedCount = inquiries.filter((i) => i.status === "Contacted" || i.status === "In Progress").length;
  const quotedCount = inquiries.filter((i) => i.status === "Quoted").length;
  const completedCount = inquiries.filter((i) => i.status === "Completed").length;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-medical">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent" />
        <p className="mt-4 font-display text-sm font-semibold tracking-wider">Verifying Admin Session...</p>
      </div>
    );
  }

  // PASSKEY LOCK SCREEN
  if (isAuthenticated === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4faf6] p-4">
        <div className="w-full max-w-md rounded-3xl bg-card p-8 shadow-xl border border-medical/10">
          <div className="flex justify-center">
            <div className="rounded-2xl bg-white p-3 shadow-md">
              <Logo variant="full" alt={LOGO.alt.seo} className="h-10" />
            </div>
          </div>
          <h2 className="mt-8 text-center font-display text-2xl font-bold tracking-tight text-foreground">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-xs text-muted">
            Enter administrator passkey to view and manage customer inquiries.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {loginError && (
              <div className="rounded-xl bg-brand-red/10 p-3 text-center text-xs font-semibold text-brand-red border border-brand-red/10">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                Administrator Passkey
              </label>
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter passkey"
                className="w-full rounded-xl border border-medical/20 bg-background px-4 py-3 placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-medical py-3 font-semibold text-white hover:bg-medical-dark transition-all shadow-md cursor-pointer"
            >
              Verify &amp; Enter
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-medical hover:underline">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] text-foreground">
      {/* Top Banner */}
      <header className="sticky top-0 z-40 bg-white border-b border-medical/10 shadow-xs px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-lg bg-gray-50 p-1.5 hover:opacity-90">
              <Logo variant="mark" alt={LOGO.alt.main} className="h-7 w-auto" />
            </Link>
            <span className="hidden h-5 w-px bg-gray-200 sm:block" />
            <h1 className="font-display text-base font-bold text-foreground sm:text-lg">
              GLC Inquiry Management
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs font-semibold text-muted hover:text-medical">
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full bg-red-50 px-3.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* KPI Metrics */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-5" aria-label="Inquiry Metrics">
          <div className="rounded-2xl bg-white p-4 shadow-xs border border-gray-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Total</p>
            <p className="mt-1 font-display text-2xl font-bold text-foreground">{totalCount}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-xs border border-blue-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">New</p>
            <p className="mt-1 font-display text-2xl font-bold text-blue-700">{newCount}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-xs border border-amber-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Contacted</p>
            <p className="mt-1 font-display text-2xl font-bold text-amber-700">{contactedCount}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-xs border border-purple-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Quoted</p>
            <p className="mt-1 font-display text-2xl font-bold text-purple-700">{quotedCount}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-xs border border-emerald-100 col-span-2 sm:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Completed</p>
            <p className="mt-1 font-display text-2xl font-bold text-emerald-700">{completedCount}</p>
          </div>
        </section>

        {/* Search & Status Filters */}
        <section className="mt-6 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-xs border border-gray-100 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, customer name, phone, or product..."
              className="w-full rounded-xl border border-gray-200 bg-background pl-9 pr-4 py-2 text-xs sm:text-sm placeholder:text-gray-400 focus:border-medical outline-none"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl w-fit text-xs font-semibold">
            {["All", "New", "Contacted", "Quoted", "Completed", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                  filterStatus === status
                    ? "bg-white text-medical shadow-xs font-bold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {/* Inquiry Table */}
        <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-xs border border-gray-100">
          {filteredInquiries.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm font-semibold text-foreground">No inquiries found.</p>
              <p className="mt-1 text-xs text-muted">Try clearing the search query or changing filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-muted">
                    <th className="px-4 py-3">Inquiry ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Product &amp; Qty</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-medical whitespace-nowrap">
                        {inquiry.inquiry_id}
                        <span className="block text-[10px] font-medium text-muted">
                          {new Date(inquiry.created_at).toLocaleDateString("en-IN")}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-bold text-foreground block">{inquiry.name}</span>
                        <a href={`tel:${inquiry.phone}`} className="text-xs text-medical hover:underline">
                          {inquiry.phone}
                        </a>
                        {inquiry.email && (
                          <span className="block text-[11px] text-muted">{inquiry.email}</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-foreground block">{inquiry.product_name}</span>
                        <span className="text-xs text-muted">Qty: {inquiry.quantity}</span>
                      </td>
                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="line-clamp-2 text-xs text-foreground/80">{inquiry.message || "—"}</p>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            inquiry.status === "New" || inquiry.status === "New Inquiry"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : inquiry.status === "Contacted" || inquiry.status === "In Progress"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : inquiry.status === "Quoted"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : inquiry.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingInquiry(inquiry)}
                            className="rounded-lg p-1.5 text-muted hover:text-medical hover:bg-gray-100 transition cursor-pointer"
                            title="View Full Details"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <select
                            disabled={updatingId === inquiry.id}
                            value={inquiry.status}
                            onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                            className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-foreground outline-none cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => handleDelete(inquiry.id, inquiry.inquiry_id)}
                            className="rounded-lg p-1.5 text-muted hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* View Details Modal */}
      {viewingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
            <button
              onClick={() => setViewingInquiry(null)}
              className="absolute top-4 right-4 text-muted hover:text-foreground cursor-pointer text-sm"
            >
              ✕
            </button>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase text-medical">Inquiry Details</span>
                <h3 className="font-display text-xl font-bold text-foreground mt-0.5">
                  {viewingInquiry.inquiry_id} — {viewingInquiry.name}
                </h3>
                <p className="text-xs text-muted">
                  Received: {new Date(viewingInquiry.created_at).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-gray-50 p-2.5">
                  <strong className="text-muted block">Phone:</strong>
                  <a href={`tel:${viewingInquiry.phone}`} className="font-bold text-medical hover:underline">
                    {viewingInquiry.phone}
                  </a>
                </div>
                <div className="rounded-lg bg-gray-50 p-2.5">
                  <strong className="text-muted block">Email:</strong>
                  <span className="font-medium text-foreground">{viewingInquiry.email || "Not Provided"}</span>
                </div>
                <div className="rounded-lg bg-gray-50 p-2.5">
                  <strong className="text-muted block">Product:</strong>
                  <span className="font-bold text-foreground">{viewingInquiry.product_name}</span>
                </div>
                <div className="rounded-lg bg-gray-50 p-2.5">
                  <strong className="text-muted block">Quantity:</strong>
                  <span className="font-medium text-foreground">{viewingInquiry.quantity}</span>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-3 text-xs">
                <strong className="text-muted block mb-1">Customer Message:</strong>
                <p className="whitespace-pre-wrap text-foreground">{viewingInquiry.message || "No message provided."}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleCopySummary(viewingInquiry)}
                  className="flex-1 rounded-xl bg-gray-100 py-2 text-xs font-bold text-foreground hover:bg-gray-200 transition cursor-pointer"
                >
                  Copy Summary
                </button>
                <a
                  href={`https://wa.me/${viewingInquiry.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2 text-xs font-bold text-white hover:bg-[#1fb855] transition"
                >
                  WhatsApp Customer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
