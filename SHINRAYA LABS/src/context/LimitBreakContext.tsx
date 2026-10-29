"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface LimitBreakContextType {
  isLimitBreak: boolean;
  toggleLimitBreak: () => void;
  setLimitBreak: (active: boolean) => void;
}

const LimitBreakContext = createContext<LimitBreakContextType>({
  isLimitBreak: false,
  toggleLimitBreak: () => {},
  setLimitBreak: () => {},
});

export function LimitBreakProvider({ children }: { children: React.ReactNode }) {
  const [isLimitBreak, setIsLimitBreakState] = useState<boolean>(false);

  // Play a brief, non-intrusive Web Audio synthesizer chirp on activation
  const playSynthesizerTone = useCallback((active: boolean) => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const now = ctx.currentTime;

      if (active) {
        // Sci-fi power surge chirp (440Hz -> 880Hz)
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      } else {
        // Power down hum (660Hz -> 330Hz)
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 0.1);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);

      setTimeout(() => {
        try {
          ctx.close();
        } catch {
          // Ignore close errors
        }
      }, 300);
    } catch {
      // AudioContext may be restricted by autoplay policies; fail silently
    }
  }, []);

  const setLimitBreak = useCallback((active: boolean) => {
    setIsLimitBreakState(active);
    playSynthesizerTone(active);
    if (typeof document !== "undefined") {
      if (active) {
        document.documentElement.classList.add("limit-break-active");
      } else {
        document.documentElement.classList.remove("limit-break-active");
      }
    }
  }, [playSynthesizerTone]);

  const toggleLimitBreak = useCallback(() => {
    setLimitBreak(!isLimitBreak);
  }, [isLimitBreak, setLimitBreak]);

  useEffect(() => {
    // Check initial session or shortcut keys (e.g., Ctrl+B / Cmd+B for Limit Break)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleLimitBreak();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleLimitBreak]);

  return (
    <LimitBreakContext.Provider value={{ isLimitBreak, toggleLimitBreak, setLimitBreak }}>
      {children}
    </LimitBreakContext.Provider>
  );
}

export function useLimitBreak() {
  return useContext(LimitBreakContext);
}
