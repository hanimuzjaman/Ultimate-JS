/**
 * Module 3: Functions
 * Concepts: Parameters and Return Values
 *
 * Comprehensive examples of function parameters and returns
 */

// ============================================
// 1. BASIC PARAMETERS AND ARGUMENTS
// ============================================
console.log("=== Basic Parameters ===\n");

function add(a, b) {
  return a + b;
}

console.log("add(2, 3):", add(2, 3)); // 5
console.log("add(10, 20):", add(10, 20)); // 30

// Missing arguments become undefined
function greet(name, greeting) {
  console.log(`${greeting}, ${name}`);
}

greet("Alice", "Hello"); // "Hello, Alice"
greet("Bob"); // "undefined, Bob" - greeting is undefined

// ============================================
// 2. DEFAULT PARAMETERS
// ============================================
console.log("\n=== Default Parameters ===\n");

function introduce(name = "Guest", age = "Unknown") {
  return `${name} is ${age} years old`;
}

console.log(introduce("Charlie", 30)); // "Charlie is 30 years old"
console.log(introduce("Diana")); // "Diana is Unknown years old"
console.log(introduce()); // "Guest is Unknown years old"

// Default can be expression/function
const getDefaultRole = () => "user";
function createAccount(username = "anonymous", role = getDefaultRole()) {
  return { username, role };
}

console.log(createAccount("alice", "admin")); // { username: 'alice', role: 'admin' }
console.log(createAccount("bob")); // { username: 'bob', role: 'user' }
console.log(createAccount()); // { username: 'anonymous', role: 'user' }

// Default parameters can reference earlier parameters
function greetWithDefault(name, greeting = `Hello, ${name}`) {
  return greeting;
}

console.log(greetWithDefault("Eve")); // "Hello, Eve"

// ============================================
// 3. REST PARAMETERS
// ============================================
console.log("\n=== Rest Parameters ===\n");

function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log("sum(1, 2, 3):", sum(1, 2, 3)); // 6
console.log("sum(1, 2, 3, 4, 5):", sum(1, 2, 3, 4, 5)); // 15
console.log("sum():", sum()); // 0

// Rest parameter with regular parameters
function greetAll(greeting, ...names) {
  return names.map((name) => `${greeting}, ${name}`);
}

console.log(greetAll("Hi", "Alice", "Bob", "Charlie"));
// ["Hi, Alice", "Hi, Bob", "Hi, Charlie"]

// Creating array from multiple arguments
function createList(title, ...items) {
  return {
    title,
    items,
    count: items.length,
  };
}

console.log(createList("Todo", "Work", "Sleep", "Code"));

// ============================================
// 4. OBJECT DESTRUCTURING IN PARAMETERS
// ============================================
console.log("\n=== Object Destructuring ===\n");

function displayUser({ name, age, city }) {
  return `${name}, age ${age} from ${city}`;
}

console.log(displayUser({ name: "Frank", age: 32, city: "LA" }));

// With default values in destructuring
function createConfig({ host = "localhost", port = 3000, ssl = false } = {}) {
  return { host, port, ssl };
}

console.log(createConfig()); // { host: 'localhost', port: 3000, ssl: false }
console.log(createConfig({ port: 8080, ssl: true }));
// { host: 'localhost', port: 8080, ssl: true }

// Nested destructuring
function displayPerson({ name, contact: { email, phone } }) {
  return `${name}: ${email}, ${phone}`;
}

const person = {
  name: "Grace",
  contact: { email: "grace@example.com", phone: "555-1234" },
};

console.log(displayPerson(person));

// ============================================
// 5. ARRAY DESTRUCTURING IN PARAMETERS
// ============================================
console.log("\n=== Array Destructuring ===\n");

function swap([a, b]) {
  return [b, a];
}

console.log("swap([1, 2]):", swap([1, 2])); // [2, 1]

function getCoordinates([x, y]) {
  return `(${x}, ${y})`;
}

console.log(getCoordinates([10, 20])); // "(10, 20)"

// With rest in destructuring
function describeArray([first, second, ...rest]) {
  return {
    first,
    second,
    remaining: rest,
  };
}

console.log(describeArray([1, 2, 3, 4, 5]));

// ============================================
// 6. BASIC RETURN VALUES
// ============================================
console.log("\n=== Return Values ===\n");

function multiply(a, b) {
  return a * b;
}

console.log("multiply(3, 4):", multiply(3, 4)); // 12

// Function without explicit return returns undefined
function noReturn() {
  console.log("This function returns undefined");
  // implicit return undefined
}

console.log("noReturn():", noReturn()); // undefined

// Return ends function execution
function earlyReturn(x) {
  if (x < 0) return "negative";
  if (x === 0) return "zero";
  return "positive";
}

