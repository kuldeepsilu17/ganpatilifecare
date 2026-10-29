"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { LOGO } from "@/lib/brand";
import { Inquiry, InquiryStatus, DbProduct, DbBlogPost, DbSiteSettings } from "@/lib/db";

type AdminTab = "overview" | "inquiries" | "products" | "blogs" | "settings";

export function AdminDashboardClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passkey, setPasskey] = useState("");
  const [emailInput, setEmailInput] = useState("whiteroseglc@gmail.com");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("All");
  const [viewingInquiry, setViewingInquiry] = useState<Inquiry | null>(null);
  const [updatingInquiryId, setUpdatingInquiryId] = useState<number | null>(null);

  // Products State
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Blog State
  const [blogs, setBlogs] = useState<DbBlogPost[]>([]);
  const [blogSearch, setBlogSearch] = useState("");
  const [editingBlog, setEditingBlog] = useState<DbBlogPost | null>(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);

  // Site Settings State
  const [settings, setSettings] = useState<DbSiteSettings | null>(null);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  // Loading & Action feedback
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getStoredToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("glc-admin-token") || "";
  };

  const loadAllData = async (token?: string) => {
    const authToken = token || getStoredToken();
    if (!authToken) return;
    setRefreshing(true);
    try {
      const headers = { Authorization: `Bearer ${authToken}` };
      const [resInq, resProd, resBlog, resSet] = await Promise.all([
        fetch("/api/inquiries", { headers }),
        fetch("/api/products", { headers }),
        fetch("/api/blog", { headers }),
        fetch("/api/settings", { headers }),
      ]);

      if (resInq.ok) setInquiries(await resInq.json());
      if (resProd.ok) setProducts(await resProd.json());
      if (resBlog.ok) setBlogs(await resBlog.json());
      if (resSet.ok) setSettings(await resSet.json());
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const saved = localStorage.getItem("glc-admin-token");
    if (!saved) {
      queueMicrotask(() => {
        if (isMounted) {
          setIsAuthenticated(false);
          setLoading(false);
        }
      });
      return;
    }
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${saved}` },
    })
      .then((res) => {
        if (!isMounted) return;
        if (res.ok) {
          setIsAuthenticated(true);
          loadAllData(saved);
        } else {
          localStorage.removeItem("glc-admin-token");
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsAuthenticated(false);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) return;

    setLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.trim(), password: passkey.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("glc-admin-token", data.token);
        setIsAuthenticated(true);
        await loadAllData(data.token);
      } else {
        setLoginError(data.error || "Incorrect passkey or email. Access denied.");
      }
    } catch {
      setLoginError("Failed to reach server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    localStorage.removeItem("glc-admin-token");
    setIsAuthenticated(false);
    setPasskey("");
  };

  /* Inquiries Actions */
  const handleInquiryStatusChange = async (id: number, newStatus: string) => {
    setUpdatingInquiryId(id);
    const token = getStoredToken();
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus as InquiryStatus } : i))
        );
        if (viewingInquiry && viewingInquiry.id === id) {
          setViewingInquiry({ ...viewingInquiry, status: newStatus as InquiryStatus });
        }
      } else {
        alert("Failed to update inquiry status.");
      }
    } catch {
      alert("Communication error.");
    } finally {
      setUpdatingInquiryId(null);
    }
  };

  const handleDeleteInquiry = async (id: number, inqCode: string) => {
    if (!window.confirm(`Permanently delete inquiry ${inqCode}?`)) return;
    const token = getStoredToken();
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (viewingInquiry && viewingInquiry.id === id) setViewingInquiry(null);
      } else {
        alert("Failed to delete inquiry.");
      }
    } catch {
      alert("Communication error.");
    }
  };

  /* Product Actions */
  const handleToggleProductPublish = async (slug: string, current: boolean) => {
    const token = getStoredToken();
    try {
      const res = await fetch(`/api/products/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !current }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.slug === slug ? { ...p, isPublished: !current } : p))
        );
      }
    } catch {
      alert("Failed to toggle publication status.");
    }
  };

  const handleToggleProductFeature = async (slug: string, current: boolean) => {
    const token = getStoredToken();
    try {
      const res = await fetch(`/api/products/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isFeatured: !current }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.slug === slug ? { ...p, isFeatured: !current } : p))
        );
      }
    } catch {
      alert("Failed to toggle featured status.");
    }
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getStoredToken();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      slug: fd.get("slug") as string,
      category: fd.get("category") as string,
      description: fd.get("description") as string,
      imageUrls: fd.get("imageUrls") as string,
      packagingInformation: fd.get("packagingInformation") as string,
      isFeatured: fd.get("isFeatured") === "on",
      isPublished: fd.get("isPublished") === "on",
    };

    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const json = await res.json();
          setProducts((prev) =>
            prev.map((p) => (p.slug === editingProduct.slug ? json.product : p))
          );
          setEditingProduct(null);
        } else {
          alert("Failed to update product.");
        }
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const json = await res.json();
          setProducts((prev) => [json.product, ...prev]);
          setIsAddingProduct(false);
        } else {
          alert("Failed to create product.");
        }
      }
    } catch {
      alert("Communication error saving product.");
    }
  };

  /* Blog Actions */
  const handleToggleBlogPublish = async (slug: string, current: boolean) => {
    const token = getStoredToken();
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !current }),
      });
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.slug === slug ? { ...b, isPublished: !current } : b))
        );
      }
    } catch {
      alert("Failed to update blog status.");
    }
  };

  const handleSaveBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getStoredToken();
    const fd = new FormData(e.currentTarget);
    const data = {
      title: fd.get("title") as string,
      slug: fd.get("slug") as string,
      excerpt: fd.get("excerpt") as string,
      content: fd.get("content") as string,
      author: fd.get("author") as string,
      coverImage: fd.get("coverImage") as string,
      isPublished: fd.get("isPublished") === "on",
    };

    try {
      if (editingBlog) {
        const res = await fetch(`/api/blog/${editingBlog.slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const json = await res.json();
          setBlogs((prev) =>
            prev.map((b) => (b.slug === editingBlog.slug ? json.post : b))
          );
          setEditingBlog(null);
        }
      } else {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const json = await res.json();
          setBlogs((prev) => [json.post, ...prev]);
          setIsAddingBlog(false);
        }
      }
    } catch {
      alert("Error saving blog post.");
    }
  };

  /* Settings Actions */
  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSaved(false);
    const token = getStoredToken();
    const fd = new FormData(e.currentTarget);
    const data = {
      businessName: fd.get("businessName") as string,
      contactPhone: fd.get("contactPhone") as string,
      alternatePhone: fd.get("alternatePhone") as string,
      contactEmail: fd.get("contactEmail") as string,
      whatsappNumber: fd.get("whatsappNumber") as string,
      businessAddress: fd.get("businessAddress") as string,
      gstin: fd.get("gstin") as string,
    };

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json();
        setSettings(json.settings);
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      } else {
        alert("Failed to save settings.");
      }
    } catch {
      alert("Communication error.");
    } finally {
      setSavingSettings(false);
    }
  };

  /* Export CSV */
  const handleExportCSV = () => {
    const token = getStoredToken();
    window.open(`/api/inquiries/export?token=${encodeURIComponent(token)}`, "_blank");
  };

  // Filter calculations
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.inquiry_id.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.includes(inquirySearch) ||
      (inq.email && inq.email.toLowerCase().includes(inquirySearch.toLowerCase())) ||
      inq.product_name.toLowerCase().includes(inquirySearch.toLowerCase());

    if (inquiryStatusFilter === "All") return matchesSearch;
    return matchesSearch && (inq.status === inquiryStatusFilter || (inquiryStatusFilter === "New" && inq.status === "New Inquiry"));
  });

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      prod.category.toLowerCase().includes(productSearch.toLowerCase());
    if (productCategoryFilter === "all") return matchesSearch;
    return matchesSearch && prod.category.toLowerCase() === productCategoryFilter.toLowerCase();
  });

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    blog.author.toLowerCase().includes(blogSearch.toLowerCase())
  );

  // Metrics
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === "New" || i.status === "New Inquiry").length;
  const contactedInquiries = inquiries.filter((i) => i.status === "Contacted" || i.status === "In Progress").length;
  const quotedInquiries = inquiries.filter((i) => i.status === "Quoted").length;
  const completedInquiries = inquiries.filter((i) => i.status === "Completed").length;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F6F8FA] text-[#17324D]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#23856D] border-t-transparent" />
        <p className="mt-4 font-semibold text-sm tracking-wide text-[#243342]">
          Verifying Ganpati Lifecare Session...
        </p>
      </div>
    );
  }

  // LOGIN SCREEN
  if (isAuthenticated === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F6F8FA] p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-[#E1E7EC]">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-xl shadow-xs border border-[#E1E7EC]">
              <Logo variant="full" alt={LOGO.alt.seo} className="h-10" />
            </div>
          </div>
          <h1 className="text-center text-2xl font-bold tracking-tight text-[#17324D]">
            Ganpati Lifecare Admin
          </h1>
          <p className="mt-1 text-center text-xs text-[#657382]">
            Wholesale Catalog &amp; Inquiry Management Portal
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {loginError && (
              <div className="rounded-lg bg-red-50 p-3 text-center text-xs font-semibold text-red-700 border border-red-200">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#243342] mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full rounded-lg border border-[#E1E7EC] bg-white px-3.5 py-2.5 text-sm text-[#243342] focus:border-[#23856D] focus:ring-2 focus:ring-[#23856D]/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#243342] mb-1">
                Administrator Password / Passkey
              </label>
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-lg border border-[#E1E7EC] bg-white px-3.5 py-2.5 text-sm text-[#243342] focus:border-[#23856D] focus:ring-2 focus:ring-[#23856D]/20 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#23856D] py-3 text-sm font-bold text-white hover:bg-[#176B57] transition shadow-xs cursor-pointer"
            >
              Authenticate &amp; Enter
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs font-semibold text-[#23856D] hover:underline">
              ← Back to Ganpati Lifecare Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-[#243342]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E1E7EC] shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1 hover:opacity-90">
              <Logo variant="mark" alt={LOGO.alt.main} className="h-7 w-auto" />
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-[#17324D] leading-none">
                Ganpati Lifecare
              </h1>
              <span className="text-[10px] text-[#657382]">
                Admin Management Console
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                activeTab === "overview"
                  ? "bg-[#17324D] text-white shadow-xs"
                  : "text-[#657382] hover:text-[#17324D]"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`rounded-lg px-3 py-1.5 transition cursor-pointer flex items-center gap-1 ${
                activeTab === "inquiries"
                  ? "bg-[#17324D] text-white shadow-xs"
                  : "text-[#657382] hover:text-[#17324D]"
              }`}
            >
              Inquiries
              {newInquiries > 0 && (
                <span className="rounded-full bg-[#23856D] px-1.5 py-0.2 text-[9px] text-white">
                  {newInquiries}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#17324D] text-white shadow-xs"
                  : "text-[#657382] hover:text-[#17324D]"
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-[#17324D] text-white shadow-xs"
                  : "text-[#657382] hover:text-[#17324D]"
              }`}
            >
              Blog ({blogs.length})
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                activeTab === "settings"
                  ? "bg-[#17324D] text-white shadow-xs"
                  : "text-[#657382] hover:text-[#17324D]"
              }`}
            >
              Settings
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => loadAllData()}
              title="Refresh Data"
              disabled={refreshing}
              className="rounded-lg border border-[#E1E7EC] p-1.5 text-xs text-[#657382] hover:bg-gray-50 cursor-pointer"
            >
              {refreshing ? "⟳..." : "⟳"}
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* =========================================================================
            TAB 1: OVERVIEW
            ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-white p-5 border border-[#E1E7EC] shadow-xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#657382]">
                  Total Inquiries
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[#17324D]">{totalInquiries}</p>
                <p className="mt-1 text-xs text-[#657382]">{newInquiries} pending review</p>
              </div>
              <div className="rounded-xl bg-white p-5 border border-[#E1E7EC] shadow-xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#23856D]">
                  Published Products
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[#23856D]">
                  {products.filter((p) => p.isPublished).length}
                </p>
                <p className="mt-1 text-xs text-[#657382]">Total {products.length} in catalog</p>
              </div>
              <div className="rounded-xl bg-white p-5 border border-[#E1E7EC] shadow-xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                  Quoted / In Progress
                </p>
                <p className="mt-2 text-3xl font-extrabold text-amber-700">
                  {quotedInquiries + contactedInquiries}
                </p>
                <p className="mt-1 text-xs text-[#657382]">{completedInquiries} completed</p>
              </div>
              <div className="rounded-xl bg-white p-5 border border-[#E1E7EC] shadow-xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#176B57]">
                  Published Articles
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[#176B57]">
                  {blogs.filter((b) => b.isPublished).length}
                </p>
                <p className="mt-1 text-xs text-[#657382]">Total {blogs.length} articles</p>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-xl bg-white p-5 border border-[#E1E7EC] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#17324D]">
                    Recent Inquiries
                  </h2>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="text-xs font-bold text-[#23856D] hover:underline cursor-pointer"
                  >
                    View All ({inquiries.length}) →
                  </button>
                </div>
                {inquiries.length === 0 ? (
                  <p className="text-sm text-[#657382] py-4">No inquiries logged yet.</p>
                ) : (
                  <div className="divide-y divide-[#E1E7EC]">
                    {inquiries.slice(0, 5).map((inq) => (
                      <div key={inq.id} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#17324D]">
                              {inq.inquiry_id}
                            </span>
                            <span className="font-semibold text-xs text-[#243342]">
                              {inq.name}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                inq.status === "New" || inq.status === "New Inquiry"
                                  ? "bg-blue-50 text-blue-700"
                                  : inq.status === "Quoted"
                                  ? "bg-purple-50 text-purple-700"
                                  : inq.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#657382] mt-0.5">
                            {inq.product_name} • Qty: {inq.quantity} • {inq.phone}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setViewingInquiry(inq);
                            setActiveTab("inquiries");
                          }}
                          className="rounded-lg border border-[#E1E7EC] px-2.5 py-1 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Business Overview & Quick Links */}
              <div className="rounded-xl bg-white p-5 border border-[#E1E7EC] shadow-xs space-y-4">
                <h2 className="text-base font-bold text-[#17324D]">
                  Business Summary
                </h2>
                <div className="text-xs space-y-2 text-[#243342]">
                  <div>
                    <span className="text-[#657382] block text-[10px] font-bold uppercase">
                      Business Name
                    </span>
                    <strong>{settings?.businessName || "Ganpati Lifecare"}</strong>
                  </div>
                  <div>
                    <span className="text-[#657382] block text-[10px] font-bold uppercase">
                      Management
                    </span>
                    <span>{settings?.manager || "Dharampal Verma"}</span>
                  </div>
                  <div>
                    <span className="text-[#657382] block text-[10px] font-bold uppercase">
                      Location
                    </span>
                    <span>Mandi Goluwala, Hanumangarh, Rajasthan — 335802</span>
                  </div>
                  <div>
                    <span className="text-[#657382] block text-[10px] font-bold uppercase">
                      GSTIN
                    </span>
                    <code>{settings?.gstin || "08JPEPD8830M1ZD"}</code>
                  </div>
                  <div>
                    <span className="text-[#657382] block text-[10px] font-bold uppercase">
                      Official Contact
                    </span>
                    <span>{settings?.contactPhone || "+91 98282 32254"}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E1E7EC] space-y-2">
                  <button
                    onClick={() => {
                      setIsAddingProduct(true);
                      setActiveTab("products");
                    }}
                    className="w-full rounded-lg bg-[#23856D] py-2 text-xs font-bold text-white hover:bg-[#176B57] transition cursor-pointer"
                  >
                    + Add New Product
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="w-full rounded-lg border border-[#E1E7EC] py-2 text-xs font-bold text-[#17324D] hover:bg-gray-50 transition cursor-pointer"
                  >
                    📥 Export All Inquiries (CSV)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: INQUIRIES MANAGEMENT
            ========================================================================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1 w-full sm:max-w-md">
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Search inquiries by ID, customer, phone, product..."
                  className="w-full rounded-lg border border-[#E1E7EC] bg-white px-3 py-2 text-xs sm:text-sm text-[#243342] focus:border-[#23856D] outline-none"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex flex-wrap gap-1 bg-white p-1 rounded-lg border border-[#E1E7EC] text-xs">
                  {["All", "New", "Contacted", "Quoted", "Completed", "Cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setInquiryStatusFilter(s)}
                      className={`rounded px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                        inquiryStatusFilter === s
                          ? "bg-[#17324D] text-white"
                          : "text-[#657382] hover:text-[#243342]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleExportCSV}
                  className="rounded-lg bg-white border border-[#E1E7EC] px-3 py-2 text-xs font-bold text-[#17324D] hover:bg-gray-50 cursor-pointer"
                >
                  Export CSV
                </button>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="overflow-hidden rounded-xl bg-white border border-[#E1E7EC] shadow-xs">
              {filteredInquiries.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#657382]">
                  No matching inquiries found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#E1E7EC] bg-[#F6F8FA] text-[11px] font-bold uppercase tracking-wider text-[#657382]">
                        <th className="px-4 py-3">Inquiry Code</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Product &amp; Qty</th>
                        <th className="px-4 py-3">Message</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E1E7EC]">
                      {filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-gray-50/70 transition">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="font-bold text-[#23856D] block">
                              {inq.inquiry_id}
                            </span>
                            <span className="text-[10px] text-[#657382]">
                              {new Date(inq.created_at).toLocaleDateString("en-IN")}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-[#17324D] block">{inq.name}</span>
                            <a href={`tel:${inq.phone}`} className="text-xs text-[#23856D] hover:underline">
                              {inq.phone}
                            </a>
                            {inq.email && (
                              <span className="text-[11px] text-[#657382] block">{inq.email}</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-[#243342] block">
                              {inq.product_name}
                            </span>
                            <span className="text-xs text-[#657382]">Qty: {inq.quantity}</span>
                          </td>
                          <td className="px-4 py-3 max-w-xs">
                            <p className="line-clamp-2 text-xs text-[#657382]">
                              {inq.message || "—"}
                            </p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <select
                              value={inq.status}
                              disabled={updatingInquiryId === inq.id}
                              onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                              className="rounded border border-[#E1E7EC] bg-white px-2 py-1 text-xs font-bold text-[#243342] outline-none cursor-pointer"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Quoted">Quoted</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => setViewingInquiry(inq)}
                                className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold hover:bg-gray-200 cursor-pointer"
                              >
                                Details
                              </button>
                              <button
                                onClick={() => handleDeleteInquiry(inq.id, inq.inquiry_id)}
                                className="rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Inquiry Details Modal */}
            {viewingInquiry && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-[#E1E7EC]">
                  <div className="flex items-center justify-between border-b border-[#E1E7EC] pb-3">
                    <h3 className="text-base font-bold text-[#17324D]">
                      Inquiry Details — {viewingInquiry.inquiry_id}
                    </h3>
                    <button
                      onClick={() => setViewingInquiry(null)}
                      className="text-[#657382] hover:text-black cursor-pointer text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-[#657382] block text-[11px] uppercase font-bold">Customer Name</span>
                      <strong className="text-[#17324D]">{viewingInquiry.name}</strong>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[#657382] block text-[11px] uppercase font-bold">Phone Number</span>
                        <a href={`tel:${viewingInquiry.phone}`} className="text-[#23856D] font-bold">
                          {viewingInquiry.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-[#657382] block text-[11px] uppercase font-bold">Email Address</span>
                        <span>{viewingInquiry.email || "Not provided"}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[#657382] block text-[11px] uppercase font-bold">Product Requested</span>
                      <strong>{viewingInquiry.product_name}</strong> (Quantity: {viewingInquiry.quantity})
                    </div>
                    <div>
                      <span className="text-[#657382] block text-[11px] uppercase font-bold">Inquiry Message</span>
                      <p className="rounded-lg bg-gray-50 p-3 text-xs text-[#243342] whitespace-pre-wrap border border-[#E1E7EC]">
                        {viewingInquiry.message || "No specific comments provided."}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div>
                        <span className="text-[#657382] block text-[11px] uppercase font-bold">Status</span>
                        <select
                          value={viewingInquiry.status}
                          onChange={(e) => handleInquiryStatusChange(viewingInquiry.id, e.target.value)}
                          className="mt-1 w-full rounded border border-[#E1E7EC] bg-white p-1.5 text-xs font-bold"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-[#657382] block text-[11px] uppercase font-bold">Created On</span>
                        <span className="text-xs text-[#657382] mt-1 block">
                          {new Date(viewingInquiry.created_at).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2 border-t border-[#E1E7EC] pt-3">
                    <button
                      onClick={() => setViewingInquiry(null)}
                      className="rounded-lg border border-[#E1E7EC] px-4 py-2 text-xs font-bold text-[#657382] hover:bg-gray-50 cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 3: PRODUCTS MANAGEMENT
            ========================================================================= */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1 w-full sm:max-w-md">
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by name or category..."
                  className="w-full rounded-lg border border-[#E1E7EC] bg-white px-3 py-2 text-xs sm:text-sm text-[#243342] focus:border-[#23856D] outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="rounded-lg border border-[#E1E7EC] bg-white px-3 py-2 text-xs font-bold text-[#243342]"
                >
                  <option value="all">All Categories</option>
                  <option value="orthopedic">Orthopedic</option>
                  <option value="surgical">Surgical</option>
                  <option value="uniforms">Hospital Uniforms</option>
                  <option value="essentials">Healthcare Essentials</option>
                </select>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingProduct(true);
                  }}
                  className="rounded-lg bg-[#23856D] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#176B57] cursor-pointer"
                >
                  + Add Product
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-hidden rounded-xl bg-white border border-[#E1E7EC] shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E1E7EC] bg-[#F6F8FA] text-[11px] font-bold uppercase tracking-wider text-[#657382]">
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Featured</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E1E7EC]">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.slug} className="hover:bg-gray-50/70 transition">
                        <td className="px-4 py-3">
                          <strong className="text-[#17324D] block">{prod.name}</strong>
                          <span className="text-[11px] text-[#657382] line-clamp-1">
                            {prod.description}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="rounded-full bg-[#EAF5F0] px-2.5 py-0.5 text-[10px] font-bold text-[#23856D] uppercase">
                            {prod.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleProductPublish(prod.slug, prod.isPublished)}
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold cursor-pointer ${
                              prod.isPublished
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {prod.isPublished ? "Published" : "Draft"}
                          </button>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleProductFeature(prod.slug, prod.isFeatured)}
                            className={`rounded px-2 py-0.5 text-xs font-bold cursor-pointer ${
                              prod.isFeatured
                                ? "bg-amber-100 text-amber-800"
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            {prod.isFeatured ? "★ Featured" : "☆ Feature"}
                          </button>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <Link
                              href={`/products/${prod.slug}`}
                              target="_blank"
                              className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold hover:bg-gray-200"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => {
                                setEditingProduct(prod);
                                setIsAddingProduct(true);
                              }}
                              className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 cursor-pointer"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Add / Edit Modal */}
            {isAddingProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
                <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl border border-[#E1E7EC] my-8">
                  <div className="flex items-center justify-between border-b border-[#E1E7EC] pb-3">
                    <h3 className="text-base font-bold text-[#17324D]">
                      {editingProduct ? `Edit Product: ${editingProduct.name}` : "Add New Medical Product"}
                    </h3>
                    <button
                      onClick={() => setIsAddingProduct(false)}
                      className="text-[#657382] hover:text-black cursor-pointer font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <form onSubmit={handleSaveProduct} className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                        Product Name
                      </label>
                      <input
                        name="name"
                        defaultValue={editingProduct?.name || ""}
                        required
                        className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                          Slug URL
                        </label>
                        <input
                          name="slug"
                          defaultValue={editingProduct?.slug || ""}
                          placeholder="e.g. orthocot-cotton-roll"
                          className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                          Category
                        </label>
                        <select
                          name="category"
                          defaultValue={editingProduct?.category || "orthopedic"}
                          className="w-full rounded border border-[#E1E7EC] p-2 text-xs font-semibold"
                        >
                          <option value="orthopedic">Orthopedic</option>
                          <option value="surgical">Surgical</option>
                          <option value="uniforms">Hospital Uniforms</option>
                          <option value="essentials">Healthcare Essentials</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                        Product Description
                      </label>
                      <textarea
                        name="description"
                        defaultValue={editingProduct?.description || ""}
                        rows={3}
                        required
                        className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                        Primary Image URL
                      </label>
                      <input
                        name="imageUrls"
                        defaultValue={
                          typeof editingProduct?.imageUrls === "string" && editingProduct.imageUrls.startsWith("[")
                            ? JSON.parse(editingProduct.imageUrls)[0]
                            : editingProduct?.imageUrls || "/images/products/real_orthocot_cotton_roll_15cm.webp"
                        }
                        className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                        Packaging Information
                      </label>
                      <input
                        name="packagingInformation"
                        defaultValue={editingProduct?.packagingInformation || ""}
                        placeholder="e.g. Pack of 10 rolls; master carton of 100 rolls."
                        className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                        <input
                          type="checkbox"
                          name="isPublished"
                          defaultChecked={editingProduct ? editingProduct.isPublished : true}
                        />
                        Published (Visible on Website)
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                        <input
                          type="checkbox"
                          name="isFeatured"
                          defaultChecked={editingProduct ? editingProduct.isFeatured : false}
                        />
                        Featured Product
                      </label>
                    </div>
                    <div className="mt-6 flex justify-end gap-2 border-t border-[#E1E7EC] pt-3">
                      <button
                        type="button"
                        onClick={() => setIsAddingProduct(false)}
                        className="rounded-lg border border-[#E1E7EC] px-4 py-2 text-xs font-bold text-[#657382] hover:bg-gray-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-[#23856D] px-4 py-2 text-xs font-bold text-white hover:bg-[#176B57] cursor-pointer"
                      >
                        {editingProduct ? "Save Changes" : "Create Product"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 4: BLOG POSTS MANAGEMENT
            ========================================================================= */}
        {activeTab === "blogs" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1 w-full sm:max-w-md">
                <input
                  type="text"
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  placeholder="Search articles by title or author..."
                  className="w-full rounded-lg border border-[#E1E7EC] bg-white px-3 py-2 text-xs sm:text-sm text-[#243342] focus:border-[#23856D] outline-none"
                />
              </div>
              <button
                onClick={() => {
                  setEditingBlog(null);
                  setIsAddingBlog(true);
                }}
                className="rounded-lg bg-[#23856D] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#176B57] cursor-pointer"
              >
                + Write Article
              </button>
            </div>

            <div className="overflow-hidden rounded-xl bg-white border border-[#E1E7EC] shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E1E7EC] bg-[#F6F8FA] text-[11px] font-bold uppercase tracking-wider text-[#657382]">
                      <th className="px-4 py-3">Article Title</th>
                      <th className="px-4 py-3">Author</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E1E7EC]">
                    {filteredBlogs.map((b) => (
                      <tr key={b.slug} className="hover:bg-gray-50/70 transition">
                        <td className="px-4 py-3">
                          <strong className="text-[#17324D] block">{b.title}</strong>
                          <span className="text-[11px] text-[#657382] line-clamp-1">{b.excerpt}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs text-[#243342]">
                          {b.author}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleBlogPublish(b.slug, b.isPublished)}
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold cursor-pointer ${
                              b.isPublished
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {b.isPublished ? "Published" : "Draft"}
                          </button>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <Link
                              href={`/blog/${b.slug}`}
                              target="_blank"
                              className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold hover:bg-gray-200"
                            >
                              Read
                            </Link>
                            <button
                              onClick={() => {
                                setEditingBlog(b);
                                setIsAddingBlog(true);
                              }}
                              className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 cursor-pointer"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Blog Add / Edit Modal */}
            {isAddingBlog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
                <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl border border-[#E1E7EC] my-8">
                  <div className="flex items-center justify-between border-b border-[#E1E7EC] pb-3">
                    <h3 className="text-base font-bold text-[#17324D]">
                      {editingBlog ? `Edit Article: ${editingBlog.title}` : "Create Medical Knowledge Article"}
                    </h3>
                    <button
                      onClick={() => setIsAddingBlog(false)}
                      className="text-[#657382] hover:text-black cursor-pointer font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <form onSubmit={handleSaveBlog} className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                        Article Title
                      </label>
                      <input
                        name="title"
                        defaultValue={editingBlog?.title || ""}
                        required
                        className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                          Slug URL
                        </label>
                        <input
                          name="slug"
                          defaultValue={editingBlog?.slug || ""}
                          placeholder="e.g. how-to-choose-orthopedic-supplies"
                          className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                          Author
                        </label>
                        <input
                          name="author"
                          defaultValue={editingBlog?.author || "Dharampal Verma"}
                          className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                        Short Excerpt / Summary
                      </label>
                      <textarea
                        name="excerpt"
                        defaultValue={editingBlog?.excerpt || ""}
                        rows={2}
                        className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                        Main Article Content
                      </label>
                      <textarea
                        name="content"
                        defaultValue={editingBlog?.content || ""}
                        rows={6}
                        required
                        className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                        Cover Image Path
                      </label>
                      <input
                        name="coverImage"
                        defaultValue={editingBlog?.coverImage || "/images/products/real_orthocot_cotton_roll_15cm.webp"}
                        className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                      />
                    </div>
                    <div className="pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                        <input
                          type="checkbox"
                          name="isPublished"
                          defaultChecked={editingBlog ? editingBlog.isPublished : true}
                        />
                        Published (Live on Blog)
                      </label>
                    </div>
                    <div className="mt-6 flex justify-end gap-2 border-t border-[#E1E7EC] pt-3">
                      <button
                        type="button"
                        onClick={() => setIsAddingBlog(false)}
                        className="rounded-lg border border-[#E1E7EC] px-4 py-2 text-xs font-bold text-[#657382] hover:bg-gray-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-[#23856D] px-4 py-2 text-xs font-bold text-white hover:bg-[#176B57] cursor-pointer"
                      >
                        {editingBlog ? "Save Article" : "Publish Article"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 5: SETTINGS
            ========================================================================= */}
        {activeTab === "settings" && (
          <div className="max-w-3xl rounded-xl bg-white p-6 border border-[#E1E7EC] shadow-xs">
            <h2 className="text-base font-bold text-[#17324D] mb-1">
              Business &amp; Communication Settings
            </h2>
            <p className="text-xs text-[#657382] mb-6">
              Update official contact numbers, verified GSTIN, and WhatsApp routing.
            </p>

            {settingsSaved && (
              <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200">
                ✓ Business settings updated and synchronized successfully!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                  Official Business Name
                </label>
                <input
                  name="businessName"
                  defaultValue={settings?.businessName || "Ganpati Lifecare"}
                  required
                  className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                    Primary Phone Number
                  </label>
                  <input
                    name="contactPhone"
                    defaultValue={settings?.contactPhone || "+91 98282 32254"}
                    required
                    className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                    Alternate Phone Number
                  </label>
                  <input
                    name="alternatePhone"
                    defaultValue={settings?.alternatePhone || "+91 94600 95250"}
                    className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                    WhatsApp Routing Number
                  </label>
                  <input
                    name="whatsappNumber"
                    defaultValue={settings?.whatsappNumber || "+91 98282 32254"}
                    required
                    className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                    Official Business Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    defaultValue={settings?.contactEmail || "whiteroseglc@gmail.com"}
                    required
                    className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                    GSTIN Registration Number
                  </label>
                  <input
                    name="gstin"
                    defaultValue={settings?.gstin || "08JPEPD8830M1ZD"}
                    required
                    className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                    Business Manager
                  </label>
                  <input
                    disabled
                    value={settings?.manager || "Dharampal Verma"}
                    className="w-full rounded border border-[#E1E7EC] bg-gray-50 p-2 text-xs text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#657382] mb-1">
                  Physical Business Address
                </label>
                <textarea
                  name="businessAddress"
                  defaultValue={
                    settings?.businessAddress ||
                    "Main Road, Mandi Goluwala, District Hanumangarh, Rajasthan, India — 335802"
                  }
                  rows={2}
                  required
                  className="w-full rounded border border-[#E1E7EC] p-2 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="rounded-lg bg-[#23856D] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#176B57] transition shadow-xs cursor-pointer"
                >
                  {savingSettings ? "Saving Settings..." : "Save Business Settings"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
