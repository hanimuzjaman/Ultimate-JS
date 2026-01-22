/**
 * Module 3: Functions
 * Concepts: Pure vs Impure Functions
 *
 * Comprehensive examples comparing pure and impure functions
 */

// ============================================
// 1. PURE FUNCTIONS - BASIC EXAMPLES
// ============================================
console.log("=== Pure Functions ===\n");

// Pure: Same input always gives same output
const add = (a, b) => a + b;
console.log("add(2, 3):", add(2, 3)); // 5
console.log("add(2, 3) again:", add(2, 3)); // 5 (always same)

const multiply = (x, y) => x * y;
console.log("multiply(4, 5):", multiply(4, 5)); // 20

const isEven = (n) => n % 2 === 0;
console.log("isEven(4):", isEven(4)); // true
console.log("isEven(4) again:", isEven(4)); // true (always same)

// ============================================
// 2. IMPURE FUNCTIONS - SIDE EFFECTS
// ============================================
console.log("\n=== Impure Functions - Side Effects ===\n");

// Impure: Modifies external state
let counter = 0;
function incrementCounter() {
  counter++; // Side effect: modifies external variable
  return counter;
}

console.log("incrementCounter():", incrementCounter()); // 1
console.log("incrementCounter():", incrementCounter()); // 2 (different result!)

// Impure: Depends on external state
const taxRate = 0.1;
function calculatePrice(price) {
  return price * (1 + taxRate); // Depends on external variable
}

console.log("calculatePrice(100):", calculatePrice(100)); // 110

// Impure: Modifies input parameter
function addTaxToProduct(product) {
  product.price *= 1.1; // Modifies original object!
  return product;
}

const laptop = { name: "Laptop", price: 1000 };
console.log("Before:", laptop); // { name: 'Laptop', price: 1000 }
addTaxToProduct(laptop);
console.log("After:", laptop); // { name: 'Laptop', price: 1100 } (modified!)

// ============================================
// 3. PURE VS IMPURE - ARRAY OPERATIONS
// ============================================
console.log("\n=== Array Operations ===\n");

const users = ["Alice", "Bob", "Charlie"];

// Impure: Mutates original array
function addUserImpure(user) {
  users.push(user); // Modifies original array!
  return users;
}

console.log("Original users:", users); // ['Alice', 'Bob', 'Charlie']
addUserImpure("Diana");
console.log("After impure add:", users); // ['Alice', 'Bob', 'Charlie', 'Diana']

// Pure: Returns new array without modifying original
function addUserPure(userList, newUser) {
  return [...userList, newUser]; // Creates new array
}

const users2 = ["Eve", "Frank"];
const updated = addUserPure(users2, "Grace");
console.log("Original users2:", users2); // ['Eve', 'Frank'] (unchanged!)
console.log("New array:", updated); // ['Eve', 'Frank', 'Grace']

// ============================================
// 4. PURE VS IMPURE - OBJECT OPERATIONS
// ============================================
console.log("\n=== Object Operations ===\n");

// Impure: Mutates object
function updateUserImpure(user, name) {
  user.name = name; // Modifies original object
  return user;
}

const user1 = { name: "Henry", age: 30 };
console.log("Before impure update:", user1);
updateUserImpure(user1, "Henry Updated");
console.log("After impure update:", user1); // Modified!

// Pure: Creates new object
function updateUserPure(user, updates) {
  return { ...user, ...updates }; // Spreads into new object
}

const user2 = { name: "Iris", age: 25 };
const updatedUser = updateUserPure(user2, { name: "Iris Updated" });
console.log("Original user2:", user2); // { name: 'Iris', age: 25 } (unchanged)
console.log("Updated user:", updatedUser); // { name: 'Iris Updated', age: 25 }

// ============================================
// 5. UNPREDICTABLE BEHAVIOR - IMPURE
// ============================================
console.log("\n=== Unpredictable Behavior ===\n");

// Impure: Returns different value each call
const getRandomNumber = () => Math.random();
console.log("Random 1:", getRandomNumber()); // Different each time
console.log("Random 2:", getRandomNumber()); // Different each time

// Impure: Depends on time
const getCurrentTime = () => new Date();
console.log("Time 1:", getCurrentTime());
console.log("Time 2:", getCurrentTime()); // Different each time

// Pure: Same input always same output
const multiply2 = (a, b) => a * b;
console.log("Multiply 3*4:", multiply2(3, 4)); // 12
console.log("Multiply 3*4 again:", multiply2(3, 4)); // 12 (always same)

// ============================================
// 6. CONVERTING IMPURE TO PURE - DEPENDENCY INJECTION
// ============================================
console.log("\n=== Dependency Injection ===\n");

// Impure: Uses global config
const CONFIG = { discountRate: 0.1 };
function calculateDiscountImpure(price) {
  return price * (1 - CONFIG.discountRate);
}

// Pure: Receives config as parameter
function calculateDiscountPure(price, discountRate) {
  return price * (1 - discountRate);
}

console.log("Impure 100:", calculateDiscountImpure(100)); // 90
console.log("Pure 100 (10%):", calculateDiscountPure(100, 0.1)); // 90
console.log("Pure 100 (20%):", calculateDiscountPure(100, 0.2)); // 80

