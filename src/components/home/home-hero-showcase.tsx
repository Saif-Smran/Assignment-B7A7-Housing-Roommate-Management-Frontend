"use client";

import {
  Bath,
  Bed,
  CheckCircle2,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const ROOM_SHOWCASES = [
  {
    id: "suite-1",
    tabLabel: "Master Bedroom",
    title: "Luxury Master Suite & Private Balcony",
    neighborhood: "Dhanmondi 9/A, Dhaka",
    rent: "৳14,500",
    period: "/month",
    deposit: "1 Month Deposit",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=85",
    amenities: ["Attached Bath", "AC Ready", "Balcony View", "High-speed WiFi"],
    matchRate: "98% Match",
    matchDesc: "Quiet Hours · Non-Smoker · Clean",
    roommatesCount: "2 Roommates",
    rating: "4.9",
    reviewsCount: 38,
    ownerName: "Dr. Kabir H.",
    ownerBadge: "Verified Superhost",
  },
  {
    id: "studio-2",
    tabLabel: "Studio Flat",
    title: "Minimalist Modern Studio Suite",
    neighborhood: "Gulshan-1 (Near Avenue), Dhaka",
    rent: "৳22,000",
    period: "/month",
    deposit: "2 Month Deposit",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=85",
    amenities: [
      "Private Kitchen",
      "Gym Access",
      "24/7 Security",
      "Generator Backup",
    ],
    matchRate: "95% Match",
    matchDesc: "Working Professional · Flexible",
    roommatesCount: "Single Occupancy",
    rating: "5.0",
    reviewsCount: 42,
    ownerName: "Nafisa Rahman",
    ownerBadge: "Identity Verified",
  },
  {
    id: "shared-3",
    tabLabel: "Shared Flat",
    title: "Spacious Room in 3-Bed Apartment",
    neighborhood: "Sector 11 (Beside Metro), Uttara",
    rent: "৳9,800",
    period: "/month",
    deposit: "1 Month Deposit",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=85",
    amenities: ["Shared Hall", "Metro 2-min", "Maid Service", "Rooftop Garden"],
    matchRate: "99% Match",
    matchDesc: "Student Friendly · Early Riser",
    roommatesCount: "1 Roommate Seeking",
    rating: "4.8",
    reviewsCount: 29,
    ownerName: "Engr. Rafiqul",
    ownerBadge: "Verified Landlord",
  },
];

export function HomeHeroShowcase() {
  const [activeTab, setActiveTab] = React.useState(0);
  const current = ROOM_SHOWCASES[activeTab];

  return (
    <div className="relative w-full max-w-lg lg:max-w-none flex items-center justify-center select-none py-4">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-12 -left-8 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-500/25 to-purple-500/20 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-10 -right-8 h-80 w-80 rounded-full bg-gradient-to-bl from-pink-500/20 to-indigo-600/25 blur-3xl animate-pulse pointer-events-none" />

      {/* Main Glassmorphic Showcase Container */}
      <div className="relative z-10 w-full max-w-[440px] sm:max-w-[470px] rounded-3xl border border-white/20 dark:border-white/10 bg-card/90 dark:bg-card/80 p-3.5 sm:p-4 shadow-2xl backdrop-blur-2xl transition-all duration-300">
        {/* Top Interactive Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-muted/60 mb-3 border border-border/40">
          {ROOM_SHOWCASES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === idx
                  ? "bg-background text-foreground shadow-sm scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.tabLabel}
            </button>
          ))}
        </div>

        {/* Media Window */}
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-muted group">
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 450px"
            priority
          />
          {/* Subtle Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

          {/* Top Floating Tag: Rent & Stripe */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            <div className="rounded-xl bg-background/90 dark:bg-card/90 backdrop-blur-md px-3 py-1.5 border border-white/20 shadow-lg text-right">
              <span className="font-heading font-extrabold text-sm text-foreground">
                {current.rent}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">
                {current.period}
              </span>
            </div>
          </div>

          {/* Top Left Tag: Live Availability */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 text-white backdrop-blur-md px-2.5 py-1 text-[10px] font-bold shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
              Verified Available
            </span>
          </div>

          {/* Bottom Overlay Info on Media */}
          <div className="absolute bottom-3 left-3 right-3 z-10 text-white space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-white/90 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-indigo-400" />
                {current.neighborhood}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold bg-white/15 backdrop-blur-md px-2 py-0.5 rounded-lg">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span>{current.rating}</span>
                <span className="text-white/70">({current.reviewsCount})</span>
              </div>
            </div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-white tracking-tight line-clamp-1">
              {current.title}
            </h3>
          </div>
        </div>

        {/* Card Body Details */}
        <div className="pt-3 space-y-2.5">
          {/* Amenities Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            {current.amenities.map((amenity, i) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 rounded-lg bg-muted/70 px-2 py-0.5 text-[10px] font-medium text-foreground border border-border/40"
              >
                {i === 0 ? (
                  <Bath className="h-2.5 w-2.5 text-indigo-500" />
                ) : null}
                {i === 1 ? (
                  <Zap className="h-2.5 w-2.5 text-amber-500" />
                ) : null}
                {i === 2 ? (
                  <Bed className="h-2.5 w-2.5 text-purple-500" />
                ) : null}
                {i === 3 ? (
                  <Wifi className="h-2.5 w-2.5 text-emerald-500" />
                ) : null}
                {amenity}
              </span>
            ))}
          </div>

          {/* Footer Action Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-[10px] flex items-center justify-center shadow-sm">
                {current.ownerName.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-[11px] leading-tight">
                  {current.ownerName}
                </p>
                <p className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                  <ShieldCheck className="h-2.5 w-2.5 text-emerald-500" />
                  {current.ownerBadge}
                </p>
              </div>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] px-3 py-1.5 shadow-md shadow-indigo-600/20 transition-all hover:gap-1.5 active:scale-95"
            >
              <span>Explore Room</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Floating Animated Widget 1: Verified Landlord (Top-Left, Floating Animation) */}
        <div className="absolute -top-4 -left-3 sm:-left-6 z-20 rounded-2xl border border-border/80 bg-background/95 dark:bg-card/95 p-2.5 shadow-xl backdrop-blur-xl animate-float-slow hover:scale-105 transition-transform pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-foreground">
                  NID Verified Owner
                </span>
                <CheckCircle2 className="h-3 w-3 text-emerald-500 fill-emerald-500 text-white" />
              </div>
              <p className="text-[9px] text-muted-foreground">
                100% Scam-Free Guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Floating Animated Widget 2: Roommate Compatibility (Bottom-Right, Reverse Floating Animation) */}
        <div className="absolute -bottom-4 -right-3 sm:-right-6 z-20 rounded-2xl border border-border/80 bg-background/95 dark:bg-card/95 p-2.5 shadow-xl backdrop-blur-xl animate-float-reverse hover:scale-105 transition-transform pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400">
              <Users className="h-4.5 w-4.5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-foreground">
                  {current.matchRate}
                </span>
                <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
              <p className="text-[9px] text-muted-foreground max-w-[140px] truncate">
                {current.matchDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
