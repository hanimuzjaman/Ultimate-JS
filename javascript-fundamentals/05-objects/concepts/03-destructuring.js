// ================================================
// DESTRUCTURING - Practical Code Examples
// ================================================

// ===== 1. ARRAY DESTRUCTURING BASICS =====
console.log("\n--- 1. ARRAY DESTRUCTURING ---");

// Basic unpacking
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log("First:", first, "Second:", second, "Third:", third);

// Skip elements
const [primary, , tertiary] = colors;
console.log("Primary:", primary, "Tertiary:", tertiary);

// Rest operator
const [head, ...rest] = colors;
console.log("Head:", head, "Rest:", rest); // ["green", "blue"]

// Swap variables
let a = 5,
  b = 10;
[a, b] = [b, a];
console.log("After swap: a =", a, ", b =", b); // a = 10, b = 5

// ===== 2. OBJECT DESTRUCTURING BASICS =====
console.log("\n--- 2. OBJECT DESTRUCTURING ---");

const person = {
  name: "Alice",
  age: 30,
  city: "New York",
};

// Extract properties
const { name: personName, age: personAge, city } = person;
console.log("Name:", personName, "Age:", personAge, "City:", city);

// Rename properties
const { name: fullName, age: years } = person;
console.log("Full name:", fullName, "Years:", years);

// Default values
const { name: n, country = "USA" } = person;
console.log("Name:", n, "Country:", country); // country defaults to "USA"

// ===== 3. NESTED OBJECT DESTRUCTURING =====
console.log("\n--- 3. NESTED DESTRUCTURING ---");

const employee = {
  id: 1,
  info: {
    firstName: "Bob",
    lastName: "Smith",
    contact: {
      email: "bob@example.com",
      phone: "555-1234",
    },
  },
};

// Destructure nested object
const {
  info: {
    firstName,
    lastName,
    contact: { email },
  },
} = employee;
console.log("Name:", firstName, lastName);
console.log("Email:", email);

// With defaults in nested destructuring
const {
  info: { firstName: fn, company = "Unknown" },
} = employee;
console.log("First name:", fn, "Company:", company);

// ===== 4. FUNCTION PARAMETERS WITH DESTRUCTURING =====
console.log("\n--- 4. FUNCTION PARAMETERS ---");

// Array parameters
function printCoordinates([xCoord, yCoord]) {
  console.log(`Coordinates: (${xCoord}, ${yCoord})`);
}

printCoordinates([10, 20]);

