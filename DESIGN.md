# Design System: Shinraya Tech Labs

A semantic design system for Google Stitch and autonomous front-end generation, encoding an unvarnished, empirical laboratory aesthetic: disciplined dark-matter surfaces, mathematical asymmetry, interactive 3D WebGL physics, and high-refresh Hyperframes motion.

---

## 1. Visual Theme & Atmosphere

- **Atmosphere:** An uncompromising, high-agency computational research laboratory. The feeling is clinical, rigorous, and tactile—reminiscent of a physics cleanroom or an advanced quantum instrumentation deck late at night. There is zero decorative fluff, zero corporate marketing speak, and zero synthetic optimism.
- **Atmospheric Spectrum:**
  - **Density:** 5 / 10 (*Balanced Laboratory Cockpit* — generous typographic breathing room in long-form narratives, transitioning seamlessly to high-density tabular telemetry in experimental testbenches).
  - **Variance:** 8 / 10 (*Mathematical Asymmetry* — intentional, offset 12-column grid spans, split-screen asymmetric Hero layouts, and non-repeating Bento container hierarchies).
  - **Motion:** 7 / 10 (*High-Fidelity Fluid Dynamics* — persistent Three.js WebGL spatial simulation, hardware-accelerated spring physics, perimeter laser beams, and an interactive 60FPS Limit Break overdrive mode).

---

## 2. Color Palette & Roles

A single, disciplined color system anchored in obsidian carbon and warm, desaturated champagne gold. The aesthetic completely rejects oversaturated "AI purple/blue neon" glows in favor of calibrated physical instrumentation.

- **Obsidian Canvas** (`#090909`) — The primary viewport background. An absolute deep charcoal off-black with zero pure `#000000` clipping.
- **Lab Surface** (`#111110`) — Standard card, module, and container background surface fill.
- **Raised Module Surface** (`#171615`) — Elevated cards, dropdown menus, interactive testbench controls, and floating terminal viewports.
- **Structural Border** (`#302e2a`) — 1px precision bounding dividers, card outlines, and grid perimeter rails.
- **Primary Ink** (`#f2eee7`) — Primary heading and high-contrast body typography. A bone-white neutral that avoids harsh stark white eye fatigue.
- **Muted Steel** (`#aaa69e`) — Secondary explanatory copy, parameter descriptors, metadata timestamps, and mathematical units.
- **Subtle Muted Divider** (`#42403b`) — Internal nested card dividers and sub-table row rules.
- **Champagne Gold Accent** (`#d6b799`) — The singular primary accent (saturation < 40%). Used for primary action buttons, active quantum state nodes, live verification badges, and scrubbed word highlights.
- **Vermilion Boundary Indicator** (`#dd3044`) — A strictly functional negative-outcome color (saturation ~70%). Used exclusively for falsified hypotheses, adversary corruption bounds, and empirical failure reports. Never used decoratively.
- **Discord Community Royal** (`#454FBF`) — Dedicated, brand-accurate Discord integration anchor, isolated from core laboratory telemetry.

*Color Constraint:* Maximum 1 primary accent (`#d6b799`). No secondary neon cyan, magenta, or gradient-washed rainbow fills.

---

## 3. Typographic Architecture

Typographic hierarchy is communicated through weight, letter-spacing, and structural positioning rather than arbitrary font size inflation.

- **Display & Section Headlines:** `Outfit` (sans-serif)
  - Scale: `clamp(2.5rem, 6vw, 5.25rem)` with tightly calibrated tracking (`tracking-tight`, letter-spacing: `-0.04em` to `-0.065em`).
  - Leading: Controlled, compact line height (`leading-[1.05]` to `leading-[1.12]`).
  - Structure: Strictly flows in 2 to 3 natural lines without dangling orphans.
- **Inquiry Accent (Editorial Serif):** `Instrument Serif` or `Outfit` with italic serif styling.
  - Usage: Reserved strictly for italicized questions of inquiry (e.g., *"beyond assumptions."*, *"outcomes remain unvarnished."*).
  - Color: Always tinted with Champagne Gold (`#d6b799`).
- **Body Text:** `Outfit` (sans-serif)
  - Scale: `1rem` (16px) to `1.125rem` (18px) with relaxed leading (`leading-relaxed` / 1.65).
  - Measure: Max 65 characters per line (`max-w-2xl` / `max-w-prose`) to preserve reading endurance.
