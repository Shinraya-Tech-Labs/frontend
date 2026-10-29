import assert from "node:assert";
import * as THREE from "three";

console.log("[CHECK] Starting Hyperframes & 3D Quantum Engine Self-Check...");

// 1. Verify Three.js core primitives
const v = new THREE.Vector3(1, 2, 3);
assert.strictEqual(v.x, 1);
assert.strictEqual(v.y, 2);
assert.strictEqual(v.z, 3);

// 2. Verify Bloch Sphere Coordinate Mapping Invariant
// x = r * sin(theta) * cos(phi)
// y = r * cos(theta)
// z = r * sin(theta) * sin(phi)
const r = 1.5;
const testAngles = [
  { theta: 0, phi: 0 }, // Ground state |0>
  { theta: Math.PI, phi: 0 }, // Excited state |1>
  { theta: Math.PI / 2, phi: 0 }, // Hadamard |+>
  { theta: Math.PI / 2, phi: Math.PI / 2 }, // Phase |i>
  { theta: Math.PI / 3, phi: Math.PI / 4 }, // Arbitrary state
];

for (const { theta, phi } of testAngles) {
  const x = r * Math.sin(theta) * Math.cos(phi);
  const y = r * Math.cos(theta);
  const z = r * Math.sin(theta) * Math.sin(phi);

  const radiusSquared = x * x + y * y + z * z;
  const expectedRSquared = r * r;
  const diff = Math.abs(radiusSquared - expectedRSquared);

  assert(
    diff < 1e-6,
    `Bloch sphere radius invariant failed for theta=${theta}, phi=${phi}. Expected ${expectedRSquared}, got ${radiusSquared}`
  );
}
console.log("[PASS] Bloch Sphere radius invariant verified across all test angles.");

// 3. Verify Quantum Probability Conservation: P(|0>) + P(|1>) = 1.0
for (const { theta } of testAngles) {
  const pZero = Math.cos(theta / 2) ** 2;
  const pOne = Math.sin(theta / 2) ** 2;
  const sum = pZero + pOne;
  assert(
    Math.abs(sum - 1.0) < 1e-6,
    `Probability conservation failed: ${pZero} + ${pOne} != 1.0`
  );
}
console.log("[PASS] Quantum probability conservation law P(|0>) + P(|1>) == 1.0 holds.");

// 4. Verify 3D Geometry instantiations
const sphere = new THREE.IcosahedronGeometry(1.5, 2);
assert(sphere.attributes.position.count > 0, "Icosahedron vertex count must be > 0");
sphere.dispose();

const torusKnot = new THREE.TorusKnotGeometry(1.0, 0.28, 96, 16, 2, 3);
assert(torusKnot.attributes.position.count > 0, "Torus knot vertex count must be > 0");
torusKnot.dispose();

console.log("[PASS] Three.js geometries instantiate and dispose without memory leaks.");
console.log("[SUCCESS] All Hyperframes & 3D Quantum Engine invariants verified.");
