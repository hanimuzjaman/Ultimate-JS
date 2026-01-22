/**
 * Module 4: Arrays
 * Concepts: Spread Operator and Rest Parameters
 *
 * Practical examples of spread and rest in arrays and functions
 */

// ============================================
// 1. SPREADING ARRAYS
// ============================================
console.log("=== Spreading Arrays ===\n");

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Concatenate using spread
const combined = [...arr1, ...arr2];
console.log("Combined:", combined); // [1, 2, 3, 4, 5, 6]

// Add elements
const withElements = [0, ...arr1, 3.5, ...arr2, 7];
console.log("With elements:", withElements); // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// Copying arrays
const original = [1, 2, 3];
const copy = [...original];
copy[0] = 999;
console.log("Original:", original); // [1, 2, 3] (unchanged)
console.log("Copy:", copy); // [999, 2, 3]

// ============================================
// 2. SPREADING OBJECTS
// ============================================
console.log("\n=== Spreading Objects ===\n");

const user1 = { name: "Alice", age: 25 };
const user2 = { city: "NYC", country: "USA" };

// Merge objects
const mergedUser = { ...user1, ...user2 };
console.log("Merged:", mergedUser);
// { name: 'Alice', age: 25, city: 'NYC', country: 'USA' }

// Override properties
const updated = { ...user1, age: 26, role: "admin" };
console.log("Updated:", updated);
// { name: 'Alice', age: 26, role: 'admin' }

// Shallow copy
const originalUser = { name: "Bob", address: { city: "LA" } };
const copiedUser = { ...originalUser };
copiedUser.address.city = "SF";
console.log("Original address:", originalUser.address); // { city: 'SF' } (nested changed!)

// ============================================
// 3. REST PARAMETERS - FLEXIBLE ARGUMENTS
// ============================================
console.log("\n=== Rest Parameters ===\n");

function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log("sum(1, 2, 3):", sum(1, 2, 3)); // 6
console.log("sum(10, 20, 30, 40):", sum(10, 20, 30, 40)); // 100
console.log("sum():", sum()); // 0

// Mixed parameters
function introduce(greeting, ...names) {
  return names.map((name) => `${greeting}, ${name}!`);
}

console.log(introduce("Hello", "Alice", "Bob", "Charlie"));
// ["Hello, Alice!", "Hello, Bob!", "Hello, Charlie!"]

// ============================================
// 4. ARRAY DESTRUCTURING WITH REST
// ============================================
console.log("\n=== Array Destructuring with Rest ===\n");

const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log("First:", first); // 1
console.log("Second:", second); // 2
console.log("Rest:", rest); // [3, 4, 5]

// Skip elements
const [head, , third, ...tail] = numbers;
console.log("Head:", head, "Third:", third, "Tail:", tail);
// Head: 1, Third: 3, Tail: [4, 5]

// ============================================
// 5. OBJECT DESTRUCTURING WITH REST
// ============================================
console.log("\n=== Object Destructuring with Rest ===\n");

const person = {
  name: "Diana",
  age: 28,
  city: "Boston",
  country: "USA",
  role: "Engineer",
};

const { name, age, ...otherDetails } = person;
console.log("Name:", name); // Diana
console.log("Age:", age); // 28
console.log("Other details:", otherDetails);
// { city: 'Boston', country: 'USA', role: 'Engineer' }

// ============================================
// 6. SPREAD IN FUNCTION CALLS
// ============================================
console.log("\n=== Spread in Function Calls ===\n");

const values = [10, 20, 30];

// Pass array as individual arguments
console.log("Math.max(...values):", Math.max(...values)); // 30
console.log("Math.min(...values):", Math.min(...values)); // 10

// Custom function
function printValues(a, b, c) {
  return `a=${a}, b=${b}, c=${c}`;
}

console.log("With spread:", printValues(...values));
// "a=10, b=20, c=30"

// ============================================
// 7. PRACTICAL - ARRAY MANIPULATION
// ============================================
console.log("\n=== Practical Array Operations ===\n");

// Add to beginning
const list = [2, 3, 4];
const withStart = [1, ...list, 5];
console.log("Added start and end:", withStart); // [1, 2, 3, 4, 5]

