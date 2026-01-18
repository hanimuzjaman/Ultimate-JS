/* =====================================================
   BASIC DECLARATIONS
   Meaning:
   Variables are declared using var, let, or const.
   The keyword used determines scope, hoisting behavior,
   and whether reassignment is allowed.
===================================================== */

// var — function-scoped, allows re-declaration (legacy)
var name = "Alice";
var name = "Bob"; // re-declaration allowed
name = "Charlie"; // reassignment allowed

// let — block-scoped, reassignment allowed
let age = 25;
age = 26;

// const — block-scoped, reassignment NOT allowed
const country = "India";
// country = "USA";     // ❌ TypeError

/* =====================================================
   BLOCK SCOPE
   Meaning:
   A variable has block scope if it is accessible only
   within the block `{}` where it is declared.
   `let` and `const` are block-scoped.
===================================================== */

if (true) {
  var a = 10; // NOT block-scoped
  let b = 20; // block-scoped
  const c = 30; // block-scoped
}

console.log(a); // 10
// console.log(b); // ❌ ReferenceError
// console.log(c); // ❌ ReferenceError

/* =====================================================
   FUNCTION SCOPE
   Meaning:
   A variable has function scope if it is accessible
   only inside the function where it is declared.
   `var` is function-scoped.
===================================================== */

function scopeTest() {
  var x = 100; // function-scoped
  let y = 200; // block-scoped (function block)
  const z = 300;

  console.log(x, y, z);
}

scopeTest();
// console.log(x); // ❌ ReferenceError

/* =====================================================
   HOISTING
   Meaning:
   Hoisting is JavaScript’s behavior of moving variable
   and function declarations to the top of their scope
   during the creation phase.
===================================================== */

// var is hoisted and initialized as undefined
console.log(hoistedVar); // undefined
var hoistedVar = "Hoisted";

// let/const are hoisted but remain in TDZ
// console.log(hoistedLet); // ❌ ReferenceError
let hoistedLet = "TDZ";

/* =====================================================
   CONST WITH OBJECTS & ARRAYS
   Meaning:
   `const` prevents reassignment of the variable binding,
   but allows mutation of the object or array it references.
===================================================== */

const user = {
  name: "John",
  age: 30,
};

user.age = 31; // ✅ allowed
// user = {}; // ❌ TypeError

const nums = [1, 2, 3];
nums.push(4); // ✅ allowed

/* =====================================================
   VARIABLE SHADOWING
   Meaning:
   Shadowing occurs when a variable in an inner scope
   has the same name as a variable in an outer scope.
   The inner variable takes precedence within its scope.
===================================================== */

let value = "global";

function shadowing() {
  let value = "local"; // shadows global variable
  console.log(value); // local
}

shadowing();
console.log(value); // global

/* =====================================================
   TEMPORAL DEAD ZONE (TDZ)
   Meaning:
   The TDZ is the time between entering a scope and
   the actual declaration of a let/const variable.
   Accessing the variable during this time throws an error.
===================================================== */

{
  // console.log(tdz); // ❌ ReferenceError (TDZ)
  let tdz = "Inside TDZ";
}
