# Execution Context & Scope

## What is Execution Context?

**Execution Context** is the environment in which JavaScript code is executed. It determines:

- What variables are available
- What the value of `this` is
- How the code is executed

Every time a function is called, a new execution context is created.

## Types of Execution Context

### 1. Global Execution Context

Runs when script starts, **one per program**:

```javascript
var globalVar = "I am global";

function greet() {
  console.log(globalVar); // Can access
}

greet();

console.log(globalVar); // "I am global"
```

In global context:

- `this` refers to **window** (browser) or **global** (Node.js)
- All global variables and functions are properties of `this`

```javascript
// Browser
console.log(window.globalVar);
console.log(window === this); // true (at global scope)

// Node.js
console.log(global.globalVar);
```

### 2. Function Execution Context

Created when function is called:

```javascript
function myFunction() {
  var localVar = "Local";
  console.log(localVar); // "Local"

  function innerFunction() {
    console.log(localVar); // Still accessible (closure)
  }

  innerFunction();
}

myFunction();
console.log(localVar); // ReferenceError - not in global scope
```

**Each function call creates new context:**

```javascript
function test() {
  var x = 10;
  console.log(x);
}

test(); // Creates context 1, x = 10
test(); // Creates context 2, new x = 10
// Both x variables are separate
```

### 3. Eval Execution Context

Creates context from string (generally avoid):

```javascript
// ❌ Bad practice - eval is dangerous
eval("var x = 10; console.log(x);");
```

## Scope

**Scope** determines where variables are accessible.

### Global Scope

Variables accessible everywhere:

```javascript
var globalVar = "Global";

function func1() {
  console.log(globalVar); // Can access
}

function func2() {
  console.log(globalVar); // Can access
}

func1();
func2();
```

### Function Scope

Variables only accessible within function:

```javascript
function greet() {
  var greeting = "Hello"; // Only accessible here
  console.log(greeting); // "Hello"
}

greet();
console.log(greeting); // ReferenceError
```

### Block Scope

Variables with `let`/`const` only accessible in block:

```javascript
{
  let blockVar = "Block scoped";
  const constant = 10;
  var globallyScoped = "Accessible everywhere";
}

console.log(blockVar); // ReferenceError
console.log(constant); // ReferenceError
console.log(globallyScoped); // "Accessible everywhere"

// if statement block
if (true) {
  let x = 10;
  const y = 20;
}

console.log(x); // ReferenceError
console.log(y); // ReferenceError
```

### Loop Scope

`let`/`const` create new binding each iteration:

```javascript
// With var - all reference same variable
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Logs: 3, 3, 3
}

// With let - new variable each iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Logs: 0, 1, 2
}
```

## Scope Chain

Inner scopes can access outer scopes:

```javascript
const globalVar = "Global";

function outer() {
  const outerVar = "Outer";

  function inner() {
    const innerVar = "Inner";

    console.log(innerVar); // ✓ Inner scope
    console.log(outerVar); // ✓ Outer scope
    console.log(globalVar); // ✓ Global scope
  }

  inner();
  console.log(innerVar); // ✗ Not in outer scope
}

outer();
```

JavaScript looks in scope chain:

1. Local scope
2. Enclosing function scope
3. Global scope
4. Not found = ReferenceError

```javascript
function level1() {
  const x = 1;

  function level2() {
    const x = 2;

    function level3() {
      const x = 3;
      console.log(x); // 3 (uses innermost)
    }

    level3();
  }

  level2();
}

level1();
```

## var vs let vs const

### var (Function Scoped)

```javascript
function test() {
  var x = 10;
  if (true) {
    var x = 20; // Same variable!
  }
  console.log(x); // 20
}

test();

// var is hoisted
console.log(y); // undefined (not error)
var y = 5;
```

### let (Block Scoped)

```javascript
function test() {
  let x = 10;
  if (true) {
    let x = 20; // Different variable!
  }
  console.log(x); // 10
}

test();

// let is hoisted but not initialized (Temporal Dead Zone)
console.log(z); // ReferenceError
let z = 5;
```

### const (Block Scoped, Immutable)

```javascript
const x = 10;
x = 20; // TypeError - const can't be reassigned

const obj = { name: "John" };
obj.name = "Jane"; // ✓ Can modify properties
obj = {}; // ✗ Can't reassign

const arr = [1, 2, 3];
arr[0] = 99; // ✓ Can modify elements
arr = []; // ✗ Can't reassign
```

## Hoisting

### Variable Hoisting

Variables are moved to top of their scope:

```javascript
// var is hoisted and initialized to undefined
console.log(x); // undefined
var x = 10;
console.log(x); // 10

// Equivalent to:
var x; // Hoisted
console.log(x); // undefined
x = 10;
console.log(x); // 10
```

```javascript
// let/const hoisted but not initialized (TDZ)
console.log(y); // ReferenceError
let y = 10;
```

### Function Hoisting

Function declarations are fully hoisted:

```javascript
// Can call before declaration!
greet(); // "Hello"

function greet() {
  console.log("Hello");
}

// But function expressions are not hoisted
sayHi(); // TypeError: sayHi is not a function
var sayHi = function () {
  console.log("Hi");
};
```

## Closures

Function that has access to variables from outer scope:

```javascript
function outer() {
  const x = 10; // Captured by inner function

  function inner() {
    console.log(x); // Accesses outer's x
  }

  return inner;
}

const closure = outer();
closure(); // "10" - still has access to x
```

Practical use - data privacy:

```javascript
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
// Can't access count directly from outside
```

## this Binding

`this` refers to the context object:

```javascript
const obj = {
  name: "John",
  greet() {
    console.log(this.name); // 'John'
  },
};

obj.greet(); // this = obj

const greet = obj.greet;
greet(); // this = global/undefined (lost context)
```

## Practical Examples

### Namespace Pattern

```javascript
const app = {
  user: "John",
  settings: {
    theme: "dark",
  },

  init() {
    this.setupUI();
  },

  setupUI() {
    console.log(`${this.user} with ${this.settings.theme} theme`);
  },
};

app.init();
```

### Module Pattern

```javascript
const Calculator = (function () {
  let result = 0; // Private

  return {
    add(x) {
      result += x;
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

console.log(Calculator.add(5).multiply(2).getResult()); // 10
```
