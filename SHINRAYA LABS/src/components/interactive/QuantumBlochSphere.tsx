"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useLimitBreak } from "@/context/LimitBreakContext";

interface QuantumStatePreset {
  label: string;
  theta: number;
  phi: number;
  description: string;
}

const PRESETS: QuantumStatePreset[] = [
  { label: "|0⟩", theta: 0.05, phi: 0, description: "Ground State" },
  { label: "|1⟩", theta: Math.PI - 0.05, phi: 0, description: "Excited State" },
  { label: "|+⟩", theta: Math.PI / 2, phi: 0, description: "Hadamard Equator" },
  { label: "|i⟩", theta: Math.PI / 2, phi: Math.PI / 2, description: "Phase Shift" },
];

export function QuantumBlochSphere({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLimitBreak, toggleLimitBreak } = useLimitBreak();

  // Quantum Angles (spherical coordinates)
  const [theta, setTheta] = useState<number>(Math.PI / 3);
  const [phi, setPhi] = useState<number>(Math.PI / 4);
  const [isPrecessing, setIsPrecessing] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(60);
  const [webglError, setWebglError] = useState<boolean>(false);

  // References to synchronize state with Three.js animation frame loop
  const targetThetaRef = useRef<number>(Math.PI / 3);
  const targetPhiRef = useRef<number>(Math.PI / 4);
  const currentThetaRef = useRef<number>(Math.PI / 3);
  const currentPhiRef = useRef<number>(Math.PI / 4);
  const isPrecessingRef = useRef<boolean>(true);
  const isLimitBreakRef = useRef<boolean>(isLimitBreak);

  useEffect(() => {
    isLimitBreakRef.current = isLimitBreak;
  }, [isLimitBreak]);

  useEffect(() => {
    isPrecessingRef.current = isPrecessing;
  }, [isPrecessing]);

  const setQuantumState = useCallback((newTheta: number, newPhi: number) => {
    targetThetaRef.current = newTheta;
    targetPhiRef.current = newPhi;
    setTheta(newTheta);
    setPhi(newPhi);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Renderer setup with safe WebGL try/catch fallback
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      queueMicrotask(() => setWebglError(true));
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // Master Quantum Sphere Group
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // 1. Outer Coordinate Shell (Icosahedron Wireframe)
    const shellGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const shellMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xd6b799,
      transparent: true,
      opacity: 0.22,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    sphereGroup.add(shellMesh);

    // 2. High-precision Equatorial & Meridian Rings
    const ringMatChampagne = new THREE.MeshBasicMaterial({
      color: 0xd6b799,
      transparent: true,
      opacity: 0.5,
    });
    const ringMatVermilion = new THREE.MeshBasicMaterial({
      color: 0xdd3044,
      transparent: true,
      opacity: 0.35,
    });

    // XY Ring (Equator, z = 0)
    const ringXY = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.007, 16, 64), ringMatChampagne);
    sphereGroup.add(ringXY);

    // XZ Ring (y = 0)
    const ringXZ = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.007, 16, 64), ringMatVermilion);
    ringXZ.rotation.x = Math.PI / 2;
    sphereGroup.add(ringXZ);

    // YZ Ring (x = 0)
    const ringYZ = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.007, 16, 64), ringMatChampagne);
    ringYZ.rotation.y = Math.PI / 2;
    sphereGroup.add(ringYZ);

    // 3. Central Dynamic Crystalline Core (Double Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(0.52, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xd6b799,
      transparent: true,
      opacity: 0.65,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sphereGroup.add(coreMesh);

    const innerCoreGeo = new THREE.OctahedronGeometry(0.35, 0);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xdd3044,
      transparent: true,
      opacity: 0.25,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    sphereGroup.add(innerCoreMesh);

    // 4. Quantum State Vector (|psi>)
    const vectorGroup = new THREE.Group();
    sphereGroup.add(vectorGroup);

    // Vector Ray Line
    const rayGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1.5, 0),
    ]);
    const rayMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2,
      transparent: true,
      opacity: 0.95,
    });
    const rayLine = new THREE.Line(rayGeo, rayMat);
    vectorGroup.add(rayLine);

    // State Vector Tip Node (Glow sphere)
    const tipGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const tipMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const tipMesh = new THREE.Mesh(tipGeo, tipMat);
    tipMesh.position.set(0, 1.5, 0);
    vectorGroup.add(tipMesh);

    // Tip Halo Ring
    const haloGeo = new THREE.RingGeometry(0.1, 0.14, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xd6b799,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.set(0, 1.5, 0);
    haloMesh.rotation.x = Math.PI / 2;
    vectorGroup.add(haloMesh);

    // 5. Orbiting Quantum Particles Cloud (Qubit Field)
    const particleCount = 260;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const pTheta = u * 2.0 * Math.PI;
      const pPhi = Math.acos(2.0 * v - 1.0);
      const r = 1.45 + Math.random() * 0.45;

      const x = r * Math.sin(pPhi) * Math.cos(pTheta);
      const y = r * Math.sin(pPhi) * Math.sin(pTheta);
      const z = r * Math.cos(pPhi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.008;
      particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd6b799,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    sphereGroup.add(particles);

    // Interactive Drag Physics
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let targetRotationX = 0.25;
    let targetRotationY = 0.35;
    let currentRotationX = 0.25;
    let currentRotationY = 0.35;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousPointerX = clientX;
        previousPointerY = clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    canvas.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      if (isDisposed) return;
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let frameCounter = 0;
    let lastFpsUpdate = performance.now();

    const animate = (time: number) => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      // Track FPS
      frameCounter++;
      if (time - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCounter * 1000) / (time - lastFpsUpdate)));
        frameCounter = 0;
        lastFpsUpdate = time;
      }

      const isOverdrive = isLimitBreakRef.current;
      const speedMultiplier = isOverdrive ? 3.0 : 1.0;

      // 1. Continuous 3D Orbital Rotation
      if (!isDragging) {
        targetRotationY += 0.010 * speedMultiplier;
        targetRotationX = 0.28 + Math.sin(time * 0.0008) * 0.08;
      }
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      sphereGroup.rotation.x = currentRotationX;
      sphereGroup.rotation.y = currentRotationY;

      // 2. Gyroscopic Counter-Rotation for Core
      coreMesh.rotation.y -= 0.018 * speedMultiplier;
      coreMesh.rotation.z += 0.012 * speedMultiplier;
      innerCoreMesh.rotation.x += 0.014 * speedMultiplier;
      innerCoreMesh.rotation.y += 0.010 * speedMultiplier;

      // 3. Qubit Particle Cloud Orbital Spin
      particles.rotation.y += 0.006 * speedMultiplier;
      particles.rotation.x -= 0.003 * speedMultiplier;

      // 4. Larmor Precession or Smooth State Orientation
      if (isPrecessingRef.current) {
        targetPhiRef.current += 0.022 * speedMultiplier;
      }

      currentThetaRef.current += (targetThetaRef.current - currentThetaRef.current) * 0.08;
      currentPhiRef.current += (targetPhiRef.current - currentPhiRef.current) * 0.08;

      // Update State Vector orientation:
      // Bloch mapping: x = r*sin(theta)*cos(phi), y = r*cos(theta), z = r*sin(theta)*sin(phi)
      const curT = currentThetaRef.current;
      const curP = currentPhiRef.current;
      const stateX = 1.5 * Math.sin(curT) * Math.cos(curP);
      const stateY = 1.5 * Math.cos(curT);
      const stateZ = 1.5 * Math.sin(curT) * Math.sin(curP);

      tipMesh.position.set(stateX, stateY, stateZ);
      haloMesh.position.set(stateX, stateY, stateZ);
      haloMesh.lookAt(0, 0, 0);

      const positions = rayGeo.attributes.position.array as Float32Array;
      positions[3] = stateX;
      positions[4] = stateY;
      positions[5] = stateZ;
      rayGeo.attributes.position.needsUpdate = true;

      // Particles dynamic spherical drift
      const pPositions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3] += particleVelocities[i * 3] * speedMultiplier;
        pPositions[i * 3 + 1] += particleVelocities[i * 3 + 1] * speedMultiplier;
        pPositions[i * 3 + 2] += particleVelocities[i * 3 + 2] * speedMultiplier;

        // Keep inside bounds
        const dist = Math.sqrt(
          pPositions[i * 3] ** 2 +
          pPositions[i * 3 + 1] ** 2 +
          pPositions[i * 3 + 2] ** 2
        );
        if (dist > 2.0 || dist < 1.3) {
          particleVelocities[i * 3] *= -1;
          particleVelocities[i * 3 + 1] *= -1;
          particleVelocities[i * 3 + 2] *= -1;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Overdrive visuals
      if (isOverdrive) {
        shellMat.color.setHex(0xffffff);
        shellMat.opacity = 0.45;
        particleMat.color.setHex(0xffffff);
        particleMat.size = 0.05;
      } else {
        shellMat.color.setHex(0xd6b799);
        shellMat.opacity = 0.22;
        particleMat.color.setHex(0xd6b799);
        particleMat.size = 0.035;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      canvas.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      // Clean Three.js geometries and materials
      shellGeo.dispose();
      shellMat.dispose();
      ringXY.geometry.dispose();
      ringXZ.geometry.dispose();
      ringYZ.geometry.dispose();
      ringMatChampagne.dispose();
      ringMatVermilion.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      rayGeo.dispose();
      rayMat.dispose();
      tipGeo.dispose();
      tipMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Compute quantum amplitudes for mathematical HUD
  const pZero = (Math.cos(theta / 2) ** 2 * 100).toFixed(1);
  const pOne = (Math.sin(theta / 2) ** 2 * 100).toFixed(1);
  const thetaPi = (theta / Math.PI).toFixed(2);
  const phiPi = (phi / Math.PI).toFixed(2);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[400px] sm:h-[440px] rounded-3xl border border-[#302e2a] bg-[#0c0c0b] p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden select-none ${className}`}
    >
      {/* 3D WebGL Canvas or 2D Accessible Fallback */}
      {webglError ? (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 text-center bg-[#0c0c0b]">
          <svg viewBox="0 0 200 200" className="w-44 h-44 text-[#d6b799]/40 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="100" cy="100" r="75" strokeDasharray="4 4" />
            <ellipse cx="100" cy="100" rx="75" ry="24" />
            <line x1="100" y1="25" x2="100" y2="175" />
            <line x1="25" y1="100" x2="175" y2="100" />
            <line x1="100" y1="100" x2="145" y2="55" stroke="#dd3044" strokeWidth="2.5" />
            <circle cx="145" cy="55" r="3" fill="#dd3044" />
          </svg>
          <div className="text-xs font-mono text-[#d6b799]">WebGL Unavailable // 2D Projection Fallback</div>
          <div className="text-[10px] font-mono text-[#aaa69e] mt-1">Reduced motion or hardware fallback mode active</div>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0 touch-none"
          title="Interactive 3D Bloch Sphere - Drag to rotate freely in 3D"
        />
      )}

      {/* Top HUD Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#aaa69e] bg-[#090909]/85 px-3.5 py-2 rounded-xl border border-[#302e2a]/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isLimitBreak ? "bg-[#ffffff] animate-ping" : "bg-[#d6b799] animate-pulse"}`} />
          <span className="text-[#f2eee7] font-semibold tracking-wider">BLOCH SPHERE 3D</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#d6b799]">{fps} FPS</span>
          <span className="text-[#302e2a]">|</span>
          <span className="text-[#aaa69e] tracking-tight">DRAG TO ORBIT</span>
        </div>
      </div>

      {/* Center Quantum Math Overlay (Subtle) */}
      <div className="relative z-10 pointer-events-none self-start pl-1 space-y-1">
        <div className="text-xs font-mono text-[#d6b799] bg-[#090909]/75 px-2.5 py-1 rounded-md border border-[#302e2a]/50 inline-block backdrop-blur-sm">
          |ψ⟩ = cos(θ/2)|0⟩ + e<sup>iφ</sup>sin(θ/2)|1⟩
        </div>
        <div className="text-[10px] font-mono text-[#aaa69e] space-x-2">
          <span>θ = {thetaPi}π</span>
          <span>φ = {phiPi}π</span>
          <span className="text-[#f2eee7]">P(|0⟩)={pZero}%</span>
          <span className="text-[#dd3044]">P(|1⟩)={pOne}%</span>
        </div>
      </div>

      {/* Bottom Interactive HUD: Presets & Limit Break Overdrive */}
      <div className="relative z-10 space-y-2.5 pt-2">
        {/* Preset Quantum State Buttons */}
        <div className="flex items-center justify-between gap-1.5 bg-[#090909]/90 p-1.5 rounded-xl border border-[#302e2a]/80 backdrop-blur-md">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setIsPrecessing(false);
                setQuantumState(p.theta, p.phi);
              }}
              title={p.description}
              className="flex-1 py-1.5 px-2 text-xs font-mono font-medium rounded-lg text-[#aaa69e] hover:text-[#f2eee7] hover:bg-[#1a1918] transition-colors border border-transparent hover:border-[#302e2a] cursor-pointer"
            >
              {p.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsPrecessing(!isPrecessing)}
            className={`py-1.5 px-3 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer border ${
              isPrecessing
                ? "bg-[#d6b799]/15 text-[#d6b799] border-[#d6b799]/40"
                : "text-[#aaa69e] hover:text-[#f2eee7] border-transparent"
            }`}
            title="Toggle Larmor Dynamic Precession"
          >
            {isPrecessing ? "SPIN: ON" : "SPIN: OFF"}
          </button>
        </div>

        {/* Hyperframe Overdrive / Limit Break Trigger */}
        <button
          type="button"
          onClick={toggleLimitBreak}
          className={`w-full py-2 px-4 rounded-xl text-xs font-mono font-semibold tracking-wider flex items-center justify-between transition-all duration-300 cursor-pointer shadow-lg ${
            isLimitBreak
              ? "bg-[#ffffff] text-[#090909] shadow-white/20 border border-white"
              : "bg-[#141413] text-[#d6b799] hover:bg-[#1c1b1a] hover:text-white border border-[#302e2a]"
          }`}
        >
          <span className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isLimitBreak ? "bg-[#dd3044]" : "bg-[#d6b799]"}`} />
            {isLimitBreak ? "LIMIT BREAK // 60FPS OVERDRIVE" : "ENGAGE LIMIT BREAK"}
          </span>
          <span className="text-[10px] tracking-normal opacity-80">
            {isLimitBreak ? "[ACTIVE]" : "[OVERDRIVE]"}
          </span>
        </button>
      </div>
    </div>
  );
}