// Remove element (immutable)
const allItems = ["a", "b", "c", "d", "e"];
const indexToRemove = 2;
const filtered = [
  ...allItems.slice(0, indexToRemove),
  ...allItems.slice(indexToRemove + 1),
];
console.log("Removed index 2:", filtered); // ['a', 'b', 'd', 'e']

// Insert at position
const insertPos = 2;
const itemToInsert = "NEW";
const inserted = [
  ...allItems.slice(0, insertPos),
  itemToInsert,
  ...allItems.slice(insertPos),
];
console.log("Inserted at index 2:", inserted);
// ['a', 'b', 'NEW', 'c', 'd', 'e']

// ============================================
// 8. PRACTICAL - OBJECT MANIPULATION
// ============================================
console.log("\n=== Practical Object Operations ===\n");

const original2 = { id: 1, name: "Product", price: 100 };

// Update single property
const updated2 = { ...original2, price: 150 };
console.log("Updated price:", updated2);

// Add new properties
const withExtras = { ...original2, inStock: true, rating: 4.5 };
console.log("With extras:", withExtras);

// Remove property (using destructuring)
const { price, ...withoutPrice } = original2;
console.log("Without price:", withoutPrice); // { id: 1, name: 'Product' }

// ============================================
// 9. VARIADIC FUNCTIONS
// ============================================
console.log("\n=== Variadic Functions ===\n");

// Create config with defaults
function createConfig(title, ...options) {
  return {
    title,
    options,
    count: options.length,
  };
}

console.log(createConfig("My List", "option1", "option2", "option3"));
// { title: 'My List', options: ['option1', 'option2', 'option3'], count: 3 }

// Merge any number of objects
function mergeAll(...objects) {
  return objects.reduce((merged, obj) => ({ ...merged, ...obj }), {});
}

console.log(
  mergeAll(
    { a: 1 },
    { b: 2 },
    { c: 3 },
    { a: 100 }, // Later values override
  ),
);
// { a: 100, b: 2, c: 3 }

// ============================================
// 10. ADVANCED PATTERNS
// ============================================
console.log("\n=== Advanced Patterns ===\n");

// Extract and transform
function extractNames(first, second, ...rest) {
  return {
    primary: first,
    secondary: second,
    others: rest,
  };
}

const names = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
console.log("Extracted:", extractNames(...names));

// Partial application with spread
function partial(fn, ...fixedArgs) {
  return (...args) => fn(...fixedArgs, ...args);
}

function multiply3(a, b, c) {
  return a * b * c;
}

const multiplyBy2And3 = partial(multiply3, 2, 3);
console.log("Partial function result:", multiplyBy2And3(4)); // 2 * 3 * 4 = 24

// Compose with spread
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((val, fn) => fn(val), x);

const add10 = (x) => x + 10;
const multiply2 = (x) => x * 2;
const square = (x) => x * x;

const transform = pipe(add10, multiply2, square);
console.log("Piped transform of 5:", transform(5));
// ((5 + 10) * 2)^2 = (30)^2 = 900

// ============================================
// 11. IMMUTABLE UPDATES
// ============================================
console.log("\n=== Immutable Updates ===\n");

const state = {
  user: { id: 1, name: "Frank" },
  items: [10, 20, 30],
};

// Update nested property immutably
const newState = {
  ...state,
  user: { ...state.user, name: "Frederick" },
};

console.log("Original user:", state.user); // { id: 1, name: 'Frank' }
console.log("New user:", newState.user); // { id: 1, name: 'Frederick' }

// ============================================
// 12. FLATTENING ARRAYS
// ============================================
console.log("\n=== Flattening Arrays ===\n");

const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];

// Flatten with spread (one level)
const flattened = [].concat(...nested);
console.log("Flattened (concat):", flattened); // [1, 2, 3, 4, 5, 6]

// Flatten with spread (manual one level)
const flattened2 = nested.flat();
console.log("Flattened (flat):", flattened2); // [1, 2, 3, 4, 5, 6]

// Deep nested
const deepNested = [
  [1, [2, 3]],
  [4, [5, [6]]],
];
const deepFlattened = deepNested.flat(Infinity);
console.log("Deep flattened:", deepFlattened); // [1, 2, 3, 4, 5, 6]
