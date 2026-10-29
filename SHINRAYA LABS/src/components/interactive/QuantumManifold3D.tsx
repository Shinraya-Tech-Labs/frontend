"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLimitBreak } from "@/context/LimitBreakContext";

export function QuantumManifold3D({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLimitBreak } = useLimitBreak();
  const isLimitBreakRef = useRef<boolean>(isLimitBreak);
  const [webglError, setWebglError] = useState<boolean>(false);

  useEffect(() => {
    isLimitBreakRef.current = isLimitBreak;
  }, [isLimitBreak]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isDisposed = false;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 180;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglError(true);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // Torus Knot Geometry (p=2, q=3 or p=3, q=5)
    const knotGeo = new THREE.TorusKnotGeometry(1.0, 0.28, 96, 16, 2, 3);
    const knotMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xd6b799,
      transparent: true,
      opacity: 0.45,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knotMesh);

    // Internal Qubit Vertices (Points)
    const pointsGeo = new THREE.BufferGeometry();
    const pos = knotGeo.attributes.position.clone();
    pointsGeo.setAttribute("position", pos);
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    scene.add(pointsMesh);

    // Drag interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotX = 0.4;
    let rotY = 0.2;
    let targetRotX = 0.4;
    let targetRotY = 0.2;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevX = x;
      prevY = y;
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      if (isDragging) {
        const deltaX = x - prevX;
        const deltaY = y - prevY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        prevX = x;
        prevY = y;
      }
    };

    const onUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

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

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const isOverdrive = isLimitBreakRef.current;
      const speedMult = isOverdrive ? 3.0 : 1.0;

      if (!isDragging) {
        targetRotY += 0.012 * speedMult;
        targetRotX += 0.006 * speedMult;
      }

      rotX += (targetRotX - rotX) * 0.1;
      rotY += (targetRotY - rotY) * 0.1;

      knotMesh.rotation.x = rotX;
      knotMesh.rotation.y = rotY;
      pointsMesh.rotation.x = rotX;
      pointsMesh.rotation.y = rotY;

      if (isOverdrive) {
        knotMat.color.setHex(0xffffff);
        knotMat.opacity = 0.75;
      } else {
        knotMat.color.setHex(0xd6b799);
        knotMat.opacity = 0.45;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);

      knotGeo.dispose();
      knotMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[180px] rounded-xl overflow-hidden border border-[#302e2a]/50 bg-[#090909]/80 select-none ${className}`}
    >
      {webglError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
          <svg viewBox="0 0 120 120" className="w-20 h-20 text-[#d6b799]/40 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <ellipse cx="60" cy="60" rx="40" ry="20" />
            <ellipse cx="60" cy="60" rx="20" ry="40" strokeDasharray="3 3" />
            <circle cx="60" cy="60" r="10" stroke="#dd3044" />
          </svg>
          <span className="text-[10px] font-mono text-[#d6b799]">Topology 2D Projection</span>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
          title="Interactive 3D Quantum Topology - Drag to rotate"
        />
      )}
      <div className="absolute top-2 left-2 pointer-events-none text-[10px] font-mono text-[#d6b799] bg-[#0c0c0b]/80 px-2 py-0.5 rounded border border-[#302e2a]/60">
        TORUS KNOT LATTICE [3D]
      </div>
      <div className="absolute bottom-2 right-2 pointer-events-none text-[9px] font-mono text-[#aaa69e] bg-[#0c0c0b]/80 px-1.5 py-0.5 rounded border border-[#302e2a]/40">
        DRAG TO INSPECT
      </div>
    </div>
  );
}
