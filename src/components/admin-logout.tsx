"use client";

import { useRouter } from "next/navigation";

export function AdminLogout() {
  const router = useRouter();
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); router.replace("/admin/login"); }
  return <button className="button button-outline" type="button" onClick={logout}>Sign out</button>;
}
