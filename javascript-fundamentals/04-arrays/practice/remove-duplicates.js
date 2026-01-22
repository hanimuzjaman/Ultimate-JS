/**
 * Module 4: Arrays
 * Practice: Remove Duplicates
 *
 * Various techniques for removing duplicate values from arrays
 * Difficulty: Beginner to Intermediate
 */

// ============================================
// Exercise 1: Remove Duplicates with Set
// ============================================
function exercise1() {
  console.log("Exercise 1: Remove Duplicates with Set\n");

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
  console.log("Original:", numbers);
  console.log("Unique:", removeDuplicates(numbers)); // [1, 2, 3, 4]

  const words = ["apple", "banana", "apple", "cherry", "banana"];
  console.log("Original:", words);
  console.log("Unique:", removeDuplicates(words)); // ['apple', 'banana', 'cherry']
}

// ============================================
// Exercise 2: Remove Duplicates with indexOf
// ============================================
function exercise2() {
  console.log("\nExercise 2: Remove Duplicates with indexOf\n");

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const numbers = [1, 2, 2, 3, 3, 3];
  console.log("Unique:", removeDuplicates(numbers)); // [1, 2, 3]

  // Works with any data type
  const mixed = [1, "1", 1, "hello", "hello", true, 1];
  console.log("Mixed:", removeDuplicates(mixed)); // [1, '1', 'hello', true]
}

// ============================================
// Exercise 3: Remove Duplicates with reduce
// ============================================
function exercise3() {
  console.log("\nExercise 3: Remove Duplicates with reduce\n");

  function removeDuplicates(arr) {
    return arr.reduce((unique, item) => {
      return unique.includes(item) ? unique : [...unique, item];
    }, []);
  }

  const numbers = [1, 2, 2, 3, 3, 3];
  console.log("Unique:", removeDuplicates(numbers)); // [1, 2, 3]

  // Maintains order of first occurrence
  const sequence = [5, 3, 5, 1, 3, 2];
  console.log("Unique (ordered):", removeDuplicates(sequence)); // [5, 3, 1, 2]
}

// ============================================
// Exercise 4: Remove Duplicates from Objects
// ============================================
function exercise4() {
  console.log("\nExercise 4: Remove Duplicate Objects\n");

  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 1, name: "Alice" }, // Duplicate
    { id: 3, name: "Charlie" },
    { id: 2, name: "Bob" }, // Duplicate
  ];

  // Remove duplicates by id
  function removeDuplicateObjects(arr, key) {
    const seen = new Set();
    return arr.filter((item) => {
      if (seen.has(item[key])) {
        return false;
      }
      seen.add(item[key]);
      return true;
    });
  }

  console.log("Original count:", users.length); // 5
  const unique = removeDuplicateObjects(users, "id");
  console.log("Unique count:", unique.length); // 3
  console.table(unique);
}

