"use client";

import React from "react";

interface HyperframeCornersProps {
  className?: string;
  size?: string;
}

export function HyperframeCorners({
  className = "",
  size = "text-[11px]",
}: HyperframeCornersProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-20 select-none text-[#d6b799]/40 font-mono ${size} ${className}`}
    >
      <span className="absolute top-2 left-2.5 leading-none">┌</span>
      <span className="absolute top-2 right-2.5 leading-none">┐</span>
      <span className="absolute bottom-2 left-2.5 leading-none">└</span>
      <span className="absolute bottom-2 right-2.5 leading-none">┘</span>
    </div>
  );
}
