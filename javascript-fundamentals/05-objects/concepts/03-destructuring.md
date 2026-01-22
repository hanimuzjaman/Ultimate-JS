# Destructuring in JavaScript

## Object Destructuring

### Basic Destructuring

```javascript
const user = { name: "Alice", age: 25, city: "NYC" };

// Extract properties
const { name, age, city } = user;
console.log(name); // "Alice"
console.log(age); // 25

// Same as:
const name2 = user.name;
const age2 = user.age;
```

### Renaming Properties

```javascript
const user = { firstName: "Alice", lastName: "Smith" };

// Rename during destructuring
const { firstName: first, lastName: last } = user;
console.log(first); // "Alice"
console.log(last); // "Smith"
```

### Default Values

```javascript
const user = { name: "Bob" };

// Provide defaults
const { name, age = 30, city = "Unknown" } = user;
console.log(age); // 30 (default)
console.log(city); // "Unknown" (default)
```

### Nested Destructuring

```javascript
const user = {
  name: "Charlie",
  address: {
    street: "123 Main St",
    city: "LA",
  },
};

// Destructure nested object
const {
  name,
  address: { city },
} = user;
console.log(city); // "LA"
```

### Rest Properties

```javascript
const user = { name: "Diana", age: 28, city: "Boston", country: "USA" };

// Get some properties, rest go into remaining object
const { name, age, ...location } = user;
console.log(location); // { city: 'Boston', country: 'USA' }
```

## Array Destructuring

### Basic Array Destructuring

```javascript
const colors = ["red", "green", "blue"];

// Extract elements by position
const [first, second, third] = colors;
console.log(first); // "red"
console.log(second); // "green"
```

### Skipping Elements

```javascript
const arr = [1, 2, 3, 4, 5];

// Skip elements
const [a, , c] = arr;
console.log(a); // 1
console.log(c); // 3
```

### Default Values

```javascript
const arr = [1, 2];

// Provide defaults
const [a, b, c = 3] = arr;
console.log(c); // 3 (default)
```

### Rest Elements

```javascript
const numbers = [1, 2, 3, 4, 5];

// Rest collects remaining elements
const [first, ...rest] = numbers;
console.log(rest); // [2, 3, 4, 5]
```

### Swapping Variables

```javascript
let a = 1;
let b = 2;

// Swap without temp variable
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1
```

## Function Parameters

### Destructuring in Parameters

```javascript
// Instead of:
function greet(user) {
  console.log(`Hello, ${user.name}`);
}

// Use destructuring:
function greet({ name }) {
  console.log(`Hello, ${name}`);
}

greet({ name: "Emma", age: 30 }); // "Hello, Emma"
```

### With Defaults

```javascript
function createUser({ name, role = "user" } = {}) {
  return { name, role };
}

console.log(createUser({ name: "Frank" }));
// { name: 'Frank', role: 'user' }
```

### Array Destructuring in Parameters

```javascript
function sum([a, b]) {
  return a + b;
}

console.log(sum([10, 20])); // 30

// With rest
function logAll([first, ...rest]) {
  console.log("First:", first);
  console.log("Rest:", rest);
}

logAll([1, 2, 3, 4]);
```

## Practical Examples

### Multiple Return Values

```javascript
function getCoordinates() {
  return { x: 10, y: 20, z: 30 };
}

const { x, y } = getCoordinates();
console.log(x, y); // 10, 20
```

### API Response Handling

```javascript
function processResponse({ data, status, error = null }) {
  if (status === 200) {
    return data;
  } else {
    return `Error: ${error}`;
  }
}

const response = { data: [1, 2, 3], status: 200 };
console.log(processResponse(response)); // [1, 2, 3]
```

### Configuration Objects

```javascript
function setupServer({
  host = "localhost",
  port = 3000,
  ssl = false,
  ...options
} = {}) {
  return {
    host,
    port,
    ssl,
    otherOptions: options,
  };
}

console.log(
  setupServer({
    port: 8080,
    ssl: true,
    timeout: 5000,
  }),
);
```

### Destructuring in Loops

```javascript
const users = [
  { id: 1, name: "Grace" },
  { id: 2, name: "Henry" },
  { id: 3, name: "Iris" },
];

// Destructure in for loop
for (const { id, name } of users) {
  console.log(`${id}: ${name}`);
}

// Or with map
users.map(({ name }) => name); // ['Grace', 'Henry', 'Iris']
```

## Common Patterns

### Extract Specific Properties

```javascript
const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };

// Get only needed properties
const { a, c, e } = obj;
```

### Provide Fallbacks

```javascript
const config = { timeout: 5000 };

const { timeout = 3000, retries = 3 } = config;
console.log(timeout); // 5000
console.log(retries); // 3 (default)
```

### Merging Objects After Destructuring

```javascript
const user = { name: "Jack", age: 35 };
const { name, ...rest } = user;

const updated = {
  name: name.toUpperCase(),
  ...rest,
  updated: true,
};
```

## Deep Destructuring with Defaults

```javascript
const data = { user: { profile: { name: "Karen" } } };

// Safely access nested properties
const { user: { profile: { name, bio = "No bio" } = {} } = {} } = data;

console.log(name); // "Karen"
console.log(bio); // "No bio"
```

## Summary

- **Destructuring** extracts values from objects and arrays
- Works with **objects** (by property name), **arrays** (by position)
- **Default values** handle undefined values
- **Rest operator** (...) collects remaining values
- **Function parameters** can be destructured
- Highly useful for **API responses**, **configuration**, **loops**
- Makes code more **readable** and **concise**
