# Arrays in JavaScript

## What are Arrays?

An **array** is an ordered collection of elements. Arrays are **objects** that store multiple values in a single variable.

**Real-life analogy:** An array is like a to-do list - multiple items stored in order that you can access by their position.

## Creating Arrays

### Method 1: Array Literal (Preferred)

```javascript
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null];
const empty = [];
```

### Method 2: Array Constructor

```javascript
const fruits = new Array("apple", "banana", "orange");
const numbers = new Array(5); // Creates array with 5 empty slots
```

The literal method is preferred for its simplicity.

## Accessing Array Elements

Arrays are **zero-indexed** (first element is at index 0):

```javascript
const fruits = ["apple", "banana", "orange"];

console.log(fruits[0]); // "apple"
console.log(fruits[1]); // "banana"
console.log(fruits[2]); // "orange"
console.log(fruits[3]); // undefined (doesn't exist)

// Get last element
console.log(fruits[fruits.length - 1]); // "orange"
```

## Array Properties

### Length

Returns the number of elements:

```javascript
const fruits = ["apple", "banana", "orange"];

console.log(fruits.length); // 3

// Modify length
fruits.length = 2; // Removes last element
console.log(fruits); // ["apple", "banana"]
```

## Array Methods

### Mutating Methods (Modify Original Array)

**push()** - Add element to end:

```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
```

**pop()** - Remove last element:

```javascript
const arr = [1, 2, 3];
arr.pop();
console.log(arr); // [1, 2]
```

**unshift()** - Add element to beginning:

```javascript
const arr = [1, 2, 3];
arr.unshift(0);
console.log(arr); // [0, 1, 2, 3]
```

**shift()** - Remove first element:

```javascript
const arr = [1, 2, 3];
arr.shift();
console.log(arr); // [2, 3]
```

**splice()** - Add/remove elements at any position:

```javascript
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 1, 10); // At index 2, remove 1 element, insert 10
console.log(arr); // [1, 2, 10, 4, 5]
```

**reverse()** - Reverse order:

```javascript
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]
```

**sort()** - Sort elements:

```javascript
const arr = [3, 1, 4, 1, 5];
arr.sort();
console.log(arr); // [1, 1, 3, 4, 5]
```

### Non-Mutating Methods (Return New Array)

**map()** - Transform each element:

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4] - original unchanged
```

**filter()** - Keep only matching elements:

```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4]
```

**reduce()** - Combine elements into single value:

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 10
```

**slice()** - Get portion of array:

```javascript
const arr = [1, 2, 3, 4, 5];
const slice = arr.slice(1, 4); // From index 1 to 3 (not including 4)
console.log(slice); // [2, 3, 4]
console.log(arr); // [1, 2, 3, 4, 5] - original unchanged
```

**concat()** - Join arrays:

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4]
```

**join()** - Convert to string:

```javascript
const arr = ["a", "b", "c"];
const str = arr.join("-");
console.log(str); // "a-b-c"
```

## Searching & Finding

**indexOf()** - Find element position:

```javascript
const arr = ["a", "b", "c", "b"];
console.log(arr.indexOf("b")); // 1 (first occurrence)
console.log(arr.indexOf("x")); // -1 (not found)
```

**includes()** - Check if element exists:

```javascript
const fruits = ["apple", "banana", "orange"];
console.log(fruits.includes("apple")); // true
console.log(fruits.includes("grape")); // false
```

**find()** - Find first matching element:

```javascript
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
];

const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: "Jane" }
```

**findIndex()** - Find index of matching element:

```javascript
const arr = [10, 20, 30, 40];
const index = arr.findIndex((num) => num > 25);
console.log(index); // 2 (index of 30)
```

## Iteration Methods

**forEach()** - Execute function for each element:

```javascript
const arr = [1, 2, 3];
arr.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});
```

**every()** - Check if all elements match condition:

```javascript
const numbers = [2, 4, 6, 8];
const allEven = numbers.every((num) => num % 2 === 0);
console.log(allEven); // true
```

**some()** - Check if any element matches condition:

```javascript
const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some((num) => num % 2 === 0);
console.log(hasEven); // true
```

## Spread Operator

The **spread operator** (`...`) allows an array to be expanded in places where zero or more elements are expected.

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copy array
const copy = [...arr1];
console.log(copy); // [1, 2, 3]

// Add elements
const extended = [...arr1, 0, ...arr2];
console.log(extended); // [1, 2, 3, 0, 4, 5, 6]
```

## Destructuring

**Destructuring** allows you to unpack values from arrays into variables:

```javascript
const fruits = ["apple", "banana", "orange"];

// Destructure first three elements
const [first, second, third] = fruits;
console.log(first); // "apple"
console.log(second); // "banana"

// Skip elements
const [, , third] = fruits;
console.log(third); // "orange"

// Rest operator
const [first, ...rest] = fruits;
console.log(first); // "apple"
console.log(rest); // ["banana", "orange"]
```

## Common Patterns

### Filtering and Mapping

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// Filter even numbers and double them
const result = numbers.filter((num) => num % 2 === 0).map((num) => num * 2);

console.log(result); // [4, 8, 12]
```

### Sorting Objects

```javascript
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];

// Sort by age
const sorted = users.sort((a, b) => a.age - b.age);
console.log(sorted); // Sorted by age
```

### Finding Total

```javascript
const items = [
  { name: "Item 1", price: 100 },
  { name: "Item 2", price: 200 },
  { name: "Item 3", price: 150 },
];

const total = items.reduce((sum, item) => sum + item.price, 0);
console.log(total); // 450
```

## Array vs String

Strings are similar to arrays but have different methods:

```javascript
const str = "hello";
const arr = [1, 2, 3];

// Both can be indexed
console.log(str[0]); // "h"
console.log(arr[0]); // 1

// Both have length
console.log(str.length); // 5
console.log(arr.length); // 3

// Convert string to array
const chars = str.split("");
console.log(chars); // ["h", "e", "l", "l", "o"]

// Convert array to string
const joined = arr.join(",");
console.log(joined); // "1,2,3"
```

## Best Practices

1. **Use const for arrays** - prevents reassignment
2. **Use methods instead of loops** - map, filter, reduce are more readable
3. **Don't mutate shared arrays** - use non-mutating methods (map, filter, slice)
4. **Check array length before accessing** - avoid undefined errors
5. **Use spread operator** - cleaner than concat or slice

```javascript
// ✅ Good
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
const evens = numbers.filter((num) => num % 2 === 0);
const combined = [...numbers, 4, 5];

// ❌ Avoid
let numbers = [1, 2, 3]; // Use const
numbers = numbers.concat([4, 5]); // Use spread operator
```

## Summary

- **Arrays** store multiple ordered values
- **Length** property gives element count
- **Mutating methods** change the original (push, pop, splice, reverse, sort)
- **Non-mutating methods** return new arrays (map, filter, slice, concat)
- **Iteration** with forEach, map, filter, reduce
- **Spread operator** (`...`) expands arrays
- **Destructuring** unpacks array values into variables

Arrays are fundamental to JavaScript. Master array methods and you'll write cleaner, more efficient code!
