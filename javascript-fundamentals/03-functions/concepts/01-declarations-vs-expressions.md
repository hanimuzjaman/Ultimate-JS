# Functions in JavaScript

## What are Functions?

Functions are **reusable blocks of code** that perform a specific task. Instead of writing the same code repeatedly, you write it once in a function and call it whenever you need it.

**Real-life analogy:** A function is like a recipe. You write it once, and whenever you want to make that dish, you follow the recipe.

## Why Use Functions?

1. **Reusability** - Write once, use many times
2. **Organization** - Group related code together
3. **Maintainability** - Easier to fix bugs in one place
4. **Readability** - Code is more understandable
5. **Modularity** - Break code into smaller parts

## Function Declaration vs Expression

### 1. Function Declaration

Declared with the `function` keyword. **Hoisted** to the top of their scope.

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("John")); // Accessible even before declaration (hoisting)
```

**Advantages:**

- Can be called before declaration
- Clear syntax
- Good for main logic

### 2. Function Expression

Assigned to a variable. **Not hoisted**.

```javascript
const greet = function (name) {
  return `Hello, ${name}!`;
};

// console.log(greet("John"));  // ❌ Error if called before declaration
```

**Advantages:**

- More flexible
- Can be used as values
- Prevents accidental hoisting issues

### 3. Arrow Function (ES6)

Modern syntax using `=>`. Concise and has different `this` binding.

```javascript
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Even shorter if single expression
const greetShort = (name) => `Hello, ${name}!`;

console.log(greet("John")); // Hello, John!
console.log(greetShort("Jane")); // Hello, Jane!
```

**Advantages:**

- Concise syntax
- Better for callbacks
- Lexical `this` binding

## Function Parameters and Arguments

**Parameters** are what you define; **arguments** are what you pass.

```javascript
// Parameters: name, age
function createUser(name, age) {
  return { name, age };
}

// Arguments: "John", 25
createUser("John", 25);
```

### Default Parameters

Set default values if arguments aren't provided:

```javascript
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

console.log(greet()); // Hello, Guest!
console.log(greet("Alice")); // Hello, Alice!
```

### Rest Parameters

Accept multiple arguments as an array:

```javascript
function sum(...numbers) {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

## Return Statement

Functions return values using the `return` keyword:

```javascript
function add(a, b) {
  return a + b; // Returns the sum
}

const result = add(5, 3);
console.log(result); // 8
```

If you don't return anything, the function returns `undefined`:

```javascript
function logMessage(msg) {
  console.log(msg);
  // No return statement, so returns undefined
}

const x = logMessage("Hello");
console.log(x); // undefined
```

## Scope in Functions

Variables declared in a function are local to that function:

```javascript
function test() {
  const localVar = "I'm local";
  console.log(localVar); // ✅ Accessible
}

test();
// console.log(localVar);  // ❌ Not accessible (ReferenceError)
```

Functions can access variables from outer scopes:

```javascript
const globalVar = "I'm global";

function test() {
  console.log(globalVar); // ✅ Can access global variable
}

test();
```

## Function Types

### Void Functions (No Return)

```javascript
function printMessage(msg) {
  console.log(msg);
  // No return value
}

printMessage("Hello");
```

### Return Value Functions

```javascript
function calculateArea(radius) {
  return Math.PI * radius * radius;
}

const area = calculateArea(5);
console.log(area); // 78.53981633974483
```

### Callback Functions

Functions passed as arguments to other functions:

```javascript
function processData(callback) {
  const data = [1, 2, 3, 4, 5];
  callback(data);
}

processData((arr) => {
  console.log("Received:", arr);
});
```

## Higher-Order Functions

Functions that take functions as arguments or return functions:

```javascript
// Takes a function as argument
function executeOperation(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(executeOperation(5, 3, add)); // 8
console.log(executeOperation(5, 3, multiply)); // 15

// Returns a function
function createMultiplier(factor) {
  return (num) => num * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## Pure vs Impure Functions

### Pure Functions

- Return the same output for the same input
- No side effects (don't modify external state)
- Predictable and testable

```javascript
// ✅ Pure function
function add(a, b) {
  return a + b;
}

// ✅ Pure function
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
```

### Impure Functions

- May return different outputs for same input
- Have side effects (modify external state)
- Harder to test

```javascript
let globalCounter = 0;

// ❌ Impure function - modifies external state
function increment() {
  globalCounter++;
  return globalCounter;
}

// ❌ Impure function - depends on external state
function getDiscount(price) {
  const taxRate = getTaxRate(); // Depends on external function
  return price * taxRate;
}
```

## Best Practices

1. **Use meaningful names** - Function should describe what it does

```javascript
// ✅ Good
function calculateTotalPrice(items) { ... }
function isValidEmail(email) { ... }

// ❌ Bad
function calc(i) { ... }
function check(e) { ... }
```

2. **Keep functions small** - Each function should do one thing

```javascript
// ✅ Good - one responsibility
function validateEmail(email) {
  return email.includes("@");
}

// ❌ Bad - multiple responsibilities
function processUser(user) {
  // validate
  // save to database
  // send email
  // log activity
}
```

3. **Use consistent return types** - Don't sometimes return value, sometimes undefined

```javascript
// ✅ Good
function getUser(id) {
  if (id < 1) return null;
  return { id, name: "John" };
}

// ❌ Bad - inconsistent returns
function getUser(id) {
  if (id < 1) return; // undefined
  return { id, name: "John" }; // object
}
```

4. **Document complex functions** - Use comments for clarity

```javascript
/**
 * Calculates the Fibonacci number at position n
 * @param {number} n - Position in Fibonacci sequence
 * @returns {number} Fibonacci number at position n
 */
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

## Summary

- **Functions** are reusable blocks of code
- **Declaration** - hoisted, function statement
- **Expression** - not hoisted, assigned to variable
- **Arrow function** - modern, concise syntax
- **Parameters** - inputs to the function
- **Return** - output from the function
- **Scope** - variables inside are local
- **Pure functions** - same input = same output
- **Best practices** - meaningful names, single responsibility, consistent returns

Functions are fundamental to JavaScript programming. Master them and you'll write cleaner, more organized code!
