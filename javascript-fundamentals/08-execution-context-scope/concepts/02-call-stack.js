/**
 * Module 8: Execution Context & Scope
 * Concepts: Call Stack
 *
 * Comprehensive examples of JavaScript call stack
 */

// ============================================
// 1. BASIC CALL STACK
// ============================================
console.log("=== Basic Call Stack ===\n");

// Call stack is LIFO (Last In, First Out)
// Tracks function calls and their order

function first() {
  console.log("In first()");
  second();
  console.log("Back in first()");
}

function second() {
  console.log("In second()");
  third();
  console.log("Back in second()");
}

function third() {
  console.log("In third()");
}

// Call stack when first() is called:
// 1. Global context pushed
// 2. first() pushed
// 3. first() calls second(), second() pushed
// 4. second() calls third(), third() pushed
// 5. third() returns, removed from stack
// 6. second() returns, removed from stack
// 7. first() returns, removed from stack

first();

// ============================================
// 2. CALL STACK VISUALIZATION
// ============================================
console.log("\n=== Call Stack Visualization ===\n");

function a() {
  console.log("Executing a()");
  b();
}

function b() {
  console.log("Executing b()");
  c();
}

function c() {
  console.log("Executing c()");
  // Stack now: [Global, a, b, c]
}

// Stack trace:
// Global
//   a()
//     b()
//       c()

a();

// ============================================
// 3. STACK OVERFLOW
// ============================================
console.log("\n=== Stack Overflow ===\n");

// Infinite recursion causes stack overflow
function infiniteRecursion() {
  infiniteRecursion(); // Calls itself forever
}

// Would cause: RangeError: Maximum call stack size exceeded
// Commented to prevent crash
// infiniteRecursion();

console.log("Infinite recursion would overflow stack");

// Safe recursion with base case
function safeRecursion(n) {
  if (n <= 0) {
    console.log("Base case reached");
    return; // Base case prevents infinite recursion
  }
  console.log("Recursion level:", n);
  safeRecursion(n - 1);
}

safeRecursion(3);

// ============================================
// 4. CALL STACK WITH PARAMETERS
// ============================================
console.log("\n=== Call Stack with Parameters ===\n");

function processData(data, callback) {
  console.log("Processing:", data);
  const result = transform(data);
  callback(result);
}

function transform(value) {
  console.log("Transforming:", value);
  return value * 2;
}

function handleResult(result) {
  console.log("Result:", result);
}

// Stack trace during execution:
// Global
//   processData(5, handleResult)
//     transform(5)
//     (returns to processData)
//     handleResult(10)
//     (returns to processData)

processData(5, handleResult);

// ============================================
// 5. STACK WITH CONDITIONAL LOGIC
// ============================================
console.log("\n=== Stack with Conditionals ===\n");

function conditionalCall(x) {
  if (x > 0) {
    positive(x);
  } else if (x < 0) {
    negative(x);
  } else {
    zero();
  }
}

function positive(n) {
  console.log("Positive:", n);
}

function negative(n) {
  console.log("Negative:", n);
}

function zero() {
  console.log("Zero");
}

// Different execution paths create different stacks
conditionalCall(5);
conditionalCall(-3);
conditionalCall(0);

// ============================================
// 6. NESTED FUNCTION CALLS
// ============================================
console.log("\n=== Nested Function Calls ===\n");

function outer1() {
  console.log("outer1 start");

  function inner1() {
    console.log("inner1");
  }

  inner1(); // Stack: Global, outer1, inner1
  console.log("outer1 end");
}

function outer2() {
  console.log("outer2 start");

  function inner2() {
    console.log("inner2");
  }

  inner2(); // Stack: Global, outer2, inner2
  console.log("outer2 end");
}

outer1();
outer2();

// ============================================
// 7. CALL STACK DEPTH MEASUREMENT
// ============================================
console.log("\n=== Call Stack Depth ===\n");

function measureDepth(currentDepth, maxDepth) {
  if (currentDepth >= maxDepth) {
    console.log("Max depth reached:", currentDepth);
    return;
  }

  measureDepth(currentDepth + 1, maxDepth);
}

// Measure how deep we can go
measureDepth(1, 5);

console.log("Call stack grows with recursion depth");

// ============================================
// 8. TAIL CALL OPTIMIZATION (TCO)
// ============================================
console.log("\n=== Tail Call Optimization ===\n");

// Tail call: when function's last operation is calling another function
// TCO: reuses stack frame instead of creating new one

function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  // Tail call: return result of recursive call directly
  return factorial(n - 1, n * acc);
}

// With TCO, stack doesn't grow with recursion
console.log("Factorial of 5:", factorial(5));
console.log("Tail recursion is stack-efficient");

// ============================================
// 9. MULTIPLE FUNCTIONS IN SEQUENCE
// ============================================
console.log("\n=== Sequential Function Calls ===\n");

function step1() {
  console.log("Step 1");
  // Stack: Global, step1
  // Returns, removed from stack
}

function step2() {
  console.log("Step 2");
  // Stack: Global, step2
  // Returns, removed from stack
}

function step3() {
  console.log("Step 3");
  // Stack: Global, step3
  // Returns, removed from stack
}

// Each call has its own stack frame
step1();
step2();
step3();

// Stack is cleared between calls (no accumulation)

// ============================================
// 10. CALL STACK WITH CALLBACKS
// ============================================
console.log("\n=== Call Stack with Callbacks ===\n");

function performOperation(x, callback) {
  console.log("Performing operation on:", x);
  const result = x * 2;

  // Stack during callback: Global, performOperation, callback
  callback(result);

  console.log("Operation complete");
}

function logResult(value) {
  console.log("Logged result:", value);
}

performOperation(5, logResult);

// ============================================
// 11. CALL STACK AND ERROR HANDLING
// ============================================
console.log("\n=== Call Stack in Errors ===\n");

function errorLevel3() {
  throw new Error("Error in level 3");
}

function errorLevel2() {
  errorLevel3(); // Stack: Global, errorLevel2, errorLevel3
}

function errorLevel1() {
  try {
    errorLevel2(); // Stack: Global, errorLevel1, errorLevel2, errorLevel3
  } catch (error) {
    console.log("Caught error:", error.message);
    console.log("Stack trace includes all function calls");
  }
}

errorLevel1();

// ============================================
// 12. STACK FRAME INFORMATION
// ============================================
console.log("\n=== Stack Frame Information ===\n");

function showStack() {
  const error = new Error();
  console.log("Stack trace:");
  console.log(error.stack);
}

showStack();

console.log("Stack trace shows execution path");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== CALL STACK SUMMARY ===\n");
console.log("✓ LIFO structure: Last In, First Out");
console.log("✓ Tracks function execution order");
console.log("✓ New frame added on function call");
console.log("✓ Frame removed on function return");
console.log("✓ Infinite recursion causes overflow");
console.log("✓ Depth limits: ~10,000+ frames typical");
console.log("✓ Tail recursion can be optimized");
console.log("✓ Stack traces help debugging");
