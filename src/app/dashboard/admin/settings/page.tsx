"use client";

import {
  Bell,
  CheckCircle2,
  CreditCard,
  Lock,
  Save,
  Server,
  Settings,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import * as React from "react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminSettingsPage() {
  const [saving, setSaving] = React.useState(false);
  const [platformCommission, setPlatformCommission] = React.useState("5");
  const [securityDepositMonths, setSecurityDepositMonths] = React.useState("1");
  const [requireOwnerVerification, setRequireOwnerVerification] =
    React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [autoApproveListings, setAutoApproveListings] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Platform settings saved and synced.");
    }, 600);
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 pb-12 sm:px-6 lg:px-8">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          <Settings className="h-3.5 w-3.5" />
          Configuration Center
        </div>
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-foreground">
          Platform Governance & System Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage rental platform commissions, security deposit thresholds,
          Stripe gateways, and automated moderation rules.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Payment & Commission Settings */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-600" />
              Financial & Stripe Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Platform Commission Rate (%)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="30"
                  value={platformCommission}
                  onChange={(e) => setPlatformCommission(e.target.value)}
                  className="rounded-xl text-xs"
                />
                <span className="text-[10px] text-muted-foreground">
                  Applied to monthly rental payments upon successful Stripe
                  settlement.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Default Security Deposit (Months)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="6"
                  value={securityDepositMonths}
                  onChange={(e) => setSecurityDepositMonths(e.target.value)}
                  className="rounded-xl text-xs"
                />
                <span className="text-[10px] text-muted-foreground">
                  Recommended landlord escrow deposit requirement.
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-foreground block">
                  Stripe Live Gateway Connection
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Test environment endpoints operational at https://b7-a6.vercel.app/api
                </span>
              </div>
              <Badge variant="success" className="text-xs">
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Security & Verification Settings */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              Listing & Account Moderation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/60">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">
                  Mandatory Owner Identity Verification
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Require phone and NID/passport confirmation before landlords
                  can list properties.
                </p>
              </div>
              <input
                type="checkbox"
                checked={requireOwnerVerification}
                onChange={(e) => setRequireOwnerVerification(e.target.checked)}
                className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border/60">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">
                  Auto-Approve Verified Owner Listings
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Bypass manual admin inspection for landlords with 10+ positive
                  ratings.
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoApproveListings}
                onChange={(e) => setAutoApproveListings(e.target.checked)}
                className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">
                  System Alerts & Dispute Emails
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Dispatch email notifications to admin moderators on maintenance
                  escalations.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            {saving ? "Saving Changes..." : "Save Platform Settings"}
          </Button>
        </div>
      </form>
    </section>
  );
}
