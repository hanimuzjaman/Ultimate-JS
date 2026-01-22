// PERFORMANCE OPTIMIZATION PRACTICE

// Practice 1: Compare Search Algorithms - O(n) vs O(log n)
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function binarySearch(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

const sortedArray = Array.from({ length: 1000000 }, (_, i) => i);
const target = 999999;

console.log("=== Search Performance ===");
console.time("Linear Search (O(n))");
const linearResult = linearSearch(sortedArray, target);
console.timeEnd("Linear Search (O(n))");

console.time("Binary Search (O(log n))");
const binaryResult = binarySearch(sortedArray, target);
console.timeEnd("Binary Search (O(log n))");

// Practice 2: Memoization Performance
function expensiveFibonacci(n) {
  if (n <= 1) return n;
  return expensiveFibonacci(n - 1) + expensiveFibonacci(n - 2);
}

function memoizedFibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;

  memo[n] = memoizedFibonacci(n - 1, memo) + memoizedFibonacci(n - 2, memo);
  return memo[n];
}

console.log("\n=== Fibonacci Performance ===");
console.time("Without memoization (n=35)");
try {
  const slow = expensiveFibonacci(35);
  console.timeEnd("Without memoization (n=35)");
} catch (e) {
  console.log("Without memoization: Too slow, skipped");
}

console.time("With memoization (n=35)");
const fast = memoizedFibonacci(35);
console.timeEnd("With memoization (n=35)");
console.log("Result:", fast);

// Practice 3: Array Method Performance - map vs forEach vs for
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

console.log("\n=== Array Iteration Performance ===");

console.time("for loop");
let sum1 = 0;
for (let i = 0; i < largeArray.length; i++) {
  sum1 += largeArray[i];
}
console.timeEnd("for loop");

console.time("forEach");
let sum2 = 0;
largeArray.forEach((num) => {
  sum2 += num;
});
console.timeEnd("forEach");

console.time("map");
const mapped = largeArray.map((num) => num * 2);
console.timeEnd("map");

console.time("reduce");
const sum3 = largeArray.reduce((acc, num) => acc + num, 0);
console.timeEnd("reduce");

// Practice 4: Object vs Map Performance
const iterations = 1000000;

console.log("\n=== Object vs Map Performance ===");

console.time("Object access (1M iterations)");
const obj = { key: "value" };
for (let i = 0; i < iterations; i++) {
  const _ = obj.key;
}
console.timeEnd("Object access (1M iterations)");

console.time("Map access (1M iterations)");
const map = new Map([["key", "value"]]);
for (let i = 0; i < iterations; i++) {
  const _ = map.get("key");
}
console.timeEnd("Map access (1M iterations)");

console.time("Set lookup (1M iterations)");
const set = new Set(["value"]);
for (let i = 0; i < iterations; i++) {
  const _ = set.has("value");
}
console.timeEnd("Set lookup (1M iterations)");

// Practice 5: String Concatenation Methods
const strings = Array.from({ length: 10000 }, (_, i) => `String ${i}`);

console.log("\n=== String Concatenation Performance ===");

console.time("String concatenation with +");
let result1 = "";
for (let str of strings) {
  result1 += str + "\n";
}
console.timeEnd("String concatenation with +");

console.time("Array.join()");
const result2 = strings.join("\n");
console.timeEnd("Array.join()");

console.time("Template literals");
let result3 = "";
for (let str of strings) {
  result3 += `${str}\n`;
}
console.timeEnd("Template literals");

// Practice 6: Sorting Algorithms Performance
function bubbleSort(arr) {
  const copy = [...arr];
  for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy.length - i - 1; j++) {
      if (copy[j] > copy[j + 1]) {
        [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
      }
    }
  }
  return copy;
}

const smallArray = Array.from({ length: 100 }, () => Math.random() * 100);

console.log("\n=== Sorting Performance ===");

console.time("Bubble Sort (O(n²)) - 100 items");
const bubbled = bubbleSort(smallArray);
console.timeEnd("Bubble Sort (O(n²)) - 100 items");

console.time("Native sort (O(n log n)) - 100 items");
const nativeSorted = [...smallArray].sort((a, b) => a - b);
console.timeEnd("Native sort (O(n log n)) - 100 items");

// Practice 7: Hash Table Lookup vs Array Search
const uniqueValues = new Set();
for (let i = 0; i < 10000; i++) {
  uniqueValues.add(`value_${Math.floor(Math.random() * 10000)}`);
}

