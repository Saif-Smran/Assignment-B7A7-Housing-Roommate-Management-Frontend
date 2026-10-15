import { ArrowUpRight, Building2, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const locations = [
  {
    name: "Dhanmondi",
    city: "Dhaka",
    description: "Universities, cafes & lakeside living",
    roomsCount: "140+ Rooms",
    startingPrice: "৳11,500/mo",
    tag: "Student & Tech Hub",
    gradient: "from-blue-600/15 via-indigo-600/10 to-transparent",
    borderGlow: "hover:border-indigo-500/50",
  },
  {
    name: "Gulshan & Banani",
    city: "Dhaka",
    description: "Corporate executives & luxury suites",
    roomsCount: "85+ Rooms",
    startingPrice: "৳22,000/mo",
    tag: "High-End Living",
    gradient: "from-purple-600/15 via-pink-600/10 to-transparent",
    borderGlow: "hover:border-purple-500/50",
  },
  {
    name: "Uttara",
    city: "Dhaka",
    description: "Quiet sectors with direct metro connectivity",
    roomsCount: "110+ Rooms",
    startingPrice: "৳9,500/mo",
    tag: "Metro Connected",
    gradient: "from-emerald-600/15 via-teal-600/10 to-transparent",
    borderGlow: "hover:border-emerald-500/50",
  },
  {
    name: "Bashundhara R/A",
    city: "Dhaka",
    description: "Gated community beside NSU & IUB",
    roomsCount: "95+ Rooms",
    startingPrice: "৳12,000/mo",
    tag: "Gated Community",
    gradient: "from-amber-600/15 via-orange-600/10 to-transparent",
    borderGlow: "hover:border-amber-500/50",
  },
  {
    name: "Mirpur",
    city: "Dhaka",
    description: "Affordable master bedrooms & transit access",
    roomsCount: "160+ Rooms",
    startingPrice: "৳7,500/mo",
    tag: "Best Value",
    gradient: "from-cyan-600/15 via-blue-600/10 to-transparent",
    borderGlow: "hover:border-cyan-500/50",
  },
  {
    name: "Mohakhali & DOHS",
    city: "Dhaka",
    description: "Peaceful army defense sectors & central hub",
    roomsCount: "60+ Rooms",
    startingPrice: "৳16,000/mo",
    tag: "24/7 Security",
    gradient: "from-violet-600/15 via-purple-600/10 to-transparent",
    borderGlow: "hover:border-violet-500/50",
  },
];

export function TopLocationsSection() {
  return (
    <section className="py-16 md:py-24 bg-background border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <MapPin className="h-3.5 w-3.5" />
              <span>Prime Neighborhoods</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Explore Popular Neighborhoods
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              From university student sectors to prime diplomatic zones, find
              verified apartments and shared flats in your ideal neighborhood.
            </p>
          </div>

          <Badge
            variant="outline"
            className="text-xs px-3 py-1 self-start md:self-auto gap-1 border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
          >
            <Sparkles className="h-3 w-3" />
            650+ Active Listings Across Dhaka
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <Link
              key={loc.name}
              href={`/properties?city=${encodeURIComponent(loc.city)}&q=${encodeURIComponent(loc.name)}`}
              className={`group relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br ${loc.gradient} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${loc.borderGlow}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="inline-block rounded-full bg-background/80 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground border border-border/50">
                    {loc.tag}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {loc.description}
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-background/90 border border-border/60 text-foreground group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs">
                <span className="font-medium text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-indigo-500" />
                  {loc.roomsCount}
                </span>
                <span className="font-bold text-foreground">
                  From {loc.startingPrice}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
