/**
 * Module 10: Async JavaScript
 * Concepts: Event Loop
 *
 * Comprehensive examples of event loop and async behavior
 */

// ============================================
// 1. SYNCHRONOUS vs ASYNCHRONOUS
// ============================================
console.log("=== Sync vs Async ===\n");

console.log("1. Start");

setTimeout(() => {
  console.log("2. Async callback");
}, 0);

console.log("3. End");

// Output: 1. Start, 3. End, 2. Async callback

// ============================================
// 2. CALL STACK AND EVENT QUEUE
// ============================================
console.log("\n=== Event Loop Phases ===\n");

console.log("Script start");

setTimeout(() => {
  console.log("setTimeout 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

console.log("Script end");

// Output order:
// Script start
// Script end
// Promise 1 (microtask)
// setTimeout 1 (macrotask)

// ============================================
// 3. MICROTASKS VS MACROTASKS
// ============================================
console.log("\n=== Microtasks vs Macrotasks ===\n");

// Microtasks: promises, queueMicrotask, MutationObserver
// Macrotasks: setTimeout, setInterval, setImmediate, I/O

console.log("Start");

// Macrotask
setTimeout(() => {
  console.log("setTimeout");
}, 0);

// Microtask
Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// Output: Start, End, Promise, setTimeout

// ============================================
// 4. EVENT LOOP VISUALIZATION
// ============================================
console.log("\n=== Event Loop Stages ===\n");

// 1. Execute synchronous code
console.log("1. Sync");

// 2. Promises execute (microtask queue)
Promise.resolve().then(() => {
  console.log("2. Microtask");
});

// 3. setTimeout executes (macrotask queue)
setTimeout(() => {
  console.log("3. Macrotask");
}, 0);

// ============================================
// 5. NESTED PROMISES
// ============================================
console.log("\n=== Nested Promises ===\n");

Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    return Promise.resolve();
  })
  .then(() => {
    console.log("Promise 2");
  });

setTimeout(() => {
  console.log("Timeout");
}, 0);

// Promise 1, Promise 2, Timeout

// ============================================
// 6. BLOCKING THE EVENT LOOP
// ============================================
console.log("\n=== Blocking Event Loop ===\n");

function heavyComputation() {
  console.log("Computing...");
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  console.log("Done");
  return sum;
}

console.log("Start");
// heavyComputation(); // Would block event loop
console.log("End");

// ============================================
// 7. REQUESTANIMATIONFRAME
// ============================================
console.log("\n=== requestAnimationFrame ===\n");

// RAF runs before repaint (between macrotask and next frame)
console.log("Before RAF");

requestAnimationFrame(() => {
  console.log("RAF callback");
});

console.log("After RAF");

// ============================================
// 8. QUEUE ORDERING
// ============================================
console.log("\n=== Queue Ordering ===\n");

setTimeout(() => console.log("setTimeout 1"), 0);
setTimeout(() => console.log("setTimeout 2"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

// Promise 1, Promise 2, setTimeout 1, setTimeout 2

// ============================================
// 9. MIXED ASYNC OPERATIONS
// ============================================
console.log("\n=== Mixed Async ===\n");

console.log("Script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
  setTimeout(() => {
    console.log("Promise -> setTimeout");
  }, 0);
});

console.log("Script end");

// Output:
// Script start
// Script end
// Promise
// setTimeout
// Promise -> setTimeout

// ============================================
// 10. SETTIMEOUT VS SETIMMEDIATE (Node.js)
// ============================================
console.log("\n=== Timer Phases ===\n");

// In Node.js:
// setTimeout: timer phase
// setImmediate: check phase (after I/O)
// Promise: microtask phase

// setTimeout(() => console.log('setTimeout'));
// setImmediate(() => console.log('setImmediate'));
// Promise.resolve().then(() => console.log('Promise'));

console.log("Timer ordering shown (Node.js context)");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== EVENT LOOP SUMMARY ===\n");
console.log("✓ Call stack executes synchronous code");
console.log("✓ Microtask queue: promises, queueMicrotask");
console.log("✓ Macrotask queue: setTimeout, setInterval");
console.log("✓ Event loop: stack → microtasks → macrotasks");
console.log("✓ Microtasks run before macrotasks");
console.log("✓ Long operations block event loop");
console.log("✓ Use async patterns to prevent blocking");
