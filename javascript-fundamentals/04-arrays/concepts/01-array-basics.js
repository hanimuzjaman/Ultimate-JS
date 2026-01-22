/* ===================================================================
   ARRAYS - COMPREHENSIVE CODE EXAMPLES
   Topic: Array Basics, Methods, Iteration
=================================================================== */

// ===================================================================
// SECTION 1: CREATING & ACCESSING ARRAYS
// ===================================================================

console.log("=== CREATING & ACCESSING ARRAYS ===");

// Different ways to create arrays
const numbers = [1, 2, 3, 4, 5];
const fruits = ["apple", "banana", "orange"];
const mixed = [1, "hello", true, null, undefined];
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const empty = [];

// Accessing elements (zero-indexed)
console.log(numbers[0]); // 1
console.log(numbers[4]); // 5
console.log(fruits[1]); // banana
console.log(numbers.length); // 5

// Last element
console.log(numbers[numbers.length - 1]); // 5

// ===================================================================
// SECTION 2: MUTATING METHODS (Modify Original)
// ===================================================================

console.log("\n=== MUTATING METHODS ===");

// push() - Add to end
let arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
arr.push(5, 6); // Can add multiple
console.log(arr); // [1, 2, 3, 4, 5, 6]

// pop() - Remove from end
arr = [1, 2, 3, 4, 5];
const popped = arr.pop();
console.log(popped); // 5
console.log(arr); // [1, 2, 3, 4]

// unshift() - Add to beginning
arr = [2, 3, 4];
arr.unshift(1);
console.log(arr); // [1, 2, 3, 4]

// shift() - Remove from beginning
arr = [1, 2, 3, 4];
const shifted = arr.shift();
console.log(shifted); // 1
console.log(arr); // [2, 3, 4]

// splice() - Add/remove at specific position
arr = [1, 2, 3, 4, 5];
arr.splice(2, 1); // Remove 1 element at index 2
console.log(arr); // [1, 2, 4, 5]

arr = [1, 2, 3, 4, 5];
arr.splice(2, 0, 10); // Insert at index 2, remove 0 elements
console.log(arr); // [1, 2, 10, 3, 4, 5]

// reverse() - Reverse order
arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// sort() - Sort (converts to strings by default!)
arr = [3, 1, 4, 1, 5, 9, 2, 6];
arr.sort();
console.log(arr); // [1, 1, 2, 3, 4, 5, 6, 9]

// Sort numbers correctly
arr = [3, 1, 4, 1, 5, 9, 2, 6];
arr.sort((a, b) => a - b); // Ascending
console.log(arr); // [1, 1, 2, 3, 4, 5, 6, 9]

// ===================================================================
// SECTION 3: NON-MUTATING METHODS (Return New Array)
// ===================================================================

console.log("\n=== NON-MUTATING METHODS ===");

// map() - Transform each element
const nums = [1, 2, 3, 4];
const doubled = nums.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]
console.log(nums); // [1, 2, 3, 4] - Original unchanged

// filter() - Keep only matching elements
const numbers2 = [1, 2, 3, 4, 5, 6];
const evens = numbers2.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4, 6]

// slice() - Get portion
arr = [1, 2, 3, 4, 5];
const portion = arr.slice(1, 4); // From index 1, up to (not including) 4
console.log(portion); // [2, 3, 4]
console.log(arr); // [1, 2, 3, 4, 5] - Original unchanged

// concat() - Join arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4]

// join() - Convert to string
const words = ["Hello", "World", "!"];
const sentence = words.join(" ");
console.log(sentence); // "Hello World !"

// ===================================================================
// SECTION 4: SEARCHING & FINDING
// ===================================================================

console.log("\n=== SEARCHING & FINDING ===");

// indexOf() - Find position
const arr3 = ["a", "b", "c", "b"];
console.log(arr3.indexOf("b")); // 1 (first occurrence)
console.log(arr3.indexOf("x")); // -1 (not found)

