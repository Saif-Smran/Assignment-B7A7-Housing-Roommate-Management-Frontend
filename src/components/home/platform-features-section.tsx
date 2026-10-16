import { ClipboardList, CreditCard, ShieldCheck, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Properties & Rooms",
    description:
      "Browse property and room listings with availability details, photos, amenities, and owner information.",
    color: "indigo",
  },
  {
    icon: CreditCard,
    title: "Secure Stripe Payments",
    description:
      "Manage rent, deposits, and utility payments through the connected Stripe checkout workflow.",
    color: "emerald",
  },
  {
    icon: ClipboardList,
    title: "Applications & Viewings",
    description:
      "Submit room applications, request viewings, and follow each request from your dashboard.",
    color: "purple",
  },
  {
    icon: Wrench,
    title: "Maintenance Tracking",
    description:
      "Submit maintenance requests and track their progress through the tenant and owner dashboards.",
    color: "amber",
  },
] as const;

const colorClasses = {
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function PlatformFeaturesSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl space-y-3 text-center">
          <Badge
            variant="outline"
            className="border-indigo-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"
          >
            Why Choose UrbanMatch
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need for a Better Rental Experience
          </h2>
          <p className="text-sm text-muted-foreground">
            Search, apply, pay, and manage housing activities from one connected
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, color }) => (
            <Card
              key={title}
              className="space-y-3 rounded-3xl border border-border/60 bg-card p-6 transition-all hover:border-indigo-500/40 hover:shadow-lg"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${colorClasses[color]}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-foreground">
                {title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
