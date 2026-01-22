/* ===================================================================
   FUNCTIONS - COMPREHENSIVE CODE EXAMPLES
   Topic: Function Declarations vs Expressions vs Arrow Functions

   All three are valid - use based on context and preference
=================================================================== */

// ===================================================================
// PART 1: FUNCTION DECLARATIONS
// ===================================================================

// Basic function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

console.log("=== FUNCTION DECLARATIONS ===");
console.log(greet("Alice")); // Hello, Alice!

// Function with multiple parameters
function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // 8

// Function that takes object parameter
function createUser(userData) {
  return {
    id: Math.random(),
    name: userData.name,
    email: userData.email,
    active: true,
  };
}

const user = createUser({ name: "John", email: "john@example.com" });
console.log(user);

// Function with optional behavior
function calculateTotal(items, applyTax = false) {
  let total = items.reduce((sum, item) => sum + item.price, 0);
  if (applyTax) {
    total *= 1.18; // 18% tax
  }
  return total.toFixed(2);
}

const prices = [
  { name: "Item 1", price: 100 },
  { name: "Item 2", price: 200 },
  { name: "Item 3", price: 150 },
];

console.log("Total without tax:", calculateTotal(prices));
console.log("Total with tax:", calculateTotal(prices, true));

// ===================================================================
// PART 2: HOISTING - Declaration vs Expression
// ===================================================================

console.log("\n=== HOISTING DEMONSTRATION ===");

// ✅ This works because function declarations are hoisted
console.log(declaredFunction());

function declaredFunction() {
  return "I'm hoisted!";
}

// ❌ This would error if uncommented - function expressions are NOT hoisted
// console.log(expressedFunction());

const expressedFunction = function () {
  return "I'm not hoisted!";
};

console.log(expressedFunction());

// ===================================================================
// PART 3: FUNCTION EXPRESSIONS
// ===================================================================

console.log("\n=== FUNCTION EXPRESSIONS ===");

// Anonymous function expression
const sayGoodbye = function (name) {
  return `Goodbye, ${name}!`;
};

console.log(sayGoodbye("Bob")); // Goodbye, Bob!

// Named function expression (function has its own name)
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
};

console.log("Factorial of 5:", factorial(5)); // 120

// Function expression assigned as method
const calculator = {
  add: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
};

console.log(calculator.add(10, 5)); // 15
console.log(calculator.subtract(10, 5)); // 5

// ===================================================================
// PART 4: ARROW FUNCTIONS (ES6)
// ===================================================================

console.log("\n=== ARROW FUNCTIONS ===");

// Simple arrow function
const square = (num) => {
  return num * num;
};

console.log(square(5)); // 25

// Arrow function with implicit return (one-liner)
const double = (num) => num * 2;

console.log(double(5)); // 10

// Arrow function with no parameters
const greetEveryone = () => "Hello everyone!";

console.log(greetEveryone()); // Hello everyone!

// Arrow function with one parameter (parentheses optional)
const getName = (user) => user.name;

const person = { name: "Charlie", age: 30 };
console.log(getName(person)); // Charlie

// Arrow function with multiple parameters
const combine = (str1, str2, separator = " ") => {
  return str1 + separator + str2;
};

console.log(combine("Hello", "World")); // Hello World
console.log(combine("Hello", "World", "-")); // Hello-World

// ===================================================================
// PART 5: ARROW FUNCTION GOTCHAS
// ===================================================================

console.log("\n=== ARROW FUNCTION SPECIAL CASES ===");

// Returning an object directly (requires parentheses)
const createObject = (name, age) => ({
  name: name,
  age: age,
});

console.log(createObject("David", 25));

// ❌ This would be interpreted as a function body, not an object
// const badCreateObject = (name, age) => { name: name, age: age };

// Arrow functions don't have their own 'this'
const person2 = {
  name: "Eve",
  regularFunction: function () {
    console.log(`Regular function this: ${this.name}`); // Eve
  },
  arrowFunction: () => {
    console.log(`Arrow function this: ${this.name}`); // undefined (global scope)
  },
};

person2.regularFunction();
person2.arrowFunction();

// ===================================================================
// PART 6: COMPARING ALL THREE TYPES
// ===================================================================

console.log("\n=== COMPARISON: ALL THREE TYPES ===");

// Declaration
function greetDeclaration(name) {
  return `Hi ${name}`;
}

// Expression
const greetExpression = function (name) {
  return `Hi ${name}`;
};

// Arrow
const greetArrow = (name) => `Hi ${name}`;

// All produce the same result
console.log(greetDeclaration("Frank")); // Hi Frank
console.log(greetExpression("Frank")); // Hi Frank
console.log(greetArrow("Frank")); // Hi Frank

// ===================================================================
// PART 7: PRACTICAL EXAMPLES
// ===================================================================

console.log("\n=== PRACTICAL EXAMPLES ===");

// Example 1: Validate email
const isValidEmail = (email) => {
  return email.includes("@") && email.includes(".");
};

console.log(isValidEmail("john@example.com")); // true
console.log(isValidEmail("invalid")); // false

// Example 2: Filter array
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter((num) => num % 2 === 0);

console.log("Even numbers:", evenNumbers); // [2, 4, 6, 8, 10]

// Example 3: Transform array
const doubled = numbers.map((num) => num * 2);

console.log("Doubled:", doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// Example 4: Reduce to sum
const sum = numbers.reduce((total, num) => total + num, 0);

console.log("Sum:", sum); // 55

// ===================================================================
// PART 8: WHEN TO USE WHICH?
// ===================================================================

console.log("\n=== WHEN TO USE WHICH? ===");
console.log(`
Declaration:
- Use for main program logic
- When you need hoisting
- Clear, traditional syntax

Expression:
- When passing as arguments
- When storing in variables
- For factory functions

Arrow:
- Callbacks (map, filter, setTimeout)
- Short operations
- Modern, concise
- When you need lexical this
`);

console.log("✅ All function types demonstrated!");
