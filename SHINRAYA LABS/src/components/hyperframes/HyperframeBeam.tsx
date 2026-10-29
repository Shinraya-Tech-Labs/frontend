"use client";

import React, { useId } from "react";

interface HyperframeBeamProps {
  className?: string;
  radius?: number;
  duration?: number;
  color?: string;
}

export function HyperframeBeam({
  className = "",
  radius = 16,
  duration = 7,
  color = "#d6b799",
}: HyperframeBeamProps) {
  const id = useId();
  const gradId = `hyper-beam-grad-${id.replace(/:/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full rounded-[inherit] overflow-visible z-20 ${className}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="40%" stopColor={color} stopOpacity="0.8" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="80%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect
        x="0.75"
        y="0.75"
        width="calc(100% - 1.5px)"
        height="calc(100% - 1.5px)"
        rx={radius}
        ry={radius}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="1.5"
        pathLength="100"
        className="animate-hyperframe-beam"
        style={{ animationDuration: `${duration}s` }}
      />
    </svg>
  );
}
