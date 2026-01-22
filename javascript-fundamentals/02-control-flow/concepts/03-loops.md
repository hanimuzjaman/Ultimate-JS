# Loops in JavaScript

## Overview

Loops allow you to repeat code blocks multiple times without writing the same code over and over. They're essential for iterating through data structures and automating repetitive tasks.

## Types of Loops

### 1. for Loop

The most traditional and versatile loop. Best when you know how many times you want to iterate.

```javascript
// Basic syntax
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// Breaking down the parts:
// let i = 0        → Initialize counter
// i < 5             → Condition to check before each iteration
// i++               → Increment after each iteration
```

**Characteristics:**

- Efficient when iteration count is known
- Great for array indexing
- Offers fine control over loop progression
- Supports `break` and `continue` statements

**Common Patterns:**

```javascript
// Forward iteration
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// Backward iteration
for (let i = 10; i > 0; i--) {
  console.log(i);
}

// Skip iterations
for (let i = 0; i < 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8
}

// Multiple variables
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j);
}
```

### 2. while Loop

Repeats code while a condition is true. Used when iteration count is unknown.

```javascript
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

// Common pattern: sentinel-controlled loop
let input;
while (input !== "quit") {
  input = prompt('Enter command (or "quit" to exit):');
  console.log("You entered:", input);
}
```

**Characteristics:**

- Executes while condition is `true`
- Condition checked BEFORE each iteration
- Can be infinite if condition never becomes false
- Use when iteration count is unknown

### 3. do...while Loop

Executes code block at least once, then repeats while condition is true.

```javascript
let count = 0;
do {
  console.log(count);
  count++;
} while (count < 5);

// The block executes even if condition is false initially
let x = 10;
do {
  console.log("This runs once even though x > 5");
} while (x < 5); // Condition is false, but block ran once
```

**Characteristics:**

- Executes code BEFORE checking condition
- Guarantees at least one execution
- Similar to while but with different timing
- Useful for input validation

### 4. for...in Loop

Iterates over object keys/property names.

```javascript
const person = { name: "Alice", age: 25, city: "NYC" };

for (let key in person) {
  console.log(key, person[key]);
}
// Output:
// name Alice
// age 25
// city NYC
```

**Characteristics:**

- Iterates over enumerable property names
- Works with arrays (returns indices as strings)
- Includes inherited properties from prototype
- Order is not guaranteed

**⚠️ Warning with Arrays:**

```javascript
// Not recommended for arrays
const arr = [10, 20, 30];
for (let index in arr) {
  console.log(index, arr[index]); // 0, 1, 2 (indices are strings!)
}

// Better use for...of for arrays
```

### 5. for...of Loop (ES6)

Iterates over iterable values (not keys).

```javascript
const arr = ["apple", "banana", "orange"];

for (let fruit of arr) {
  console.log(fruit);
}
// Output:
// apple
// banana
// orange

// Works with strings too
for (let char of "hello") {
  console.log(char);
}
```

**Characteristics:**

- Iterates over values, not keys
- Works with arrays, strings, Sets, Maps
- Cannot access index directly
- Cleaner than traditional for loop for iteration

### 6. forEach Method

Array method that executes function for each element.

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num, index, array) => {
  console.log(`Index ${index}: ${num}`);
});

// With destructuring
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

people.forEach(({ name, age }) => {
  console.log(`${name} is ${age} years old`);
});
```

**Characteristics:**

- Method on arrays
- Receives callback function
- Cannot use `break` or `continue`
- Always iterates all elements

## Loop Control Statements

### break

Exits the loop immediately.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break; // Exit loop when i equals 5
  console.log(i);
}
// Output: 0, 1, 2, 3, 4

// Useful for finding something
for (let i = 0; i < items.length; i++) {
  if (items[i] === searchTarget) {
    console.log("Found at index:", i);
    break;
  }
}
```

### continue

Skips current iteration and jumps to next.

```javascript
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue; // Skip even numbers
  console.log(i);
}
// Output: 1, 3, 5, 7, 9

// Skipping invalid data
for (let user of users) {
  if (!user.isActive) continue; // Skip inactive users
  console.log(user.name);
}
```

### labeled statements

Use with break/continue for nested loops.

```javascript
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outerLoop; // Break outer loop
    console.log(i, j);
  }
}
```

## Choosing the Right Loop

| Loop Type    | Use Case                       | Example                     |
| ------------ | ------------------------------ | --------------------------- |
| `for`        | Known iteration count          | Iterate through fixed array |
| `while`      | Unknown count, condition-based | Until user quits            |
| `do...while` | Run at least once              | Input validation            |
| `for...in`   | Object property names          | Serialize object            |
| `for...of`   | Array/string values            | Process collection          |
| `forEach`    | Simple array iteration         | Transform each element      |

## Performance Tips

1. **Cache array length in loops:**

```javascript
// Good
const len = arr.length;
for (let i = 0; i < len; i++) {}

// Less efficient
for (let i = 0; i < arr.length; i++) {}
```

2. **Use appropriate loop type:**

```javascript
// Faster for large arrays
for (const item of items) {
}

// forEach is slower but more readable
items.forEach((item) => {});
```

3. **Avoid complex conditions:**

```javascript
// Inefficient
for (let i = 0; i < arr.length && arr[i] !== target; i++) {}

// Better - separate concerns
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) break;
}
```

## Common Mistakes

1. **Infinite loops:**

```javascript
// ❌ Wrong - no i increment
for (let i = 0; i < 10; ) {
  console.log(i);
}

// ✓ Correct
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

2. **Off-by-one errors:**

```javascript
const arr = [1, 2, 3];
// ❌ Wrong - i should be < arr.length
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]); // Undefined on last iteration
}

// ✓ Correct
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

3. **Modifying array in loop:**

```javascript
const arr = [1, 2, 3, 4, 5];
// ⚠️ Be careful when modifying
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 3) {
    arr.splice(i, 1); // Removes element
    i--; // Adjust index
  }
}
```

## Summary

- **for:** Traditional, efficient, good for counted iterations
- **while:** Condition-based, count unknown
- **do...while:** Guaranteed at least one execution
- **for...in:** Iterate object keys
- **for...of:** Iterate values (ES6)
- **forEach:** Array method, declarative style
- Use **break** to exit, **continue** to skip iteration
- Choose based on use case and readability
