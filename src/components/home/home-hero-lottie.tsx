"use client";

import { Lottie } from "lottie-react";
import {
  Building2,
  CheckCircle2,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import * as React from "react";

// Curated Lottie JSON dataset representing modern urban housing & matching
const urbanHousingLottieData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 120,
  w: 500,
  h: 500,
  nm: "Urban Housing & Roommate Match",
  ddd: 0,
  assets: [],
  layers: [
    // Layer 1: Orbital Search Radar Ring
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Radar Ring",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [30], e: [70] },
            { t: 60, s: [70], e: [30] },
            { t: 120, s: [30] },
          ],
        },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 120, s: [360] },
          ],
        },
        p: { a: 0, k: [250, 250, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [92, 92, 100], e: [108, 108, 100] },
            { t: 60, s: [108, 108, 100], e: [92, 92, 100] },
            { t: 120, s: [92, 92, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [380, 380] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: "st",
              c: { a: 0, k: [0.388, 0.4, 0.945, 0.6] },
              w: 2,
              lc: 2,
              lj: 2,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              s: { a: 0, k: [100, 100] },
            },
          ],
        },
      ],
    },
    // Layer 2: Main Central Building Base
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Modern Residence Tower",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [250, 260, 0], e: [250, 252, 0] },
            { t: 60, s: [250, 252, 0], e: [250, 260, 0] },
            { t: 120, s: [250, 260, 0] },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "rc",
              s: { a: 0, k: [170, 230] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 16 },
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.3, 0.32, 0.85, 0.9] },
              o: { a: 0, k: 90 },
            },
            {
              ty: "st",
              c: { a: 0, k: [0.55, 0.58, 1, 0.8] },
              w: 3,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              s: { a: 0, k: [100, 100] },
            },
          ],
        },
      ],
    },
    // Layer 3: Left Townhouse Building
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Left Townhouse",
      sr: 1,
      ks: {
        o: { a: 0, k: 85 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [140, 290, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [95, 95, 100], e: [100, 100, 100] },
            { t: 60, s: [100, 100, 100], e: [95, 95, 100] },
            { t: 120, s: [95, 95, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "rc",
              s: { a: 0, k: [100, 160] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 12 },
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.5, 0.3, 0.8, 0.8] },
              o: { a: 0, k: 80 },
            },
            {
              ty: "st",
              c: { a: 0, k: [0.75, 0.5, 1, 0.7] },
              w: 2,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              s: { a: 0, k: [100, 100] },
            },
          ],
        },
      ],
    },
    // Layer 4: Right Apartment Wing
    {
      ddd: 0,
      ind: 4,
      ty: 4,
      nm: "Right Apartment Wing",
      sr: 1,
      ks: {
        o: { a: 0, k: 85 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [350, 300, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100, 100], e: [95, 95, 100] },
            { t: 60, s: [95, 95, 100], e: [100, 100, 100] },
            { t: 120, s: [100, 100, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "rc",
              s: { a: 0, k: [110, 140] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 12 },
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.2, 0.6, 0.8, 0.8] },
              o: { a: 0, k: 80 },
            },
            {
              ty: "st",
              c: { a: 0, k: [0.4, 0.85, 1, 0.7] },
              w: 2,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              s: { a: 0, k: [100, 100] },
            },
          ],
        },
      ],
    },
    // Layer 5: Glowing Windows in Tower
    {
      ddd: 0,
      ind: 5,
      ty: 4,
      nm: "Glowing Windows",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [75], e: [100] },
            { t: 60, s: [100], e: [75] },
            { t: 120, s: [75] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [250, 250, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "rc",
              s: { a: 0, k: [26, 26] },
              p: { a: 0, k: [-40, -50] },
              r: { a: 0, k: 4 },
            },
            {
              d: 1,
              ty: "rc",
              s: { a: 0, k: [26, 26] },
              p: { a: 0, k: [40, -50] },
              r: { a: 0, k: 4 },
            },
            {
              d: 1,
              ty: "rc",
              s: { a: 0, k: [26, 26] },
              p: { a: 0, k: [-40, 10] },
              r: { a: 0, k: 4 },
            },
            {
              d: 1,
              ty: "rc",
              s: { a: 0, k: [26, 26] },
              p: { a: 0, k: [40, 10] },
              r: { a: 0, k: 4 },
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 0.88, 0.45, 1] },
              o: { a: 0, k: 100 },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              s: { a: 0, k: [100, 100] },
            },
          ],
        },
      ],
    },
    // Layer 6: Floating Sparkles & Roommate Connection Nodes
    {
      ddd: 0,
      ind: 6,
      ty: 4,
      nm: "Match Pulse Nodes",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [50], e: [100] },
            { t: 60, s: [100], e: [50] },
            { t: 120, s: [50] },
          ],
        },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [180] },
            { t: 120, s: [360] },
          ],
        },
        p: { a: 0, k: [250, 120, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [90, 90, 100], e: [115, 115, 100] },
            { t: 60, s: [115, 115, 100], e: [90, 90, 100] },
            { t: 120, s: [90, 90, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [16, 16] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.95, 0.45, 0.7, 1] },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              s: { a: 0, k: [100, 100] },
            },
          ],
        },
      ],
    },
  ],
};

export function HomeHeroLottie() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none sm:pointer-events-auto">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />

      {/* Main Vector / Lottie Canvas */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] aspect-square flex items-center justify-center">
        {mounted ? (
          <div className="w-full h-full drop-shadow-[0_20px_50px_rgba(99,102,241,0.25)] transition-transform duration-500 hover:scale-105">
            <Lottie
              src={urbanHousingLottieData}
              loop={true}
              autoplay={true}
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-3xl bg-indigo-500/10 animate-pulse">
            <Building2 className="h-20 w-20 text-indigo-400 opacity-60" />
          </div>
        )}

        {/* Floating Interactive Badge 1: Verified Room Card */}
        <div className="absolute -top-3 -left-2 sm:-left-6 z-20 rounded-2xl border border-border/80 bg-background/90 p-3 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-700 hover:scale-105 transition-transform pointer-events-auto">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-foreground">
                  Master Bedroom
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Verified
                </span>
              </div>
              <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3 text-indigo-500" />
                Dhanmondi · ৳14,500/mo
              </p>
            </div>
          </div>
        </div>

        {/* Floating Interactive Badge 2: Compatibility Match */}
        <div className="absolute -bottom-3 -right-2 sm:-right-4 z-20 rounded-2xl border border-border/80 bg-background/90 p-3 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-700 hover:scale-105 transition-transform pointer-events-auto">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-foreground">
                  98% Roommate Match
                </span>
                <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
              </div>
              <p className="text-[11px] font-medium text-muted-foreground">
                2 Compatible Seekers Joined
              </p>
            </div>
          </div>
        </div>

        {/* Floating Rating Badge */}
        <div className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 z-20 hidden sm:flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-3 py-1.5 shadow-lg backdrop-blur-md">
          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-foreground">4.9/5</span>
          <span className="text-[10px] text-muted-foreground">
            (1.2k+ stays)
          </span>
        </div>
      </div>
    </div>
  );
}
