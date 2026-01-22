/**
 * Module 9: Closures & Advanced Functions
 * Concepts: Closures
 *
 * Comprehensive examples of closures and scope retention
 */

// ============================================
// 1. WHAT IS A CLOSURE
// ============================================
console.log("=== What is a Closure ===\n");

// A closure is a function that has access to variables from another function's scope
// Even after that function has finished executing

function outer() {
  const outerVar = "I'm from outer";

  function inner() {
    console.log(outerVar); // Accesses outer's variable
  }

  return inner; // Returns the inner function
}

const closureFunc = outer();
closureFunc(); // "I'm from outer" - Still has access!

console.log("Closure: function remembers its scope");

// ============================================
// 2. CLOSURE WITH VARIABLE CAPTURE
// ============================================
console.log("\n=== Variable Capture ===\n");

function createGreeter(greeting) {
  // greeting is captured in closure
  return function (name) {
    console.log(greeting + ", " + name);
  };
}

const sayHello = createGreeter("Hello");
const sayGoodbye = createGreeter("Goodbye");

sayHello("Alice"); // "Hello, Alice"
sayGoodbye("Bob"); // "Goodbye, Bob"

console.log("Each closure captures own copy of variables");

// ============================================
// 3. COUNTER PATTERN
// ============================================
console.log("\n=== Counter Pattern ===\n");

function makeCounter() {
  let count = 0; // Private variable

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log("Counter 1:", counter1.increment()); // 1
console.log("Counter 1:", counter1.increment()); // 2
console.log("Counter 2:", counter2.increment()); // 1 (separate count)

console.log("Each closure has private state");

// ============================================
// 4. MODULE PATTERN
// ============================================
console.log("\n=== Module Pattern ===\n");

const calculator = (function () {
  let result = 0; // Private state

  return {
    add(x) {
      result += x;
      return this;
    },
    subtract(x) {
      result -= x;
      return this;
    },
    multiply(x) {
      result *= x;
      return this;
    },
    getResult() {
      return result;
    },
  };
})();

console.log(
  "Calculation:",
  calculator.add(5).multiply(2).subtract(3).getResult(), // 7
);

console.log("Module pattern creates encapsulation");

// ============================================
// 5. FUNCTION FACTORY
// ============================================
console.log("\n=== Function Factory ===\n");

function makeMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const quadruple = makeMultiplier(4);

console.log("Double of 5:", double(5)); // 10
console.log("Triple of 5:", triple(5)); // 15
console.log("Quadruple of 5:", quadruple(5)); // 20

console.log("Factory creates specialized functions");

// ============================================
// 6. DELAYED EXECUTION WITH CLOSURE
// ============================================
console.log("\n=== Delayed Execution ===\n");

function delayedMessage(message, delay) {
  setTimeout(function () {
    console.log("Delayed:", message); // Closure retains message
  }, delay);
}

delayedMessage("Hello after 500ms", 500);

// ============================================
// 7. ARRAY OF CLOSURES
// ============================================
console.log("\n=== Array of Closures ===\n");

// Common gotcha with var
function createFunctionsWithVar() {
  const functions = [];

  for (var i = 0; i < 3; i++) {
    functions.push(function () {
      return i; // All reference same i
    });
  }

  return functions;
}

const varsClosures = createFunctionsWithVar();
console.log(
  "With var - all return:",
  varsClosures[0](),
  varsClosures[1](),
  varsClosures[2](),
); // All return 3

// Solution with let
function createFunctionsWithLet() {
  const functions = [];

  for (let i = 0; i < 3; i++) {
    functions.push(function () {
      return i; // Each gets own i
    });
  }

  return functions;
}

const letClosures = createFunctionsWithLet();
console.log(
  "With let - return:",
  letClosures[0](),
  letClosures[1](),
  letClosures[2](),
); // Return 0, 1, 2

// ============================================
// 8. CURRYING WITH CLOSURES
// ============================================
console.log("\n=== Currying ===\n");

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log("Curried add(1)(2)(3):", curriedAdd(1)(2)(3)); // 6
console.log("Curried add(1, 2)(3):", curriedAdd(1, 2)(3)); // 6

// ============================================
// 9. MEMOIZATION WITH CLOSURE
// ============================================
console.log("\n=== Memoization ===\n");

function memoize(fn) {
  const cache = {}; // Captured in closure

  return function (...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log("From cache:", args);
      return cache[key];
    }

    console.log("Computing:", args);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoFib = memoize(fibonacci);
console.log("Fib(5):", memoFib(5)); // Computing
console.log("Fib(5):", memoFib(5)); // From cache

// ============================================
// 10. ONCE PATTERN
// ============================================
console.log("\n=== Once Pattern ===\n");

function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const initialize = once(function (config) {
  console.log("Initializing with:", config);
  return "initialized";
});

console.log(initialize("config1")); // Initializing...
console.log(initialize("config2")); // (no output, returns cached)

// ============================================
// 11. DEBOUNCE WITH CLOSURE
// ============================================
console.log("\n=== Debounce ===\n");

function debounce(fn, delay) {
  let timeoutId; // Captured in closure

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const debouncedLog = debounce((msg) => {
  console.log("Debounced:", msg);
}, 300);

debouncedLog("Call 1");
debouncedLog("Call 2");
debouncedLog("Call 3"); // Only this executes

// ============================================
// 12. PRIVATE VARIABLES
// ============================================
console.log("\n=== Private Variables ===\n");

const bankAccount = (function () {
  let balance = 1000; // Private

  return {
    deposit(amount) {
      balance += amount;
      console.log("Deposited:", amount);
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log("Withdrew:", amount);
      } else {
        console.log("Insufficient funds");
      }
    },
    getBalance() {
      return balance;
    },
  };
})();

bankAccount.deposit(500);
bankAccount.withdraw(200);
console.log("Balance:", bankAccount.getBalance()); // 1300

// Can't access balance directly
// bankAccount.balance = 999; // Doesn't work (not the private variable)

console.log("Balance protection through closure");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== CLOSURE SUMMARY ===\n");
console.log("✓ Function can access outer function's variables");
console.log("✓ Retains access even after outer function returns");
console.log("✓ Create private variables (encapsulation)");
console.log("✓ Store state between calls");
console.log("✓ Each closure instance has separate captured variables");
console.log("✓ Used for: modules, factories, decorators");
console.log("✓ Common with: callbacks, timers, event handlers");