// ============================================
// 7. PURE ARRAY TRANSFORMATIONS
// ============================================
console.log("\n=== Pure Array Transformations ===\n");

const numbers = [1, 2, 3, 4, 5];

// Pure: map returns new array
const doubled = numbers.map((n) => n * 2);
console.log("Original:", numbers); // [1, 2, 3, 4, 5] (unchanged)
console.log("Doubled:", doubled); // [2, 4, 6, 8, 10]

// Pure: filter returns new array
const evens = numbers.filter((n) => n % 2 === 0);
console.log("Evens:", evens); // [2, 4]

// Pure: reduce returns value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum); // 15

// ============================================
// 8. IMPURE ARRAY METHODS - AVOID THESE
// ============================================
console.log("\n=== Impure Array Methods ===\n");

// Impure: splice modifies original array
const items = [1, 2, 3, 4, 5];
console.log("Before splice:", items);
items.splice(2, 1); // Removes element at index 2
console.log("After splice:", items); // [1, 2, 4, 5] (modified!)

// Pure alternative: filter
const items2 = [1, 2, 3, 4, 5];
const filtered = items2.filter((_, i) => i !== 2);
console.log("Original:", items2); // [1, 2, 3, 4, 5] (unchanged)
console.log("Filtered:", filtered); // [1, 2, 4, 5]

// Impure: reverse modifies original
const arr = [1, 2, 3];
console.log("Before reverse:", arr);
arr.reverse();
console.log("After reverse:", arr); // [3, 2, 1] (modified!)

// Pure alternative: spread and reverse
const arr2 = [1, 2, 3];
const reversed = [...arr2].reverse();
console.log("Original arr2:", arr2); // [1, 2, 3] (unchanged)
console.log("Reversed:", reversed); // [3, 2, 1]

// ============================================
// 9. PURE FUNCTION COMPOSITION
// ============================================
console.log("\n=== Function Composition ===\n");

// Pure functions that can be composed
const increment = (n) => n + 1;
const double = (n) => n * 2;
const square = (n) => n * n;

// Compose helper
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);

const addThenDouble = compose(double, increment);
console.log("5 + 1 then * 2:", addThenDouble(5)); // (5+1)*2 = 12

const doubleAndSquare = compose(square, double);
console.log("5 * 2 then squared:", doubleAndSquare(5)); // (5*2)^2 = 100

// ============================================
// 10. ISOLATED SIDE EFFECTS
// ============================================
console.log("\n=== Isolated Side Effects ===\n");

// Pure core logic
function calculateTotalPrice(items, taxRate) {
  return items.reduce((sum, item) => sum + item.price, 0) * (1 + taxRate);
}

// Impure wrapper (separated concern)
function processOrderImpure(items, taxRate) {
  const total = calculateTotalPrice(items, taxRate); // Use pure function
  console.log("Order processed. Total:", total); // Side effect here
  // Could also: save to database, send email, log to file
  return total;
}

const orderItems = [{ price: 50 }, { price: 30 }];
processOrderImpure(orderItems, 0.1); // Side effects happen here

// ============================================
// 11. MEMOIZATION - OPTIMIZE PURE FUNCTIONS
// ============================================
console.log("\n=== Memoization ===\n");

// Pure fibonacci function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version (still pure, just optimized)
function memoize(fn) {
  const cache = {};
  return (n) => {
    if (n in cache) return cache[n];
    return (cache[n] = fn(n));
  };
}

const fibMemo = memoize(fibonacci);
console.log("Fibonacci(10):", fibMemo(10)); // 55 (cached results)

// ============================================
// 12. TESTING PURE VS IMPURE
// ============================================
console.log("\n=== Testing ===\n");

// Pure function - easy to test
function addNumbers(a, b) {
  return a + b;
}

// Test pure function (no setup needed)
console.log("Test: add(2, 3) === 5:", addNumbers(2, 3) === 5);
console.log("Test: add(-1, 1) === 0:", addNumbers(-1, 1) === 0);

// Impure function - harder to test
let globalSum = 0;
function addToGlobalSum(n) {
  globalSum += n; // Side effect
  return globalSum;
}

// Test impure function (need to manage state)
globalSum = 0; // Reset state
console.log("Test: addToGlobalSum(5) === 5:", addToGlobalSum(5) === 5);
console.log("Test: addToGlobalSum(3) === 8:", addToGlobalSum(3) === 8); // Depends on previous test!

// ============================================
// 13. PRACTICAL PURE FUNCTION EXAMPLES
// ============================================
console.log("\n=== Practical Examples ===\n");

// Email validation - pure
const isValidEmail = (email) => {
  return email.includes("@") && email.includes(".");
};

console.log("test@example.com valid:", isValidEmail("test@example.com")); // true
console.log("invalid valid:", isValidEmail("invalid")); // false

// URL builder - pure
function buildQueryString(params) {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

console.log("Query:", buildQueryString({ id: 1, name: "test" }));
// "id=1&name=test"

// Data transformer - pure
function transformUserData(user) {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
    isAdult: user.age >= 18,
  };
}

const rawUser = { firstName: "Jack", lastName: "Smith", age: 25 };
console.log("Transformed:", transformUserData(rawUser));
