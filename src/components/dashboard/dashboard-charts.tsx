"use client";

import * as React from "react";

interface RevenueChartProps {
  totalRevenue: number;
  completedTransactions: number;
}

export function AdminRevenueBarChart({
  totalRevenue,
  completedTransactions,
}: RevenueChartProps) {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  // Derive dynamic 6-month historical values relative to totalRevenue
  const baseRevenue = Math.max(totalRevenue, 45000);
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const ratios = [0.45, 0.6, 0.72, 0.85, 0.92, 1.0];

  const data = months.map((month, idx) => {
    const val = Math.round((baseRevenue * ratios[idx]) / 6);
    return {
      month,
      revenue: val,
      transactions: Math.max(
        1,
        Math.round((completedTransactions * ratios[idx]) / 6),
      ),
    };
  });

  const maxVal = Math.max(...data.map((d) => d.revenue), 1000);
  const chartHeight = 140;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] text-muted-foreground block uppercase font-medium">
            Active 6-Month Trajectory
          </span>
          <span className="font-heading font-extrabold text-lg text-emerald-600 dark:text-emerald-400">
            ৳{totalRevenue.toLocaleString()}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-muted-foreground block uppercase font-medium">
            Total Succeeded
          </span>
          <span className="font-semibold text-foreground">
            {completedTransactions} Payouts
          </span>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div className="relative pt-4 pb-2">
        <svg
          viewBox="0 0 320 160"
          className="w-full overflow-visible"
          role="img"
          aria-label="Monthly Revenue Bar Chart"
        >
          {/* Subtle Grid Lines */}
          <line
            x1="0"
            y1="20"
            x2="320"
            y2="20"
            stroke="currentColor"
            className="text-border/40"
            strokeDasharray="3 3"
          />
          <line
            x1="0"
            y1="70"
            x2="320"
            y2="70"
            stroke="currentColor"
            className="text-border/40"
            strokeDasharray="3 3"
          />
          <line
            x1="0"
            y1="120"
            x2="320"
            y2="120"
            stroke="currentColor"
            className="text-border/80"
          />

          {data.map((item, i) => {
            const barWidth = 32;
            const gap = (320 - barWidth * data.length) / (data.length + 1);
            const x = gap + i * (barWidth + gap);
            const barH = Math.max(12, (item.revenue / maxVal) * chartHeight);
            const y = 120 - barH;
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={item.month}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer group"
              >
                {/* Bar Rectangle */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx="6"
                  className={`transition-all duration-200 ${
                    isHovered
                      ? "fill-indigo-600 dark:fill-indigo-400"
                      : "fill-indigo-500/80 dark:fill-indigo-500/70 group-hover:fill-indigo-600"
                  }`}
                />

                {/* Top cap glow */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height="3"
                  rx="1.5"
                  className="fill-indigo-300 dark:fill-indigo-200"
                />

                {/* X-axis Label */}
                <text
                  x={x + barWidth / 2}
                  y="140"
                  textAnchor="middle"
                  className="text-[10px] fill-muted-foreground font-medium"
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && (
          <div className="absolute top-0 right-2 rounded-xl border border-border bg-card px-2.5 py-1.5 shadow-xl text-xs z-10 pointer-events-none animate-in fade-in">
            <p className="font-heading font-bold text-foreground">
              {data[hoveredIdx].month}: ৳{data[hoveredIdx].revenue.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {data[hoveredIdx].transactions} transactions
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface DonutChartProps {
  tenants: number;
  owners: number;
  admins: number;
}

export function AdminUserRoleDonutChart({
  tenants,
  owners,
  admins,
}: DonutChartProps) {
  const total = tenants + owners + admins || 1;
  const pTenant = Math.round((tenants / total) * 100);
  const pOwner = Math.round((owners / total) * 100);
  const pAdmin = Math.max(1, 100 - pTenant - pOwner);

  // SVG circle calculations (circumference = 2 * PI * 40 = 251.32)
  const circumference = 251.32;
  const strokeTenant = (pTenant / 100) * circumference;
  const strokeOwner = (pOwner / 100) * circumference;
  const strokeAdmin = (pAdmin / 100) * circumference;

  const offsetTenant = 0;
  const offsetOwner = -strokeTenant;
  const offsetAdmin = -(strokeTenant + strokeOwner);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* SVG Donut Circle */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width="130"
          height="130"
          viewBox="0 0 100 100"
          className="-rotate-90 overflow-visible"
        >
          {/* Background circle track */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted/40"
          />

          {/* Tenants (Indigo) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="rgb(99 102 241)"
            strokeWidth="12"
            strokeDasharray={`${strokeTenant} ${circumference - strokeTenant}`}
            strokeDashoffset={offsetTenant}
            strokeLinecap="round"
            className="transition-all duration-500"
          />

          {/* Owners (Purple) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="rgb(168 85 247)"
            strokeWidth="12"
            strokeDasharray={`${strokeOwner} ${circumference - strokeOwner}`}
            strokeDashoffset={offsetOwner}
            strokeLinecap="round"
            className="transition-all duration-500"
          />

          {/* Admins (Rose) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="rgb(244 63 94)"
            strokeWidth="12"
            strokeDasharray={`${strokeAdmin} ${circumference - strokeAdmin}`}
            strokeDashoffset={offsetAdmin}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>

        {/* Center Stat */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="font-heading font-black text-lg text-foreground leading-tight">
            {total}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
            Users
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2.5 w-full text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 shrink-0" />
            <span className="text-muted-foreground">Tenants</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-foreground">{tenants}</span>
            <span className="text-[10px] text-muted-foreground font-medium">
              ({pTenant}%)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-500 shrink-0" />
            <span className="text-muted-foreground">Landlords</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-foreground">{owners}</span>
            <span className="text-[10px] text-muted-foreground font-medium">
              ({pOwner}%)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
            <span className="text-muted-foreground">Moderators</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-foreground">{admins}</span>
            <span className="text-[10px] text-muted-foreground font-medium">
              ({pAdmin}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
