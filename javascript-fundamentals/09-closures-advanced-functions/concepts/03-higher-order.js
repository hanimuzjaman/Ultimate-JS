/**
 * Module 9: Closures & Advanced Functions
 * Concepts: Higher Order Functions
 *
 * Comprehensive examples of higher-order function patterns
 */

// ============================================
// 1. FUNCTIONS THAT RETURN FUNCTIONS
// ============================================
console.log("=== Functions Returning Functions ===\n");

// Higher-order: takes function or returns function
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log("5 + 3 =", add5(3)); // 8
console.log("5 + 10 =", add5(10)); // 15

// ============================================
// 2. FUNCTIONS THAT ACCEPT FUNCTIONS
// ============================================
console.log("\n=== Functions Accepting Functions ===\n");

function execute(fn, value) {
  return fn(value);
}

const double = (x) => x * 2;
const square = (x) => x * x;

console.log("Execute double:", execute(double, 5)); // 10
console.log("Execute square:", execute(square, 5)); // 25

// ============================================
// 3. MAP, FILTER, REDUCE
// ============================================
console.log("\n=== Map, Filter, Reduce ===\n");

const numbers = [1, 2, 3, 4, 5];

// Map: transform each element
const doubled = numbers.map((n) => n * 2);
console.log("Doubled:", doubled); // [2, 4, 6, 8, 10]

// Filter: keep elements that pass test
const evens = numbers.filter((n) => n % 2 === 0);
console.log("Evens:", evens); // [2, 4]

// Reduce: combine elements into single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum); // 15

// ============================================
// 4. COMPOSITION
// ============================================
console.log("\n=== Function Composition ===\n");

const add = (x) => (y) => x + y;
const multiply = (x) => (y) => x * y;

const add3 = add(3);
const multiplyBy2 = multiply(2);

// Compose: apply functions in sequence
const result = multiplyBy2(add3(5));
console.log("(5 + 3) * 2 =", result); // 16

// ============================================
// 5. COMPOSE UTILITY
// ============================================
console.log("\n=== Compose Utility ===\n");

function compose(...funcs) {
  return (value) => funcs.reduceRight((acc, fn) => fn(acc), value);
}

const addTwo = (x) => x + 2;
const timesThree = (x) => x * 3;
const squared = (x) => x * x;

const transform = compose(squared, timesThree, addTwo);
console.log("((5 + 2) * 3)^2 =", transform(5)); // 441

// ============================================
// 6. PIPE UTILITY
// ============================================
console.log("\n=== Pipe Utility ===\n");

function pipe(...funcs) {
  return (value) => funcs.reduce((acc, fn) => fn(acc), value);
}

const process = pipe(addTwo, timesThree, squared);
console.log("((5 + 2) * 3)^2 =", process(5)); // 441

// ============================================
// 7. FUNCTION CHAINING
// ============================================
console.log("\n=== Function Chaining ===\n");

const chainable = {
  value: 0,
  add(x) {
    this.value += x;
    return this; // Return this for chaining
  },
  multiply(x) {
    this.value *= x;
    return this;
  },
  getValue() {
    return this.value;
  },
};

const result2 = chainable.add(5).multiply(2).add(3).getValue();
console.log("Chain result:", result2); // 13

// ============================================
// 8. DECORATOR PATTERN
// ============================================
console.log("\n=== Decorator Pattern ===\n");

function withLogging(fn) {
  return function (...args) {
    console.log("Called with:", args);
    const result = fn(...args);
    console.log("Returned:", result);
    return result;
  };
}

const greet = (name) => `Hello, ${name}`;
const loggedGreet = withLogging(greet);

loggedGreet("Alice");

// ============================================
// 9. PARTIAL APPLICATION
// ============================================
console.log("\n=== Partial Application ===\n");

function partial(fn, ...args) {
  return (...moreArgs) => fn(...args, ...moreArgs);
}

function multiply2(a, b, c) {
  return a * b * c;
}

const multiplyBy3And5 = partial(multiply2, 3, 5);
console.log("3 * 5 * 2 =", multiplyBy3And5(2)); // 30

// ============================================
// 10. MEMOIZATION (CACHING)
// ============================================
console.log("\n=== Memoization ===\n");

function memoize(fn) {
  const cache = {};

  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log("From cache");
      return cache[key];
    }
    console.log("Computing");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensive = memoize((n) => {
  return n * n;
});

console.log(expensive(5)); // Computing, 25
console.log(expensive(5)); // From cache, 25

// ============================================
// 11. DEBOUNCE AND THROTTLE
// ============================================
console.log("\n=== Debounce and Throttle ===\n");

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll handled");
}, 1000);

console.log("Debounce and throttle shown");

// ============================================
// 12. REDUCE FOR CUSTOM OPERATIONS
// ============================================
console.log("\n=== Reduce Applications ===\n");

// Group by
const fruits = ["apple", "banana", "apple", "cherry", "banana"];
const grouped = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log("Grouped:", grouped);
// { apple: 2, banana: 2, cherry: 1 }

// Flatten
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flattened = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log("Flattened:", flattened);

// ============================================
// SUMMARY
// ============================================
console.log("\n=== HIGHER-ORDER FUNCTIONS SUMMARY ===\n");
console.log("✓ Functions accepting functions as parameters");
console.log("✓ Functions returning other functions");
console.log("✓ Enable composition and chaining");
console.log("✓ map, filter, reduce are built-in HOF");
console.log("✓ Used for decorators, middleware");
console.log("✓ Enable functional programming patterns");
console.log("✓ Powerful for creating abstractions");
