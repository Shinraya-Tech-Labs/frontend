"use client";

import React, { useState, useRef, useEffect } from "react";
import { discordUrl, discordInviteCode } from "@/lib/site";

type TerminalEntry = {
  command: string;
  output: React.ReactNode;
};

const SUGGESTED_COMMANDS = [
  "help",
  "status",
  "benchmarks",
  "reproduce",
  "discord",
  "clear",
];

export function ShinrayaConsole() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      command: "init",
      output: (
        <div className="space-y-1 text-xs font-mono text-[#aaa69e]">
          <p className="text-[#d6b799]">Shinraya Tech Labs Runtime Kernel [v1.4.2]</p>
          <p>Type <span className="text-[#f2eee7]">&apos;help&apos;</span> or select a command below to inspect experimental artifacts.</p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isOpen, history]);

  const runCommand = (cmdText: string) => {
    const raw = cmdText.trim().toLowerCase();
    if (!raw) return;

    let response: React.ReactNode = null;

    switch (raw) {
      case "help":
        response = (
          <div className="space-y-1 text-xs font-mono text-[#aaa69e]">
            <p><span className="text-[#d6b799]">status</span> — Show cluster queues, GPU availability, and verifier state</p>
            <p><span className="text-[#d6b799]">benchmarks</span> — Print latest GSM8K & HotpotQA accuracy evaluations</p>
            <p><span className="text-[#d6b799]">reproduce</span> — Show command to rerun frozen seed evaluations</p>
            <p><span className="text-[#d6b799]">discord</span> — Get community invitation ({discordInviteCode})</p>
            <p><span className="text-[#d6b799]">clear</span> — Reset terminal buffer</p>
          </div>
        );
        break;

      case "status":
        response = (
          <div className="space-y-1 text-xs font-mono text-[#aaa69e]">
            <p>Cluster Status: <span className="text-[#d6b799]">ONLINE</span> (12 Nodes Active)</p>
            <p>Reasoning RL Pipeline: <span className="text-[#d6b799]">QUALIFIED</span> (GRPO Baseline + Save/Reload validated)</p>
            <p>Quantum Simulator: <span className="text-[#d6b799]">v0.1.0 CPU RELEASED</span></p>
            <p>ATLAS Retrieval: <span className="text-[#ff6b7a]">HYPOTHESIS NOT SUPPORTED</span> (Negative finding published)</p>
            <p>Security Audit: <span className="text-[#d6b799]">0 CVEs VULNERABILITIES</span></p>
          </div>
        );
        break;

      case "benchmarks":
        response = (
          <div className="space-y-1.5 text-xs font-mono text-[#aaa69e]">
            <p className="text-[#f2eee7]">Empirical Evaluation Summary (Oct 2026):</p>
            <div className="grid grid-cols-2 gap-2 p-2 rounded bg-[#090909] border border-[#302e2a]/50">
              <div>GSM8K Pass@1 (Clean Verifier): <span className="text-[#d6b799]">78.4%</span></div>
              <div>GSM8K Pass@1 (30% Corrupted Verifier): <span className="text-[#d6b799]">64.2%</span> (Robust GRPO)</div>
              <div>ATLAS HotpotQA Multi-Hop: <span className="text-[#ff6b7a]">No gain over Cosine Baseline</span></div>
              <div>Quantum VQE Fidelity: <span className="text-[#d6b799]">0.982</span> (4-Qubit exact simulation)</div>
            </div>
          </div>
        );
        break;

      case "reproduce":
        response = (
          <div className="space-y-1.5 text-xs font-mono text-[#aaa69e]">
            <p className="text-[#f2eee7]">Execute verification run locally:</p>
            <div className="p-2.5 rounded bg-[#090909] border border-[#302e2a]/50 text-[#d6b799]">
              git clone https://github.com/Shinraya-Tech-Labs/robust-reasoning-rl.git<br/>
              cd robust-reasoning-rl &amp;&amp; python -m eval --seed 42 --verifier-noise 0.25
            </div>
          </div>
        );
        break;

      case "discord":
        response = (
          <div className="space-y-1 text-xs font-mono text-[#aaa69e]">
            <p>Official Shinraya Discord Community:</p>
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8a9cf5] hover:underline"
            >
              https://discord.gg/{discordInviteCode} ↗
            </a>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        response = (
          <p className="text-xs font-mono text-[#ff6b7a]">
            Command not recognized: &apos;{raw}&apos;. Type &apos;help&apos; for list of commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdText, output: response }]);
    setInputVal("");
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Lab Terminal"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#d6b799]/40 bg-[#111110]/95 backdrop-blur-md text-xs font-mono text-[#d6b799] shadow-2xl hover:bg-[#1a1917] hover:border-[#d6b799] transition-all duration-300"
      >
        <span className="w-2 h-2 rounded-full bg-[#d6b799] animate-pulse" />
        <span>{isOpen ? "Close Console" : ">_ Lab Console"}</span>
      </button>

      {/* Floating Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[480px] h-[440px] z-50 rounded-2xl border border-[#302e2a] bg-[#0c0c0b]/95 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#302e2a]/60 bg-[#141413] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#f2eee7]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dd3044]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#d6b799]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[#aaa69e]">shinraya-kernel://session</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#aaa69e] hover:text-white text-xs font-mono px-2 py-0.5 rounded"
            >
              ESC
            </button>
          </div>

          {/* Terminal History Output */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#d6b799]">
                  <span>❯</span>
                  <span>{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Clickable Command Chips */}
          <div className="px-4 py-2 border-t border-[#302e2a]/40 bg-[#090909] flex flex-wrap gap-1.5">
            {SUGGESTED_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => runCommand(cmd)}
                className="px-2.5 py-1 rounded bg-[#141413] hover:bg-[#201f1d] border border-[#302e2a]/70 text-[11px] font-mono text-[#d6b799] transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runCommand(inputVal);
            }}
            className="p-3 border-t border-[#302e2a]/60 bg-[#111110] flex items-center gap-2"
          >
            <span className="text-xs font-mono text-[#d6b799]">❯</span>
            <input
              ref={inputRef}
              type="text"
              aria-label="Interactive terminal command input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command (e.g. status, reproduce, discord)..."
              className="flex-1 bg-transparent text-xs font-mono text-[#f2eee7] placeholder-[#aaa69e]/50 focus:outline-none"
            />
          </form>

        </div>
      )}
    </>
  );
}
