/**
 * Module 3: Functions
 * Concepts: Arrow Functions
 *
 * Comprehensive examples of arrow function syntax and usage
 */

// ============================================
// 1. ARROW FUNCTION BASICS
// ============================================
console.log("=== Arrow Function Basics ===\n");

// Traditional function expression
const traditional = function (a, b) {
  return a + b;
};

// Arrow function equivalent
const arrow = (a, b) => {
  return a + b;
};

// Concise arrow function (implicit return)
const concise = (a, b) => a + b;

console.log("Traditional:", traditional(2, 3)); // 5
console.log("Arrow:", arrow(2, 3)); // 5
console.log("Concise:", concise(2, 3)); // 5

// ============================================
// 2. SINGLE PARAMETER
// ============================================
console.log("\n=== Single Parameter ===\n");

// Parentheses optional with single parameter
const square = (x) => x * x;
const squareParens = (x) => x * x;

console.log("Square 5 (no parens):", square(5)); // 25
console.log("Square 5 (with parens):", squareParens(5)); // 25

const greetUser = (name) => `Hello, ${name}!`;
console.log(greetUser("Alice")); // "Hello, Alice!"

// ============================================
// 3. NO PARAMETERS
// ============================================
console.log("\n=== No Parameters ===\n");

// Must use empty parentheses
const getRandomNumber = () => Math.random();
const getCurrentTime = () => new Date().toLocaleTimeString();
const getGreeting = () => "Welcome!";

console.log("Random:", getRandomNumber());
console.log("Time:", getCurrentTime());
console.log("Greeting:", getGreeting());

// ============================================
// 4. MULTIPLE STATEMENTS WITH BRACES
// ============================================
console.log("\n=== Multiple Statements ===\n");

// Multiple statements require curly braces and explicit return
const calculateArea = (width, height) => {
  const area = width * height;
  const message = `Area: ${area}`;
  return message;
};

console.log(calculateArea(5, 10)); // "Area: 50"

const validateEmail = (email) => {
  const isValid = email.includes("@");
  const hasDomain = email.includes(".");
  const message = isValid && hasDomain ? "Valid" : "Invalid";
  return message;
};

console.log(validateEmail("test@example.com")); // "Valid"
console.log(validateEmail("invalid")); // "Invalid"

// ============================================
// 5. IMPLICIT RETURN OF OBJECTS
// ============================================
console.log("\n=== Implicit Return of Objects ===\n");

// Parentheses needed to return object implicitly
const createUser = (name, age) => ({ name, age });
const createProduct = (id, title) => ({ id, title, inStock: true });

console.log(createUser("Bob", 30)); // { name: 'Bob', age: 30 }
console.log(createProduct(1, "Laptop")); // { id: 1, title: 'Laptop', inStock: true }

// Without parentheses, it looks for code block
// This would be a syntax error:
// const wrong = (name) => { name }; // This is a code block, not return!

// ============================================
// 6. WITH ARRAY METHODS
// ============================================
console.log("\n=== With Array Methods ===\n");

const numbers = [1, 2, 3, 4, 5];

// Map
const doubled = numbers.map((n) => n * 2);
console.log("Doubled:", doubled); // [2, 4, 6, 8, 10]

// Filter
const evens = numbers.filter((n) => n % 2 === 0);
console.log("Evens:", evens); // [2, 4]

// Reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum); // 15

// Sort
const descending = [...numbers].sort((a, b) => b - a);
console.log("Descending:", descending); // [5, 4, 3, 2, 1]

// ============================================
// 7. WITH OBJECTS AND METHODS
// ============================================
console.log("\n=== With Objects ===\n");

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 28 },
];

// Get all names
const names = users.map((user) => user.name);
console.log("Names:", names); // ['Alice', 'Bob', 'Charlie']

// Find users over 27
const over27 = users.filter((user) => user.age > 27);
console.log("Over 27:", over27); // Bob, Charlie

// Create greeting strings
const greetings = users.map((user) => `${user.name} is ${user.age}`);
console.log("Greetings:", greetings);

// ============================================
// 8. CHAINING
// ============================================
console.log("\n=== Chaining ===\n");

const result = [1, 2, 3, 4, 5, 6]
  .filter((n) => n % 2 === 0) // Keep evens
  .map((n) => n * n) // Square them
  .reduce((sum, n) => sum + n, 0); // Sum

console.log("Filter → Map → Reduce:", result); // 4 + 16 + 36 = 56

