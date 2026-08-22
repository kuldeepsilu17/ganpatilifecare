import type { Metadata } from "next";
import { AdminDashboardClient } from "./AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard | Ganpati Lifecare",
  description: "Internal administrative dashboard for Ganpati Lifecare.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
