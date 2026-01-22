# Array Methods in JavaScript

## Array Transformation Methods

### map()

Transforms each element and returns a new array.

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
const names = users.map((user) => user.name);
console.log(names); // ['Alice', 'Bob']
```

### filter()

Creates a new array with elements that pass a test.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]

const users = [
  { name: "Alice", active: true },
  { name: "Bob", active: false },
  { name: "Charlie", active: true },
];
const activeUsers = users.filter((u) => u.active);
```

### reduce()

Reduces array to a single value.

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Group by category
const items = [
  { name: "Apple", category: "fruit" },
  { name: "Carrot", category: "vegetable" },
  { name: "Banana", category: "fruit" },
];

const grouped = items.reduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item.name);
  return acc;
}, {});
```

## Array Search Methods

### find()

Returns first element that matches condition.

```javascript
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: 'Bob' }
```

### findIndex()

Returns index of first matching element.

```javascript
const arr = ["apple", "banana", "cherry"];
const index = arr.findIndex((item) => item === "banana");
console.log(index); // 1
```

### indexOf() and lastIndexOf()

Find element by value (strict equality).

```javascript
const arr = [10, 20, 30, 20, 10];
console.log(arr.indexOf(20)); // 1
console.log(arr.lastIndexOf(20)); // 3
```

### includes()

Check if array contains element.

```javascript
const arr = ["apple", "banana", "cherry"];
console.log(arr.includes("banana")); // true
console.log(arr.includes("grape")); // false
```

### some() and every()

Test if elements match condition.

```javascript
const numbers = [1, 2, 3, 4, 5];

// At least one even?
console.log(numbers.some((n) => n % 2 === 0)); // true

// All positive?
console.log(numbers.every((n) => n > 0)); // true

// All even?
console.log(numbers.every((n) => n % 2 === 0)); // false
```

## Array Iteration Methods

### forEach()

Execute function for each element.

```javascript
const items = ["apple", "banana", "cherry"];
items.forEach((item, index) => {
  console.log(`${index}: ${item}`);
});
```

### for...of Loop

Iterate over values (not indices).

```javascript
const items = ["apple", "banana", "cherry"];
for (const item of items) {
  console.log(item);
}
```

### for...in Loop

Iterate over indices (not recommended for arrays).

```javascript
const items = ["apple", "banana", "cherry"];
for (const index in items) {
  console.log(index, items[index]); // Index is a string!
}
```

## Array Mutation Methods (AVOID WHEN POSSIBLE)

### push() and unshift()

Add elements (mutates original).

```javascript
const arr = [1, 2, 3];
arr.push(4); // Add to end
arr.unshift(0); // Add to beginning
console.log(arr); // [0, 1, 2, 3, 4]
```

### pop() and shift()

Remove elements (mutates original).

```javascript
const arr = [1, 2, 3, 4, 5];
arr.pop(); // Remove last
arr.shift(); // Remove first
console.log(arr); // [2, 3, 4]
```

### splice()

Insert/remove elements at position (mutates original).

```javascript
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 2, "a", "b"); // At index 2, remove 2, insert 'a', 'b'
console.log(arr); // [1, 2, 'a', 'b', 5]
```

### reverse() and sort()

Reverse/sort array (mutate original).

```javascript
const arr = [3, 1, 4, 1, 5];
arr.reverse(); // Reverse in place
arr.sort((a, b) => a - b); // Sort numerically
console.log(arr); // [1, 1, 3, 4, 5]
```

## Array Copying and Combining

### Shallow Copy

```javascript
const original = [1, 2, 3];

// Methods to copy (all create shallow copy)
const copy1 = [...original]; // Spread operator
const copy2 = original.slice(); // slice()
const copy3 = Array.from(original); // Array.from()

console.log(copy1); // [1, 2, 3]
console.log(copy1 === original); // false (different arrays)
```

### concat()

Combine arrays.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4]

// Alternative using spread
const combined2 = [...arr1, ...arr2];
```

### Merging and Flattening

```javascript
// Shallow flatten
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flat = nested.flat();
console.log(flat); // [1, 2, 3, 4, 5, 6]

// Deep flatten
const deepNested = [
  [1, [2, 3]],
  [4, [5, [6]]],
];
const deepFlat = deepNested.flat(Infinity);
console.log(deepFlat); // [1, 2, 3, 4, 5, 6]
```

## Array Slicing and Joining

### slice()

Extract portion (doesn't mutate).

```javascript
const arr = ["a", "b", "c", "d", "e"];
console.log(arr.slice(1, 4)); // ['b', 'c', 'd']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr); // Original unchanged
```

### join()

Convert array to string.

```javascript
const arr = ["apple", "banana", "cherry"];
console.log(arr.join()); // "apple,banana,cherry"
console.log(arr.join(" - ")); // "apple - banana - cherry"
console.log(arr.join("")); // "applebananacherry"
```

### split()

Convert string to array.

```javascript
const str = "apple,banana,cherry";
const arr = str.split(",");
console.log(arr); // ['apple', 'banana', 'cherry']
```

## Common Patterns

### Chaining Methods

```javascript
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 30, active: false },
  { name: "Charlie", age: 28, active: true },
];

const result = users
  .filter((u) => u.active) // Only active users
  .map((u) => u.name) // Get names
  .sort(); // Alphabetical

console.log(result); // ['Alice', 'Charlie']
```

### Creating Arrays

```javascript
// Array constructor
const arr1 = new Array(3); // [empty x 3]
const arr2 = new Array(1, 2, 3); // [1, 2, 3]

// Array literals
const arr3 = [1, 2, 3];
const arr4 = [];

// Array.from()
const arr5 = Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']
const arr6 = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]

// Array.of()
const arr7 = Array.of(5); // [5] (not [empty x 5])
```

## Summary Table

| Method            | Mutates | Returns        | Use Case           |
| ----------------- | ------- | -------------- | ------------------ |
| **map**           | No      | New array      | Transform elements |
| **filter**        | No      | New array      | Select elements    |
| **reduce**        | No      | Single value   | Aggregate data     |
| **find**          | No      | Single element | Find first match   |
| **forEach**       | No      | undefined      | Execute for each   |
| **push/pop**      | Yes     | Element        | Add/remove end     |
| **shift/unshift** | Yes     | Element        | Add/remove start   |
| **splice**        | Yes     | Removed items  | Insert/remove      |
| **sort/reverse**  | Yes     | Array          | Modify order       |
| **slice**         | No      | New array      | Copy portion       |
| **concat**        | No      | New array      | Combine arrays     |
| **join**          | No      | String         | Convert to string  |

**Best Practice:** Use immutable methods (map, filter, reduce) by default. Only use mutating methods when necessary for performance.