// ============================================
// 9. NESTED ARROW FUNCTIONS
// ============================================
console.log("\n=== Nested Arrow Functions ===\n");

// Higher-order function
const multiply = (a) => (b) => a * b;

const multiplyBy2 = multiply(2);
const multiplyBy3 = multiply(3);

console.log("2 * 5 =", multiplyBy2(5)); // 10
console.log("3 * 5 =", multiplyBy3(5)); // 15

// Creating specialized functions
const add = (a) => (b) => a + b;
const addTen = add(10);
console.log("10 + 5 =", addTen(5)); // 15

// ============================================
// 10. LEXICAL 'this' BINDING
// ============================================
console.log("\n=== Lexical this Binding ===\n");

// Regular function - has its own 'this'
const person1 = {
  name: "Alice",
  greet: function () {
    console.log("Person 1 - Hello, " + this.name);
  },
};
person1.greet(); // "Hello, Alice"

// Arrow function in object method - uses outer 'this'
const person2 = {
  name: "Bob",
  greet: () => {
    console.log("Person 2 - this.name:", this.name); // 'this' from outer scope
  },
};
person2.greet(); // "this.name: undefined" (global this)

// Correct usage of arrow function
const person3 = {
  name: "Charlie",
  items: ["book", "pen"],
  listItems: function () {
    this.items.forEach((item) => {
      console.log(`${this.name} has: ${item}`); // arrow uses outer 'this'
    });
  },
};
person3.listItems(); // Works correctly

// ============================================
// 11. CALLBACKS WITH ARROW FUNCTIONS
// ============================================
console.log("\n=== Callbacks ===\n");

// setTimeout
setTimeout(() => console.log("After 1 second"), 1000);

// Event listeners (common in DOM)
// document.addEventListener('click', (event) => {
//   console.log('Clicked at:', event.clientX, event.clientY);
// });

// Promise chains
new Promise((resolve, reject) => {
  resolve(42);
})
  .then((value) => value * 2)
  .then((value) => console.log("Promise result:", value)) // 84
  .catch((err) => console.error(err));

// ============================================
// 12. DEFAULT PARAMETERS
// ============================================
console.log("\n=== Default Parameters ===\n");

const greetWithDefault = (name = "Guest") => `Hello, ${name}!`;
console.log(greetWithDefault()); // "Hello, Guest!"
console.log(greetWithDefault("Diana")); // "Hello, Diana!"

const calculateDiscount = (price, discount = 0.1) => price * (1 - discount);
console.log("20% of 100:", calculateDiscount(100, 0.2)); // 80
console.log("10% of 100:", calculateDiscount(100)); // 90

// ============================================
// 13. REST PARAMETERS
// ============================================
console.log("\n=== Rest Parameters ===\n");

// Arrow functions don't have 'arguments' object
// Use rest parameters instead
const sum2 = (...nums) => nums.reduce((a, b) => a + b, 0);
console.log("Sum of 1,2,3,4,5:", sum2(1, 2, 3, 4, 5)); // 15

const joinStrings = (...strings) => strings.join(" - ");
console.log(joinStrings("apple", "banana", "orange")); // "apple - banana - orange"

// ============================================
// 14. DESTRUCTURING IN PARAMETERS
// ============================================
console.log("\n=== Destructuring ===\n");

const getUserInfo = ({ name, age, city }) => {
  return `${name}, ${age} years old, from ${city}`;
};

const user = { name: "Eve", age: 28, city: "NYC" };
console.log(getUserInfo(user));

// With arrays
const getCoordinates = ([x, y]) => `(${x}, ${y})`;
console.log(getCoordinates([10, 20])); // "(10, 20)"

// ============================================
// 15. PRACTICAL EXAMPLES
// ============================================
console.log("\n=== Practical Examples ===\n");

// Validate and transform
const validateAndTransform = (email) => {
  const isValid = email.includes("@");
  return isValid ? email.toLowerCase() : null;
};

// Debounce helper
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Compose functions
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);
const addOne = (n) => n + 1;
const double2 = (n) => n * 2;
const addThenDouble = compose(double2, addOne);
console.log("Compose (add 1, then double) 5:", addThenDouble(5)); // (5+1)*2 = 12

// Memoization helper
const memoize = (fn) => {
  const cache = {};
  return (n) => {
    if (n in cache) return cache[n];
    return (cache[n] = fn(n));
  };
};

const fibonacci = memoize((n) =>
  n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2),
);
console.log("Fibonacci(10):", fibonacci(10)); // 55
