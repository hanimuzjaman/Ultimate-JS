// ================================================
// ARRAY METHODS - Practical Code Examples
// ================================================

// ===== 1. MAP() - Transform each element =====
console.log("\n--- 1. MAP() ---");

// Basic map - double numbers
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => num * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);

// Map objects - extract property
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];
const names = users.map((user) => user.name);
console.log("Names:", names); // ["Alice", "Bob", "Charlie"]

// Map with index
const indexed = ["a", "b", "c"].map((item, index) => `${index}: ${item}`);
console.log("Indexed:", indexed); // ["0: a", "1: b", "2: c"]

// Map with array context
const temperatures = [0, 10, 20, 30];
const fahrenheit = temperatures.map((celsius) => (celsius * 9) / 5 + 32);
console.log("Celsius:", temperatures);
console.log("Fahrenheit:", fahrenheit);

// ===== 2. FILTER() - Keep elements that pass test =====
console.log("\n--- 2. FILTER() ---");

// Filter numbers
const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = allNumbers.filter((n) => n % 2 === 0);
console.log("Even numbers:", evenNumbers); // [2, 4, 6, 8, 10]

// Filter objects
const adults = users.filter((user) => user.age >= 30);
console.log("Adults (30+):", adults);

// Filter with multiple conditions
const highValue = allNumbers.filter((n) => n > 3 && n < 8);
console.log("Between 3 and 8:", highValue); // [4, 5, 6, 7]

// Remove falsy values
const mixed = [0, 1, "", "hello", null, false, true, undefined];
const truthy = mixed.filter(Boolean);
console.log("Truthy values:", truthy); // [1, "hello", true]

// ===== 3. REDUCE() - Combine all elements =====
console.log("\n--- 3. REDUCE() ---");

// Sum all numbers
const sum = allNumbers.reduce((acc, num) => acc + num, 0);
console.log("Sum:", sum); // 55

// Product of numbers
const product = [2, 3, 4, 5].reduce((acc, num) => acc * num, 1);
console.log("Product:", product); // 120

// Build object from array
const colors = ["red", "blue", "green"];
const colorMap = colors.reduce((acc, color, index) => {
  acc[index] = color;
  return acc;
}, {});
console.log("Color map:", colorMap); // {0: "red", 1: "blue", 2: "green"}

// Count occurrences
const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const wordCount = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log("Word count:", wordCount); // {apple: 3, banana: 2, cherry: 1}

// Flatten array
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flattened = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log("Flattened:", flattened); // [1, 2, 3, 4, 5, 6]

// ===== 4. FIND() - Get first matching element =====
console.log("\n--- 4. FIND() ---");

// Find first even number
const firstEven = allNumbers.find((n) => n % 2 === 0);
console.log("First even:", firstEven); // 2

// Find user by condition
const found = users.find((user) => user.age > 30);
console.log("User over 30:", found); // {id: 2, name: "Bob", age: 30} or {id: 3, ...}

// Find with no match
const notFound = users.find((user) => user.age > 100);
console.log("User over 100:", notFound); // undefined

// Find object by property
const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
];
const mouse = products.find((p) => p.name === "Mouse");
console.log("Found product:", mouse);

// ===== 5. SOME() & EVERY() - Boolean checks =====
console.log("\n--- 5. SOME() & EVERY() ---");

// Some - at least one matches
const hasNegative = [-1, 0, 1, 2].some((n) => n < 0);
console.log("Has negative:", hasNegative); // true

const hasLargeUser = users.some((user) => user.age > 40);
console.log("Has user over 40:", hasLargeUser); // false

// Every - all must match
const allPositive = [1, 2, 3, 4, 5].every((n) => n > 0);
console.log("All positive:", allPositive); // true

const allAdults = users.every((user) => user.age >= 18);
console.log("All adults:", allAdults); // true

const allUnder30 = users.every((user) => user.age < 30);
console.log("All under 30:", allUnder30); // false

// ===== 6. FOREACH() - Execute for each element =====
console.log("\n--- 6. FOREACH() ---");