// ============================================
// Exercise 5: Remove Duplicates by Property
// ============================================
function exercise5() {
  console.log("\nExercise 5: Remove Duplicates by Property\n");

  const products = [
    { id: 1, name: "Laptop", category: "Electronics" },
    { id: 2, name: "Mouse", category: "Electronics" },
    { id: 3, name: "Apple", category: "Fruit" },
    { id: 4, name: "Banana", category: "Fruit" },
    { id: 5, name: "Orange", category: "Fruit" },
  ];

  // Keep one product per category
  function uniqueByProperty(arr, property) {
    const seen = new Set();
    return arr.filter((item) => {
      const value = item[property];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }

  const onePerCategory = uniqueByProperty(products, "category");
  console.log("One per category:");
  console.table(onePerCategory);
}

// ============================================
// Exercise 6: Remove Duplicates (Case-Insensitive)
// ============================================
function exercise6() {
  console.log("\nExercise 6: Case-Insensitive Duplicates\n");

  function removeDuplicatesCaseInsensitive(arr) {
    const seen = new Set();
    return arr.filter((item) => {
      const lower = item.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });
  }

  const words = ["Apple", "banana", "APPLE", "Banana", "cherry", "CHERRY"];
  console.log("Original:", words);
  console.log(
    "Unique (case-insensitive):",
    removeDuplicatesCaseInsensitive(words),
  ); // ['Apple', 'banana', 'cherry']
}

// ============================================
// Exercise 7: Count Occurrences Then Remove
// ============================================
function exercise7() {
  console.log("\nExercise 7: Count Occurrences\n");

  function countAndRemoveDuplicates(arr) {
    const counts = {};
    const unique = [];

    arr.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
      if (counts[item] === 1) {
        unique.push(item);
      }
    });

    return { unique, counts };
  }

  const items = ["a", "b", "a", "c", "b", "a", "d"];
  const result = countAndRemoveDuplicates(items);

  console.log("Unique items:", result.unique); // ['a', 'b', 'c', 'd']
  console.log("Counts:", result.counts); // { a: 3, b: 2, c: 1, d: 1 }
}

// ============================================
// Exercise 8: Remove Duplicates and Sort
// ============================================
function exercise8() {
  console.log("\nExercise 8: Unique and Sorted\n");

  function uniqueAndSorted(arr) {
    return [...new Set(arr)].sort((a, b) => a - b);
  }

  const numbers = [5, 2, 8, 2, 9, 1, 5, 3];
  console.log("Original:", numbers);
  console.log("Unique and sorted:", uniqueAndSorted(numbers)); // [1, 2, 3, 5, 8, 9]

  // With strings
  function uniqueAndSortedStrings(arr) {
    return [...new Set(arr)].sort();
  }

  const words = ["zebra", "apple", "zebra", "banana", "apple"];
  console.log("Words sorted:", uniqueAndSortedStrings(words));
}

// ============================================
// Exercise 9: Remove Duplicates from Nested Array
// ============================================
function exercise9() {
  console.log("\nExercise 9: Flatten and Remove Duplicates\n");

  const nested = [
    [1, 2, 3],
    [2, 3, 4],
    [4, 5, 6],
  ];

  // Flatten and remove duplicates
  function flattenAndUnique(arr) {
    return [...new Set(arr.flat())];
  }

  console.log("Nested:", nested);
  console.log("Flattened unique:", flattenAndUnique(nested)); // [1, 2, 3, 4, 5, 6]

  // More complex nested
  const complex = [
    [1, 2, [3, 4]],
    [2, 5, [6, 3]],
  ];

  function deepFlattenUnique(arr) {
    return [...new Set(arr.flat(Infinity))];
  }

  console.log("Complex nested:", complex);
  console.log("Deep flatten unique:", deepFlattenUnique(complex)); // [1, 2, 3, 4, 5, 6]
}

// ============================================
// Exercise 10: Preserve Data Type Order
// ============================================
function exercise10() {
  console.log("\nExercise 10: Performance Comparison\n");

  const largeArray = Array.from({ length: 10000 }, () =>
    Math.floor(Math.random() * 1000),
  );

  // Method 1: Set (fastest)
  console.time("Set method");
  const result1 = [...new Set(largeArray)];
  console.timeEnd("Set method");

  // Method 2: indexOf
  console.time("indexOf method");
  const result2 = largeArray.filter(
    (item, index) => largeArray.indexOf(item) === index,
  );
  console.timeEnd("indexOf method");

  // Method 3: reduce
  console.time("reduce method");
  const result3 = largeArray.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item];
  }, []);
  console.timeEnd("reduce method");

  console.log(
    "All methods produced same result:",
    result1.length === result2.length && result2.length === result3.length,
  );
  console.log("Unique count:", result1.length);
}

// Run all exercises
exercise1();
exercise2();
exercise3();
exercise4();
exercise5();
exercise6();
exercise7();
exercise8();
exercise9();
exercise10();