// includes() - Check existence
const fruits2 = ["apple", "banana", "orange"];
console.log(fruits2.includes("apple")); // true
console.log(fruits2.includes("grape")); // false

// find() - Find first matching object
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: "Bob" }

// findIndex() - Find index of match
const index = users.findIndex((u) => u.name === "Charlie");
console.log(index); // 2

// ===================================================================
// SECTION 5: ITERATION METHODS
// ===================================================================

console.log("\n=== ITERATION METHODS ===");

// forEach() - Execute function for each
const items = [10, 20, 30];
items.forEach((item, index) => {
  console.log(`Index ${index}: ${item}`);
});

// reduce() - Combine elements
const numbers3 = [1, 2, 3, 4, 5];
const sum = numbers3.reduce((total, num) => total + num, 0);
console.log("Sum:", sum); // 15

// every() - All match condition?
const allPositive = [1, 2, 3, 4, 5].every((num) => num > 0);
console.log(allPositive); // true

// some() - Any match condition?
const hasNegative = [1, 2, -3, 4, 5].some((num) => num < 0);
console.log(hasNegative); // true

// ===================================================================
// SECTION 6: SPREAD OPERATOR
// ===================================================================

console.log("\n=== SPREAD OPERATOR ===");

// Combine arrays
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const merged = [...array1, ...array2];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Copy array
const original = [1, 2, 3];
const copy = [...original];
copy[0] = 99;
console.log(original); // [1, 2, 3] - unchanged
console.log(copy); // [99, 2, 3]

// Add elements
const newArray = [1, 2, ...array1, 3];
console.log(newArray); // [1, 2, 1, 2, 3, 3]

// ===================================================================
// SECTION 7: DESTRUCTURING
// ===================================================================

console.log("\n=== DESTRUCTURING ===");

// Basic destructuring
const colors = ["red", "green", "blue"];
const [firstColor, secondColor, thirdColor] = colors;
console.log(firstColor); // red
console.log(secondColor); // green

// Skip elements
const [primary, , tertiary] = colors;
console.log(primary); // red
console.log(tertiary); // blue

// Rest operator
const [first, ...rest] = colors;
console.log(first); // red
console.log(rest); // [green, blue]

// Default values
const [a = "default", b = "default", c = "default", d = "default"] = [1, 2];
console.log(d); // default

// ===================================================================
// SECTION 8: PRACTICAL EXAMPLES
// ===================================================================

console.log("\n=== PRACTICAL EXAMPLES ===");

// Example 1: Get user names
const userList = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true },
];

const names = userList.map((u) => u.name);
console.log(names); // ["Alice", "Bob", "Charlie"]

// Example 2: Filter active users
const activeUsers = userList.filter((u) => u.active);
console.log(activeUsers);

// Example 3: Total price
const products = [
  { name: "Laptop", price: 50000 },
  { name: "Phone", price: 30000 },
  { name: "Tablet", price: 20000 },
];

const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
console.log(`Total: ₹${totalPrice}`); // ₹100000

// Example 4: Chaining methods
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = data
  .filter((num) => num > 3) // [4, 5, 6, 7, 8, 9, 10]
  .map((num) => num * 2) // [8, 10, 12, 14, 16, 18, 20]
  .filter((num) => num < 16); // [8, 10, 12, 14]

console.log(result);

// ===================================================================
// SECTION 9: ARRAY OF ARRAYS (MATRIX)
// ===================================================================

console.log("\n=== ARRAY OF ARRAYS ===");

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Access specific element
console.log(matrix[1][2]); // 6

// Flatten
const flattened = matrix.flat();
console.log(flattened); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Iterate and transform
const transposed = matrix.map((row, rowIndex) =>
  matrix.map((col) => col[rowIndex]),
);
console.log(transposed);

console.log("\n✅ Array examples complete!");