const valuesArray = Array.from(uniqueValues);
const valuesSet = new Set(valuesArray);

console.log("\n=== Lookup Performance ===");

console.time("Array.includes() (O(n)) - 100 lookups");
for (let i = 0; i < 100; i++) {
  const _ = valuesArray.includes(`value_${Math.random() * 10000}`);
}
console.timeEnd("Array.includes() (O(n)) - 100 lookups");

console.time("Set.has() (O(1)) - 100 lookups");
for (let i = 0; i < 100; i++) {
  const _ = valuesSet.has(`value_${Math.random() * 10000}`);
}
console.timeEnd("Set.has() (O(1)) - 100 lookups");

// Practice 8: Function Call Overhead
function simpleFunction() {
  return 42;
}

const inlinedValue = 42;

console.log("\n=== Function Call Overhead ===");

console.time("Function calls (1M)");
for (let i = 0; i < 1000000; i++) {
  const _ = simpleFunction();
}
console.timeEnd("Function calls (1M)");

console.time("Direct value access (1M)");
for (let i = 0; i < 1000000; i++) {
  const _ = inlinedValue;
}
console.timeEnd("Direct value access (1M)");

// Practice 9: DOM Query Performance (Node.js simulation)
// In real browser: querySelectorAll vs getElementById
const mockDOMCache = {};
const mockDOM = Array.from({ length: 1000 }, (_, i) => ({
  id: `element_${i}`,
  className: `class_${i % 10}`,
}));

function getElementById(id) {
  if (mockDOMCache[id]) return mockDOMCache[id];
  const element = mockDOM.find((el) => el.id === id);
  mockDOMCache[id] = element;
  return element;
}

console.log("\n=== DOM Query Performance (Simulated) ===");

console.time("Without caching (100 queries)");
for (let i = 0; i < 100; i++) {
  const _ = mockDOM.find((el) => el.id === `element_${i % 1000}`);
}
console.timeEnd("Without caching (100 queries)");

mockDOMCache.clear?.() ||
  Object.keys(mockDOMCache).forEach((k) => delete mockDOMCache[k]);

console.time("With caching (100 queries)");
for (let i = 0; i < 100; i++) {
  const _ = getElementById(`element_${i % 1000}`);
}
console.timeEnd("With caching (100 queries)");

// Practice 10: Destructuring vs Direct Access
const largeObject = {
  prop1: "value1",
  prop2: "value2",
  prop3: "value3",
  prop4: "value4",
  prop5: "value5",
};

console.log("\n=== Destructuring vs Direct Access ===");

console.time("Direct access (1M operations)");
for (let i = 0; i < 1000000; i++) {
  const _ = largeObject.prop1 + largeObject.prop2 + largeObject.prop3;
}
console.timeEnd("Direct access (1M operations)");

console.time("Destructuring (1M operations)");
for (let i = 0; i < 1000000; i++) {
  const { prop1, prop2, prop3 } = largeObject;
  const _ = prop1 + prop2 + prop3;
}
console.timeEnd("Destructuring (1M operations)");

// Practice 11: Optimization Strategy Summary
console.log("\n=== Performance Optimization Checklist ===");
console.log(
  "✓ Use appropriate data structures (Set for lookups, Array for iteration)",
);
console.log("✓ Avoid nested loops when possible (O(n²) is slow!)");
console.log("✓ Use memoization for expensive recursive functions");
console.log("✓ Choose algorithms wisely (Binary search vs linear search)");
console.log("✓ Cache frequently accessed values");
console.log("✓ Use native methods (they're optimized in C++)");
console.log("✓ Measure before optimizing (use console.time)");
console.log("✓ Profile real performance with real data");

// Practice 12: Practical Optimization Example
// Inefficient: O(n²)
function findDuplicatesInefficient(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

// Efficient: O(n)
function findDuplicatesEfficient(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (let num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }

  return Array.from(duplicates);
}

const testArray = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 100),
);

console.log("\n=== Find Duplicates Performance ===");
console.time("Inefficient O(n²)");
const dupsInefficient = findDuplicatesInefficient(testArray);
console.timeEnd("Inefficient O(n²)");

console.time("Efficient O(n)");
const dupsEfficient = findDuplicatesEfficient(testArray);
console.timeEnd("Efficient O(n)");
console.log(
  "Found duplicates:",
  dupsEfficient.sort((a, b) => a - b).slice(0, 5),
  "...",
);