- **Telemetry & Tabular Monospace:** `JetBrains Mono` / native system tabular mono (`font-mono`)
  - Usage: Seed numbers, quantum probability readouts, Git commit hashes, benchmark scores, terminal prompts, and status badges.
  - Scale: `0.75rem` (12px) to `0.875rem` (14px) with uppercase letter-spacing (`tracking-wider` / `tracking-[0.2em]`).
- **Typographic Bans:**
  - `Inter` is banned for creative and laboratory identity headers.
  - Generic legacy serifs (`Times New Roman`, `Georgia`, `Garamond`, `Palatino`) are banned.
  - Pure decorative uppercase headers exceeding 4 words are banned.

---

## 4. Hero Section Architecture

The Hero establishes authority through live 3D physics and mathematical asymmetry rather than static hero banners.

- **Asymmetric Split:** Left 8 columns dedicated to wide typographic thesis and primary action triggers; right 4 columns dedicated to an interactive Three.js 3D WebGL Bloch Sphere.
- **Centered Hero Ban:** Centered hero stacks are strictly banned for high-variance laboratory contexts.
- **Real-Time 3D WebGL Canvas:**
  - The hero must host an interactive WebGL Bloch Sphere / neural core with Three.js.
  - Renders icosahedron wireframe grid, orthogonal equatorial/meridian coordinate rings, dynamic 3D state vector arrow, and 260+ orbiting qubit particles.
  - Fully interactive: user can click and drag to orbit in 3D with inertia damping.
  - Live HUD controls: basis state presets (`|0⟩`, `|1⟩`, `|+⟩`, `|i⟩`) and real-time state equation readout: `|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩`.
- **Zero Filler Directives:**
  - "Scroll down to explore", bouncing chevron arrows, and mouse icon animations are banned.
- **Call-to-Action Restraint:**
  - Exactly one solid high-contrast primary CTA (`#d6b799` with pure `#000000` text for maximum contrast).
  - Accompanied by minimal secondary ghost/outline triggers.

---

## 5. Component Behaviors & Stylings

### Buttons
- **Primary Action Button:**
  - Fill: Champagne Gold (`#d6b799`), Text: Black (`#000000`), Font-weight: Semibold (`font-semibold`).
  - Shape: Fully rounded pill (`rounded-full`), Padding: `px-8 py-4`.
  - Hover: Shifts cleanly to pure white (`#ffffff`), with tactile scale down on press (`active:scale-95`).
  - Shimmer: Subtle, hardware-accelerated linear sweep (`animate-hyper-shimmer`) across button surface.
- **Secondary / Ghost Button:**
  - Fill: Transparent / `bg-white/5`, Border: 1px `border-white/20`, Text: `#f2eee7`.
  - Hover: Border shifts to `border-white/50`, fill to `bg-white/10`.

### Laboratory Cards & Modules
- **Surface Elevation:** Background gradient from `#141413` down to `#0c0c0b` with 1px border `#302e2a`.
- **Corner Radii:** Generous, organic curve (`rounded-2xl` to `rounded-3xl` / 16px to 24px).
- **Hyperframe Perimeter Beams (`HyperframeBeam`):**
  - Continuous SVG linear gradient laser beam circling the perimeter on `stroke-dasharray: 22 78`.
  - Standard duration: 7s–10s linear loop.
- **Cybernetic HUD Corner Brackets (`HyperframeCorners`):**
  - Minimalist `+` or `┌ ┐ └ ┘` coordinate markers anchored in card corners in subtle `#302e2a` or `#d6b799`.
- **Cursor Spotlight:** Cards track mouse position (`var(--mouse-x)`, `var(--mouse-y)`) to project a soft, desaturated champagne radial spotlight (`rgba(214, 183, 153, 0.08)`).

### Sliders & Simulation Inputs
- **Track:** 8px rounded track in `#1a1918` with 1px border `#302e2a`.
- **Thumb:** Dedicated accent `#d6b799` with high-contrast active feedback.
- **Labels:** Explicit uppercase monospace label above the control, live numerical readout floated right. Every slider has an unambiguous `aria-label`.

### Telemetry Badges & Status Indicators
- **Shape:** Pill badge (`rounded-full`), font: `font-mono text-xs uppercase tracking-wider`.
- **Pulsing Status Beacon:** 6px circular dot with concentric CSS ping animation indicating active server or simulation pipeline.

---

## 6. Layout Principles & Grid Systems

