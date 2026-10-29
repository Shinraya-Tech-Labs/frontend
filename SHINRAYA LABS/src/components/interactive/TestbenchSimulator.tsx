"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HyperframeBeam } from "@/components/hyperframes/HyperframeBeam";
import { HyperframeCorners } from "@/components/hyperframes/HyperframeCorners";

type SimMode = "reasoning" | "quantum" | "neuro";

export function TestbenchSimulator() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<SimMode>("reasoning");

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sim-header > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sim-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".sim-card",
        { opacity: 0, y: 45, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sim-card",
            start: "top 82%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Reasoning Simulator States
  const [noiseRate, setNoiseRate] = useState<number>(25); // 0 - 50%
  const [rewardBias, setRewardBias] = useState<number>(0.3); // 0.0 - 1.0
  const [algorithm, setAlgorithm] = useState<"standard" | "robust">("robust");
  const [stepCount, setStepCount] = useState<number>(120);

  // Quantum Simulator States
  const [qubits, setQubits] = useState<number>(4);
  const [noiseFactor, setNoiseFactor] = useState<number>(0.04);
  const [mitigation, setMitigation] = useState<boolean>(true);

  // NeuroSim States
  const [currentPulse, setCurrentPulse] = useState<boolean>(false);
  const [spikeCount, setSpikeCount] = useState<number>(3);

  // Reactive calculations for Reasoning Sim
  const reasoningMetrics = useMemo(() => {
    const isRobust = algorithm === "robust";
    const noiseEffect = noiseRate / 100;
    
    // In standard GRPO, higher noise leads to severe reward hacking
    const hackIndex = isRobust
      ? Math.max(0.04, Math.min(0.25, noiseEffect * 0.4 + rewardBias * 0.1))
      : Math.max(0.15, Math.min(0.88, noiseEffect * 1.5 + rewardBias * 0.35));

    // True accuracy degrades rapidly without uncertainty shaping
    const accuracy = isRobust
      ? Math.max(52, 78 - noiseEffect * 20 - rewardBias * 5)
      : Math.max(22, 76 - noiseEffect * 85 - rewardBias * 18);

    const entropy = isRobust
      ? (0.85 - noiseEffect * 0.2).toFixed(2)
      : (0.35 - noiseEffect * 0.5).toFixed(2);

    return {
      hackIndex: (hackIndex * 100).toFixed(1),
      accuracy: accuracy.toFixed(1),
      entropy,
    };
  }, [algorithm, noiseRate, rewardBias]);

  // Reactive calculations for Quantum Sim
  const quantumMetrics = useMemo(() => {
    const classicalTimeMs = (Math.pow(2, qubits) * 0.12).toFixed(1);
    const quantumFidelity = mitigation
      ? Math.max(0.65, 0.99 - noiseFactor * 2.2).toFixed(3)
      : Math.max(0.40, 0.95 - noiseFactor * 5.8).toFixed(3);
    const vqeConvergence = mitigation ? "Converged (Tolerance 1e-4)" : "Sub-optimal Minimum";

    return {
      classicalTimeMs,
      quantumFidelity,
      vqeConvergence,
    };
  }, [qubits, noiseFactor, mitigation]);

  const handleTriggerSpike = () => {
    setCurrentPulse(true);
    setSpikeCount((prev) => prev + 1);
    setTimeout(() => setCurrentPulse(false), 900);
  };

  return (
    <section ref={sectionRef} className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-[#302e2a]/60">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#d6b799]/5 blur-[160px] pointer-events-none rounded-full animate-ambient-drift" />
      <div className="sim-header mb-14 max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#302e2a] bg-[#111110] text-xs font-mono text-[#d6b799] tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d6b799] animate-pulse" />
          Tactile Scientific Instrument
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#f2eee7] leading-[1.12]">
          Interactive Empirical <span className="font-serif italic text-[#d6b799]">Testbench.</span>
        </h2>
        <p className="text-base text-[#aaa69e] font-light leading-relaxed">
          Manipulate independent variables in real time. Watch how reward hacking emerges under corrupted verifiers, where quantum simulators meet classical tensor networks, and how neurons fire under current injection.
        </p>

        {/* Tab Switcher */}
        <div className="pt-4 flex flex-wrap gap-2.5">
          <button
            onClick={() => setMode("reasoning")}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
              mode === "reasoning"
                ? "bg-[#d6b799] text-[#090909] font-medium shadow-md shadow-[#d6b799]/15"
                : "bg-[#141413] text-[#aaa69e] border border-[#302e2a] hover:text-[#f2eee7]"
            }`}
          >
            Robust Reasoning RL (Noise Drift)
          </button>
          <button
            onClick={() => setMode("quantum")}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
              mode === "quantum"
                ? "bg-[#d6b799] text-[#090909] font-medium shadow-md shadow-[#d6b799]/15"
                : "bg-[#141413] text-[#aaa69e] border border-[#302e2a] hover:text-[#f2eee7]"
            }`}
          >
            Quantum Simulator (VQE Boundary)
          </button>
          <button
            onClick={() => setMode("neuro")}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
              mode === "neuro"
                ? "bg-[#d6b799] text-[#090909] font-medium shadow-md shadow-[#d6b799]/15"
                : "bg-[#141413] text-[#aaa69e] border border-[#302e2a] hover:text-[#f2eee7]"
            }`}
          >
            NeuroSim (Hodgkin–Huxley Dynamics)
          </button>
        </div>
      </div>

      {/* Main Interactive Instrument Card */}
      <div className="sim-card relative overflow-hidden rounded-3xl border border-[#302e2a] bg-[#111110] p-6 sm:p-10 shadow-2xl">
        <HyperframeBeam radius={24} duration={10} />
        
        {/* MODE 1: REASONING RL SIMULATOR */}
        {mode === "reasoning" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#d6b799]">
                  Algorithm Architecture
                </span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setAlgorithm("robust")}
                    className={`py-2 px-3 rounded-xl text-xs font-mono border text-left transition-all ${
                      algorithm === "robust"
                        ? "border-[#d6b799] bg-[#d6b799]/10 text-[#d6b799]"
                        : "border-[#302e2a] text-[#aaa69e] hover:border-[#302e2a]/90"
                    }`}
                  >
                    Robust GRPO (Ours)
                  </button>
                  <button
                    onClick={() => setAlgorithm("standard")}
                    className={`py-2 px-3 rounded-xl text-xs font-mono border text-left transition-all ${
                      algorithm === "standard"
                        ? "border-[#ff6b7a] bg-[#ff6b7a]/10 text-[#ff6b7a]"
                        : "border-[#302e2a] text-[#aaa69e] hover:border-[#302e2a]/90"
                    }`}
                  >
                    Standard Baseline
                  </button>
                </div>
              </div>

              {/* Slider 1: Verifier Noise */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#f2eee7]">Verifier Corruption Rate:</span>
                  <span className="text-[#d6b799]">{noiseRate}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={noiseRate}
                  aria-label="Verifier corruption rate percentage"
                  onChange={(e) => setNoiseRate(Number(e.target.value))}
                  className="w-full accent-[#d6b799] bg-[#1a1918] rounded-lg h-2 cursor-pointer"
                />
                <p className="text-[11px] text-[#aaa69e]">
                  Percentage of training batch verifier labels replaced with adversarial noise.
                </p>
              </div>

              {/* Slider 2: Reward Bias */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#f2eee7]">Reward Model Drift Bias:</span>
                  <span className="text-[#d6b799]">{rewardBias.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rewardBias * 100}
                  aria-label="Reward model drift bias"
                  onChange={(e) => setRewardBias(Number(e.target.value) / 100)}
                  className="w-full accent-[#d6b799] bg-[#1a1918] rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setStepCount((prev) => prev + 25)}
                  className="px-4 py-2 rounded-xl bg-[#1f1e1c] hover:bg-[#282724] border border-[#302e2a] text-xs font-mono text-[#f2eee7] transition-colors"
                >
                  Step Batch (+25 Iterations)
                </button>
                <span className="text-xs font-mono text-[#aaa69e]">Step: {stepCount}</span>
              </div>
            </div>

            {/* Right Telemetry Readout & Curves */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#090909] border border-[#302e2a] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#302e2a]/50">
                <span className="text-xs font-mono text-[#aaa69e] uppercase tracking-wider">
                  Real-Time Evaluation Telemetry
                </span>
                <span className="flex items-center gap-2 text-xs font-mono text-[#d6b799]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d6b799] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d6b799]" />
                  </span>
                  Active Simulation Stream
                </span>
              </div>

              {/* Key Metric Gauges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#141413] border border-[#302e2a]">
                  <span className="text-[11px] font-mono text-[#aaa69e] block mb-1">True GSM8K Pass@1</span>
                  <span className={`text-2xl sm:text-3xl font-mono font-medium ${
                    Number(reasoningMetrics.accuracy) > 60 ? "text-[#d6b799]" : "text-[#ff6b7a]"
                  }`}>
                    {reasoningMetrics.accuracy}%
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#141413] border border-[#302e2a]">
                  <span className="text-[11px] font-mono text-[#aaa69e] block mb-1">Reward Hack Index</span>
                  <span className={`text-2xl sm:text-3xl font-mono font-medium ${
                    Number(reasoningMetrics.hackIndex) < 25 ? "text-[#f2eee7]" : "text-[#ff6b7a]"
                  }`}>
                    {reasoningMetrics.hackIndex}%
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#141413] border border-[#302e2a]">
                  <span className="text-[11px] font-mono text-[#aaa69e] block mb-1">Policy Entropy</span>
                  <span className="text-2xl sm:text-3xl font-mono font-medium text-[#f2eee7]">
                    {reasoningMetrics.entropy}
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Visualizer */}
              <div className="h-44 w-full relative border border-[#302e2a]/60 rounded-xl p-3 bg-[#0c0c0b] flex flex-col justify-between overflow-hidden">
                <HyperframeCorners size="text-[10px]" />
                <div className="flex justify-between text-[11px] font-mono text-[#aaa69e]">
                  <span>Policy Trajectory (GSM8K vs Reward Exploit)</span>
                  <span>Steps 0 - {stepCount}</span>
                </div>

                {/* SVG Curve */}
                <svg className="w-full h-28 overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="25" x2="400" y2="25" stroke="#302e2a" strokeDasharray="3,3" strokeWidth="1" />
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#302e2a" strokeDasharray="3,3" strokeWidth="1" />
                  <line x1="0" y1="75" x2="400" y2="75" stroke="#302e2a" strokeDasharray="3,3" strokeWidth="1" />

                  {/* Accuracy Line */}
                  <path
                    d={
                      algorithm === "robust"
                        ? `M 0,80 C 120,${60 - noiseRate * 0.4} 240,${45 - noiseRate * 0.3} 400,${
                            100 - Number(reasoningMetrics.accuracy)
                          }`
                        : `M 0,80 C 100,50 200,65 400,${100 - Number(reasoningMetrics.accuracy)}`
                    }
                    fill="none"
                    stroke="#d6b799"
                    strokeWidth="3"
                    className="transition-all duration-500"
                  />

                  {/* Hack Index Line */}
                  <path
                    d={
                      algorithm === "robust"
                        ? `M 0,95 C 150,90 280,85 400,${100 - Number(reasoningMetrics.hackIndex)}`
                        : `M 0,95 C 120,70 250,40 400,${100 - Number(reasoningMetrics.hackIndex)}`
                    }
                    fill="none"
                    stroke="#ff6b7a"
                    strokeWidth="2"
                    strokeDasharray={algorithm === "robust" ? "4,4" : "0"}
                    className="transition-all duration-500"
                  />
                </svg>

                <div className="flex items-center gap-6 text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-[#d6b799]">
                    <span className="w-2.5 h-0.5 bg-[#d6b799]" />
                    True Validation Pass@1
                  </span>
                  <span className="flex items-center gap-1.5 text-[#ff6b7a]">
                    <span className="w-2.5 h-0.5 bg-[#ff6b7a]" />
                    Corrupted Reward Overfitting
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* MODE 2: QUANTUM SIMULATOR */}
        {mode === "quantum" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#f2eee7]">Qubits in Circuit:</span>
                  <span className="text-[#d6b799]">{qubits} Qubits ({Math.pow(2, qubits)} States)</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={qubits}
                  aria-label="Quantum circuit qubit count"
                  onChange={(e) => setQubits(Number(e.target.value))}
                  className="w-full accent-[#d6b799] bg-[#1a1918] rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#f2eee7]">Finite-Shot Thermal Noise:</span>
                  <span className="text-[#d6b799]">{(noiseFactor * 100).toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={noiseFactor * 100}
                  aria-label="Finite-shot thermal noise percentage"
                  onChange={(e) => setNoiseFactor(Number(e.target.value) / 100)}
                  className="w-full accent-[#d6b799] bg-[#1a1918] rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer text-xs font-mono text-[#f2eee7]">
                  <input
                    type="checkbox"
                    checked={mitigation}
                    aria-label="Enable Zero-Noise Extrapolation Mitigation"
                    onChange={(e) => setMitigation(e.target.checked)}
                    className="accent-[#d6b799] w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Enable Zero-Noise Extrapolation Mitigation</span>
                </label>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#090909] border border-[#302e2a] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#302e2a]/50">
                <span className="text-xs font-mono text-[#aaa69e] uppercase">
                  Quantum vs Classical Benchmarks
                </span>
                <span className="text-xs font-mono text-[#d6b799]">v0.1.0 CPU Engine</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#141413] border border-[#302e2a]">
                  <span className="text-[11px] font-mono text-[#aaa69e] block mb-1">State Vector Fidelity</span>
                  <span className="text-2xl font-mono text-[#d6b799]">{quantumMetrics.quantumFidelity}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#141413] border border-[#302e2a]">
                  <span className="text-[11px] font-mono text-[#aaa69e] block mb-1">Classical Contraction Time</span>
                  <span className="text-2xl font-mono text-[#f2eee7]">{quantumMetrics.classicalTimeMs} ms</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0c0b] border border-[#302e2a] font-mono text-xs text-[#aaa69e] space-y-2">
                <div className="flex justify-between">
                  <span>Optimization Status:</span>
                  <span className="text-[#d6b799]">{quantumMetrics.vqeConvergence}</span>
                </div>
                <div className="flex justify-between">
                  <span>Advantage Check:</span>
                  <span className="text-[#ff6b7a]">No Quantum Advantage on Small Systems</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: NEUROSIM DYNAMICS */}
        {mode === "neuro" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#d6b799]">
                  Electrophysiology Stimulation
                </span>
                <p className="text-xs text-[#aaa69e] leading-relaxed font-light">
                  Trigger an intracellular depolarizing current pulse to activate voltage-gated Na+ and K+ channels in real time.
                </p>
                <button
                  onClick={handleTriggerSpike}
                  style={{ color: currentPulse ? "#ffffff" : "#000000" }}
                  className={`w-full py-3.5 px-4 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                    currentPulse
                      ? "bg-[#c92437] text-white scale-95 shadow-lg shadow-[#c92437]/30"
                      : "bg-[#d6b799] text-black hover:bg-white shadow-md shadow-[#d6b799]/15"
                  }`}
                >
                  {currentPulse ? "Pulse Injected (+20 nA)" : "Inject Depolarizing Current Pulse"}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#090909] border border-[#302e2a] text-xs font-mono space-y-2 text-[#aaa69e]">
                <div className="flex justify-between">
                  <span>Total Action Potentials:</span>
                  <span className="text-[#f2eee7] font-medium">{spikeCount} Spikes</span>
                </div>
                <div className="flex justify-between">
                  <span>Resting Potential:</span>
                  <span className="text-[#aaa69e]">-65 mV</span>
                </div>
                <div className="flex justify-between">
                  <span>Peak Depolarization:</span>
                  <span className="text-[#d6b799]">+38 mV</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#090909] border border-[#302e2a] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#302e2a]/50 text-xs font-mono">
                <span className="text-[#aaa69e]">Membrane Voltage Oscilloscope (mV)</span>
                <span className={currentPulse ? "text-[#ff6b7a] animate-ping" : "text-[#d6b799]"}>
                  {currentPulse ? "ACTION POTENTIAL ACTIVE" : "STEADY-STATE"}
                </span>
              </div>

              {/* Dynamic Oscilloscope Waveform */}
              <div className="h-44 w-full bg-[#070706] rounded-xl border border-[#302e2a] relative overflow-hidden flex items-center justify-center">
                <HyperframeCorners size="text-[10px]" />
                <svg className="w-full h-full px-4" viewBox="0 0 500 120" preserveAspectRatio="none">
                  {/* Grid overlay */}
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#222" strokeWidth="1" />
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#181818" strokeDasharray="2,2" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="#181818" strokeDasharray="2,2" />

                  {/* Waveform */}
                  <path
                    d={
                      currentPulse
                        ? "M 0,85 Q 60,85 120,85 L 140,82 L 155,15 L 175,108 L 195,89 Q 280,85 500,85"
                        : "M 0,85 Q 125,84 250,85 Q 375,86 500,85"
                    }
                    fill="none"
                    stroke={currentPulse ? "#ff6b7a" : "#d6b799"}
                    strokeWidth="3"
                    className="transition-all duration-300"
                  />

                  {/* Continuous Laboratory Laser Oscilloscope Sweep Beam */}
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="120"
                    stroke="#d6b799"
                    strokeWidth="1.5"
                    opacity="0.75"
                    className="animate-oscilloscope-sweep pointer-events-none"
                  />
                </svg>

                <div className="absolute top-3 left-3 text-[10px] font-mono text-[#aaa69e]">
                  +40 mV
                </div>
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#aaa69e]">
                  -80 mV
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
