/**
 * Module 13: Performance
 * Concepts: Big O Notation
 */

// ============================================
// 1. O(1) - CONSTANT TIME
// ============================================
console.log("=== O(1) - Constant Time ===\n");

function getFirstElement(arr) {
  return arr[0]; // Always 1 operation
}

console.log("First element:", getFirstElement([1, 2, 3, 4, 5]));

// ============================================
// 2. O(n) - LINEAR TIME
// ============================================
console.log("\n=== O(n) - Linear Time ===\n");

function findElement(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i; // Up to n operations
  }
  return -1;
}

console.log("Index of 3:", findElement([1, 2, 3, 4, 5], 3));

// ============================================
// 3. O(n²) - QUADRATIC TIME
// ============================================
console.log("\n=== O(n²) - Quadratic Time ===\n");

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    // n times
    for (let j = 0; j < n - i - 1; j++) {
      // n times
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log("Sorted:", bubbleSort([5, 3, 1, 4, 2]));

// ============================================
// 4. O(log n) - LOGARITHMIC
// ============================================
console.log("\n=== O(log n) - Logarithmic ===\n");

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

console.log("Binary search for 3:", binarySearch([1, 2, 3, 4, 5], 3));

// ============================================
// SUMMARY
// ============================================
console.log("\n=== SUMMARY ===\n");
console.log("✓ O(1): Best");
console.log("✓ O(log n): Excellent");
console.log("✓ O(n): Good");
console.log("✓ O(n²): Poor");
console.log("✓ O(2ⁿ): Worst");
