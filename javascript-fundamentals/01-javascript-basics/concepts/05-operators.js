// ===============================
// Arithmetic Operators
// ===============================
let a = 10;
let b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** b);

// ===============================
// Assignment Operators
// ===============================
let count = 5;
count += 2;
count -= 1;
count *= 2;
count /= 2;

console.log(count);

// ===============================
// Comparison Operators
// ===============================
console.log(5 == "5");
console.log(5 === "5");
console.log(5 != 3);
console.log(5 !== "5");
console.log(10 > 5);
console.log(10 <= 5);

// ===============================
// Logical Operators
// ===============================
let isLoggedIn = true;
let isAdmin = false;

console.log(isLoggedIn && isAdmin);
console.log(isLoggedIn || isAdmin);
console.log(!isLoggedIn);

// ===============================
// Unary Operators
// ===============================
let num = 5;
num++;
num--;

console.log(num);
console.log(typeof num);

// ===============================
// Ternary Operator
// ===============================
let age = 18;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);

// ===============================
// Bitwise Operators
// ===============================
console.log(5 & 1);
console.log(5 | 1);
console.log(5 ^ 1);
console.log(5 << 1);
console.log(5 >> 1);
