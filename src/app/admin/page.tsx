"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { LOGO } from "@/lib/brand";
import { Inquiry } from "@/lib/db";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passkey, setPasskey] = useState("");
  const [loginError, setLoginError] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // Verification helper for credentials (declared first to avoid hoisting issues)
  const verifyToken = async (token: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        headers: {
          Authorization: token,
        },
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
    } catch (err) {
      console.error("Token verification error:", err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Check auth state from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("glc-admin-token");
    // Defer state updates to avoid synchronous cascading renders inside useEffect mount
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
        headers: {
          Authorization: passkey.trim(),
        },
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

  // Refetch utility for updates
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

  // Transition status of inquiry
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

  // Delete an inquiry record (double confirmation)
  const handleDelete = async (id: number, inquiryId: string) => {
    const firstConfirm = window.confirm(`Are you sure you want to delete inquiry ${inquiryId}?`);
    if (!firstConfirm) return;

    const secondConfirm = window.confirm("WARNING: This action is permanent and cannot be undone. Confirm deletion?");
    if (!secondConfirm) return;

    const token = localStorage.getItem("glc-admin-token") || "";

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
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

  // Copy WhatsApp Summary to clipboard
  const handleCopySummary = (inquiry: Inquiry) => {
    const summary = `New Inquiry Received\n\nInquiry ID: ${inquiry.inquiry_id}\n\nName: ${inquiry.name}\nPhone: ${inquiry.phone}\nEmail: ${inquiry.email || "Not Provided"}\n\nProduct: ${inquiry.product_name}\nQuantity: ${inquiry.quantity}\n\nMessage:\n${inquiry.message || "No message provided."}`;

    navigator.clipboard.writeText(summary)
      .then(() => alert(`WhatsApp summary for ${inquiry.inquiry_id} copied to clipboard!`))
      .catch(() => alert("Failed to copy summary to clipboard."));
  };

  // Filter & Search computation
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.inquiry_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.phone.includes(searchQuery) ||
      (inquiry.email && inquiry.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inquiry.product_name.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === "All") return matchesSearch;
    if (filterStatus === "New") return matchesSearch && inquiry.status === "New Inquiry";
    if (filterStatus === "Active") return matchesSearch && inquiry.status === "In Progress";
    if (filterStatus === "Completed") return matchesSearch && inquiry.status === "Completed";
    return matchesSearch;
  });

  // Calculate Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New Inquiry").length;
  const activeCount = inquiries.filter((i) => i.status === "In Progress").length;
  const completedCount = inquiries.filter((i) => i.status === "Completed").length;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-medical">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent" />
        <p className="mt-4 font-display text-sm font-semibold tracking-wider">Verifying Admin Session...</p>
      </div>
    );
  }

  // Rendering PASSKEY LOCK SCREEN
  if (isAuthenticated === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4faf6] p-4">
        <div className="w-full max-w-md rounded-3xl bg-card p-8 shadow-xl border border-medical/10">
          <div className="flex justify-center">
            <div className="rounded-2xl bg-white/95 p-3.5 shadow-md">
              <Logo variant="full" alt={LOGO.alt.seo} className="h-10" />
            </div>
          </div>
          <h2 className="mt-8 text-center font-display text-2xl font-bold tracking-tight text-foreground">
            Admin Portal Locked
          </h2>
          <p className="mt-2 text-center text-xs text-muted">
            Enter your administrator authorization passkey to access client data.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {loginError && (
              <div className="rounded-xl bg-brand-red/10 p-3.5 text-center text-xs font-semibold text-brand-red border border-brand-red/10">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                Passkey Code
              </label>
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-xl border border-medical/20 bg-background px-4 py-3 placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-md outline-none transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-medical py-3 font-semibold text-white hover:bg-medical-dark transition-all duration-300 shadow-md active:scale-98 cursor-pointer"
            >
              Verify & Unlock
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

  // Rendering MAIN ADMIN PANEL
  return (
    <div className="min-h-screen bg-[#f4faf6] text-foreground">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-medical/10 shadow-sm px-4 py-3.5 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-lg bg-[#f4faf6] p-2 hover:opacity-90">
              <Logo variant="mark" alt={LOGO.alt.main} className="h-8 w-8" />
            </Link>
            <span className="hidden h-5 w-px bg-medical/10 sm:block" />
            <h1 className="font-display text-lg font-bold text-foreground sm:text-xl">
              GLC Admin Portal
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-muted hover:text-medical transition">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full bg-brand-red/10 px-4 py-2 text-xs font-semibold text-brand-red hover:bg-brand-red/20 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        {/* KPI METRIC CARDS ROW */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="KPI Metrics">
          <article className="rounded-2xl bg-card p-4 sm:p-6 shadow-md border border-medical/5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Total Orders</p>
            <p className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">{totalCount}</p>
          </article>
          <article className="rounded-2xl bg-card p-4 sm:p-6 shadow-md border border-medical/5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted text-medical">New Inquiries</p>
            <p className="mt-2 font-display text-3xl font-bold text-medical md:text-4xl">{newCount}</p>
          </article>
          <article className="rounded-2xl bg-card p-4 sm:p-6 shadow-md border border-medical/5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted text-brand-orange">In Progress</p>
            <p className="mt-2 font-display text-3xl font-bold text-brand-orange md:text-4xl">{activeCount}</p>
          </article>
          <article className="rounded-2xl bg-card p-4 sm:p-6 shadow-md border border-medical/5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted text-emerald-600">Completed</p>
            <p className="mt-2 font-display text-3xl font-bold text-emerald-600 md:text-4xl">{completedCount}</p>
          </article>
        </section>

        {/* CONTROLS SEARCH & FILTERS PANEL */}
        <section className="mt-8 flex flex-col gap-4 rounded-2xl bg-card p-5 sm:p-6 shadow-md border border-medical/5 md:flex-row md:items-center md:justify-between" aria-label="Controls">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-3 flex items-center text-muted">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, name, phone, or product..."
              className="w-full rounded-xl border border-medical/20 bg-background pl-9 pr-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-medical focus:ring-4 focus:ring-medical/15 focus:shadow-sm outline-none transition-all duration-300"
            />
          </div>

          {/* Filter Status Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#f4faf6] p-1 rounded-xl w-fit">
            {["All", "New", "Active", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                  filterStatus === status
                    ? "bg-medical text-white shadow-md"
                    : "text-muted hover:text-medical"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {/* DATA LOGS LIST VIEW */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-card shadow-lg border border-medical/5">
          {filteredInquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="rounded-full bg-medical/5 p-4 text-medical">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">No Inquiries Found</h3>
              <p className="mt-1 text-sm text-muted">Try clearing your filters or widening your search query.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-medical/5 border-b border-medical/10 font-bold text-muted">
                      <th className="px-5 py-4 w-[110px]">ID</th>
                      <th className="px-5 py-4 w-[130px]">Customer</th>
                      <th className="px-5 py-4">Inquiry Scope & Qty</th>
                      <th className="px-5 py-4">Message</th>
                      <th className="px-5 py-4 w-[120px]">Status</th>
                      <th className="px-5 py-4 text-center w-[180px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-medical/10">
                    {filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-[#f4faf6]/30 transition-colors">
                        {/* ID & Date */}
                        <td className="px-5 py-4 font-bold text-medical whitespace-nowrap">
                          {inquiry.inquiry_id}
                          <span className="block mt-1 font-sans text-[10px] font-medium text-muted">
                            {new Date(inquiry.created_at).toLocaleDateString("en-IN")}
                          </span>
                        </td>

                        {/* Customer Details */}
                        <td className="px-5 py-4 font-semibold">
                          {inquiry.name}
                          <a href={`tel:${inquiry.phone}`} className="block mt-1 font-sans text-xs font-medium text-medical hover:underline">
                            {inquiry.phone}
                          </a>
                          {inquiry.email && (
                            <span className="block mt-0.5 font-sans text-xs font-medium text-muted">
                              {inquiry.email}
                            </span>
                          )}
                        </td>

                        {/* Scope */}
                        <td className="px-5 py-4">
                          <span className="inline-block font-semibold text-foreground text-sm">
                            {inquiry.product_name}
                          </span>
                          <span className="block text-xs text-muted mt-1">
                            Qty: <strong className="text-foreground">{inquiry.quantity}</strong>
                          </span>
                        </td>

                        {/* Message */}
                        <td className="px-5 py-4 max-w-[280px]">
                          <p className="text-xs text-muted line-clamp-3 whitespace-pre-wrap">
                            {inquiry.message || "No message."}
                          </p>
                        </td>

                        {/* Status badge */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${
                            inquiry.status === "New Inquiry"
                              ? "bg-medical/10 text-medical"
                              : inquiry.status === "In Progress"
                              ? "bg-brand-orange/10 text-brand-orange"
                              : "bg-emerald-600/10 text-emerald-600"
                          }`}>
                            {inquiry.status}
                          </span>
                        </td>

                        {/* Actions buttons */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Copy Summary */}
                            <button
                              onClick={() => handleCopySummary(inquiry)}
                              title="Copy WhatsApp Order Summary"
                              className="rounded-lg p-2 text-muted hover:text-medical hover:bg-medical/5 border border-medical/10 transition cursor-pointer"
                            >
                              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-5 4h6m-6 4h6m-6 4h6" />
                              </svg>
                            </button>

                            {/* Status transitions */}
                            <div className="relative">
                              <select
                                disabled={updatingId === inquiry.id}
                                value={inquiry.status}
                                onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                                className="rounded-lg border border-medical/10 bg-background px-2.5 py-2 text-xs font-bold text-foreground outline-none focus:border-medical cursor-pointer"
                              >
                                <option value="New Inquiry">New</option>
                                <option value="In Progress">Active</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>

                            {/* Delete Inquiry */}
                            <button
                              onClick={() => handleDelete(inquiry.id, inquiry.inquiry_id)}
                              title="Delete Record"
                              className="rounded-lg p-2 text-brand-red/80 hover:text-brand-red hover:bg-brand-red/10 border border-brand-red/10 transition cursor-pointer"
                            >
                              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

              {/* Mobile Card-based View */}
              <div className="block lg:hidden divide-y divide-medical/10">
                {filteredInquiries.map((inquiry) => (
                  <article key={inquiry.id} className="p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-medical text-sm">{inquiry.inquiry_id}</span>
                      <span className="text-[10px] text-muted font-medium">
                        {new Date(inquiry.created_at).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground text-base leading-tight">{inquiry.name}</h4>
                      <p className="mt-1 flex items-center gap-3 text-xs font-semibold text-medical">
                        <a href={`tel:${inquiry.phone}`} className="hover:underline">{inquiry.phone}</a>
                        {inquiry.email && <span className="text-muted font-medium font-sans">{inquiry.email}</span>}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#f4faf6] p-3 text-xs border border-medical/5">
                      <p className="font-semibold text-foreground">
                        {inquiry.product_name} <span className="text-muted font-medium">(Qty: {inquiry.quantity})</span>
                      </p>
                      {inquiry.message && (
                        <p className="mt-2 text-muted leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-1">
                      <div>
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          inquiry.status === "New Inquiry"
                            ? "bg-medical/10 text-medical"
                            : inquiry.status === "In Progress"
                            ? "bg-brand-orange/10 text-brand-orange"
                            : "bg-emerald-600/10 text-emerald-600"
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopySummary(inquiry)}
                          className="rounded-lg p-1.5 text-muted hover:text-medical border border-medical/10 transition cursor-pointer"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-5 4h6m-6 4h6m-6 4h6" />
                          </svg>
                        </button>
                        
                        <select
                          disabled={updatingId === inquiry.id}
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                          className="rounded-lg border border-medical/10 bg-background px-2 py-1 text-[11px] font-bold text-foreground outline-none cursor-pointer"
                        >
                          <option value="New Inquiry">New</option>
                          <option value="In Progress">Active</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button
                          onClick={() => handleDelete(inquiry.id, inquiry.inquiry_id)}
                          className="rounded-lg p-1.5 text-brand-red/80 hover:text-brand-red border border-brand-red/10 transition cursor-pointer"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
