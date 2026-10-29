"use client";

import React, { useSyncExternalStore } from "react";
import { useLimitBreak } from "@/context/LimitBreakContext";

const emptySubscribe = () => () => {};

export function LimitBreakHUD() {
  const { isLimitBreak, toggleLimitBreak } = useLimitBreak();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) return null;

  return (
    <>
      {/* Fullscreen Warp Speedlines Overlay when Limit Break is engaged */}
      {isLimitBreak && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
        >
          {/* Warp Streaks / Speedlines */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(214,183,153,0.08)_100%)]" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d6b799] to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dd3044] to-transparent animate-pulse" />

          {/* Dynamic Floating HUD Telemetry Strip at Top */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#111110]/95 border border-[#d6b799]/60 text-[11px] font-mono text-[#f2eee7] shadow-[0_0_30px_rgba(214,183,153,0.35)] backdrop-blur-xl animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#ffffff] animate-ping" />
            <span className="text-[#d6b799] font-bold">HYPERFRAME LIMIT BREAK: ENGAGED</span>
            <span className="text-[#aaa69e]">|</span>
            <span className="text-white">60FPS OVERDRIVE</span>
            <span className="text-[#aaa69e]">|</span>
            <span className="text-[#dd3044]">QUANTUM COHERENCE MAX</span>
          </div>

          {/* Speedline Rays */}
          <div className="absolute inset-0 opacity-20 pointer-events-none [background:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(214,183,153,0.15)_3px,transparent_4px)]" />
        </div>
      )}

      {/* Persistent Cybernetic HUD Floating Toggle in Bottom Corner */}
      <aside
        aria-label="Hyperframe Limit Break System"
        className="fixed bottom-6 left-6 z-50 pointer-events-auto"
      >
        <div
          className={`flex items-center gap-3 p-1.5 rounded-full border transition-all duration-500 shadow-2xl backdrop-blur-xl ${
            isLimitBreak
              ? "bg-[#111110]/95 border-[#ffffff] shadow-[0_0_25px_rgba(255,255,255,0.3)]"
              : "bg-[#111110]/85 border-[#302e2a] hover:border-[#d6b799]/60"
          }`}
        >
          <button
            type="button"
            onClick={toggleLimitBreak}
            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
              isLimitBreak
                ? "bg-[#ffffff] text-[#090909] font-semibold"
                : "bg-[#1a1918] text-[#d6b799] hover:text-white hover:bg-[#252422]"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-transform ${
                isLimitBreak
                  ? "bg-[#dd3044] scale-125 animate-ping"
                  : "bg-[#d6b799] animate-pulse"
              }`}
            />
            <span className="tracking-wide">
              {isLimitBreak ? "LIMIT BREAK: ACTIVE" : "LIMIT BREAK"}
            </span>
          </button>

          <div className="pr-3 text-[10px] font-mono text-[#aaa69e] hidden sm:flex items-center gap-2">
            <span>{isLimitBreak ? "OVERDRIVE 60FPS" : "HYPERFRAME ENGINE"}</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#090909] border border-[#302e2a] text-[#888]">
              Ctrl+B
            </kbd>
          </div>
        </div>
      </aside>
    </>
  );
}
