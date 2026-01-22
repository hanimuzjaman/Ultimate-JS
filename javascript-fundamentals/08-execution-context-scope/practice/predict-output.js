/**
 * Module 8: Execution Context & Scope
 * Practice: Predict Output
 *
 * Exercises to understand execution context and hoisting
 */

// ============================================
// EXERCISE 1: HOISTING PREDICTION
// ============================================
console.log("=== Exercise 1: Hoisting ===\n");

// What gets logged?
console.log("x before declaration:", typeof x); // What's logged?
var x = 5;
console.log("x after declaration:", x); // What's logged?

// Answer: undefined, 5 (var hoisted)

// ============================================
// EXERCISE 2: LET TEMPORAL DEAD ZONE
// ============================================
console.log("\n=== Exercise 2: TDZ ===\n");

try {
  console.log("y:", y); // What happens?
} catch (e) {
  console.log("Error:", e.message); // ReferenceError
}

let y = 10;

// Answer: ReferenceError (TDZ prevents access)

// ============================================
// EXERCISE 3: FUNCTION DECLARATION
// ============================================
console.log("\n=== Exercise 3: Function Declaration ===\n");

// Can we call before declaration?
console.log(sayHello()); // What happens?

function sayHello() {
  return "Hello";
}

// Answer: "Hello" (function fully hoisted)

// ============================================
// EXERCISE 4: FUNCTION EXPRESSION
// ============================================
console.log("\n=== Exercise 4: Function Expression ===\n");

// Can we call before assignment?
try {
  console.log(expressFunc()); // What happens?
} catch (e) {
  console.log("Error:", e.message); // TypeError
}

var expressFunc = function () {
  return "Hello from expression";
};

console.log(expressFunc()); // Now works

// Answer: TypeError (expressFunc is undefined until assignment)

// ============================================
// EXERCISE 5: VAR VS LET SCOPE
// ============================================
console.log("\n=== Exercise 5: Var vs Let Scope ===\n");

for (var i = 0; i < 3; i++) {}
console.log("i after var loop:", i); // What's logged?

for (let j = 0; j < 3; j++) {}
try {
  console.log("j after let loop:", j); // What happens?
} catch (e) {
  console.log("Error:", e.message); // ReferenceError
}

// Answer: 3, ReferenceError (var function-scoped, let block-scoped)

// ============================================
// EXERCISE 6: VARIABLE SHADOWING
// ============================================
console.log("\n=== Exercise 6: Variable Shadowing ===\n");

const name = "Global";

{
  const name = "Block";
  console.log("In block:", name); // What's logged?
}

console.log("Outside block:", name); // What's logged?

// Answer: "Block", "Global"

// ============================================
// EXERCISE 7: THIS BINDING
// ============================================
console.log("\n=== Exercise 7: This Binding ===\n");

const obj = {
  value: 42,
  regularFunc: function () {
    console.log("Regular:", this.value); // What's logged?
  },
  arrowFunc: () => {
    console.log("Arrow:", this.value); // What's logged?
  },
};

obj.regularFunc(); // 42 (this = obj)
obj.arrowFunc(); // undefined (this = global)

// ============================================
// EXERCISE 8: CLOSURE SCOPE
// ============================================
console.log("\n=== Exercise 8: Closure Scope ===\n");

function outer() {
  const x = 10;

  function inner() {
    console.log("Inner x:", x); // What's logged?
  }

  return inner;
}

const func = outer();
func(); // What happens?

// Answer: 10 (closure retains outer scope)

// ============================================
// EXERCISE 9: NESTED SCOPES
// ============================================
console.log("\n=== Exercise 9: Nested Scopes ===\n");

const a = 1;

{
  const b = 2;

  {
    const c = 3;
    console.log("Can access:", a, b, c); // What's logged?
  }

  try {
    console.log("Can't access c:", c); // What happens?
  } catch (e) {
    console.log("Error:", e.message); // ReferenceError
  }
}

// Answer: 1 2 3, ReferenceError

// ============================================
// EXERCISE 10: FUNCTION SCOPE
// ============================================
console.log("\n=== Exercise 10: Function Scope ===\n");

function testScope() {
  var funcVar = "function";

  if (true) {
    var ifVar = "if block";
  }

  console.log("Can access ifVar:", ifVar); // What's logged?
}

testScope();

try {
  console.log("Outside function:", funcVar); // What happens?
} catch (e) {
  console.log("Error:", e.message); // ReferenceError
}

// Answer: "if block", ReferenceError

// ============================================
// EXERCISE 11: HOISTING WITH SHADOWING
// ============================================
console.log("\n=== Exercise 11: Hoisting + Shadowing ===\n");

var name2 = "Global";

function test() {
  console.log("name2 before:", typeof name2); // What's logged?

  var name2 = "Local";

  console.log("name2 after:", name2); // What's logged?
}

test();
console.log("name2 global:", name2); // What's logged?

// Answer: undefined (hoisted locally), "Local", "Global"

// ============================================
// EXERCISE 12: IMMEDIATE EXECUTION
// ============================================
console.log("\n=== Exercise 12: Immediate Execution ===\n");

const result = (function () {
  const privateVar = "private";
  return privateVar;
})();

console.log("Result:", result); // What's logged?

try {
  console.log("privateVar:", privateVar); // What happens?
} catch (e) {
  console.log("Error:", e.message); // ReferenceError
}

// Answer: "private", ReferenceError

// ============================================
// EXERCISE 13: BLOCK SCOPE WITH CONST
// ============================================
console.log("\n=== Exercise 13: Const Block Scope ===\n");

{
  const max = 100;
  console.log("In block:", max); // What's logged?
}

try {
  console.log("Outside block:", max); // What happens?
} catch (e) {
  console.log("Error:", e.message); // ReferenceError
}

// Answer: 100, ReferenceError

// ============================================
// EXERCISE 14: MULTIPLE DECLARATIONS
// ============================================
console.log("\n=== Exercise 14: Multiple Declarations ===\n");

var x2 = 1;
var x2 = 2; // Allowed with var
console.log("x2:", x2); // What's logged?

let y2 = 1;
try {
  let y2 = 2; // What happens?
} catch (e) {
  // Allowed in different block
  console.log("let y2 in block allowed");
}

// Answer: 2, allowed (different block)

// ============================================
// EXERCISE 15: SCOPE CHAIN RESOLUTION
// ============================================
console.log("\n=== Exercise 15: Scope Chain ===\n");

const level1 = "L1";

{
  const level2 = "L2";

  {
    const level3 = "L3";

    console.log("Access all:", level1, level2, level3); // What's logged?
  }
}

// Answer: "L1" "L2" "L3"

// ============================================
// SUMMARY
// ============================================
console.log("\n=== PREDICTION SUMMARY ===\n");
console.log("✓ var hoisted, initialized as undefined");
console.log("✓ let/const hoisted but in TDZ");
console.log("✓ function declarations fully hoisted");
console.log("✓ var function-scoped, let/const block-scoped");
console.log("✓ Inner scope accesses outer scope");
console.log("✓ Shadowing hides outer variables");
console.log("✓ this depends on how function is called");
console.log("✓ Closures capture outer scope");
