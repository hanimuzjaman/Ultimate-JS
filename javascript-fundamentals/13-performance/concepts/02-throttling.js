/**
 * Module 13: Performance
 * Concepts: Throttling
 */

// ============================================
// 1. BASIC THROTTLE
// ============================================
console.log("=== Throttling ===\n");

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      fn(...args);
      lastCall = now;
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Throttled scroll event");
}, 500);

handleScroll();
setTimeout(() => handleScroll(), 200);
setTimeout(() => handleScroll(), 400);

// ============================================
// SUMMARY
// ============================================
console.log("\n=== SUMMARY ===\n");
console.log("✓ Execute at regular intervals");
console.log("✓ Perfect for scroll/resize");
console.log("✓ Fixed execution rate");