- **Mathematical Asymmetry:** Use 12-column CSS Grid (`grid-cols-1 md:grid-cols-12 grid-flow-dense`). Combine 7-column primary modules with 5-column secondary telemetry modules to avoid symmetric monotony.
- **Three Equal Cards Ban:** The generic row of 3 identical equal cards is strictly banned. Use dense Bento grids, horizontal expandable accordions, or asymmetric 2-column zig-zag layouts.
- **Containment:** Layouts are bound by `max-w-7xl` (1280px) centered with responsive padding (`px-6 md:px-12 lg:px-20`).
- **No Absolute Content Overlap:** Text must never overlay complex photographic imagery or other typography. Every piece of information occupies a defined spatial container.
- **Full Viewport Sizing:** Full-height sections must use `min-h-[95vh]` or `min-h-[100dvh]`, never `h-screen` (which breaks viewport recalculations on mobile browsers).

### Responsive Collapsing Rules
- **Mobile (< 768px):** All multi-column grids collapse cleanly to a single column (`col-span-12`).
- **Zero Horizontal Overflow:** Viewports maintain `overflow-x: hidden` with strictly zero accidental scroll margins.
- **Touch Target Integrity:** All interactive elements maintain a minimum hit area of `44px x 44px`.

---

## 7. Motion Philosophy & Limit Break System

Motion is not decorative frosting; it communicates computational state, physical inertia, and system health.

- **Three.js WebGL Engine:** Interactive 3D geometry runs on an active render loop with inertia damping (`lerp` coefficient `0.08` to `0.1`), automatic DPR clamping (max `devicePixelRatio: 2`), and clean geometry/material disposal on unmount.
- **Perpetual Micro-Interactions:**
  - Ambient backdrop drift (`animate-ambient-drift`, 16s ease-in-out loop).
  - Infinite Marquee research ticker (`animate-marquee`, 35s linear loop with pause on hover).
  - Active oscilloscope sweeps across telemetry canvases.
- **Spring Physics:** Interactive hover lifts utilize natural spring feel (`duration: 0.7s - 0.95s, ease: "power3.out"` or `"power4.out"`).
- **Hyperframes Limit Break System:**
  - A global overdrive state toggled via HUD pill, keyboard shortcut (`Ctrl+B`), or terminal command.
  - When engaged (`html.limit-break-active`):
    - Background displays full-screen radial warp speedlines.
    - Laser perimeter beams accelerate from 7s down to 2.2s with intense bloom filter.
    - 3D WebGL canvases multiply rotational speed by 3x.
    - Top telemetry HUD banner activates: `[ HYPERFRAME LIMIT BREAK: ENGAGED // 60FPS OVERDRIVE ]`.
    - Native Web Audio API generates a non-intrusive 60ms synthesizer chirp (440Hz -> 880Hz).
    - Card perimeters oscillate in an electric neon breathing cycle (`limitBreakGlow`).

---

## 8. Anti-Patterns & Banned AI Tells

To maintain uncompromising aesthetic integrity, the following patterns are strictly forbidden:

1. **No Emojis Anywhere:** Banned across all UI copy, buttons, badges, code comments, commit messages, and documentation.
2. **No Pure Black (`#000000`):** Canvas surfaces must use `#090909`; containers must use `#111110` or `#141413`.
3. **No Neon / AI Purple Gradients:** Neon cyan-to-purple button glows, multi-color gradient text, and violet outer shadows are completely banned.
4. **No Inter Font:** Generic `Inter` is banned for branding and editorial display.
5. **No Generic Legacy Serifs:** Times New Roman, Georgia, Garamond, and Palatino are banned.
6. **No 3-Column Equal Card Rows:** Standard 3-box feature grids are banned.
7. **No Centered Hero Stacks:** Generic centered headline + centered paragraph + 2 buttons is banned.
8. **No AI Copywriting Buzzwords:** Words like *"seamless"*, *"elevate"*, *"unleash"*, *"next-gen"*, *"revolutionize"*, and *"supercharge"* are banned.
9. **No Fake Round Numbers:** Do not use `99.99%` or `100%` without scientific context. Use real measured values (e.g., `78.4%`, `0.982 fidelity`, `30% noise tolerance`).
10. **No Generic Placeholder Names:** Names like "Acme Corp", "John Doe", or "Project Nexus" are banned.
11. **No Scroll Direction Filler:** "Scroll to explore", "Swipe down", bouncing chevrons, or animated mouse icons are banned.
12. **No Custom Mouse Cursors:** Custom cursor dots or trailing circles that override native OS pointer behavior are banned.