// Simple iteration
console.log("Numbers:");
allNumbers.forEach((num) => console.log(`  ${num}`));

// With index and array
["a", "b", "c"].forEach((item, index, array) => {
  console.log(`Index ${index}: ${item} (Array length: ${array.length})`);
});

// Modify external object
const userSummary = [];
users.forEach((user) => {
  userSummary.push(`${user.name} is ${user.age} years old`);
});
console.log("Summary:", userSummary);

// ===== 7. SLICE() - Get portion of array =====
console.log("\n--- 7. SLICE() ---");

const arr = [10, 20, 30, 40, 50];

// Slice with two parameters
console.log("arr.slice(1, 3):", arr.slice(1, 3)); // [20, 30]
console.log("arr.slice(2):", arr.slice(2)); // [30, 40, 50]
console.log("arr.slice(-2):", arr.slice(-2)); // [40, 50]
console.log("arr.slice():", arr.slice()); // Creates copy

// Copy array
const copy = arr.slice();
console.log("Copy equal:", JSON.stringify(copy) === JSON.stringify(arr));
console.log("Copy is different object:", copy !== arr);

// ===== 8. SPLICE() - Modify array =====
console.log("\n--- 8. SPLICE() ---");

const mutable = [1, 2, 3, 4, 5];
console.log("Original:", mutable);

// Remove 2 elements starting at index 1
const removed = mutable.splice(1, 2);
console.log("Removed:", removed); // [2, 3]
console.log("After removal:", mutable); // [1, 4, 5]

// Add elements
mutable.splice(1, 0, 2, 3); // Insert at index 1
console.log("After insertion:", mutable); // [1, 2, 3, 4, 5]

// Replace elements
const replaced = [10, 20, 30, 40].splice(1, 2, 25, 35);
console.log("Replaced:", replaced); // [20, 30]

// ===== 9. INDEXOF() & INCLUDES() - Search =====
console.log("\n--- 9. INDEXOF() & INCLUDES() ---");

const fruits = ["apple", "banana", "cherry", "banana"];

// IndexOf - first occurrence
console.log("Index of 'banana':", fruits.indexOf("banana")); // 1
console.log("Index of 'grape':", fruits.indexOf("grape")); // -1
console.log("Index of 'banana' from index 2:", fruits.indexOf("banana", 2)); // 3

// Includes - boolean check
console.log("Includes 'apple':", fruits.includes("apple")); // true
console.log("Includes 'grape':", fruits.includes("grape")); // false

// With numbers (be careful with NaN)
const nums = [1, 2, 3, NaN, 5];
console.log("Includes 3:", nums.includes(3)); // true
console.log("Includes NaN:", nums.includes(NaN)); // true (unlike indexOf)

// ===== 10. SORT() - Order elements =====
console.log("\n--- 10. SORT() ---");

// Default sort (alphabetical)
const unsorted = ["cherry", "apple", "banana"];
const sorted = unsorted.sort();
console.log("Sorted:", sorted); // ["apple", "banana", "cherry"]
console.log("Note: Original modified:", unsorted); // Mutates original!

// Numeric sort
const nums2 = [10, 5, 40, 25, 1000, 1];
const numSorted = [...nums2].sort((a, b) => a - b);
console.log("Numbers sorted:", numSorted); // [1, 5, 10, 25, 40, 1000]

// Reverse numeric
const descending = [...nums2].sort((a, b) => b - a);
console.log("Descending:", descending);

// Sort objects
const employees = [
  { name: "Alice", salary: 50000 },
  { name: "Charlie", salary: 45000 },
  { name: "Bob", salary: 60000 },
];
const bySalary = [...employees].sort((a, b) => b.salary - a.salary);
console.log(
  "By salary (high to low):",
  bySalary.map((e) => e.name),
);

// ===== 11. REVERSE() - Flip order =====
console.log("\n--- 11. REVERSE() ---");

const original = [1, 2, 3, 4, 5];
const reversed = [...original].reverse(); // Use spread to avoid mutation
console.log("Original:", original);
console.log("Reversed:", reversed);

