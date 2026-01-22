/* ===================================================================
   JAVASCRIPT BASICS - PRACTICE EXERCISES
   Topic: Type Checker - Understanding Data Types

   Instructions:
   1. Uncomment exercise blocks one at a time
   2. Run them and observe the output
   3. Modify values to understand how typeof behaves
=================================================================== */

// ===================================================================
// EXERCISE 1: Basic typeof Operator (Beginner)
// ===================================================================
// Goal: Understand what typeof returns for different data types

/*
const myNumber = 42;
const myString = "Hello";
const myBoolean = true;
const myUndefined = undefined;
const myNull = null;

console.log(`typeof ${myNumber} = ${typeof myNumber}`);
console.log(`typeof "${myString}" = ${typeof myString}`);
console.log(`typeof ${myBoolean} = ${typeof myBoolean}`);
console.log(`typeof undefined = ${typeof myUndefined}`);
console.log(`typeof null = ${typeof myNull}`);  // ⚠️ Returns "object" - a quirk in JS!
*/

// ===================================================================
// EXERCISE 2: Type Checking for Objects and Arrays (Beginner)
// ===================================================================
// Goal: Distinguish between different reference types

/*
const myObject = { name: "John", age: 30 };
const myArray = [1, 2, 3];
const myFunction = function() { return 42; };

console.log(`typeof {} = ${typeof myObject}`);
console.log(`typeof [] = ${typeof myArray}`);  // Returns "object" - arrays are objects!
console.log(`typeof function() {} = ${typeof myFunction}`);

// Better way to check for arrays
console.log(`Array.isArray([1, 2, 3]) = ${Array.isArray(myArray)}`);
console.log(`Array.isArray({}) = ${Array.isArray(myObject)}`);
*/

// ===================================================================
// EXERCISE 3: Type Checker Function (Intermediate)
// ===================================================================
// Goal: Create a function that properly identifies data types

/*
function getDataType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  return typeof value;
}

console.log(getDataType(42));           // "number"
console.log(getDataType("hello"));      // "string"
console.log(getDataType(true));         // "boolean"
console.log(getDataType([1, 2, 3]));    // "array"
console.log(getDataType({ x: 1 }));     // "object"
console.log(getDataType(null));         // "null"
console.log(getDataType(undefined));    // "undefined"
*/

// ===================================================================
// EXERCISE 4: Checking for Falsy Values (Intermediate)
// ===================================================================
// Goal: Understand JavaScript's falsy values

/*
const falsyValues = [0, "", false, null, undefined, NaN];
const truthyValues = [1, "hello", true, [], {}, "0", -1];

console.log("=== FALSY VALUES ===");
falsyValues.forEach(value => {
  console.log(`Value: ${value} (type: ${typeof value}) => Boolean: ${Boolean(value)}`);
});

console.log("\n=== TRUTHY VALUES ===");
truthyValues.forEach(value => {
  console.log(`Value: ${value} (type: ${typeof value}) => Boolean: ${Boolean(value)}`);
});

// Using in conditionals
if (0) {
  console.log("This won't print");
} else {
  console.log("0 is falsy!");
}

if ("") {
  console.log("This won't print");
} else {
  console.log("Empty string is falsy!");
}
*/

// ===================================================================
// EXERCISE 5: Type Validation Function (Intermediate)
// ===================================================================
// Goal: Validate if values are of expected types

/*
function isValidEmail(email) {
  return typeof email === "string" && email.includes("@");
}

function isValidAge(age) {
  return typeof age === "number" && age >= 0 && age <= 120;
}

function isValidUser(user) {
  return typeof user === "object" &&
         user !== null &&
         typeof user.name === "string" &&
         typeof user.age === "number";
}

console.log(isValidEmail("john@example.com"));  // true
console.log(isValidEmail("not-an-email"));      // false
console.log(isValidEmail(123));                 // false

console.log(isValidAge(25));                    // true
console.log(isValidAge(-5));                    // false
console.log(isValidAge("25"));                  // false

const validUser = { name: "John", age: 30 };
const invalidUser = { name: "Jane" };

console.log(isValidUser(validUser));            // true
console.log(isValidUser(invalidUser));          // false
console.log(isValidUser("not a user"));         // false
*/

// ===================================================================
// EXERCISE 6: Type Coercion Surprises (Advanced)
// ===================================================================
// Goal: Understand unexpected type coercion behaviors

