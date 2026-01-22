/**
 * Module 8: Execution Context & Scope
 * Concepts: Execution Context
 *
 * Comprehensive examples of JavaScript execution context
 */

// ============================================
// 1. GLOBAL EXECUTION CONTEXT
// ============================================
console.log("=== Global Execution Context ===\n");

// Global context created when script starts
var globalVar = "global"; // In global context
globalVariable = "implicit global"; // Creates global property

function checkGlobal() {
  console.log("Inside function, accessing global:", globalVar);
}

checkGlobal();

// In browser: window.globalVar exists
// In Node.js: global.globalVar exists

console.log("Global context is created at script start");

// ============================================
// 2. FUNCTION EXECUTION CONTEXT
// ============================================
console.log("\n=== Function Execution Context ===\n");

// Each function call creates new execution context
function createContext(name) {
  const localVar = name; // Local to this context
  const number = 42; // Local to this context

  console.log(`Context for ${localVar}`);
  return localVar;
}

createContext("Context 1");
createContext("Context 2");

// Each call has separate context
console.log("Each function call gets new execution context");

// ============================================
// 3. EXECUTION CONTEXT PHASES
// ============================================
console.log("\n=== Execution Context Phases ===\n");

// Phase 1: Creation Phase
// - Create variable object / scope object
// - Create scope chain
// - Determine 'this' value
// - Hoist function declarations and var declarations

// Phase 2: Execution Phase
// - Execute code line by line
// - Assign values to variables
// - Execute function calls

// Example showing hoisting (part of creation phase)
console.log("x before declaration:", typeof x); // undefined
var x = 5;
console.log("x after declaration:", x); // 5

console.log("Creation phase hoists declarations");

// ============================================
// 4. LOCAL EXECUTION CONTEXT
// ============================================
console.log("\n=== Local Execution Context ===\n");

function localScope() {
  // This function creates a local execution context
  var localVar = "I'm local";
  let blockVar = "also local";
  const constVar = "definitely local";

  console.log("Inside function:", localVar);

  if (true) {
    var ifVar = "var in if"; // Function-scoped
    let ifLet = "let in if"; // Block-scoped
  }

  console.log("ifVar (var):", ifVar); // Accessible
  // console.log("ifLet (let):", ifLet); // ❌ ReferenceError
}

localScope();
// console.log("localVar:", localVar); // ❌ ReferenceError

// ============================================
// 5. THIS BINDING IN CONTEXTS
// ============================================
console.log("\n=== This Binding ===\n");

// Global 'this'
console.log("Global this:", typeof globalThis); // object

// In function (global context)
function checkThis() {
  console.log("In function, this:", this === globalThis); // true
}
checkThis();

// In object method
const obj = {
  name: "Object",
  method: function () {
    console.log("In method, this.name:", this.name); // "Object"
  },
};
obj.method();

// In arrow function (lexical this)
const arrowMethod = {
  name: "Arrow",
  arrow: () => {
    console.log("Arrow this:", this === globalThis); // true (global)
  },
};
arrowMethod.arrow();

// ============================================
// 6. VARIABLE HOISTING IN CONTEXT
// ============================================
console.log("\n=== Variable Hoisting ===\n");

// var is hoisted (but not initialized)
console.log("beforeDeclaration:", typeof beforeDeclaration); // undefined
var beforeDeclaration = "value";

// function declarations are fully hoisted
console.log("beforeFunctionDeclaration:", typeof beforeFunctionDeclaration); // function
function beforeFunctionDeclaration() {
  return "hoisted";
}

// let/const are hoisted but not initialized (TDZ)
// console.log("beforeLet:", beforeLet); // ❌ ReferenceError
let beforeLet = "value";

console.log("var hoisted, let/const in TDZ");

// ============================================
// 7. NESTED CONTEXTS
// ============================================
console.log("\n=== Nested Execution Contexts ===\n");

function outer() {
  const outerVar = "outer";

  function inner() {
    const innerVar = "inner";

    function innermost() {
      const innermostVar = "innermost";

      console.log("innermost can access:");
      console.log("- innermostVar:", innermostVar);
      console.log("- innerVar:", innerVar);
      console.log("- outerVar:", outerVar);
    }

    innermost();
  }

  inner();
}

outer();

// ============================================
// 8. CONTEXT WITH BLOCKS
// ============================================
console.log("\n=== Block-Level Context ===\n");

{
  // Block creates new context for let/const
  let blockLet = "block";
  const blockConst = "block";
  var blockVar = "block";
}

// console.log("blockLet:", blockLet); // ❌ ReferenceError
// console.log("blockConst:", blockConst); // ❌ ReferenceError
console.log("blockVar:", blockVar); // Accessible (var is function-scoped)

// Blocks with let/const create new scope
for (let i = 0; i < 3; i++) {
  // Each iteration gets new 'i'
  console.log("Loop iteration:", i);
}
// console.log("i after loop:", i); // ❌ ReferenceError

// ============================================
// 9. CONTEXT WITH TRY-CATCH
// ============================================
console.log("\n=== Try-Catch Context ===\n");

try {
  throw new Error("Test error");
} catch (e) {
  // 'e' is local to catch block
  console.log("Caught error:", e.message);
}

// console.log("e outside catch:", e); // ❌ ReferenceError

// ============================================
// 10. ASYNC FUNCTION CONTEXT
// ============================================
console.log("\n=== Async Function Context ===\n");

async function asyncContext() {
  // Async function creates special execution context
  // Can use await inside

  const value = await Promise.resolve("resolved");
  console.log("Async context value:", value);
}

asyncContext();

// ============================================
// 11. CLASS METHOD CONTEXTS
// ============================================
console.log("\n=== Class Method Contexts ===\n");

class MyClass {
  constructor(name) {
    this.name = name; // Context has 'this' as instance
  }

  method() {
    console.log("Method context, this.name:", this.name);
  }

  arrowMethod = () => {
    // Arrow in class: this is instance (via field)
    console.log("Arrow method, this.name:", this.name);
  };
}

const instance = new MyClass("Test");
instance.method();

// ============================================
// 12. CONTEXT AND CLOSURES
// ============================================
console.log("\n=== Context & Closures ===\n");

function createCounter() {
  let count = 0; // Part of execution context

  return {
    increment() {
      count++; // Closure remembers execution context
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log("Counter 1:", counter1.increment()); // 1
console.log("Counter 1:", counter1.increment()); // 2
console.log("Counter 2:", counter2.increment()); // 1

console.log("Each instance has separate execution context");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== EXECUTION CONTEXT SUMMARY ===\n");
console.log("✓ Global context created at script start");
console.log("✓ Function context created at each call");
console.log("✓ Creation phase: declarations hoisted");
console.log("✓ Execution phase: code runs line by line");
console.log("✓ Each context has: variable object, scope, this");
console.log("✓ Block context for let/const (not var)");
console.log("✓ Nested contexts create scope chain");
console.log("✓ Closures capture execution context");
