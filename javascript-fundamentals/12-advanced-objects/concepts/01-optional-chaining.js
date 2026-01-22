/**
 * Module 12: Advanced Objects
 * Concepts: Optional Chaining and Nullish Coalescing
 */

// ============================================
// 1. OPTIONAL CHAINING
// ============================================
console.log("=== Optional Chaining ===\n");

const user = {
  name: "John",
  address: {
    street: "123 Main St",
  },
};

// Safe access with ?.
console.log("City:", user.address?.city); // undefined
console.log("Street:", user.address?.street); // "123 Main St"

// Short circuit on null/undefined
const nullUser = null;
console.log("Null user:", nullUser?.name); // undefined

// ============================================
// 2. NULLISH COALESCING
// ============================================
console.log("\n=== Nullish Coalescing ===\n");

const settings = {
  theme: null,
  fontSize: 0,
  color: undefined,
};

// ?? returns right side if left is null/undefined
console.log("Theme:", settings.theme ?? "light");
console.log("Font size:", settings.fontSize ?? 16); // 0, not null
console.log("Color:", settings.color ?? "black");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== SUMMARY ===\n");
console.log("✓ ?. for safe property access");
console.log("✓ ?? for null coalescing");
console.log("✓ Avoid undefined errors");
