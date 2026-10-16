"use client";

import {
  Building2,
  CalendarClock,
  ClipboardList,
  CreditCard,
  Hammer,
  HandCoins,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { Role } from "@/interfaces";
import { useAuth } from "@/providers/auth.provider";

const roleLabels: Record<Role, string> = {
  ADMIN: "Administrator",
  OWNER: "Property owner",
  TENANT: "Tenant",
};

const linksByRole: Record<
  Role,
  { href: string; label: string; icon: typeof LayoutDashboard }[]
> = {
  ADMIN: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
    {
      href: "/dashboard/admin/properties",
      label: "Properties",
      icon: Building2,
    },
  ],
  OWNER: [
    { href: "/dashboard/owner", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/owner/properties",
      label: "My properties",
      icon: Building2,
    },
    {
      href: "/dashboard/owner/applications",
      label: "Applications",
      icon: ClipboardList,
    },
    {
      href: "/dashboard/owner/viewings",
      label: "Viewings",
      icon: CalendarClock,
    },
    {
      href: "/dashboard/owner/maintenance",
      label: "Maintenance",
      icon: Hammer,
    },
    {
      href: "/dashboard/owner/earnings",
      label: "Earnings",
      icon: HandCoins,
    },
  ],
  TENANT: [
    { href: "/dashboard/tenant", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/tenant/applications",
      label: "Applications",
      icon: ClipboardList,
    },
    {
      href: "/dashboard/tenant/viewings",
      label: "Viewings",
      icon: CalendarClock,
    },
    {
      href: "/dashboard/tenant/maintenance",
      label: "Maintenance",
      icon: Hammer,
    },
    {
      href: "/dashboard/tenant/payments",
      label: "Payments",
      icon: CreditCard,
    },
  ],
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role: authRole, logout } = useAuth();
  const role: Role = (authRole || user?.role || "TENANT") as Role;

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link
          href="/"
          aria-label="UrbanMatch home"
          className="flex items-center gap-2 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ShieldCheck className="h-5 w-5 text-indigo-600" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">UrbanMatch</p>
            <p className="truncate text-xs text-muted-foreground">
              {roleLabels[role]} dashboard
            </p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            {linksByRole[role].map(({ href, label, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  render={<Link href={href} />}
                  isActive={pathname === href}
                  tooltip={label}
                >
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={
                  <Link
                    href={
                      role === "OWNER"
                        ? "/dashboard/owner/profile"
                        : role === "TENANT"
                          ? "/dashboard/tenant/profile"
                          : "/dashboard/profile"
                    }
                  />
                }
                isActive={
                  pathname ===
                  (role === "OWNER"
                    ? "/dashboard/owner/profile"
                    : role === "TENANT"
                      ? "/dashboard/tenant/profile"
                      : "/dashboard/profile")
                }
                tooltip="My profile"
              >
                <UserCircle />
                <span>My profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/properties" />}
                tooltip="Browse rooms"
              >
                <Building2 />
                <span>Browse rooms</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip="Log out"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/20 cursor-pointer"
              >
                <LogOut />
                <span>Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3 space-y-2">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <UserCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate text-muted-foreground font-medium">
              {user?.email || "Signed in"}
            </span>
          </div>
          <ThemeToggle />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-center gap-2 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive border-border/80 h-8 cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Log out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
