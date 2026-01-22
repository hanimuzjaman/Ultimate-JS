# Closures: Functions That Remember

## What is a Closure?

A closure is a function that has access to variables from another function's scope, even after that function has finished executing. This happens because functions in JavaScript form closures around the data they need to work with.

## Creating a Closure

```javascript
function outer() {
  const message = "Hello"; // Outer variable

  function inner() {
    console.log(message); // Inner accesses outer variable
  }

  return inner; // Return the function
}

const closure = outer();
closure(); // "Hello" - Still has access to 'message'
```

## How Closures Work

1. Inner function references outer function's variables
2. Outer function returns inner function
3. Inner function remembers outer function's scope
4. Even after outer function finishes, closure still accesses those variables

## Variable Capture

Each closure captures its own copy of variables:

```javascript
function createCounter(start) {
  let count = start; // Captured

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
  };
}

const counter1 = createCounter(0);
const counter2 = createCounter(10);

counter1.increment(); // 1
counter2.increment(); // 11 (separate count)
```

## Counter Pattern

Create private state using closures:

```javascript
function makeCounter() {
  let count = 0; // Private

  return {
    increment() {
      count++;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = makeCounter();
console.log(counter.increment()); // 1
// Can't access count directly, only through methods
```

## Module Pattern

Encapsulate code with public and private parts:

```javascript
const calculator = (function () {
  let result = 0; // Private

  return {
    add(x) {
      result += x;
      return result;
    },
    getResult() {
      return result;
    },
  };
})();

calculator.add(5); // Works
calculator.result; // undefined (private)
```

## Function Factory

Create specialized functions:

```javascript
function makeMultiplier(factor) {
  return function (number) {
    return number * factor; // Captures 'factor'
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

double(5); // 10
triple(5); // 15
```

## Practical Use Cases

### 1. Event Handler Storage

```javascript
function setupButton(id) {
  let clickCount = 0; // Closure captures this

  document.getElementById(id).addEventListener("click", () => {
    clickCount++;
    console.log("Clicks:", clickCount);
  });
}

setupButton("myButton"); // Handler remembers clickCount
```

### 2. Delayed Execution

```javascript
function delayedMessage(message, delay) {
  setTimeout(() => {
    console.log(message); // Closure captures message
  }, delay);
}

delayedMessage("Hello", 1000);
```

### 3. Data Privacy

```javascript
const api = (function () {
  const apiKey = "secret123"; // Private

  return {
    fetch(endpoint) {
      return `${endpoint}?key=${apiKey}`; // Uses private key
    },
  };
})();
```

## Common Closure Gotcha: Loop Variable

### ❌ Problem with var

```javascript
const functions = [];

for (var i = 0; i < 3; i++) {
  functions.push(() => console.log(i)); // All capture same i
}

functions[0](); // 3 (all share same i)
functions[1](); // 3
functions[2](); // 3
```

### ✅ Solution with let

```javascript
const functions = [];

for (let i = 0; i < 3; i++) {
  functions.push(() => console.log(i)); // Each gets own i
}

functions[0](); // 0
functions[1](); // 1
functions[2](); // 2
```

## Closures with Callbacks

```javascript
function loadUser(id, onSuccess) {
  setTimeout(() => {
    const user = { id, name: "John" };
    onSuccess(user); // Callback closes over onSuccess
  }, 1000);
}

loadUser(1, (user) => {
  console.log("User:", user);
});
```

## Memory Implications

Closures keep referenced variables in memory:

```javascript
function createLargeDataClosure() {
  const largeData = new Array(1000000); // Large array

  return () => {
    return largeData.length; // Closure keeps largeData in memory
  };
}

const closure = createLargeDataClosure();
// largeData kept in memory as long as closure exists
```

## Memoization Pattern

Cache expensive function results:

```javascript
function memoize(fn) {
  const cache = {}; // Closure captures cache

  return (arg) => {
    if (arg in cache) return cache[arg];
    return (cache[arg] = fn(arg));
  };
}

const slowFunc = memoize((n) => {
  // expensive computation
  return n * 2;
});
```

## Once Pattern

Execute function only once:

```javascript
function once(fn) {
  let called = false;
  let result;

  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const init = once(() => console.log("Initializing"));
init(); // Initializing
init(); // (no output)
```

## Private Variables Example

```javascript
const account = (function () {
  let balance = 100; // Private

  return {
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return "Insufficient funds";
    },
    deposit(amount) {
      balance += amount;
      return balance;
    },
  };
})();

account.withdraw(30); // Works
account.balance; // undefined (private)
```

## Arrow Functions and Closures

Arrow functions also create closures:

```javascript
function outer() {
  const value = 42;

  const arrow = () => {
    console.log(value); // Arrow creates closure
  };

  return arrow;
}

outer()(); // 42
```

## Best Practices

1. **Be aware of memory**: Closures keep variables in memory
2. **Use private variables**: For encapsulation
3. **Avoid var in loops**: Use let for proper closure
4. **Document closures**: Explain what's being captured
5. **Clean up**: Allow garbage collection when done

## Performance Consideration

```javascript
// Heavy closure - keeps large data in memory
function heavyClosure() {
  const bigData = generateLargeArray();
  return () => console.log(bigData[0]);
}

// Light closure - only captures what's needed
function lightClosure() {
  const needed = value;
  return () => console.log(needed);
}
```

## Summary

Closures are fundamental to JavaScript:

- Functions capture variables from outer scope
- Variables persist even after outer function returns
- Enable private variables and encapsulation
- Common in callbacks, event handlers, timers
- Be aware of memory implications
- Use closures for modules and factories
- Let prevents closure-in-loop issues
