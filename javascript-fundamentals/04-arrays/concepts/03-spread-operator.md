# Spread Operator and Rest Parameters

## Spread Operator (...)

The spread operator allows an iterable (array or string) to be expanded in places where zero or more elements are expected.

### Copying Arrays

```javascript
// Traditional way (shallow copy)
const original = [1, 2, 3];
const copy = original.slice();

// Using spread operator
const copy2 = [...original];

console.log(copy2); // [1, 2, 3]
console.log(copy2 === original); // false (different arrays)
```

### Concatenating Arrays

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

// Traditional
const combined1 = arr1.concat(arr2).concat(arr3);

// Using spread
const combined2 = [...arr1, ...arr2, ...arr3];

console.log(combined2); // [1, 2, 3, 4, 5, 6]
```

### Adding Elements

```javascript
const arr = [1, 2, 3];

// Add at end
const withEnd = [...arr, 4, 5];
console.log(withEnd); // [1, 2, 3, 4, 5]

// Add at beginning
const withStart = [0, ...arr, 4];
console.log(withStart); // [0, 1, 2, 3, 4]

// Insert at position
const inserted = [...arr.slice(0, 2), "new", ...arr.slice(2)];
console.log(inserted); // [1, 2, 'new', 3]
```

### Copying Objects

```javascript
const original = { a: 1, b: 2, c: 3 };

// Shallow copy
const copy = { ...original };

console.log(copy); // { a: 1, b: 2, c: 3 }
console.log(copy === original); // false
```

### Merging Objects

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const obj3 = { c: 5, d: 6 };

// Merge (later properties override earlier ones)
const merged = { ...obj1, ...obj2, ...obj3 };
console.log(merged); // { a: 1, b: 3, c: 5, d: 6 }
```

### Updating Properties

```javascript
const user = { name: "Alice", age: 25, city: "NYC" };

// Update one property
const updated = { ...user, age: 26 };
console.log(updated); // { name: 'Alice', age: 26, city: 'NYC' }

// Original unchanged
console.log(user); // { name: 'Alice', age: 25, city: 'NYC' }
```

### In Function Calls

```javascript
const numbers = [1, 2, 3];

// Without spread: [1, 2, 3] passed as single array
console.log(Math.max([1, 2, 3])); // NaN

// With spread: 1, 2, 3 passed as individual arguments
console.log(Math.max(...numbers)); // 3

// Practical example
function sum(a, b, c) {
  return a + b + c;
}

const args = [10, 20, 30];
console.log(sum(...args)); // 60
```

## Rest Parameters (...)

Rest parameters allow a function to accept an indefinite number of arguments as an array.

### Basic Rest Parameters

```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(sum()); // 0
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

### Mixed Parameters

```javascript
// Regular parameters first, rest parameter last
function greetAll(greeting, ...names) {
  return names.map((name) => `${greeting}, ${name}`);
}

console.log(greetAll("Hello", "Alice", "Bob", "Charlie"));
// ["Hello, Alice", "Hello, Bob", "Hello, Charlie"]
```

### Destructuring with Rest

```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Object destructuring
const { name, age, ...details } = {
  name: "Alice",
  age: 25,
  city: "NYC",
  country: "USA",
};
console.log(name); // 'Alice'
console.log(details); // { city: 'NYC', country: 'USA' }
```

### In Functions

```javascript
function logEverything(label, ...items) {
  console.log(`${label}:`);
  items.forEach((item) => console.log(`  - ${item}`));
}

logEverything("Fruits", "apple", "banana", "orange");
// Fruits:
//   - apple
//   - banana
//   - orange
```

## Practical Examples

### Array Utilities

```javascript
// Remove duplicates
function removeDuplicates(...items) {
  return [...new Set(items)];
}

console.log(removeDuplicates(1, 2, 2, 3, 3, 3)); // [1, 2, 3]

// Flatten one level
function flatten(...arrays) {
  return [].concat(...arrays);
}

console.log(flatten([1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]

// Merge multiple objects
function mergeObjects(...objects) {
  return objects.reduce((merged, obj) => ({ ...merged, ...obj }), {});
}

console.log(mergeObjects({ a: 1 }, { b: 2 }, { c: 3 })); // { a: 1, b: 2, c: 3 }
```

### Data Transformation

```javascript
// Add prefix to all items
const addPrefix = (prefix, ...items) => items.map((item) => `${prefix}${item}`);

console.log(addPrefix("user_", "alice", "bob")); // ['user_alice', 'user_bob']

// Compose multiple transformations
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);

const add = (n) => (x) => x + n;
const multiply = (n) => (x) => x * n;

const transform = compose(multiply(2), add(10));
console.log(transform(5)); // ((5 + 10) * 2) = 30
```

### API Calls

```javascript
// Build query parameters
function buildUrl(baseUrl, ...params) {
  const query = params.filter((p) => p !== null && p !== undefined).join("&");
  return query ? `${baseUrl}?${query}` : baseUrl;
}

// Create API request
function apiCall(endpoint, { method = "GET", ...options } = {}) {
  return {
    url: endpoint,
    method,
    ...options,
  };
}

console.log(
  apiCall("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { name: "Alice" },
  }),
);
```

## Spread vs Rest: Quick Comparison

| Aspect      | Spread (...)         | Rest (...)              |
| ----------- | -------------------- | ----------------------- |
| **Where**   | Right side of =      | Parameter/destructuring |
| **Purpose** | Expand iterable      | Collect remaining items |
| **Array**   | [...arr] expands     | ...rest collects        |
| **Example** | Math.max(...[1,2,3]) | function(...args)       |
| **Returns** | Individual items     | Array of items          |

## Best Practices

1. **Use spread for immutability:**

   ```javascript
   // ✓ Good - creates new array
   const updated = [...original, newItem];

   // ✗ Bad - mutates original
   original.push(newItem);
   ```

2. **Use rest for flexible arguments:**

   ```javascript
   // ✓ Good - accepts any number of args
   function sum(...numbers) {}

   // ✗ Bad - limited arguments
   function sum(a, b, c) {}
   ```

3. **Shallow copy limitation:**

   ```javascript
   const original = { user: { name: "Alice" } };
   const copy = { ...original };

   copy.user.name = "Bob";
   console.log(original.user.name); // 'Bob' (nested object still shared!)
   ```

4. **Performance consideration:**

   ```javascript
   // Spread is slower for large arrays
   // For performance-critical code, use loops
   const largeArray = new Array(1000000).fill(1);

   // Slow
   const copy1 = [...largeArray];

   // Faster
   const copy2 = largeArray.slice();
   ```

## Summary

- **Spread operator** expands iterables into individual elements
- **Rest parameters** collect remaining arguments into an array
- Both use the same `...` syntax but in different contexts
- Use spread for immutable operations and function arguments
- Use rest for functions accepting variable arguments
- Be aware of shallow copy limitations with nested structures