/*
console.log("=== SURPRISING TYPE COERCIONS ===");

// String + Number
console.log("5" + 3);          // "53" (string concatenation!)
console.log("5" - 3);          // 2 (numeric subtraction)
console.log("5" * "2");        // 10 (numeric multiplication)

// Truthy/Falsy in operations
console.log(true + 1);         // 2
console.log(false + 1);        // 1
console.log(true + true);      // 2

// Comparison operators
console.log(1 == "1");         // true (loose equality - type coercion)
console.log(1 === "1");        // false (strict equality - no coercion)

// null and undefined
console.log(null == undefined);    // true
console.log(null === undefined);   // false

// Logical operators with type coercion
console.log(0 || "default");       // "default"
console.log("" || "default");      // "default"
console.log(null || "default");    // "default"
console.log(undefined || "default"); // "default"
*/

// ===================================================================
// EXERCISE 7: Symbol Type (Advanced)
// ===================================================================
// Goal: Understand the Symbol primitive type (ES6)

/*
const id1 = Symbol("userId");
const id2 = Symbol("userId");

console.log(typeof id1);        // "symbol"
console.log(id1 === id2);       // false (each Symbol is unique!)

// Using symbols as object keys (prevents accidental overwrites)
const user = {
  [id1]: 123,
  [id2]: 456,
  name: "John"
};

console.log(user[id1]);         // 123
console.log(user[id2]);         // 456
console.log(user.name);         // "John"
*/

// ===================================================================
// EXERCISE 8: BigInt Type (Advanced)
// ===================================================================
// Goal: Work with numbers larger than Number.MAX_SAFE_INTEGER

/*
const regularNumber = 9007199254740991;      // MAX_SAFE_INTEGER
const bigNumber = 9007199254740992n;         // Using 'n' suffix for BigInt

console.log(typeof regularNumber);           // "number"
console.log(typeof bigNumber);               // "bigint"

console.log(regularNumber === regularNumber + 1);  // true (precision lost!)
console.log(bigNumber === bigNumber + 1n);         // false (accurate)

// Mathematical operations with BigInt
console.log(bigNumber + 1n);                 // 9007199254740993n
console.log(bigNumber * 2n);                 // 18014398509481984n

// Cannot mix BigInt with regular numbers
// console.log(bigNumber + 1);  // ❌ TypeError

// Convert between BigInt and Number
console.log(Number(1000n));                  // 1000
console.log(BigInt(1000));                   // 1000n
*/

// ===================================================================
// EXERCISE 9: Deep Type Checking Utility (Advanced)
// ===================================================================
// Goal: Create a comprehensive type-checking utility

/*
function getDetailedType(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return "array";
  if (value instanceof Map) return "map";
  if (value instanceof Set) return "set";
  if (value instanceof Date) return "date";
  if (value instanceof RegExp) return "regexp";
  if (typeof value === "bigint") return "bigint";
  if (typeof value === "symbol") return "symbol";
  return typeof value;
}

console.log(getDetailedType(42));               // "number"
console.log(getDetailedType([1, 2, 3]));        // "array"
console.log(getDetailedType(new Date()));       // "date"
console.log(getDetailedType(new Map()));        // "map"
console.log(getDetailedType(/regex/));          // "regexp"
console.log(getDetailedType(Symbol("id")));     // "symbol"
console.log(getDetailedType(100n));             // "bigint"
*/

// ===================================================================
// EXERCISE 10: Real-World Type Checking (Advanced)
// ===================================================================
// Goal: Create a form validator that checks types

/*
function validateFormData(data) {
  const errors = [];

  // Check if data is an object
  if (typeof data !== "object" || data === null) {
    return ["Data must be an object"];
  }

  // Validate name (must be non-empty string)
  if (typeof data.name !== "string" || data.name.trim() === "") {
    errors.push("Name must be a non-empty string");
  }

  // Validate email (must be string with @)
  if (typeof data.email !== "string" || !data.email.includes("@")) {
    errors.push("Email must be a valid email address");
  }

  // Validate age (must be a number between 0-120)
  if (typeof data.age !== "number" || data.age < 0 || data.age > 120) {
    errors.push("Age must be a number between 0 and 120");
  }

  // Validate hobbies (must be an array if provided)
  if (data.hobbies !== undefined && !Array.isArray(data.hobbies)) {
    errors.push("Hobbies must be an array");
  }

  return errors.length === 0 ? ["Valid!"] : errors;
}

const validUser = {
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  hobbies: ["reading", "gaming"]
};

const invalidUser = {
  name: "",
  email: "invalid-email",
  age: 150,
  hobbies: "reading"
};

console.log("Valid User Validation:");
console.log(validateFormData(validUser));

console.log("\nInvalid User Validation:");
console.log(validateFormData(invalidUser));
*/

console.log(
  "✅ Type checker exercises are ready! Uncomment them one at a time.",
);
