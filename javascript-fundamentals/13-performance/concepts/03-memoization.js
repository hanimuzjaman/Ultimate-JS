/**
 * Module 13: Performance
 * Concepts: Memoization
 */

// ============================================
// 1. BASIC MEMOIZATION
// ============================================
console.log("=== Memoization ===\n");

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Cache hit for:", key);
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log("fib(5):", fibonacci(5));
console.log("fib(5) again:", fibonacci(5)); // Cache hit

// ============================================
// 2. EXPENSIVE COMPUTATION
// ============================================
console.log("\n=== Caching Expensive Operations ===\n");

const expensiveCalc = memoize((n) => {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
});

console.log("Sum 1000000:", expensiveCalc(1000000));
console.log("Sum 1000000 again:", expensiveCalc(1000000)); // From cache

// ============================================
// SUMMARY
// ============================================
console.log("\n=== SUMMARY ===\n");
console.log("✓ Caches function results");
console.log("✓ Trades memory for speed");
console.log("✓ Works best with pure functions");