// Object parameters
function displayUser({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

displayUser({ name: "Charlie", age: 35 });

// With defaults in function parameters
function greet({ name = "Guest", greeting = "Hello" } = {}) {
  console.log(`${greeting}, ${name}!`);
}

greet({ name: "Diana" }); // "Hello, Diana!"
greet({}); // "Hello, Guest!"
greet(); // "Hello, Guest!"

// ===== 5. ARRAY DESTRUCTURING WITH DEFAULTS =====
console.log("\n--- 5. ARRAY DESTRUCTURING WITH DEFAULTS ---");

const numbers = [1, 2];

// Provide default for missing elements
const [num1 = 0, num2 = 0, num3 = 0] = numbers;
console.log("Numbers:", num1, num2, num3); // 1, 2, 0

// Empty array with defaults
const [a1 = 10, a2 = 20] = [];
console.log("Defaults applied:", a1, a2); // 10, 20

// ===== 6. DESTRUCTURING FROM FUNCTION RETURN =====
console.log("\n--- 6. FUNCTION RETURN VALUES ---");

// Return array - destructure it
function getCoordinates() {
  return [40.7128, -74.006];
}

const [lat, lng] = getCoordinates();
console.log("Location:", lat, lng);

// Return object - destructure it
function getUser() {
  return {
    id: 1,
    username: "johndoe",
    email: "john@example.com",
  };
}

const { id: userId, username, email: userEmail } = getUser();
console.log("User:", username, userEmail);

// ===== 7. RENAMING AND ALIASING =====
console.log("\n--- 7. RENAMING PROPERTIES ---");

const car = {
  make: "Toyota",
  model: "Camry",
  year: 2020,
};

// Rename with 'as' syntax (using : )
const { make: brand, model: carModel } = car;
console.log("Brand:", brand, "Model:", carModel);

// Useful for avoiding conflicts
const obj = { name: "Object" };
const { name: objName } = obj;
console.log("Object name:", objName);

// ===== 8. EXTRACTING SUBSET OF OBJECT =====
console.log("\n--- 8. EXTRACTING SUBSET ---");

const product = {
  id: 101,
  name: "Laptop",
  price: 999,
  stock: 5,
  category: "Electronics",
  description: "High-performance laptop",
};

// Extract only needed properties
const { name: productName, price } = product;
console.log("Product:", productName, "Price:", price);

// Rest operator to get remaining properties
const { id: productId, name: prodName, ...other } = product;
console.log("ID:", productId, "Name:", prodName);
console.log("Other properties:", other);
// { stock: 5, category: "Electronics", description: "..." }

// ===== 9. COMPUTED PROPERTY NAMES =====
console.log("\n--- 9. COMPUTED PROPERTIES ---");

const config = {
  api_key: "secret123",
  api_url: "https://api.example.com",
  api_timeout: 5000,
};

// Extract with renamed keys
const { api_key: key, api_url: url } = config;
console.log("Key:", key, "URL:", url);

// ===== 10. DESTRUCTURING IN LOOPS =====
console.log("\n--- 10. DESTRUCTURING IN LOOPS ---");

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

// Loop with object destructuring
for (const { name, age } of users) {
  console.log(`${name}: ${age} years old`);
}

// Array of arrays
const pairs = [
  [1, 2],
  [3, 4],
  [5, 6],
];
for (const [xVal, yVal] of pairs) {
  console.log(`${xVal} + ${yVal} = ${xVal + yVal}`);
}

// ===== 11. COMBINING ARRAY AND OBJECT DESTRUCTURING =====
console.log("\n--- 11. MIXED DESTRUCTURING ---");

// Array containing objects
const team = [
  { name: "Emma", role: "Lead" },
  { name: "Frank", role: "Dev" },
  { name: "Grace", role: "QA" },
];

const [{ name: lead }, { name: dev }] = team;
console.log("Lead:", lead, "Dev:", dev);

// Object containing arrays
const coordinates = {
  location: "New York",
  gps: [40.7128, -74.006],
  elevation: 10,
};

const {
  location,
  gps: [latitude, longitude],
} = coordinates;
console.log(`${location}: ${latitude}, ${longitude}`);

// ===== 12. CONDITIONAL DESTRUCTURING =====
console.log("\n--- 12. CONDITIONAL DESTRUCTURING ---");

function processUser(userData) {
  // Destructure with defaults for safety
  const {
    id = 0,
    name = "Unknown",
    active = false,
    preferences: { theme = "light", notifications = true } = {},
  } = userData || {};

  console.log(`User ${id}: ${name} (Theme: ${theme})`);
}

processUser({ id: 1, name: "User1", preferences: { theme: "dark" } });
processUser({ id: 2, name: "User2" }); // Uses defaults
processUser(); // All defaults

// ===== 13. DESTRUCTURING WITH ARRAY METHODS =====
console.log("\n--- 13. WITH ARRAY METHODS ---");

const dataList = [
  { id: 1, value: 100 },
  { id: 2, value: 200 },
  { id: 3, value: 300 },
];

// Map with destructuring
const values = dataList.map(({ value }) => value);
console.log("Values:", values); // [100, 200, 300]

// Filter with destructuring
const highValues = dataList.filter(({ value }) => value > 150);
console.log(
  "High values:",
  highValues.map(({ id }) => id),
); // [2, 3]

// ===== 14. NESTED ARRAY DESTRUCTURING =====
console.log("\n--- 14. NESTED ARRAYS ---");

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Access specific element
const [[m1, m2], , [m7, m8]] = matrix;
console.log("Values:", m1, m2, m7, m8); // 1, 2, 7, 8

// Destructure all
const [[x11, x12, x13], [x21, x22, x23]] = matrix;
console.log("2x3 matrix destructured");

// ===== 15. PRACTICAL EXAMPLES =====
console.log("\n--- 15. PRACTICAL EXAMPLES ---");

// Example 1: API Response
const apiResponse = {
  status: 200,
  data: {
    user: {
      id: 1,
      username: "johndoe",
      email: "john@example.com",
    },
    timestamp: Date.now(),
  },
};

const {
  status,
  data: {
    user: { username: apiUser },
  },
} = apiResponse;
console.log("Status:", status, "User:", apiUser);

// ===== 16. AVOIDING COMMON PITFALLS =====
console.log("\n--- 16. COMMON PITFALLS ---");

// Pitfall 1: Missing property returns undefined
const { missing } = { name: "Test" };
console.log("Missing property:", missing); // undefined

// Solution: Use defaults
const { missing: value = "N/A" } = { name: "Test" };
console.log("With default:", value); // "N/A"

// Pitfall 2: Destructuring null/undefined
try {
  const { prop } = null; // Error!
} catch (e) {
  console.log("Cannot destructure null");
}

// Solution: Use optional chaining or defaults
const { prop = "default" } = null || {};
console.log("Safe:", prop); // "default"

// Pitfall 3: Hoisting with destructuring
// Variables declared with const/let are not hoisted like var

// Solution: Declare before using
let x, y;
[x, y] = [1, 2];
console.log("After assignment:", x, y);

console.log("\n=== Destructuring Summary ===");
console.log("Arrays: const [a, b, c] = arr");
console.log("Objects: const { x, y } = obj");
console.log("Rename: const { x: newX } = obj");
console.log("Defaults: const { x = 10 } = obj");
console.log("Nested: const { a: { b } } = obj");
console.log("Rest: const [first, ...rest] = arr");
console.log("In functions: function f({ x, y }) {}");
console.log("In loops: for (const { x } of arr)");