console.log(earlyReturn(-5)); // "negative"
console.log(earlyReturn(0)); // "zero"
console.log(earlyReturn(10)); // "positive"

// ============================================
// 7. RETURNING OBJECTS
// ============================================
console.log("\n=== Returning Objects ===\n");

function createUser(name, email, age) {
  return {
    name,
    email,
    age,
    greet() {
      return `Hello, I'm ${this.name}`;
    },
  };
}

const user = createUser("Henry", "henry@example.com", 27);
console.log(user);
console.log(user.greet()); // "Hello, I'm Henry"

// Returning status object
function divide(a, b) {
  if (b === 0) {
    return { success: false, error: "Cannot divide by zero" };
  }
  return { success: true, result: a / b };
}

console.log(divide(10, 2)); // { success: true, result: 5 }
console.log(divide(10, 0)); // { success: false, error: 'Cannot divide by zero' }

// ============================================
// 8. RETURNING MULTIPLE VALUES
// ============================================
console.log("\n=== Returning Multiple Values ===\n");

// Using object
function calculateStats(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = sum / numbers.length;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return { sum, avg, min, max };
}

const stats = calculateStats([10, 20, 30, 40, 50]);
console.log(stats); // { sum: 150, avg: 30, min: 10, max: 50 }

// Destructuring return value
const { avg, max } = calculateStats([5, 10, 15, 20]);
console.log(`Average: ${avg}, Max: ${max}`);

// Using array
function getCoordinates2() {
  return [10, 20, 30]; // x, y, z
}

const [x, y, z] = getCoordinates2();
console.log(`Coordinates: (${x}, ${y}, ${z})`);

// ============================================
// 9. RETURNING FUNCTIONS (CLOSURES)
// ============================================
console.log("\n=== Returning Functions ===\n");

function makeGreeter(greeting) {
  return (name) => `${greeting}, ${name}!`;
}

const sayHello = makeGreeter("Hello");
const sayHi = makeGreeter("Hi");

console.log(sayHello("Iris")); // "Hello, Iris!"
console.log(sayHi("Jack")); // "Hi, Jack!"

// Factory function
function createCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter(10);
console.log("Initial:", counter.getCount()); // 10
console.log("After increment:", counter.increment()); // 11
console.log("After decrement:", counter.decrement()); // 10

// ============================================
// 10. PARAMETER VALIDATION AND DEFAULT HANDLING
// ============================================
console.log("\n=== Parameter Validation ===\n");

function safeDivide(a, b) {
  // Validate parameters
  if (typeof a !== "number" || typeof b !== "number") {
    return { error: "Both parameters must be numbers" };
  }
  if (b === 0) {
    return { error: "Cannot divide by zero" };
  }
  return { result: a / b };
}

console.log(safeDivide(10, 2)); // { result: 5 }
console.log(safeDivide(10, 0)); // { error: 'Cannot divide by zero' }
console.log(safeDivide("10", 2)); // { error: 'Both parameters must be numbers' }

// ============================================
// 11. VARIADIC FUNCTION EXAMPLES
// ============================================
console.log("\n=== Variadic Functions ===\n");

function createList(title, ...items) {
  return {
    title,
    items,
    count: items.length,
    addItem(item) {
      this.items.push(item);
      this.count++;
    },
  };
}

const todoList = createList("My Tasks", "Code", "Review", "Deploy");
console.log(todoList);
todoList.addItem("Test");
console.log(todoList.items); // ['Code', 'Review', 'Deploy', 'Test']

function mergeObjects(...objects) {
  return objects.reduce((merged, obj) => {
    return { ...merged, ...obj };
  }, {});
}

const result = mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 }, { c: 5, d: 6 });
console.log("Merged objects:", result); // { a: 1, b: 3, c: 5, d: 6 }

// ============================================
// 12. PRACTICAL EXAMPLES
// ============================================
console.log("\n=== Practical Examples ===\n");

// URL builder
function buildUrl(baseUrl, { path = "/", params = {} } = {}) {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const url = `${baseUrl}${path}`;
  return query ? `${url}?${query}` : url;
}

console.log(
  buildUrl("https://api.example.com", {
    path: "/users",
    params: { id: 1, sort: "name" },
  }),
);

// Flexible API function
function fetchData(
  url,
  { method = "GET", headers = {}, body = null, timeout = 5000 } = {},
) {
  return {
    url,
    options: { method, headers, body, timeout },
  };
}

console.log(
  fetchData("https://api.example.com/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }),
);

// Data transformer
function transformData(input, ...transformers) {
  return transformers.reduce((data, fn) => fn(data), input);
}

const toUpper = (str) => str.toUpperCase();
const addExclamation = (str) => str + "!";
const reverse = (str) => str.split("").reverse().join("");

const result2 = transformData("hello", toUpper, addExclamation, reverse);
console.log("Transformed:", result2); // "!OLLEH"
