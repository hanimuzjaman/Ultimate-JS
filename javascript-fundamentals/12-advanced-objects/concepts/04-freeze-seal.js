/**
 * Module 12: Advanced Objects
 * Concepts: Freeze and Seal
 */

// ============================================
// 1. OBJECT.FREEZE
// ============================================
console.log("=== Object.freeze ===\n");

const frozen = Object.freeze({ x: 1 });
frozen.x = 2; // Silent fail
frozen.y = 2; // Silent fail
console.log("Frozen:", frozen);

// ============================================
// 2. OBJECT.SEAL
// ============================================
console.log("\n=== Object.seal ===\n");

const sealed = Object.seal({ x: 1 });
sealed.x = 2; // OK
sealed.y = 2; // Fails
console.log("Sealed:", sealed);

// ============================================
// SUMMARY
// ============================================
console.log("\n=== SUMMARY ===\n");
console.log("✓ freeze: immutable");
console.log("✓ seal: can modify, not add/remove");
