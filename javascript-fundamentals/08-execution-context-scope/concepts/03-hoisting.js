/**
 * Module 8: Execution Context & Scope
 * Concepts: Hoisting
 *
 * Comprehensive examples of hoisting in JavaScript
 */

// ============================================
// 1. VAR HOISTING
// ============================================
console.log("=== Var Hoisting ===\n");

// var declarations are hoisted and initialized as undefined
console.log("beforeDeclaration:", typeof beforeDeclaration); // undefined
var beforeDeclaration = "I'm hoisted";
console.log("afterDeclaration:", beforeDeclaration); // "I'm hoisted"

// This is interpreted as:
// var beforeDeclaration; (hoisted, = undefined)
// console.log(beforeDeclaration); // undefined
// beforeDeclaration = "I'm hoisted";

// var can be redeclared
var x = 1;
var x = 2; // Allowed, no error
console.log("x after redeclaration:", x); // 2

// ============================================
// 2. FUNCTION DECLARATION HOISTING
// ============================================
console.log("\n=== Function Declaration Hoisting ===\n");

// Function declarations are fully hoisted
console.log("Calling before declaration:");
console.log(callBeforeDeclaration()); // "Hello from declaration"

function callBeforeDeclaration() {
  return "Hello from declaration";
}

// Function expressions are NOT fully hoisted
// Only the var is hoisted
console.log("Expression type:", typeof expressionFunction); // undefined
// console.log(expressionFunction()); // ❌ TypeError

var expressionFunction = function () {
  return "Hello from expression";
};

console.log("After assignment:", expressionFunction()); // Works

// ============================================
// 3. LET AND CONST HOISTING
// ============================================
console.log("\n=== Let and Const Hoisting ===\n");

// let and const are hoisted but NOT initialized
// They're in Temporal Dead Zone (TDZ)

try {
  console.log("letBeforeDeclaration:", letBeforeDeclaration); // ❌ ReferenceError
} catch (error) {
  console.log("Error:", error.message);
}

let letBeforeDeclaration = "I'm in TDZ";

// Same with const
try {
  console.log("constBeforeDeclaration:", constBeforeDeclaration); // ❌ ReferenceError
} catch (error) {
  console.log("Error:", error.message);
}

const constBeforeDeclaration = "I'm in TDZ";

// ============================================
// 4. TEMPORAL DEAD ZONE (TDZ)
// ============================================
console.log("\n=== Temporal Dead Zone ===\n");

function tdzExample() {
  // x is in TDZ from start of function until declaration

  // if (true) {
  //   console.log(x); // ❌ ReferenceError - in TDZ
  //   let x = 5;
  // }

  console.log("TDZ prevents access to let/const before declaration");
}

tdzExample();

// TDZ for block scopes
{
  // y is in TDZ here
  console.log("Before let declaration");
  let y = 10;
  console.log("After let declaration, y =", y);
}

// ============================================
// 5. FUNCTION HOISTING PRIORITY
// ============================================
console.log("\n=== Hoisting Priority ===\n");

// Function declarations have priority
// They're hoisted before var declarations

console.log("priorityFunc:", typeof priorityFunc); // function
console.log("priorityVar:", typeof priorityVar); // undefined

function priorityFunc() {
  return "I'm a function declaration";
}

var priorityVar = "I'm a var";

console.log("Functions hoisted before variables");

// ============================================
// 6. HOISTING IN NESTED SCOPES
// ============================================
console.log("\n=== Hoisting in Nested Scopes ===\n");

function nestedHoisting() {
  // hoistedInner is hoisted in function scope
  console.log("hoistedInner:", typeof hoistedInner); // undefined

  if (true) {
    var hoistedInner = "I'm hoisted to function scope";
  }

  console.log("hoistedInner:", hoistedInner); // Works (function-scoped)
}

nestedHoisting();

// ============================================
// 7. HOISTING WITH PARAMETERS
// ============================================
console.log("\n=== Hoisting with Parameters ===\n");

