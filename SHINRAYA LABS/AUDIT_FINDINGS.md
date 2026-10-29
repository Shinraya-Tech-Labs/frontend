# Shinraya Tech Labs — Audit Findings Register

This document tracks all confirmed findings, technical defects, scientific verifications, and architectural reviews identified during the engineering and scientific audit.

| Finding ID | Domain | Affected File / Component | Severity | Confidence | Status | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **STL-3D-001** | Interaction / 3D | `QuantumBlochSphere.tsx`, `QuantumManifold3D.tsx` | High | Confirmed | **FIXED** | System `prefers-reduced-motion` check zeroed out rotation velocity (`speedMultiplier = 0`), freezing 3D orbital animations on devices with OS animation reduction. |
| **STL-3D-002** | Interaction / 3D | `QuantumBlochSphere.tsx` | Medium | Confirmed | **FIXED** | 3D coordinate sphere orbital rotation was coupled to quantum vector Larmor precession, halting the sphere when state presets were clicked. |
| **STL-A11Y-001** | Accessibility | `HorizontalAccordion.tsx`, `editorial.tsx` | Medium | Confirmed | **FIXED** | Low-contrast transparent nodes (`opacity-0 lg:block`) and unstyled child span text triggered WCAG 2.1 AA color-contrast violations in automated axe crawls. |
| **STL-A11Y-002** | SSR / A11y | `HeroSection.tsx` | Low | Confirmed | **FIXED** | Headline typography lowercase `"beyond assumptions."` caused headless SSR assertion discrepancy against test suites expecting `"beyond Assumptions."`. |
| **STL-ENG-001** | React 19 / Code Quality | `LimitBreakHUD.tsx` | Low | Confirmed | **FIXED** | Synchronous `setMounted(true)` in `useEffect` triggered `react-hooks/set-state-in-effect` cascading render error. Refactored to `useSyncExternalStore`. |
| **STL-ENG-002** | Syntax / Code Quality | `HyperframeSeekbar.tsx` | Low | Confirmed | **FIXED** | Unescaped `//` in JSX children triggered `react/jsx-no-comment-textnodes` ESLint error. Wrapped in JSX expression strings `{"//"}`. |
| **STL-ENG-003** | React 19 / Code Quality | `QuantumBlochSphere.tsx`, `QuantumManifold3D.tsx` | Low | Confirmed | **FIXED** | Calling `setWebglError(true)` synchronously inside effect catch block triggered cascading render warnings. Deferred via `queueMicrotask`. |
| **STL-SEC-001** | Security / Headers | `vercel.json` | High | Confirmed | **VERIFIED PASS** | Production deployment verified with strict defensive headers: HSTS (`max-age=63072000`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Permissions-Policy`. |
| **STL-SCI-001** | Scientific Computing | `QuantumBlochSphere.tsx`, `verify-hyperframes-3d.mjs` | High | Confirmed | **VERIFIED PASS** | Spherical coordinate mapping radius invariant ($r = 1.500000$) and quantum probability conservation ($P(\|0\rangle) + P(\|1\rangle) = 1.000000$) tested and passed. |
| **STL-SCI-002** | Computational Neuroscience | `TestbenchSimulator.tsx`, `verify-scientific-simulation.mjs` | Medium | Confirmed | **VERIFIED PASS** | Hodgkin-Huxley biophysical stability at resting potential ($-65\text{ mV}$) and suprathreshold action potential depolarization ($+35.5\text{ mV}$) verified. |
| **STL-SCI-003** | Machine Learning | `TestbenchSimulator.tsx`, `projects.ts` | Medium | Confirmed | **VERIFIED PASS** | Robust GRPO verifier corruption drift model verified: bounded hack index ($\le 25\%$) under 50% adversarial noise, preserving explicit negative HotpotQA disclosure. |

---

## Detailed Finding Records

### STL-3D-001: 3D Orbital Rotation Lock Under Reduced Motion
- **Affected Route**: `/`, `/about`, `/engineering`
- **Component**: `src/components/interactive/QuantumBlochSphere.tsx`, `src/components/interactive/QuantumManifold3D.tsx`
- **Observed Behavior**: The 3D Bloch sphere and Torus manifold appeared completely stationary on page load for users on Windows 11 with system animation reduction enabled.
- **Root Cause**: `speedMultiplier` was conditionally assigned `0` when `prefersReduced` matched, combined with `if (!prefersReduced)` guards on the rotation damping accumulator.
- **Correction**: Restored continuous orbital rotation at `0.010 rad/frame` with gentle dual-axis tilt oscillation (`0.28 + sin(time * 0.0008) * 0.08`).
- **Verification**: Verified at 60 FPS in Chrome and Playwright headless runs.

### STL-3D-002: Sphere Orbit Coupled to State Vector Precession
- **Affected Route**: `/`
- **Component**: `src/components/interactive/QuantumBlochSphere.tsx`
- **Observed Behavior**: Clicking preset quantum states (`|0⟩`, `|1⟩`, `|+⟩`, `|i⟩`) called `setIsPrecessing(false)`, halting not only the vector phase precession but also freezing the entire 3D coordinate sphere rotation in space.
- **Root Cause**: The auto-rotation conditional checked `if (isPrecessingRef.current)` for the outer sphere yaw.
- **Correction**: Decoupled coordinate frame orbital rotation from vector phase precession. The sphere continuously orbits in 3D while Larmor precession is independently controlled by the spin toggle.
- **Verification**: State transitions tested while maintaining uninterrupted celestial rotation.

### STL-A11Y-001: Color Contrast & Inactive Accordion Node Leaks
- **Affected Route**: `/`, `/about`, `/contribute`
- **Component**: `src/components/gpt-taste/HorizontalAccordion.tsx`, `src/components/editorial.tsx`
- **Observed Behavior**: Automated Axe WCAG 2.1 AA audits reported color-contrast violations across all viewports.
- **Root Cause**: Inactive accordion items kept descriptions in the DOM with `opacity-0 lg:block` instead of removing or hiding them, causing assistive crawlers to test transparent text against dark backgrounds. In `editorial.tsx`, `.text-black` lacked explicit color styling on gold buttons.
- **Correction**: Conditionally rendered active accordion details (`{isActive && ...}`) and explicitly enforced `style={{ color: "#000000" }}` on button spans.
- **Verification**: Re-tested with `@axe-core/playwright`.

### STL-ENG-001: React 19 Cascading Render Violation
- **Affected Component**: `src/components/hyperframes/LimitBreakHUD.tsx`
- **Observed Behavior**: ESLint reported `react-hooks/set-state-in-effect` error on `setMounted(true)`.
- **Root Cause**: Calling `setMounted(true)` synchronously inside `useEffect([])` creates an immediate second render pass in React 19.
- **Correction**: Replaced state/effect with React 19's idiomatic `useSyncExternalStore(emptySubscribe, () => true, () => false)`.
- **Verification**: `npx eslint src` exited with code 0.
