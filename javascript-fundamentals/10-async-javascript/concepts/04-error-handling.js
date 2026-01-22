/**
 * Module 10: Async JavaScript
 * Concepts: Error Handling
 */

// ============================================
// 1. TRY-CATCH
// ============================================
console.log("=== Try-Catch ===\n");

try {
  throw new Error("Test error");
} catch (error) {
  console.log("Caught:", error.message);
} finally {
  console.log("Finally block");
}

// ============================================
// 2. ERROR TYPES
// ============================================
console.log("\n=== Error Types ===\n");

try {
  throw new TypeError("Type error");
} catch (error) {
  console.log("Error type:", error.constructor.name);
}

// ============================================
// 3. PROMISE ERROR HANDLING
// ============================================
console.log("\n=== Promise Error Handling ===\n");

Promise.reject("Error").catch((error) => {
  console.log("Caught:", error);
});

// ============================================
// 4. ASYNC-AWAIT ERROR HANDLING
// ============================================
console.log("\n=== Async Error Handling ===\n");

async function asyncError() {
  try {
    await Promise.reject("Error");
  } catch (error) {
    console.log("Caught async error:", error);
  }
}

asyncError();

// ============================================
// 5. ERROR PROPAGATION
// ============================================
console.log("\n=== Error Propagation ===\n");

function throwError() {
  throw new Error("Original error");
}

try {
  throwError();
} catch (error) {
  console.log("Caught and can rethrow");
  // throw error; // Rethrow
}

// ============================================
// SUMMARY
// ============================================
console.log("\n=== ERROR HANDLING SUMMARY ===\n");
console.log("✓ Try-catch for synchronous errors");
console.log("✓ .catch() for promise errors");
console.log("✓ Try-catch for async/await");
console.log("✓ Finally always executes");
console.log("✓ Error objects have message and stack");
