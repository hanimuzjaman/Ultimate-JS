/**
 * Module 13: Performance
 * Concepts: Debouncing and Throttling
 */

// ============================================
// 1. DEBOUNCING
// ============================================
console.log("=== Debouncing ===\n");

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 500);

handleSearch("j");
handleSearch("ja");
handleSearch("java"); // Only this logs after 500ms

// ============================================
// 2. THROTTLING
// ============================================
console.log("\n=== Throttling ===\n");

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
  console.log("Scroll event logged");
}, 1000);

// Simulate rapid scroll events
handleScroll();
handleScroll();
handleScroll();

// ============================================
// 3. DIFFERENCE
// ============================================
console.log("\n=== Key Differences ===\n");
console.log("Debounce: Wait for pause before executing");
console.log("Throttle: Execute at regular intervals");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== SUMMARY ===\n");
console.log("✓ debounce: Perfect for search/resize");
console.log("✓ throttle: Perfect for scroll/drag");
