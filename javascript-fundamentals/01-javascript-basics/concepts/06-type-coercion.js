// ===============================
// Implicit Type Coercion
// ===============================

// String coercion
console.log(5 + "5"); // "55"
console.log("Hello" + 10); // "Hello10"

// Number coercion
console.log("10" - 5); // 5
console.log("10" * 2); // 20
console.log("10" / 2); // 5

// Boolean coercion
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean("JS")); // true

// In conditions
if ("") {
  console.log("Truthy");
} else {
  console.log("Falsy");
}

// ===============================
// Explicit Type Coercion
// ===============================

console.log(Number("10")); // 10
console.log(String(100)); // "100"
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false

// ===============================
// Loose vs Strict Equality
// ===============================

console.log(5 == "5"); // true
console.log(5 === "5"); // false

console.log(null == undefined); // true
console.log(null === undefined); // false

// ===============================
// Weird but Important Cases
// ===============================

console.log(true + 1); // 2
console.log(false + 1); // 1
console.log([] + []); // ""
console.log([] + {}); // "[object Object]"
console.log({} + []); // 0 (depends on context)