function parameterHoisting(x, y) {
  // Parameters are in local scope, not hoisted
  console.log("Parameters:", x, y); // 1, 2

  // Local vars are still hoisted
  console.log("localVar:", typeof localVar); // undefined
  var localVar = "value";
}

parameterHoisting(1, 2);

// ============================================
// 8. CLASS HOISTING
// ============================================
console.log("\n=== Class Hoisting ===\n");

// Classes are hoisted but not initialized (like let/const)
// They're in TDZ until declaration

try {
  // const instance = new MyClass(); // ❌ ReferenceError - TDZ
} catch (error) {
  console.log("Class in TDZ");
}

class MyClass {
  constructor() {
    this.name = "MyClass";
  }
}

// Now safe to instantiate
const instance = new MyClass();
console.log("Class accessible after declaration");

// ============================================
// 9. ARROW FUNCTION HOISTING
// ============================================
console.log("\n=== Arrow Function Hoisting ===\n");

// Arrow functions in variables follow variable hoisting
console.log("arrowFunc:", typeof arrowFunc); // undefined

// arrowFunc(); // ❌ TypeError - not a function yet

var arrowFunc = () => "arrow function";

console.log("arrowFunc():", arrowFunc()); // Works after assignment

// ============================================
// 10. HOISTING QUIRKS
// ============================================
console.log("\n=== Hoisting Quirks ===\n");

// Hoisting is per-scope, not global
function outerHoist() {
  console.log("outerVar:", typeof outerVar); // undefined

  if (true) {
    var outerVar = "I'm in function scope";
  }

  console.log("outerVar:", outerVar); // Works
}

// outerVar outside function doesn't work
// console.log("outerVar global:", typeof outerVar); // undefined (not hoisted to global)

outerHoist();

// Same name in different scopes
var sameNameVar = "global";

function sameNameFunc() {
  console.log("sameNameVar (before):", typeof sameNameVar); // undefined (hoisted locally)
  var sameNameVar = "local";
  console.log("sameNameVar (after):", sameNameVar); // "local"
}

sameNameFunc();
console.log("sameNameVar (global):", sameNameVar); // "global"

// ============================================
// 11. PRACTICAL HOISTING GOTCHA
// ============================================
console.log("\n=== Practical Gotcha ===\n");

function hoistingGotcha() {
  if (false) {
    var neverRuns = "This code never executes";
  }

  console.log("neverRuns:", neverRuns); // undefined (hoisted, never assigned)
}

hoistingGotcha();

// Another gotcha
function hoistingGotcha2() {
  console.log("x:", x); // undefined (hoisted)

  if (true) {
    var x = 5;
  }

  console.log("x:", x); // 5 (assigned in if block)
}

hoistingGotcha2();

// ============================================
// 12. BEST PRACTICES
// ============================================
console.log("\n=== Best Practices ===\n");

// ✓ DO: Declare variables at top of scope
function goodPractice() {
  let result;
  const MAX = 100;

  // Logic uses result and MAX
  result = MAX * 2;
  console.log("Good practice result:", result);
}

goodPractice();

// ❌ DON'T: Rely on hoisting
function badPractice() {
  console.log(hoistedVariable); // ❌ Relies on hoisting
  var hoistedVariable = "Bad";
}

// ❌ DON'T: Use var (prefer let/const)
function avoidVar() {
  // let and const have better scoping
  let localLet = "use let";
  const localConst = "use const";
  console.log(localLet, localConst);
}

avoidVar();

console.log("\n✓ Use let/const instead of var");
console.log("✓ Declare variables before use");
console.log("✓ Don't rely on hoisting behavior");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== HOISTING SUMMARY ===\n");
console.log("✓ var: hoisted and initialized as undefined");
console.log("✓ let/const: hoisted but in TDZ");
console.log("✓ function declarations: fully hoisted");
console.log("✓ function expressions: variable is hoisted, not function");
console.log("✓ Hoisting is per-scope");
console.log("✓ Temporal Dead Zone prevents early access");
console.log("✓ Best practice: declare before use");
console.log("✓ Use let/const, avoid var");