// Reverse and do something
const backwards = "hello".split("").reverse().join("");
console.log("hello reversed:", backwards); // "olleh"

// ===== 12. JOIN() & SPLIT() - String conversion =====
console.log("\n--- 12. JOIN() & SPLIT() ---");

const arr2 = ["JavaScript", "is", "awesome"];
const sentence = arr2.join(" ");
console.log("Joined:", sentence); // "JavaScript is awesome"

const csv = arr2.join(",");
console.log("CSV:", csv); // "JavaScript,is,awesome"

// Reverse operation
const splitBack = sentence.split(" ");
console.log("Split back:", splitBack); // ["JavaScript", "is", "awesome"]

// ===== 13. FLATMAP() - Map and flatten =====
console.log("\n--- 13. FLATMAP() ---");

const duplicated = [1, 2, 3].map((n) => [n, n]);
console.log("Map with duplication:", duplicated); // [[1,1], [2,2], [3,3]]

const flattened2 = [1, 2, 3].flatMap((n) => [n, n]);
console.log("Flatmap result:", flattened2); // [1, 1, 2, 2, 3, 3]

// Practical: Expand strings
const phrases = ["hello", "world"];
const letters = phrases.flatMap((phrase) => phrase.split(""));
console.log("All letters:", letters); // ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// ===== 14. CHAINING - Combine methods =====
console.log("\n--- 14. CHAINING METHODS ---");

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = data
  .filter((n) => n % 2 === 0) // Keep evens: [2, 4, 6, 8, 10]
  .map((n) => n * n) // Square them: [4, 16, 36, 64, 100]
  .reduce((sum, n) => sum + n, 0); // Sum them: 220

console.log("Chained result:", result);

// Practical chaining with objects
const userProfit = users
  .filter((user) => user.age >= 30)
  .map((user) => ({ ...user, category: "senior" }))
  .reduce((str, user) => str + `${user.name} (${user.category}), `, "");

console.log("Senior users:", userProfit);

// ===== 15. PRACTICAL EXAMPLES =====
console.log("\n--- 15. PRACTICAL EXAMPLES ---");

// Example 1: Calculate total price with discount
const cart = [
  { name: "Laptop", price: 1000, quantity: 1 },
  { name: "Mouse", price: 25, quantity: 2 },
  { name: "Keyboard", price: 75, quantity: 1 },
];

const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
console.log("Total before discount:", total); // 1175

const discounted = total * 0.9; // 10% discount
console.log("Total after 10% discount:", discounted); // 1057.5

// Example 2: Filter and count
const posts = [
  { id: 1, likes: 100, shared: true },
  { id: 2, likes: 50, shared: false },
  { id: 3, likes: 200, shared: true },
  { id: 4, likes: 25, shared: false },
];

const viralPosts = posts
  .filter((post) => post.likes > 75 || post.shared)
  .map((post) => ({ ...post, category: "viral" }));

console.log("Viral posts:", viralPosts);

// Example 3: Group by property
const transactions = [
  { type: "credit", amount: 100 },
  { type: "debit", amount: 50 },
  { type: "credit", amount: 200 },
  { type: "debit", amount: 75 },
];

const byType = transactions.reduce((acc, trans) => {
  const key = trans.type;
  acc[key] = acc[key] || [];
  acc[key].push(trans.amount);
  return acc;
}, {});

console.log("Grouped:", byType);
// {credit: [100, 200], debit: [50, 75]}

console.log("\n=== Array Methods Summary ===");
console.log("map() - Transform each element");
console.log("filter() - Keep elements that pass test");
console.log("reduce() - Combine all into single value");
console.log("find() - Get first match");
console.log("some() - Test if any matches");
console.log("every() - Test if all match");
console.log("forEach() - Execute for each");
console.log("slice() - Get portion (non-mutating)");
console.log("splice() - Add/remove items (mutating)");
console.log("indexOf() / includes() - Search");
console.log("sort() - Order elements (mutating)");
console.log("reverse() - Flip order (mutating)");
console.log("join() - Convert to string");
console.log("flatMap() - Map and flatten");
