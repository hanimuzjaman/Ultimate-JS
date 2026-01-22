# BIG O NOTATION

## What is Big O?

Big O notation describes how an algorithm's time or space requirements grow as input size increases. It represents worst-case performance.

**Common Complexities (Best to Worst):**

- O(1) - Constant
- O(log n) - Logarithmic
- O(n) - Linear
- O(n log n) - Linearithmic
- O(n²) - Quadratic
- O(2ⁿ) - Exponential
- O(n!) - Factorial

## O(1) - Constant Time

```javascript
// Time complexity: O(1)
function getFirstElement(arr) {
  return arr[0]; // Always 1 operation
}

function isEven(num) {
  return num % 2 === 0; // Always 1 operation
}

// Dictionary/hash table lookup
const user = users[userId]; // O(1) average case
```

## O(log n) - Logarithmic Time

```javascript
// Binary search: O(log n)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// For 1,000,000 items: ~20 iterations max
console.log(binarySearch([1, 3, 5, 7, 9], 7)); // O(log n)
```

## O(n) - Linear Time

```javascript
// Iterating through array: O(n)
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// Linear search: O(n)
function contains(arr, value) {
  for (let item of arr) {
    if (item === value) return true;
  }
  return false;
}

// Array.map, filter, forEach: O(n)
const doubled = arr.map((x) => x * 2); // O(n)
const evens = arr.filter((x) => x % 2 === 0); // O(n)
```

## O(n²) - Quadratic Time

```javascript
// Nested loops: O(n²)
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Naive string search: O(n²)
function findSubstring(text, pattern) {
  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) break;
      if (j === pattern.length - 1) return i;
    }
  }
  return -1;
}
```

## O(n log n) - Linearithmic Time

```javascript
// Merge sort: O(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// JavaScript sort (V8 uses TimSort): O(n log n) average
arr.sort((a, b) => a - b); // O(n log n)
```

## O(2ⁿ) - Exponential Time

```javascript
// Naive recursion: O(2ⁿ)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// For n=40: ~1 billion operations!
// fibonacci(40); // Extremely slow

// Optimized with memoization: O(n)
const fibMemo = {};
function fibonacciMemo(n) {
  if (n in fibMemo) return fibMemo[n];
  if (n <= 1) return n;

  fibMemo[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
  return fibMemo[n];
}

console.log(fibonacciMemo(40)); // Fast!
```

## Space Complexity

```javascript
// O(1) space
function sum(arr) {
  let total = 0; // Single variable
  for (let num of arr) {
    total += num;
  }
  return total;
}

// O(n) space
function double(arr) {
  const result = []; // New array same size as input
  for (let num of arr) {
    result.push(num * 2);
  }
  return result;
}

// O(log n) space (call stack)
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearch(arr, target, mid + 1, right);
  return binarySearch(arr, target, left, mid - 1);
}
```

## Practical Complexity Analysis

```javascript
// Example: Find duplicates
// Naive approach: O(n²)
function hasDuplicates_naive(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// Optimized approach: O(n)
function hasDuplicates_optimized(arr) {
  const seen = new Set();
  for (let num of arr) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}
```

## Complexity Comparison Table

| Algorithm     | Time           | Space    | Use Case          |
| ------------- | -------------- | -------- | ----------------- |
| Linear Search | O(n)           | O(1)     | Unsorted data     |
| Binary Search | O(log n)       | O(1)     | Sorted data       |
| Bubble Sort   | O(n²)          | O(1)     | Small datasets    |
| Merge Sort    | O(n log n)     | O(n)     | Large datasets    |
| Quick Sort    | O(n log n) avg | O(log n) | General use       |
| Hash Table    | O(1) avg       | O(n)     | Key-value storage |

## Optimization Techniques

```javascript
// 1. Use appropriate data structures
const userIds = new Set(users.map((u) => u.id)); // O(1) lookup
const userMap = new Map(users.map((u) => [u.id, u])); // O(1) access

// 2. Avoid nested loops when possible
// Instead of: O(n²)
for (let i = 0; i < arr1.length; i++) {
  for (let j = 0; j < arr2.length; j++) {
    // ...
  }
}

// Use: O(n)
const set2 = new Set(arr2);
for (let item of arr1) {
  if (set2.has(item)) {
    // ...
  }
}

// 3. Use built-in optimized methods
arr.sort(); // O(n log n) optimized native code
arr.map((x) => x * 2); // Optimized C++ implementation
```

## Best Practices

✓ Analyze algorithms before implementing
✓ Choose data structures wisely
✓ Use built-in optimized methods
✓ Memoize expensive computations
✓ Test with various input sizes
✓ Profile real performance
✓ Know algorithm complexities
✓ Trade time for space when needed

✗ Don't assume O(n) operations are instant
✗ Don't ignore constants in Big O
✗ Don't prematurely optimize
✗ Don't use inappropriate algorithms
✗ Don't ignore real-world performance
