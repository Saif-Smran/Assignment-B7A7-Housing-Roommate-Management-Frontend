"use client";

import { Clock, MapPin, ShieldCheck, Sparkles, Users, Zap } from "lucide-react";

export function HomeHeroIsometric() {
  return (
    <div className="relative w-full max-w-[500px] lg:max-w-none aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center select-none py-2">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-tr from-indigo-500/30 to-purple-500/25 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 h-64 w-64 rounded-full bg-gradient-to-bl from-pink-500/25 to-cyan-500/25 blur-3xl animate-pulse pointer-events-none" />

      {/* Main Isometric & Radar Canvas Container */}
      <div className="relative w-full h-full max-w-[420px] sm:max-w-[460px] flex items-center justify-center">
        {/* SVG Isometric Apartment with Animated Radar */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-[0_20px_45px_rgba(79,70,229,0.22)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="hero-iso-title"
        >
          <title id="hero-iso-title">
            UrbanMatch 3D Isometric Apartment and Roommate Match Radar
          </title>
          <defs>
            {/* Gradients for Isometric Faces */}
            <linearGradient id="isoTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="isoLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#3730a3" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="isoRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4338ca" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#312e81" stopOpacity="0.98" />
            </linearGradient>

            {/* Tower 2 Gradients (Violet/Pink) */}
            <linearGradient
              id="isoTopGrad2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="isoLeftGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient
              id="isoRightGrad2"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#7e22ce" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#581c87" stopOpacity="0.95" />
            </linearGradient>

            {/* Balcony / Accent Glass */}
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
            </linearGradient>

            {/* Radar Beam Gradient */}
            <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#818cf8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Radar Scanning Circles (Concentric Orbit Rings) */}
          <ellipse
            cx="250"
            cy="270"
            rx="210"
            ry="110"
            stroke="#6366f1"
            strokeOpacity="0.2"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <ellipse
            cx="250"
            cy="270"
            rx="160"
            ry="85"
            stroke="#a855f7"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          <ellipse
            cx="250"
            cy="270"
            rx="110"
            ry="60"
            fill="url(#radarPulse)"
            stroke="#38bdf8"
            strokeOpacity="0.4"
            strokeWidth="2"
          />

          {/* Animated Radar Sweep Needle */}
          <g className="origin-[250px_270px] animate-[spin_8s_linear_infinite]">
            <line
              x1="250"
              y1="270"
              x2="450"
              y2="270"
              stroke="url(#isoTopGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
            <circle cx="450" cy="270" r="4" fill="#6366f1">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* 2. Isometric Base Platform */}
          <polygon
            points="250,380 370,320 250,260 130,320"
            fill="#1e1b4b"
            fillOpacity="0.4"
            stroke="#4338ca"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />

          {/* 3. Main Central Tower (3D Isometric Box) */}
          {/* Left Face */}
          <polygon
            points="250,340 180,305 180,185 250,220"
            fill="url(#isoLeftGrad)"
            stroke="#6366f1"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          {/* Right Face */}
          <polygon
            points="250,340 320,305 320,185 250,220"
            fill="url(#isoRightGrad)"
            stroke="#818cf8"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          {/* Top Roof Face */}
          <polygon
            points="250,220 320,185 250,150 180,185"
            fill="url(#isoTopGrad)"
            stroke="#a5b4fc"
            strokeWidth="1.5"
          />

          {/* 4. Left Residential Wing (Step-down building) */}
          <polygon
            points="180,315 130,290 130,210 180,235"
            fill="url(#isoLeftGrad2)"
            stroke="#c084fc"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <polygon
            points="180,235 130,210 180,185 230,210"
            fill="url(#isoTopGrad2)"
            stroke="#d8b4fe"
            strokeWidth="1"
          />

          {/* 5. Right Balcony & Living Terrace */}
          <polygon
            points="320,310 365,287 365,230 320,253"
            fill="url(#isoRightGrad)"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <polygon
            points="320,253 365,230 320,207 275,230"
            fill="url(#glassGrad)"
            stroke="#7dd3fc"
            strokeWidth="1"
          />

          {/* 6. Illuminated Windows on Tower Faces */}
          {/* Left Face Windows */}
          <g fill="#fbbf24" fillOpacity="0.95">
            <polygon points="200,220 220,230 220,245 200,235" />
            <polygon points="225,232 242,240 242,255 225,247" />
            <polygon points="200,248 220,258 220,273 200,263" />
            <polygon points="225,260 242,268 242,283 225,275" />
            <polygon points="200,276 220,286 220,301 200,291" />
          </g>

          {/* Right Face Windows (Cyan Glow) */}
          <g fill="#38bdf8" fillOpacity="0.9">
            <polygon points="258,240 275,232 275,247 258,255" />
            <polygon points="280,230 300,220 300,235 280,245" />
            <polygon points="258,268 275,260 275,275 258,283" />
            <polygon points="280,258 300,248 300,263 280,273" />
          </g>

          {/* 7. Rooftop Garden & Glass Sky-Lounge */}
          <polygon
            points="250,150 280,135 250,120 220,135"
            fill="url(#glassGrad)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          {/* Glowing Rooftop Antenna / Beacon */}
          <line
            x1="250"
            y1="120"
            x2="250"
            y2="85"
            stroke="#ec4899"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="250" cy="85" r="5" fill="#f43f5e">
            <animate
              attributeName="r"
              values="4;7;4"
              dur="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* 8. Pulsing Signal Connection Line Between Roommate Nodes */}
          <path
            d="M 120 280 Q 250 210 380 270"
            stroke="#a855f7"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
            fill="none"
            className="animate-pulse"
          />
        </svg>

        {/* ======================================================== */}
        {/* FLOATING LIVE ACTIVITY BADGES WITH LEVITATION ANIMATION   */}
        {/* ======================================================== */}

        {/* Badge 1: Verified Master Bedroom (Top-Left) */}
        <div className="absolute -top-2 -left-2 sm:-left-6 z-20 rounded-2xl border border-border/80 bg-card/95 p-3 shadow-xl backdrop-blur-xl animate-float-slow hover:scale-105 transition-transform pointer-events-auto max-w-[210px]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-foreground truncate">
                  Master Bedroom
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 animate-ping" />
              </div>
              <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-0.5 truncate">
                <MapPin className="h-3 w-3 text-indigo-500 shrink-0" />
                Dhanmondi · ৳14,500
              </p>
            </div>
          </div>
        </div>

        {/* Badge 2: Roommate Compatibility Radar (Bottom-Right) */}
        <div className="absolute -bottom-3 -right-2 sm:-right-6 z-20 rounded-2xl border border-border/80 bg-card/95 p-3 shadow-xl backdrop-blur-xl animate-float-reverse hover:scale-105 transition-transform pointer-events-auto max-w-[220px]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-foreground">
                  98% Match Radar
                </span>
                <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500 shrink-0" />
              </div>
              <p className="text-[10px] text-muted-foreground truncate">
                Quiet Hours · Non-Smoker
              </p>
            </div>
          </div>
        </div>

        {/* Badge 3: Instant Booking / Stripe Security (Top-Right) */}
        <div className="absolute top-1/4 -right-2 sm:-right-4 z-20 hidden sm:flex items-center gap-2 rounded-2xl border border-border/80 bg-card/95 px-3 py-2 shadow-lg backdrop-blur-xl animate-float-slow hover:scale-105 transition-transform">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
            <Zap className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-bold text-foreground leading-tight">
              Instant Reserve
            </p>
            <p className="text-[9px] text-muted-foreground">Zero Brokerage</p>
          </div>
        </div>

        {/* Badge 4: Live Activity Ticker (Bottom-Left) */}
        <div className="absolute bottom-6 -left-3 sm:-left-4 z-20 hidden sm:flex items-center gap-2 rounded-full border border-border/80 bg-card/95 px-3 py-1 shadow-md backdrop-blur-md text-[10px] text-muted-foreground">
          <Clock className="h-3 w-3 text-emerald-500" />
          <span>Viewing scheduled 2m ago</span>
        </div>
      </div>
    </div>
  );
}
