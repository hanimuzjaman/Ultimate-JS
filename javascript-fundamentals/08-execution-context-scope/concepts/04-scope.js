/**
 * Module 8: Execution Context & Scope
 * Concepts: Scope
 *
 * Comprehensive examples of JavaScript scope
 */

// ============================================
// 1. GLOBAL SCOPE
// ============================================
console.log("=== Global Scope ===\n");

// Variables declared at top level are global
var globalVar = "global";
let globalLet = "global let";
const globalConst = "global const";

function accessGlobal() {
  console.log("From function:", globalVar);
  console.log("From function:", globalLet);
}

accessGlobal();

// In browser: window.globalVar
// In Node.js: global.globalVar (var only)

console.log("Global variables accessible everywhere");

// ============================================
// 2. FUNCTION SCOPE (var)
// ============================================
console.log("\n=== Function Scope ===\n");

// var has function scope
function functionScope() {
  var functionVar = "inside function";

  if (true) {
    var ifVar = "inside if"; // Still function-scoped
  }

  console.log("ifVar:", ifVar); // Accessible (function-scoped)
}

functionScope();
// console.log("functionVar:", functionVar); // ❌ ReferenceError

console.log("var scoped to function, not block");

// ============================================
// 3. BLOCK SCOPE (let/const)
// ============================================
console.log("\n=== Block Scope ===\n");

// let and const have block scope
{
  let blockLet = "in block";
  const blockConst = "in block";
  var blockVar = "in block";
}

console.log("blockVar:", blockVar); // Accessible
// console.log("blockLet:", blockLet); // ❌ ReferenceError
// console.log("blockConst:", blockConst); // ❌ ReferenceError

console.log("let/const scoped to block");

// ============================================
// 4. NESTED SCOPES
// ============================================
console.log("\n=== Nested Scopes ===\n");

const level1 = "level 1";

{
  const level2 = "level 2";

  {
    const level3 = "level 3";

    console.log("In level 3:");
    console.log("- level1:", level1); // Can access
    console.log("- level2:", level2); // Can access
    console.log("- level3:", level3); // Can access
  }

  // console.log("level3:", level3); // ❌ Not accessible outside its block
}

// ============================================
// 5. FUNCTION SCOPE DEPTH
// ============================================
console.log("\n=== Function Scope Depth ===\n");

function outer() {
  const outerVar = "outer";

  function middle() {
    const middleVar = "middle";

    function inner() {
      const innerVar = "inner";

      console.log("Inner can access:");
      console.log("- innerVar:", innerVar);
      console.log("- middleVar:", middleVar);
      console.log("- outerVar:", outerVar);
    }

    inner();
  }

  middle();
}

outer();

// ============================================
// 6. SCOPE SHADOWING
// ============================================
console.log("\n=== Scope Shadowing ===\n");

const x = "global";

{
  const x = "block 1"; // Shadows global x
  console.log("In block 1, x:", x); // "block 1"

  {
    const x = "block 2"; // Shadows block 1's x
    console.log("In block 2, x:", x); // "block 2"
  }

  console.log("Back in block 1, x:", x); // "block 1"
}

console.log("Global x:", x); // "global"

console.log("Inner declarations shadow outer ones");

// ============================================
// 7. SCOPE CHAIN
// ============================================
console.log("\n=== Scope Chain ===\n");

const globalVar2 = "global";

function level1Func() {
  const level1Var = "level 1";

  function level2Func() {
    const level2Var = "level 2";

    // Scope chain for searching variables:
    // 1. Local scope (level2Var)
    // 2. Level 1 scope (level1Var)
    // 3. Global scope (globalVar2)

    console.log("Scope chain:");
    console.log("- level2Var (local):", level2Var);
    console.log("- level1Var (parent):", level1Var);
    console.log("- globalVar2 (global):", globalVar2);
  }

  level2Func();
}

level1Func();

// ============================================
// 8. FOR LOOP SCOPE
// ============================================
console.log("\n=== For Loop Scope ===\n");

// var in for loop
for (var i = 0; i < 3; i++) {
  // i is function-scoped
}
console.log("i after var loop:", i); // 3 (accessible)

// let in for loop
for (let j = 0; j < 3; j++) {
  // j is block-scoped (new j each iteration!)
}
// console.log("j after let loop:", j); // ❌ ReferenceError

// const in for loop
for (const k = 0; k < 1; k++) {
  console.log("k:", k); // Works (const for iterator)
}
// console.log("k after const loop:", k); // ❌ ReferenceError

console.log("let creates new binding each iteration");

// ============================================
// 9. CLOSURE SCOPE
// ============================================
console.log("\n=== Closure Scope ===\n");

function makeCounter() {
  let count = 0; // Private variable

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log("Counter1:", counter1.increment()); // 1
console.log("Counter1:", counter1.increment()); // 2
console.log("Counter2:", counter2.increment()); // 1

console.log("Each closure has separate scope");

// ============================================
// 10. CONDITIONAL SCOPE
// ============================================
console.log("\n=== Conditional Scope ===\n");

const condition = true;

if (condition) {
  let conditionalLet = "in if";
  var conditionalVar = "in if";

  console.log("Inside if:", conditionalLet);
}

// console.log("Outside if:", conditionalLet); // ❌ ReferenceError
console.log("Outside if:", conditionalVar); // Works (function-scoped)

// ============================================
// 11. TRY-CATCH SCOPE
// ============================================
console.log("\n=== Try-Catch Scope ===\n");

try {
  throw new Error("Test error");
} catch (error) {
  // error is block-scoped to catch
  console.log("Caught:", error.message);
}

// console.log("error outside catch:", error); // ❌ ReferenceError

// ============================================
// 12. BEST PRACTICES
// ============================================
console.log("\n=== Scope Best Practices ===\n");

// ✓ Use const by default
const bestDefault = "use const";

// ✓ Use let when need to reassign
let needsChange = "initial";
needsChange = "updated";

// ✓ Avoid var (function scope confusing)
// var avoidThis = "don't use var";

// ✓ Keep scope as narrow as possible
{
  const temp = "only needed here";
  console.log(temp);
}
// temp not accessible outside

// ✓ Declare variables close to usage
function goodOrganization() {
  // Use as soon as declared
  const needed = "value";
  console.log(needed);

  // Declare other variables when needed
  const alsoNeeded = "another value";
  console.log(alsoNeeded);
}

goodOrganization();

// ============================================
// SUMMARY
// ============================================
console.log("\n=== SCOPE SUMMARY ===\n");
console.log("✓ Global scope: accessible everywhere");
console.log("✓ Function scope (var): scoped to function");
console.log("✓ Block scope (let/const): scoped to block");
console.log("✓ Nested scopes: inner accesses outer");
console.log("✓ Scope chain: searches local → parent → global");
console.log("✓ Shadowing: inner variables hide outer ones");
console.log("✓ Closures: functions remember their scope");
console.log("✓ Best practice: const > let >> var");
