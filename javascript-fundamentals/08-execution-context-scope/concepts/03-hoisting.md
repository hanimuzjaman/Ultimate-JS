# Hoisting: JavaScript's Behavior

## What is Hoisting?

Hoisting is JavaScript's behavior of moving declarations to the top of their scope during the creation phase (before code execution). This makes it possible to use variables and functions before they're declared in the code.

## How Hoisting Works

JavaScript execution has two phases:

1. **Creation Phase**: Declarations are hoisted
2. **Execution Phase**: Code runs line by line

## Hoisting with var

Variables declared with `var` are hoisted and initialized as `undefined`:

```javascript
console.log(x); // undefined (not an error!)
var x = 5;
console.log(x); // 5

// Interpreted as:
// var x; (hoisted, = undefined)
// console.log(x); // undefined
// x = 5;
// console.log(x); // 5
```

## Hoisting with let and const

`let` and `const` are hoisted but NOT initialized. They're in the **Temporal Dead Zone (TDZ)**:

```javascript
console.log(y); // ReferenceError
let y = 5;

// They're hoisted but inaccessible until declaration line
```

## Function Declaration Hoisting

Function declarations are fully hoisted:

```javascript
console.log(greet()); // "Hello" - Works!

function greet() {
  return "Hello";
}
```

## Function Expression Hoisting

Function expressions are NOT fully hoisted:

```javascript
console.log(greet); // undefined
greet(); // TypeError: greet is not a function

var greet = function () {
  return "Hello";
};
```

## Hoisting Scope

Hoisting happens per scope (function or block):

```javascript
function example() {
  console.log(x); // undefined (hoisted in this scope)

  if (true) {
    var x = 5;
  }

  console.log(x); // 5 (var is function-scoped)
}
```

## Temporal Dead Zone (TDZ)

Period from start of scope until variable declaration:

```javascript
{
  // x is in TDZ here
  console.log(x); // ReferenceError

  let x = 5; // TDZ ends here
  console.log(x); // 5
}
```

## Class Hoisting

Classes are hoisted but in TDZ:

```javascript
const obj = new MyClass(); // ReferenceError

class MyClass {}
```

## Hoisting with Parameters

Function parameters aren't hoisted, they're defined:

```javascript
function test(x) {
  console.log(x); // The parameter value
  var y = 10; // y hoisted but undefined
}
```

## Variable Shadowing from Hoisting

```javascript
var x = "global";

function test() {
  console.log(x); // undefined (x hoisted locally)

  if (true) {
    var x = "local";
  }

  console.log(x); // 'local'
}

test();
console.log(x); // 'global'
```

## Hoisting Quirks

### Conditional Variable Declaration

```javascript
if (false) {
  var neverRuns = "value";
}

console.log(neverRuns); // undefined (still hoisted!)
```

### Multiple Declarations

```javascript
var x = 1;
var x = 2; // Allowed with var

let y = 1;
let y = 2; // SyntaxError
```

## Best Practices

### ❌ Don't Rely on Hoisting

```javascript
console.log(x); // Don't depend on undefined here
var x = 5;
```

### ✅ Declare Before Use

```javascript
var x;
console.log(x); // undefined (intentional)
x = 5;
```

### ✅ Use let/const

```javascript
// Prevents accidental access
let y = 10; // In TDZ until here
console.log(y); // 10
```

### ✅ Declare at Top of Scope

```javascript
function good() {
  let result; // Declare first
  const config = {}; // Then use

  // Logic here
}
```

## Comparison Table

| Feature       | var       | let | const | function |
| ------------- | --------- | --- | ----- | -------- |
| Hoisted       | Yes       | Yes | Yes   | Yes      |
| Initialized   | undefined | TDZ | TDZ   | Full     |
| Re-declarable | Yes       | No  | No    | No       |
| Reassignable  | Yes       | Yes | No    | No       |
| Block Scoped  | No        | Yes | Yes   | No       |

## Hoisting in Different Scopes

```javascript
// Global scope
var x = "global";

function test() {
  // Function scope - x hoisted here
  console.log(x); // undefined

  {
    // Block scope
    let y = "block"; // Only in this block
  }

  var x = "function";
}
```

## Summary

Hoisting is automatic movement of declarations:

- `var` hoisted and initialized as undefined
- `let/const` hoisted but in TDZ
- Function declarations fully hoisted
- Function expressions partially hoisted
- Hoisting per scope, not global
- Best to declare before use
- Use `let/const` to avoid hoisting confusion
