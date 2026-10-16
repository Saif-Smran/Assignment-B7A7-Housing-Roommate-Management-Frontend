"use client";

import {
  Bell,
  Building2,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Search,
  ShieldCheck,
  UserCheck,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getDashboardPath } from "@/lib/auth";
import { useAuth } from "@/providers/auth.provider";

export function DashboardNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  // Close dropdown when clicking outside
  const menuRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    toast.success("You have been signed out.");
    router.push("/");
  };

  const currentRole = role || user?.role || "TENANT";

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-md sm:px-6">
      {/* Left Area: Sidebar Trigger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-9 w-9 rounded-xl border border-border/60 bg-muted/30 text-foreground hover:bg-muted" />
        <div className="hidden sm:flex flex-col">
          <span className="font-heading text-xs font-bold text-foreground flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            UrbanMatch Dashboard
          </span>
          <span className="text-[10px] text-muted-foreground">
            {pathname.replace("/dashboard", "~").replace(/\//g, " / ") || "overview"}
          </span>
        </div>
      </div>

      {/* Right Area: Actions & Profile Menu */}
      <div ref={menuRef} className="flex items-center gap-2.5">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hidden md:inline-flex text-xs rounded-xl gap-1 text-muted-foreground hover:text-foreground"
        >
          <Link href="/properties">
            <Search className="h-3.5 w-3.5" />
            Explore Rooms
          </Link>
        </Button>

        {/* Notifications Mock Button */}
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              setNotificationsOpen((prev) => !prev);
              setDropdownOpen(false);
            }}
            aria-label="View notifications"
            className="h-9 w-9 rounded-xl border-border/60 relative"
          >
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600" />
          </Button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-card p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-2">
                <span className="font-heading text-xs font-bold text-foreground">
                  Notifications
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  3 New
                </Badge>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                  <p className="font-semibold text-foreground text-[11px]">
                    Viewing Confirmed
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    Your scheduled viewing has been confirmed by the landlord.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-muted/30">
                  <p className="font-semibold text-foreground text-[11px]">
                    Stripe Payment Active
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    Security deposit escrow protection is active for booking.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <ThemeToggle />

        {/* Profile Dropdown with Profile Icon */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setDropdownOpen((prev) => !prev);
              setNotificationsOpen(false);
            }}
            aria-expanded={dropdownOpen}
            className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 p-1 sm:px-3 sm:py-1.5 transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-sm">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="max-w-[120px] truncate text-xs font-semibold text-foreground">
                {user?.fullName || "User Account"}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">
                {currentRole}
              </span>
            </div>
            <ChevronDown className="hidden sm:inline h-3.5 w-3.5 text-muted-foreground" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-border bg-card p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-border/60 mb-1">
                <p className="font-heading font-semibold text-xs text-foreground truncate">
                  {user?.fullName || "User"}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {user?.email || "user@urbanmatch.app"}
                </p>
                <div className="mt-1">
                  <Badge variant="outline" className="text-[9px] uppercase px-1.5 py-0">
                    {currentRole}
                  </Badge>
                </div>
              </div>

              <Link
                href="/dashboard/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
              >
                <UserCircle className="h-4 w-4 text-indigo-600" />
                My Profile
              </Link>

              <Link
                href={getDashboardPath(currentRole)}
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
              >
                <LayoutDashboard className="h-4 w-4 text-indigo-600" />
                Dashboard Overview
              </Link>

              <Link
                href="/"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
              >
                <Building2 className="h-4 w-4 text-indigo-600" />
                UrbanMatch Home
              </Link>

              <div className="my-1 border-t border-border/60" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
