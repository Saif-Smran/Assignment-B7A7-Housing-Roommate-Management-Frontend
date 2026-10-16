"use client";

import { Lottie } from "lottie-react";
import {
  CheckCircle2,
  KeyRound,
  PlusCircle,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";

// Key Handover & Celebration Lottie Vector
const ctaCelebrationLottie = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 120,
  w: 400,
  h: 400,
  nm: "Key Handover Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Key Ring Orbit",
      sr: 1,
      ks: {
        o: { a: 0, k: 90 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 120, s: [360] },
          ],
        },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [90, 90, 100], e: [105, 105, 100] },
            { t: 60, s: [105, 105, 100], e: [90, 90, 100] },
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
              s: { a: 0, k: [220, 220] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 1, 1, 0.4] },
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
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Golden Key Core",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [-15], e: [15] },
            { t: 60, s: [15], e: [-15] },
            { t: 120, s: [-15] },
          ],
        },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [110, 110, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [60, 60] },
              p: { a: 0, k: [-35, 0] },
            },
            {
              d: 1,
              ty: "rc",
              s: { a: 0, k: [90, 14] },
              p: { a: 0, k: [20, 0] },
              r: { a: 0, k: 4 },
            },
            {
              d: 1,
              ty: "rc",
              s: { a: 0, k: [12, 28] },
              p: { a: 0, k: [45, 10] },
              r: { a: 0, k: 2 },
            },
            {
              d: 1,
              ty: "rc",
              s: { a: 0, k: [12, 20] },
              p: { a: 0, k: [60, 6] },
              r: { a: 0, k: 2 },
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 0.84, 0.25, 1] },
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

export function HomeCta() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 p-8 sm:p-12 md:p-16 text-white shadow-2xl">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 h-80 w-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Ready to find your space or rent out rooms?</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Join 15,000+ Happy Renters & Verified Landlords Today
              </h2>

              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
                Experience transparent room booking, roommate compatibility
                matching, and instant Stripe payments without broker fees.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="rounded-2xl bg-white text-indigo-700 hover:bg-zinc-100 font-bold text-sm shadow-xl gap-2 cursor-pointer"
                >
                  <Link href="/properties">
                    <Search className="h-4 w-4" />
                    Browse Available Rooms
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-white/40 bg-white/10 text-white hover:bg-white/20 font-semibold text-sm backdrop-blur-md cursor-pointer"
                >
                  <Link href="/register?role=OWNER">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    List Your Property
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-white/80">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  100% Verified Listings
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Zero Broker Commission
                </span>
                <span className="flex items-center gap-1.5">
                  <KeyRound className="h-4 w-4 text-amber-300" />
                  Instant Move-In Confirmation
                </span>
              </div>
            </div>

            {/* Right Lottie Animation */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
                {mounted ? (
                  <Lottie
                    src={ctaCelebrationLottie}
                    loop={true}
                    autoplay={true}
                    className="w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.3)]"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
                    <KeyRound className="h-16 w-16 text-white/80 animate-bounce" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
