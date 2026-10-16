import type { Metadata } from "next";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PrivateRoute } from "@/routes/private-route";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your UrbanMatch housing activity.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="min-h-svh flex-1 bg-muted/20 flex flex-col">
          <DashboardNavbar />
          <div className="flex-1 w-full pt-4">{children}</div>
        </main>
      </SidebarProvider>
    </PrivateRoute>
  );
}
