"use client";

import {
  Banknote,
  Building,
  CheckCircle2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { HomeHeroIsometric } from "@/components/home/home-hero-isometric";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HomeHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [rentBudget, setRentBudget] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCity) params.set("city", selectedCity);
    if (selectedType) params.set("propertyType", selectedType);
    if (rentBudget) {
      if (rentBudget === "under10k") {
        params.set("maxRent", "10000");
      } else if (rentBudget === "10k-20k") {
        params.set("minRent", "10000");
        params.set("maxRent", "20000");
      } else if (rentBudget === "above20k") {
        params.set("minRent", "20000");
      }
    }
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden min-h-[60vh] lg:h-[75vh] lg:min-h-[600px] lg:max-h-[760px] flex items-center justify-center bg-gradient-to-b from-indigo-50/50 via-background to-background dark:from-indigo-950/20 py-8 lg:py-0">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-indigo-500/15 to-purple-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-gradient-to-bl from-pink-500/10 to-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & High-Velocity Search */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5 text-left">
            {/* Top Pill Announcement */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 backdrop-blur-md shadow-sm w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Gen Housing & Roommate Matching</span>
              <Badge
                variant="accent"
                className="text-[9px] uppercase px-1.5 py-0"
              >
                Live API
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              Find Your Ideal Room &{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Compatible Roommates
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
              Search verified rental apartments, master bedrooms, and shared
              flats across Dhaka and top cities with instant Stripe checkout &
              maintenance tracking.
            </p>

            {/* Search Container Form */}
            <form
              onSubmit={handleSearch}
              className="p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-border/70 bg-card/80 backdrop-blur-2xl shadow-xl shadow-indigo-500/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-left"
            >
              {/* Field 1: Keyword */}
              <div className="flex flex-col gap-0.5 px-2 py-1 border-b sm:border-b-0 sm:border-r border-border/50">
                <label
                  htmlFor="hero-keyword"
                  className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1"
                >
                  <Search className="h-2.5 w-2.5 text-indigo-500" /> Keyword
                </label>
                <Input
                  id="hero-keyword"
                  type="text"
                  placeholder="e.g. Dhanmondi"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-7 border-none bg-transparent p-0 text-xs focus-visible:ring-0 placeholder:text-muted-foreground/60 shadow-none"
                />
              </div>

              {/* Field 2: City */}
              <div className="flex flex-col gap-0.5 px-2 py-1 border-b sm:border-b-0 sm:border-r border-border/50">
                <label
                  htmlFor="hero-city"
                  className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1"
                >
                  <MapPin className="h-2.5 w-2.5 text-indigo-500" /> City
                </label>
                <select
                  id="hero-city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="h-7 bg-transparent text-xs text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-background text-foreground">
                    All Cities
                  </option>
                  <option
                    value="Dhaka"
                    className="bg-background text-foreground"
                  >
                    Dhaka
                  </option>
                  <option
                    value="Chittagong"
                    className="bg-background text-foreground"
                  >
                    Chittagong
                  </option>
                  <option
                    value="Sylhet"
                    className="bg-background text-foreground"
                  >
                    Sylhet
                  </option>
                  <option
                    value="Rajshahi"
                    className="bg-background text-foreground"
                  >
                    Rajshahi
                  </option>
                </select>
              </div>

              {/* Field 3: Property Type */}
              <div className="flex flex-col gap-0.5 px-2 py-1 border-b sm:border-b-0 sm:border-r border-border/50">
                <label
                  htmlFor="hero-type"
                  className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1"
                >
                  <Building className="h-2.5 w-2.5 text-indigo-500" /> Type
                </label>
                <select
                  id="hero-type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="h-7 bg-transparent text-xs text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-background text-foreground">
                    All Types
                  </option>
                  <option
                    value="Apartment"
                    className="bg-background text-foreground"
                  >
                    Apartment
                  </option>
                  <option
                    value="House"
                    className="bg-background text-foreground"
                  >
                    House
                  </option>
                  <option
                    value="Studio"
                    className="bg-background text-foreground"
                  >
                    Studio
                  </option>
                </select>
              </div>

              {/* Field 4: Rent Budget */}
              <div className="flex flex-col gap-0.5 px-2 py-1 border-b sm:border-b-0 sm:border-r border-border/50">
                <label
                  htmlFor="hero-budget"
                  className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1"
                >
                  <Banknote className="h-2.5 w-2.5 text-indigo-500" /> Budget
                </label>
                <select
                  id="hero-budget"
                  value={rentBudget}
                  onChange={(e) => setRentBudget(e.target.value)}
                  className="h-7 bg-transparent text-xs text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-background text-foreground">
                    Any Budget
                  </option>
                  <option
                    value="under10k"
                    className="bg-background text-foreground"
                  >
                    &lt; ৳10k
                  </option>
                  <option
                    value="10k-20k"
                    className="bg-background text-foreground"
                  >
                    ৳10k - ৳20k
                  </option>
                  <option
                    value="above20k"
                    className="bg-background text-foreground"
                  >
                    &gt; ৳20k
                  </option>
                </select>
              </div>

              {/* Search Action Button */}
              <div className="flex items-center justify-center pt-1 sm:pt-0">
                <Button
                  type="submit"
                  className="w-full h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 gap-1.5 cursor-pointer"
                >
                  <Search className="h-3.5 w-3.5" />
                  Find
                </Button>
              </div>
            </form>

            {/* Popular quick tags */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground text-[11px]">
                Popular:
              </span>
              {[
                "Master Bedroom",
                "Dhanmondi",
                "Uttara",
                "Mirpur",
                "Studio",
                "Bashundhara",
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    router.push(`/properties?q=${encodeURIComponent(tag)}`);
                  }}
                  className="rounded-full bg-muted/60 border border-border/50 px-2.5 py-0.5 text-[11px] hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Key Value Props Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-foreground leading-tight">
                    Verified Owners
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    100% Inspected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-foreground leading-tight">
                    Instant Booking
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    Stripe Checkout
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-foreground leading-tight">
                    Roommate Match
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    Smart Compatibility
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-foreground leading-tight">
                    Zero Broker Fee
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    Direct Rental
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Isometric Architecture & Roommate Match Radar */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HomeHeroIsometric />
          </div>
        </div>
      </div>
    </section>
  );
}
