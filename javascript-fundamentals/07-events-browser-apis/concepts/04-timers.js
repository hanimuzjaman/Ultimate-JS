/**
 * Module 7: Events & Browser APIs
 * Concepts: Timers (setTimeout, setInterval, requestAnimationFrame)
 *
 * Comprehensive examples of JavaScript timers and scheduling
 */

// ============================================
// 1. SETTIMEOUT BASICS
// ============================================
console.log("=== setTimeout Basics ===\n");

// setTimeout: Execute function after delay (milliseconds)
// Returns: timeoutId for clearing

const timeoutId = setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("Timeout scheduled, ID:", timeoutId);

// setTimeout with arguments
setTimeout(
  (name, age) => {
    console.log(`Hello ${name}, you are ${age}`);
  },
  1000,
  "Alice",
  25,
);

// Cancel timeout before it executes
const cancelId = setTimeout(() => {
  console.log("This won't run");
}, 1000);

clearTimeout(cancelId);
console.log("Timeout cancelled");

// ============================================
// 2. SETINTERVAL BASICS
// ============================================
console.log("\n=== setInterval Basics ===\n");

// setInterval: Execute function repeatedly at fixed intervals
// Returns: intervalId for clearing

let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log("Interval tick:", count);

  if (count >= 3) {
    clearInterval(intervalId);
    console.log("Interval stopped");
  }
}, 1000);

// setInterval with arguments
let seconds = 0;
const timerId = setInterval(
  (label) => {
    seconds++;
    console.log(`${label}: ${seconds}s`);

    if (seconds >= 2) {
      clearInterval(timerId);
    }
  },
  1000,
  "Timer",
);

// ============================================
// 3. CLEARING TIMERS
// ============================================
console.log("\n=== Clearing Timers ===\n");

// Clear specific timeout
const id1 = setTimeout(() => {
  console.log("This will be cleared");
}, 500);
clearTimeout(id1);

// Clear specific interval
const id2 = setInterval(() => {
  console.log("This will be cleared");
}, 500);
clearInterval(id2);

// Trying to clear non-existent timer is safe
clearTimeout(99999); // No error
clearInterval(99999); // No error

console.log("Timers cleared safely");

// ============================================
// 4. DELAYED FUNCTION CALLS
// ============================================
console.log("\n=== Delayed Function Calls ===\n");

function greet(name) {
  console.log(`Hello, ${name}!`);
}

// Call function with delay
setTimeout(greet, 500, "Bob");

// Call arrow function with delay
setTimeout(() => {
  console.log("Delayed arrow function");
}, 500);

// Call method with delay (watch 'this')
const obj = {
  name: "MyObject",
  method() {
    console.log(`${this.name} method called`);
  },
};

setTimeout(() => {
  obj.method(); // Wrap to maintain 'this'
}, 500);

// ============================================
// 5. ZERO DELAY SETTIMEOUT
// ============================================
console.log("\n=== Zero Delay setTimeout ===\n");

console.log("Start");

setTimeout(() => {
  console.log("setTimeout(0)"); // Executes after current stack clears
}, 0);

console.log("End");

// Output:
// Start
// End
// setTimeout(0)

// ============================================
// 6. POLLING PATTERN
// ============================================
console.log("\n=== Polling Pattern ===\n");

let status = "pending";

function checkStatus() {
  console.log("Checking status...");

  // Simulated check
  if (Math.random() > 0.7) {
    status = "complete";
    console.log("Status: complete");
    // Would normally clear interval here
  }
}

// Poll every 1 second
// const pollId = setInterval(checkStatus, 1000);

console.log("Polling pattern example shown");

// ============================================
// 7. DEBOUNCING PATTERN
// ============================================
console.log("\n=== Debouncing Pattern ===\n");

function expensiveOperation(value) {
  console.log("Processing:", value);
}

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);

    // Set new timeout
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const debouncedOp = debounce(expensiveOperation, 500);

// Simulating multiple rapid calls
debouncedOp("call 1");
debouncedOp("call 2");
debouncedOp("call 3");
// Only "call 3" will be processed

console.log("Debounce pattern example shown");

// ============================================
// 8. THROTTLING PATTERN
// ============================================
console.log("\n=== Throttling Pattern ===\n");

function onScroll(event) {
  console.log("Scroll event handled");
}

function throttle(func, limit) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

const throttledScroll = throttle(onScroll, 1000);

// Multiple calls, but only processes once per second
// throttledScroll();
// throttledScroll();
// throttledScroll();

console.log("Throttle pattern example shown");

// ============================================
// 9. REQUESTANIMATIONFRAME
// ============================================
console.log("\n=== requestAnimationFrame ===\n");

// requestAnimationFrame: Better for animations
// Syncs with browser refresh rate (~60fps)

let frame = 0;
const maxFrames = 5;

function animate() {
  frame++;
  console.log(`Frame ${frame}`);

  if (frame < maxFrames) {
    const frameId = requestAnimationFrame(animate);
    // Can cancel with: cancelAnimationFrame(frameId)
  }
}

// animate(); // Uncomment to run animation

console.log("requestAnimationFrame pattern shown");

// ============================================
// 10. SETTIMEOUT VS SETINTERVAL
// ============================================
console.log("\n=== setTimeout vs setInterval ===\n");

// setTimeout: Single execution after delay
setTimeout(() => {
  console.log("Once (setTimeout)");
}, 1000);

// setInterval: Repeated execution at interval
let count2 = 0;
const inter = setInterval(() => {
  count2++;
  console.log(`Repeat ${count2} (setInterval)`);

  if (count2 >= 2) {
    clearInterval(inter);
  }
}, 1000);

console.log("setTimeout vs setInterval shown");

// ============================================
// 11. RECURSIVE SETTIMEOUT
// ============================================
console.log("\n=== Recursive setTimeout ===\n");

// Better than setInterval for cleanup control
function repeatingTask() {
  console.log("Task executed");

  // Schedule next execution
  setTimeout(repeatingTask, 1000);
}

// repeatingTask(); // Uncomment to run

console.log("Recursive setTimeout pattern shown");

// ============================================
// 12. TIMER EDGE CASES
// ============================================
console.log("\n=== Timer Edge Cases ===\n");

// Timers don't execute immediately
setTimeout(() => {
  console.log("Even with 0ms delay, this is async");
}, 0);

console.log("This runs before the timeout");

// Maximum timer values
const MAX_INT = 2147483647; // ~24.8 days

// Timers continue even if nested callback clears
const id3 = setInterval(() => {
  console.log("Running");
  clearInterval(id3); // Clear on first run
}, 500);

// Timer fire order (FIFO for same time)
setTimeout(() => {
  console.log("First");
}, 100);

setTimeout(() => {
  console.log("Second");
}, 100);

// Both execute at 100ms, in order added

// ============================================
// SUMMARY
// ============================================
console.log("\n=== TIMERS SUMMARY ===\n");
console.log("✓ setTimeout: One-time execution after delay");
console.log("✓ setInterval: Repeated execution at intervals");
console.log("✓ clearTimeout/clearInterval: Cancel timers");
console.log("✓ requestAnimationFrame: Best for animations");
console.log("✓ Debounce: Delay action until activity stops");
console.log("✓ Throttle: Limit action frequency");
console.log("✓ 0ms delay: Still asynchronous");
console.log("✓ Use recursive setTimeout for cleanup control");
