"use client";

import React, { useEffect, useState } from "react";

export function HyperframeSeekbar() {
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress =
            totalHeight > 0
              ? Math.min(Math.max(window.scrollY / totalHeight, 0), 1)
              : 0;
          setProgress(currentProgress);
          setFrame(Math.floor(currentProgress * 240) + 1);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex flex-col items-end"
    >
      {/* Precision Frame Progress Track */}
      <div className="w-full h-[2px] bg-[#1a1918]/60 backdrop-blur-sm overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#d6b799]/40 via-[#d6b799] to-[#ffffff] transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `scaleX(${progress})`,
            transformOrigin: "0 50%",
          }}
        />
      </div>

      {/* Hyperframe Telemetry HUD Badge */}
      <div className="mt-2.5 mr-4 px-2.5 py-1 rounded-full border border-[#302e2a]/80 bg-[#090909]/90 backdrop-blur-md text-[10px] font-mono text-[#aaa69e] flex items-center gap-2 shadow-lg shadow-black/40">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d6b799] animate-pulse" />
        <span className="text-[#f2eee7] font-medium">FRM {String(frame).padStart(4, "0")}</span>
        <span className="text-[#aaa69e]/60">//</span>
        <span className="text-[#d6b799]">{(progress * 100).toFixed(0)}%</span>
        <span className="hidden sm:inline text-[#aaa69e]/50">// 60FPS</span>
      </div>
    </aside>
  );
}
