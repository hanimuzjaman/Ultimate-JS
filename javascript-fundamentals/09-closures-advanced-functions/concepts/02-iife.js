/**
 * Module 9: Closures & Advanced Functions
 * Concepts: Immediately Invoked Function Expressions (IIFE)
 *
 * Comprehensive examples of IIFE patterns
 */

// ============================================
// 1. BASIC IIFE
// ============================================
console.log("=== Basic IIFE ===\n");

// IIFE: Function that runs immediately after definition
(function () {
  console.log("IIFE executed immediately");
})();

// With parameters
(function (name) {
  console.log("Hello, " + name);
})("Alice");

// ============================================
// 2. IIFE VARIATIONS
// ============================================
console.log("\n=== IIFE Variations ===\n");

// Standard syntax
(function () {
  console.log("Standard IIFE");
})();

// Alternative syntax (also valid)
(function () {
  console.log("Alternative IIFE");
})();

// Arrow function IIFE
(() => {
  console.log("Arrow IIFE");
})();

// ============================================
// 3. IIFE WITH RETURN VALUE
// ============================================
console.log("\n=== IIFE with Return Value ===\n");

const result = (function () {
  return 42;
})();

console.log("IIFE result:", result);

const greet = (function () {
  return function (name) {
    return "Hello, " + name;
  };
})();

console.log(greet("Bob"));

// ============================================
// 4. MODULE PATTERN WITH IIFE
// ============================================
console.log("\n=== Module Pattern ===\n");

const myModule = (function () {
  // Private variables
  let privateVar = "I'm private";
  const privateFunc = function () {
    return "Private function";
  };

  // Public API
  return {
    publicVar: "I'm public",
    publicFunc() {
      return privateFunc(); // Access private function
    },
  };
})();

console.log("Public:", myModule.publicVar);
console.log("Public func:", myModule.publicFunc());
// console.log("Private:", myModule.privateVar); // undefined

// ============================================
// 5. NAMESPACE PATTERN
// ============================================
console.log("\n=== Namespace Pattern ===\n");

const myApp = (function () {
  const config = {
    version: "1.0.0",
    debug: true,
  };

  const utils = {
    log(msg) {
      if (config.debug) {
        console.log("[" + config.version + "]", msg);
      }
    },
  };

  return {
    utils,
    config,
  };
})();

myApp.utils.log("App initialized");

// ============================================
// 6. IIFE WITH PARAMETERS
// ============================================
console.log("\n=== IIFE Parameters ===\n");

// Pass global object
(function (global) {
  global.newGlobal = "Added to global";
  console.log("Inside IIFE:", newGlobal);
})(typeof window !== "undefined" ? window : global);

// Pass multiple parameters
(function (a, b, c) {
  console.log("Sum:", a + b + c);
})(1, 2, 3);

// ============================================
// 7. CLOSURE WITHIN IIFE
// ============================================
console.log("\n=== Closure in IIFE ===\n");

const counter = (function () {
  let count = 0;

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    },
  };
})();

console.log("Counter:", counter.increment()); // 1
console.log("Counter:", counter.increment()); // 2
console.log("Counter:", counter.getCount()); // 2

// ============================================
// 8. IIFE FOR SCOPE ISOLATION
// ============================================
console.log("\n=== Scope Isolation ===\n");

// Without IIFE - pollutes global
var globalVar = "global 1";

// With IIFE - isolated scope
(function () {
  var globalVar = "IIFE local"; // Different variable
  console.log("In IIFE:", globalVar);
})();

console.log("Outside IIFE:", globalVar); // Still "global 1"

// ============================================
// 9. REVEALING MODULE PATTERN
// ============================================
console.log("\n=== Revealing Module ===\n");

const calculator = (function () {
  // Private
  let result = 0;

  const add = (x) => (result += x);
  const subtract = (x) => (result -= x);
  const multiply = (x) => (result *= x);
  const getResult = () => result;

  // Public API reveals some private functions
  return {
    add,
    subtract,
    multiply,
    getResult,
  };
})();

console.log("Calc add(5):", calculator.add(5));
console.log("Calc multiply(2):", calculator.multiply(2));
console.log("Calc subtract(3):", calculator.subtract(3));
console.log("Result:", calculator.getResult()); // 7

// ============================================
// 10. SINGLETON PATTERN
// ============================================
console.log("\n=== Singleton Pattern ===\n");

const singleton = (function () {
  let instance;

  function createInstance() {
    return {
      name: "Singleton Instance",
      id: Math.random(),
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const instance1 = singleton.getInstance();
const instance2 = singleton.getInstance();

console.log("Same instance?", instance1 === instance2); // true
console.log("Instance ID:", instance1.id);

// ============================================
// 11. FACTORY WITH IIFE
// ============================================
console.log("\n=== Factory Pattern ===\n");

const personFactory = (function () {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  Person.prototype.greet = function () {
    return "Hi, I'm " + this.name;
  };

  return {
    create(name, age) {
      return new Person(name, age);
    },
  };
})();

const person1 = personFactory.create("John", 30);
console.log(person1.greet());

// ============================================
// 12. IIFE CALLBACK PATTERN
// ============================================
console.log("\n=== IIFE Callback ===\n");

const data = [1, 2, 3];

data.forEach(
  (function () {
    let sum = 0;

    return function (item) {
      sum += item;
      console.log("Item:", item, "Sum:", sum);
    };
  })(),
);

// ============================================
// SUMMARY
// ============================================
console.log("\n=== IIFE SUMMARY ===\n");
console.log("✓ Function expression immediately invoked");
console.log("✓ Creates own scope (no global pollution)");
console.log("✓ Can return values or objects");
console.log("✓ Good for modules and closures");
console.log("✓ Various syntax forms available");
console.log("✓ Used for namespace, modules, singletons");
console.log("✓ Isolates variables and functions");
