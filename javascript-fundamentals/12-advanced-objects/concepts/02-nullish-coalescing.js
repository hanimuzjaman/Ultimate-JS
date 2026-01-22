/**
 * Module 12: Advanced Objects
 * Concepts: Nullish Coalescing
 */

// ============================================
// 1. BASIC NULLISH COALESCING
// ============================================
console.log("=== Nullish Coalescing ===\n");

const a = null;
const b = undefined;
const c = 0;
const d = "";

console.log("null ?? 'default':", a ?? "default"); // default
console.log("undefined ?? 'default':", b ?? "default"); // default
console.log("0 ?? 'default':", c ?? "default"); // 0
console.log("'' ?? 'default':", d ?? "default"); // ''

// ============================================
// SUMMARY
// ============================================
console.log("\n=== SUMMARY ===\n");
console.log("✓ ?? for null coalescing");
console.log("✓ Returns right if left is null/undefined");
console.log("✓ Preserves falsy values like 0 and ''");
