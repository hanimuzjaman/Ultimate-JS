# Execution Context: The Foundation

## What is Execution Context?

An execution context is an abstract concept that JavaScript uses to track the execution of your code. Every time a function is called or the global code is executed, a new execution context is created.

## Types of Execution Contexts

1. **Global Execution Context**: Created when script starts
2. **Function Execution Context**: Created when function is called
3. **Eval Execution Context**: Created when eval() is called (rarely used)

## Structure of an Execution Context

Each execution context has three components:

### 1. Variable Environment / Scope

- All variables declared with `var`, `let`, `const`
- Function parameters
- Function declarations

### 2. Scope Chain

- Access to variables in current scope
- Access to parent scopes
- Access to global scope

### 3. The 'this' Binding

- Determined by how function is called
- Regular function: global object (window in browser, global in Node)
- Method: the object it's called on
- Arrow function: lexical this from enclosing scope

## Execution Context Creation Phases

### Phase 1: Creation Phase

Happens before code execution:

```javascript
// 1. Create Variable Object
// All var declarations initialized as undefined
// let/const added but not initialized
// Function declarations fully hoisted

// 2. Establish Scope Chain
// Links to parent execution context

// 3. Determine 'this' Value
// Based on how function is called
```

### Phase 2: Execution Phase

Code actually runs:

```javascript
// Variables assigned their actual values
// Code executed line by line
// Function calls trigger new contexts
```

## Example: Execution Order

```javascript
// Creation Phase:
// - x: undefined (hoisted)
// - greet: function (hoisted)
// - this: globalThis

console.log(x); // undefined (already in context)
var x = 5;
console.log(x); // 5 (now assigned)

function greet() {
  return "Hello";
}
greet(); // Works (hoisted in creation phase)
```

## Global Execution Context

```javascript
// Global context has:
// - Variable object: globalObject (window, global, etc.)
// - Scope: Global only
// - this: Global object

var globalVar = "global";
globalVariable = "implicit"; // Becomes global property

function globalFunc() {
  console.log(globalVar); // Can access global
}
```

## Function Execution Context

```javascript
function createContext(x, y) {
  // New execution context created here
  var localVar = "local";

  // This context has:
  // - Variable object: arguments, x, y, localVar
  // - Scope chain: [localScope, globalScope]
  // - this: depends on how called

  console.log(x, y, localVar);
}

createContext(1, 2); // New context created
// Context destroyed after function returns
```

## Hoisting Demonstration

```javascript
console.log(name); // undefined (hoisted but not initialized)
console.log(age); // ReferenceError (let in TDZ)

var name = "Alice";
let age = 25;

function myFunc() {} // Hoisted completely
```

## Local vs Global Scope

```javascript
const global = "I'm global";

function outer() {
  const outerLocal = "I'm in outer";

  function inner() {
    const innerLocal = "I'm in inner";

    console.log(innerLocal); // Accessible (own scope)
    console.log(outerLocal); // Accessible (parent scope)
    console.log(global); // Accessible (global scope)
  }

  inner();
  console.log(innerLocal); // ❌ ReferenceError (not in scope)
}

outer();
console.log(outerLocal); // ❌ ReferenceError (not in scope)
```

## Block-Level Scope (let/const)

```javascript
{
  var x = 1;
  let y = 2;
  const z = 3;
}

console.log(x); // 1 (var is function-scoped)
console.log(y); // ReferenceError (block-scoped)
console.log(z); // ReferenceError (block-scoped)
```

## 'this' in Different Contexts

```javascript
// Global context
console.log(this === globalThis); // true

// Regular function
function regularFunc() {
  console.log(this === globalThis); // true
}

// Method
const obj = {
  method() {
    console.log(this === obj); // true
  },
};
obj.method();

// Arrow function
const arrowFunc = () => {
  console.log(this === globalThis); // true (lexical)
};
arrowFunc();

// Constructor
function Constructor() {
  console.log(this instanceof Constructor); // true
}
new Constructor();
```

## Context with Arguments

```javascript
function showContext(a, b) {
  // Execution context contains:
  // - arguments: [1, 2]
  // - a: 1
  // - b: 2
  // - ...other local variables
}

showContext(1, 2);
```

## Nested Contexts and Scope Chain

```javascript
function level1() {
  const x = 1;

  function level2() {
    const y = 2;

    function level3() {
      const z = 3;

      // Scope chain:
      // 1. level3 (current): z
      // 2. level2 (parent): y
      // 3. level1 (grandparent): x
      // 4. global: ...

      console.log(x, y, z); // All accessible
    }

    level3();
  }

  level2();
}

level1();
```

## Temporal Dead Zone (TDZ)

```javascript
// let/const are hoisted but in Temporal Dead Zone

console.log(x); // ReferenceError (TDZ)
let x = 5;
// x is in TDZ from hoisting until this line

try {
  console.log(y); // ReferenceError
} catch (e) {
  // Can't access y before its declaration
}
let y = 10;
```

## Context with Closures

```javascript
function makeMultiplier(multiplier) {
  // Execution context captured by closure

  return function (number) {
    // This function's context includes access to
    // multiplier from makeMultiplier's context
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
console.log(double(5)); // 10

// makeMultiplier's context is retained by closure
```

## Async Function Context

```javascript
async function asyncFunc() {
  // Async function has special execution context
  // Can use 'await' within it

  const result = await Promise.resolve("value");
  console.log(result);
}

asyncFunc();
```

## Summary

Execution context is fundamental to understanding JavaScript:

- Every function call creates new context
- Context has scope, this binding, and variables
- Hoisting happens in creation phase
- Scope chain allows variable access
- Closures capture outer contexts
- let/const have block scope, var has function scope
