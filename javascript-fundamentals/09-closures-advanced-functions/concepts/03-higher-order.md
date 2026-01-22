# Higher-Order Functions

## What is a Higher-Order Function?

A higher-order function is a function that:

- Takes one or more functions as arguments, OR
- Returns a function as a result

## Functions as Arguments

```javascript
function execute(fn, value) {
  return fn(value);
}

const double = (x) => x * 2;
execute(double, 5); // 10
```

## Functions Returning Functions

```javascript
function makeAdder(x) {
  return (y) => x + y;
}

const add5 = makeAdder(5);
add5(3); // 8
```

## Map - Transform Elements

```javascript
const numbers = [1, 2, 3, 4, 5];

// Square each number
const squared = numbers.map((n) => n * n);
// [1, 4, 9, 16, 25]

// Extract properties
const names = users.map((user) => user.name);
```

## Filter - Select Elements

```javascript
const numbers = [1, 2, 3, 4, 5];

// Keep even numbers
const evens = numbers.filter((n) => n % 2 === 0);
// [2, 4]

// Filter users
const adults = users.filter((u) => u.age >= 18);
```

## Reduce - Aggregate Elements

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// Group by property
const grouped = items.reduce((acc, item) => {
  acc[item.type] = [...(acc[item.type] || []), item];
  return acc;
}, {});
```

## Function Composition

```javascript
const add = (x) => (y) => x + y;
const multiply = (x) => (y) => x * y;

const add2 = add(2);
const times3 = multiply(3);

times3(add2(5)); // (5 + 2) * 3 = 21
```

## Compose Utility

```javascript
function compose(...fns) {
  return (value) => fns.reduceRight((acc, fn) => fn(acc), value);
}

const transform = compose(square, multiply(2), add(1));
transform(5); // ((5 + 1) * 2)^2
```

## Pipe Utility

```javascript
function pipe(...fns) {
  return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

const transform = pipe(add(1), multiply(2), square);
transform(5); // ((5 + 1) * 2)^2
```

## Partial Application

```javascript
function partial(fn, ...args) {
  return (...moreArgs) => fn(...args, ...moreArgs);
}

const add = (a, b, c) => a + b + c;
const addOneAndTwo = partial(add, 1, 2);
addOneAndTwo(3); // 6
```

## Currying vs Partial

```javascript
// Curry: breaks into single-argument functions
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
};

// Partial: pre-fills some arguments
const partial =
  (fn, ...args) =>
  (...more) =>
    fn(...args, ...more);
```

## Memoization Pattern

```javascript
function memoize(fn) {
  const cache = {};

  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const fib = memoize((n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2)));
```

## Decorator Pattern

```javascript
function withTiming(fn) {
  return (...args) => {
    console.time("Function");
    const result = fn(...args);
    console.timeEnd("Function");
    return result;
  };
}

const timed = withTiming(expensiveFunc);
```

## Array Method Chaining

```javascript
const result = [1, 2, 3, 4, 5]
  .map((n) => n * 2) // [2, 4, 6, 8, 10]
  .filter((n) => n > 5) // [6, 8, 10]
  .reduce((sum, n) => sum + n, 0); // 24
```

## Custom Iterator

```javascript
function* range(n) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}

Array.from(range(5)); // [0, 1, 2, 3, 4]
```

## Sort with Custom Comparator

```javascript
const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
];

// Sort by age
users.sort((a, b) => a.age - b.age);
```

## Practical Example: Data Pipeline

```javascript
const users = [...]

const result = users
  .filter((u) => u.active)
  .map((u) => ({ name: u.name, email: u.email }))
  .sort((a, b) => a.name.localeCompare(b.name))
  .slice(0, 10);
```

## Summary

Higher-order functions:

- Enable functional programming
- Make code more reusable
- Support composition patterns
- Used extensively with arrays
- Core to modern JavaScript
