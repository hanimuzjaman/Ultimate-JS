# Arrow Functions in JavaScript

## What are Arrow Functions?

Arrow functions are a concise syntax for writing function expressions in ES6+. They're called "arrow" functions because of their distinctive `=>` syntax.

## Basic Syntax

```javascript
// Traditional function expression
const add1 = function (a, b) {
  return a + b;
};

// Arrow function
const add2 = (a, b) => {
  return a + b;
};

// Concise arrow function (implicit return)
const add3 = (a, b) => a + b;
```

## Forms of Arrow Functions

### 1. Multiple Parameters

```javascript
// Parentheses required with multiple params
const multiply = (x, y) => x * y;
console.log(multiply(3, 4)); // 12

const divide = (a, b) => {
  if (b === 0) return "Cannot divide by zero";
  return a / b;
};
```

### 2. Single Parameter

```javascript
// Parentheses are optional with single param
const square = (x) => x * x;
console.log(square(5)); // 25

// With parentheses (more explicit)
const double = (x) => x * 2;
```

### 3. No Parameters

```javascript
// Parentheses are required
const greet = () => "Hello, World!";
console.log(greet()); // "Hello, World!"

const random = () => Math.random();
```

### 4. Implicit vs Explicit Return

```javascript
// Implicit return (one-liner)
const getName = () => "Alice";

// Explicit return (multiple statements)
const getInfo = (name) => {
  const greeting = `Hello, ${name}`;
  return greeting;
};

// Implicit return of object (needs parentheses)
const createUser = (name, age) => ({ name, age });
```

## Arrow Functions with Array Methods

Arrow functions shine with array methods because they're concise:

```javascript
const numbers = [1, 2, 3, 4, 5];

// Map
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter
const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

// Reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Sort
const descending = [...numbers].sort((a, b) => b - a);
console.log(descending); // [5, 4, 3, 2, 1]
```

## Important Differences from Regular Functions

### 1. No `this` Binding (Lexical `this`)

This is the MOST IMPORTANT difference!

```javascript
// Regular function - has its own 'this'
const person1 = {
  name: "Alice",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};
person1.greet(); // "Hello, Alice"

// Arrow function - inherits 'this' from outer scope
const person2 = {
  name: "Bob",
  greet: () => {
    console.log("Hello, " + this.name); // 'this' is window/global
  },
};
person2.greet(); // "Hello, undefined"

// Correct use with arrow function
const person3 = {
  name: "Charlie",
  greet: function () {
    const arrow = () => {
      console.log("Hello, " + this.name); // 'this' from greet
    };
    arrow();
  },
};
person3.greet(); // "Hello, Charlie"
```

### 2. No `arguments` Object

```javascript
// Regular function has 'arguments'
function logArgs() {
  console.log(arguments);
}
logArgs(1, 2, 3); // [1, 2, 3]

// Arrow function does not have 'arguments'
const logArrowArgs = () => {
  console.log(arguments); // ReferenceError
};

// Use rest parameters instead
const logArrowArgs2 = (...args) => {
  console.log(args); // [1, 2, 3]
};
logArrowArgs2(1, 2, 3);
```

### 3. Cannot be Used as Constructor

```javascript
// Regular function can be constructor
function Person(name) {
  this.name = name;
}
const p1 = new Person("Alice"); // Works

// Arrow function cannot be constructor
const ArrowPerson = (name) => {
  this.name = name;
};
const p2 = new ArrowPerson("Bob"); // TypeError!
```

### 4. No `prototype` Property

```javascript
function Regular() {}
console.log(Regular.prototype); // {}

const arrow = () => {};
console.log(arrow.prototype); // undefined
```

## When to Use Arrow Functions

### ✓ Good Use Cases

1. **Array methods:**

```javascript
users.map((user) => user.name);
items.filter((item) => item.active);
```

2. **Short callbacks:**

```javascript
setTimeout(() => console.log("Done!"), 1000);
```

3. **As method inside method (need access to outer `this`):**

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  start() {
    setInterval(() => {
      this.count++; // 'this' refers to Counter instance
    }, 1000);
  }
}
```

### ✗ Avoid Arrow Functions

1. **Object methods (when you need `this`):**

```javascript
// ✗ Wrong
const obj = {
  value: 42,
  getValue: () => this.value, // 'this' is wrong
};

// ✓ Correct
const obj = {
  value: 42,
  getValue: function () {
    return this.value;
  },
};
```

2. **Constructors:**

```javascript
// ✗ Wrong
const User = (name) => {
  this.name = name;
};
const user = new User("Alice"); // Error

// ✓ Correct
function User(name) {
  this.name = name;
}
const user = new User("Alice");
```

3. **As prototype methods:**

```javascript
// ✗ Wrong
Array.prototype.custom = () => this.length; // 'this' wrong

// ✓ Correct
Array.prototype.custom = function () {
  return this.length;
};
```

## Best Practices

1. **Use arrow functions for closures and callbacks:**

```javascript
const processItems = (items) => {
  return items
    .filter((item) => item.isValid)
    .map((item) => item.value)
    .sort((a, b) => a - b);
};
```

2. **Use function declarations for main functions:**

```javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

3. **Be explicit with curly braces when needed:**

```javascript
// If function body has multiple lines, use braces
const processData = (data) => {
  const validated = validate(data);
  const transformed = transform(validated);
  return transformed;
};

// Single expression can use implicit return
const double = (x) => x * 2;
```

4. **Always use parentheses around parameters (even single param):**

```javascript
// Clearer
const func = (x) => x * 2;

// Less clear (though valid)
const func2 = (x) => x * 2;
```

## Arrow Function Chaining

```javascript
const compose = (fn1, fn2) => (x) => fn2(fn1(x));

const addFive = (x) => x + 5;
const double = (x) => x * 2;

const addThenDouble = compose(addFive, double);
console.log(addThenDouble(3)); // (3 + 5) * 2 = 16
```

## Summary

- **Concise syntax** for function expressions
- **Lexical `this`** - inherits from outer scope
- **No `arguments`** object - use rest parameters instead
- **Not constructors** - can't use `new`
- Perfect for **callbacks and array methods**
- Use regular functions when you need `this` binding or constructors
- Best practice: use arrow functions for short callbacks, regular functions for main logic
