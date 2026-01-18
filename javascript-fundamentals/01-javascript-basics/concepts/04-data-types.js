/* =====================================================
   PRIMITIVE DATA TYPES
===================================================== */

// Number
let score = 95;
let price = 99.99;
let notANumber = NaN;

// String
let firstName = "John";
let greeting = `Hello, ${firstName}`;

// Boolean
let isLoggedIn = true;

// Undefined
let userEmail;
console.log(userEmail); // undefined

// Null
let selectedItem = null;

// Symbol
const id = Symbol("userId");
const anotherId = Symbol("userId");
console.log(id === anotherId); // false

// BigInt
let bigNumber = 123456789012345678901234567890n;

/* =====================================================
   NON-PRIMITIVE (REFERENCE) DATA TYPES
===================================================== */

// Object
const user = {
  name: "Alice",
  age: 25,
};

// Array
const numbers = [1, 2, 3, 4];

// Function
function add(a, b) {
  return a + b;
}

/* =====================================================
   TYPEOF OPERATOR
===================================================== */

console.log(typeof score); // number
console.log(typeof firstName); // string
console.log(typeof isLoggedIn); // boolean
console.log(typeof userEmail); // undefined
console.log(typeof selectedItem); // object (JS quirk)
console.log(typeof user); // object
console.log(typeof add); // function
