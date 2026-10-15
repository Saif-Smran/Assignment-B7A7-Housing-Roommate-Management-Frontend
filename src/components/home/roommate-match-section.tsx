import {
  Check,
  CheckCircle2,
  Clock,
  Heart,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  UserCheck,
  Users2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RoommateMatchSection() {
  const matchCriteria = [
    {
      title: "Daily Schedule & Routines",
      desc: "Align with early birds or night owls for optimal quiet hours.",
      icon: Clock,
      color: "text-indigo-500 bg-indigo-500/10",
    },
    {
      title: "Cleanliness & House Rules",
      desc: "Specify shared kitchen chores, trash duty, and cleaning routines.",
      icon: Sparkles,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      title: "Guest & Social Policy",
      desc: "Agree on weekend visitors, study groups, and quiet hours.",
      icon: Users2,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      title: "Verified Student / Work ID",
      desc: "Ensure peace of mind with 100% verified real identity checks.",
      icon: ShieldCheck,
      color: "text-amber-500 bg-amber-500/10",
    },
  ];

  return (
    <section className="py-20 bg-muted/20 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <Zap className="h-3.5 w-3.5" />
              <span>Intelligent Compatibility Algorithm</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              Say Goodbye to Roommate Drama.{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Match by Lifestyle.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Living together should feel effortless. UrbanMatch pairs you with
              roommates who match your budget, daily habits, cleanliness
              standards, and lifestyle expectations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {matchCriteria.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium text-xs px-6 shadow-md shadow-purple-600/20"
              >
                <Link href="/properties">
                  <Search className="h-3.5 w-3.5 mr-2" />
                  Find Roommate Listings
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full text-xs font-medium border-border"
              >
                <Link href="/faq">Learn How Matching Works</Link>
              </Button>
            </div>
          </div>

          {/* Right Visual Column: Live Match Simulation Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl border border-purple-500/30 bg-gradient-to-b from-card via-card to-purple-950/5 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              {/* Header pill */}
              <div className="flex items-center justify-between pb-6 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-foreground">
                    Compatibility Simulation
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30 font-bold text-xs"
                >
                  98% Match
                </Badge>
              </div>

              {/* Profiles Comparison */}
              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  {/* Seeker 1 */}
                  <div className="flex flex-col items-center text-center space-y-1.5 flex-1">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-heading font-bold text-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        TK
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center text-white">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-foreground">
                      Tanvir K.
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Student · NSU
                    </p>
                  </div>

                  {/* Match Connector */}
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="h-9 w-9 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Heart className="h-4 w-4 fill-purple-600 text-purple-600" />
                    </div>
                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">
                      High Sync
                    </span>
                  </div>

                  {/* Seeker 2 */}
                  <div className="flex flex-col items-center text-center space-y-1.5 flex-1">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-heading font-bold text-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                        RH
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center text-white">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-foreground">
                      Rafiul H.
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Jr. Developer
                    </p>
                  </div>
                </div>

                {/* Compatibility Metrics */}
                <div className="space-y-2.5 pt-4 border-t border-border/50 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Budget Alignment
                    </span>
                    <span className="font-semibold text-foreground">
                      ৳12,000 - ৳15,000 (Exact Match)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full w-full" />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-muted-foreground">
                      Sleep Schedule
                    </span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Moon className="h-3 w-3 text-indigo-400" /> Night Owls (1
                      AM)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div className="bg-indigo-500 h-1.5 rounded-full w-[94%]" />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-muted-foreground">House Habits</span>
                    <span className="font-semibold text-foreground">
                      Non-Smoker · Clean Routine
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div className="bg-purple-500 h-1.5 rounded-full w-[98%]" />
                  </div>
                </div>
              </div>

              {/* Verified Security Footer */}
              <div className="mt-4 rounded-2xl bg-muted/60 p-3 flex items-center gap-2.5 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-muted-foreground text-[11px]">
                  Both profiles verified with government NID & active phone
                  authentication.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
