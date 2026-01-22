# Closures & Advanced Functions

## What is a Closure?

A **closure** is a function that has access to variables from its **outer scope**, even after the outer function returns.

```javascript
function outer() {
  const message = "Hello"; // Outer variable

  function inner() {
    console.log(message); // Accesses outer variable
  }

  return inner;
}

const closure = outer(); // outer() returns inner function
closure(); // "Hello" - inner still has access to 'message'
```

**Key Point:** The variable is not copied; the function retains **reference** to it.

## How Closures Work

```javascript
function createGreeter(greeting) {
  // greeting is captured
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

sayHello("Alice"); // "Hello, Alice!"
sayHi("Bob"); // "Hi, Bob!"

// Each closure has its own 'greeting'
```

## Practical Uses

### Data Privacy (Private Variables)

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private - can't access directly

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },

    withdraw(amount) {
      balance -= amount;
      return balance;
    },

    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500)); // 1500
console.log(account.withdraw(200)); // 1300
console.log(account.balance); // undefined - can't access directly
```

### Function Factories

```javascript
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5)); // 10
console.log(triple(5)); // 15
console.log(quadruple(5)); // 20
```

### Callbacks with State

```javascript
function fetchUserData(userId, callback) {
  const requestId = Date.now(); // Closure captures requestId

  setTimeout(() => {
    const userData = { id: userId, name: "John" };
    callback(userData, requestId); // Can access requestId
  }, 1000);
}

fetchUserData(1, (data, requestId) => {
  console.log("Request", requestId, "completed with", data);
});
```

## Closures in Loops

### Common Problem

```javascript
// ❌ Problem - var creates single variable
const functions = [];

for (var i = 0; i < 3; i++) {
  functions.push(() => {
    console.log(i);
  });
}

functions[0](); // 3 (not 0!)
functions[1](); // 3 (not 1!)
functions[2](); // 3 (not 2!)

// All closures share same 'i'
```

### Solution 1: Use let

```javascript
// ✓ let creates new variable each iteration
const functions = [];

for (let i = 0; i < 3; i++) {
  functions.push(() => {
    console.log(i);
  });
}

functions[0](); // 0
functions[1](); // 1
functions[2](); // 2
```

### Solution 2: IIFE

```javascript
// ✓ Immediately Invoked Function Expression
const functions = [];

for (var i = 0; i < 3; i++) {
  functions.push(
    (function (j) {
      return () => console.log(j);
    })(i),
  );
}

functions[0](); // 0
functions[1](); // 1
functions[2](); // 2
```

## Currying

Create specialized functions by fixing arguments:

```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}

// Curried version
function curriedAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

const add5 = curriedAdd(5);
const add5And10 = add5(10);
const result = add5And10(3); // 18

// Or chain
console.log(curriedAdd(5)(10)(3)); // 18
```

### Practical Currying

```javascript
function createEventHandler(eventType) {
  return function (eventData) {
    return function (handler) {
      document.addEventListener(eventType, (e) => {
        if (matches(e, eventData)) {
          handler(e);
        }
      });
    };
  };
}

// Usage
const clickOn = createEventHandler("click");
clickOn({ selector: "button" })((e) => console.log("Button clicked"));
```

## Partial Application

Fix some arguments, return function expecting others:

```javascript
function multiply(a, b, c) {
  return a * b * c;
}

function partial(fn, ...fixedArgs) {
  return function (...args) {
    return fn(...fixedArgs, ...args);
  };
}

const multiplyBy2 = partial(multiply, 2);
const multiplyBy2And3 = partial(multiply, 2, 3);

console.log(multiplyBy2(5, 3)); // 2 * 5 * 3 = 30
console.log(multiplyBy2And3(5)); // 2 * 3 * 5 = 30
```

## IIFE (Immediately Invoked Function Expression)

Execute function immediately when defined:

```javascript
// Basic IIFE
(function () {
  console.log("Executes immediately");
})();

// IIFE with parameters
(function (name) {
  console.log("Hello", name);
})("Alice"); // "Hello Alice"

// Arrow function IIFE
(() => {
  console.log("Arrow function IIFE");
})();

// Return values
const result = (function () {
  return 42;
})();
console.log(result); // 42
```

### Private Scope with IIFE

```javascript
const app = (function () {
  let privateCounter = 0; // Not accessible outside

  return {
    increment() {
      privateCounter++;
    },

    getCount() {
      return privateCounter;
    },
  };
})();

app.increment();
console.log(app.getCount()); // 1
console.log(app.privateCounter); // undefined
```

## Module Pattern

Combine IIFE and closures for modularity:

```javascript
const UserModule = (function () {
  // Private
  let users = [];

  function validateUser(user) {
    return user.name && user.email;
  }

  // Public
  return {
    addUser(user) {
      if (validateUser(user)) {
        users.push(user);
        return true;
      }
      return false;
    },

    getUsers() {
      return users;
    },

    getUserCount() {
      return users.length;
    },
  };
})();

UserModule.addUser({ name: "John", email: "john@example.com" });
console.log(UserModule.getUserCount()); // 1
console.log(UserModule.validateUser); // undefined - private
```

## Revealing Module Pattern

More explicit public API:

```javascript
const Calculator = (function () {
  // Private
  let result = 0;

  const add = (x) => (result += x);
  const subtract = (x) => (result -= x);
  const multiply = (x) => (result *= x);
  const clear = () => {
    result = 0;
  };
  const getResult = () => result;

  // Public API
  return {
    add,
    subtract,
    multiply,
    clear,
    getResult,
  };
})();

Calculator.add(10);
Calculator.multiply(2);
console.log(Calculator.getResult()); // 20
```

## Higher-Order Functions

Functions that take or return functions:

```javascript
// Function that takes a function
function twice(fn) {
  return function (x) {
    return fn(fn(x));
  };
}

const double = (x) => x * 2;
const quadruple = twice(double);
console.log(quadruple(5)); // 20

// Function that returns a function
function makeMultiplier(n) {
  return (x) => x * n;
}

const multiplyBy3 = makeMultiplier(3);
console.log(multiplyBy3(4)); // 12
```

### Practical Example - Memoization

```javascript
function memoize(fn) {
  const cache = {};

  return function (arg) {
    if (arg in cache) {
      console.log("From cache");
      return cache[arg];
    }

    console.log("Computing");
    const result = fn(arg);
    cache[arg] = result;
    return result;
  };
}

const slowFunction = (n) => {
  // Simulate slow computation
  return n * n;
};

const fastFunction = memoize(slowFunction);

console.log(fastFunction(5)); // "Computing" - 25
console.log(fastFunction(5)); // "From cache" - 25
console.log(fastFunction(10)); // "Computing" - 100
```

## Common Closure Patterns

### Observer Pattern

```javascript
function createObserver() {
  const listeners = [];

  return {
    subscribe(callback) {
      listeners.push(callback);
    },

    notify(data) {
      listeners.forEach((cb) => cb(data));
    },
  };
}

const observer = createObserver();
observer.subscribe((data) => console.log("Notified:", data));
observer.notify("Hello"); // "Notified: Hello"
```

### Debounce

```javascript
function debounce(fn, delay) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 300);

search("hello"); // Waits 300ms
search("hello world"); // Resets timer
```
