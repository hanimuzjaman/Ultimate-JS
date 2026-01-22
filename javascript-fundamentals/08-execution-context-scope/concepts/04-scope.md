# Scope: Variable Accessibility

## What is Scope?

Scope determines where variables are accessible. It's the set of rules that determines how variables are looked up and accessed.

## Types of Scope

### Global Scope

Accessible everywhere in the script:

```javascript
var globalVar = "global";
let globalLet = "global";

function anyFunction() {
  console.log(globalVar); // Accessible
}
```

### Function Scope

Accessible only within the function (var):

```javascript
function myFunc() {
  var local = "inside";

  if (true) {
    var also_local = "also inside"; // Still function-scoped
  }

  console.log(also_local); // Accessible
}

console.log(local); // ReferenceError
```

### Block Scope

Accessible only within the block (let, const):

```javascript
{
  let blockVar = "inside";
}

console.log(blockVar); // ReferenceError
```

## Scope Chain

Variables are searched in order:

1. Local scope (current block/function)
2. Parent scope(s) (nested function scopes)
3. Global scope

```javascript
const global = "global";

function outer() {
  const outerLocal = "outer";

  function inner() {
    const innerLocal = "inner";

    // Can access: innerLocal, outerLocal, global
    console.log(innerLocal); // Found in local
    console.log(outerLocal); // Found in parent
    console.log(global); // Found in global
  }

  inner();
}
```

## Scope Shadowing

Inner scope variables hide outer scope variables with same name:

```javascript
const x = "global";

{
  const x = "block 1";
  console.log(x); // 'block 1'

  {
    const x = "block 2";
    console.log(x); // 'block 2'
  }

  console.log(x); // 'block 1'
}

console.log(x); // 'global'
```

## Nested Scopes

Functions can be nested, creating nested scopes:

```javascript
function level1() {
  const l1 = "level 1";

  function level2() {
    const l2 = "level 2";

    function level3() {
      const l3 = "level 3";

      // All accessible
      console.log(l1, l2, l3);
    }
  }
}
```

## For Loop Scope Differences

### var in loop

```javascript
for (var i = 0; i < 3; i++) {
  // i is function-scoped
}

console.log(i); // 3 - Accessible outside loop!
```

### let in loop

```javascript
for (let j = 0; j < 3; j++) {
  // j is block-scoped to iteration
  // New j created each iteration
}

console.log(j); // ReferenceError
```

### const in loop

```javascript
for (const k of [1, 2, 3]) {
  // k is block-scoped
  // New k each iteration
}

console.log(k); // ReferenceError
```

## Closure Scope

Functions retain access to their outer scope:

```javascript
function makeCounter() {
  let count = 0; // Captured in closure

  return () => {
    count++;
    return count;
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 - Separate count
```

## Scope of Conditionals

### Block Scope

```javascript
if (true) {
  let ifVar = "in if";
}

console.log(ifVar); // ReferenceError
```

### Function Scope

```javascript
if (true) {
  var ifVar = "in if"; // Still function-scoped
}

console.log(ifVar); // Works!
```

## Try-Catch Scope

```javascript
try {
  throw new Error("test");
} catch (error) {
  console.log(error); // Accessible
}

console.log(error); // ReferenceError
```

## Scope with eval()

```javascript
eval("var x = 5"); // Declares in local scope
console.log(x); // Accessible

// Don't use eval! Security and performance risks
```

## Access Pattern Examples

### Reading Variables

```javascript
const x = 5;
console.log(x); // Reads x from scope
```

### Modifying Variables

```javascript
let x = 5;
x = 10; // Modifies x in scope
console.log(x); // 10
```

### Creating New Variables

```javascript
let x = 5;
{
  let x = 10; // New x in block scope (shadowing)
  console.log(x); // 10
}
console.log(x); // 5
```

## Best Practices

### 1. Use const by default

```javascript
const pi = 3.14; // Can't accidentally reassign
```

### 2. Use let when reassignment needed

```javascript
let count = 0;
count++; // Reassignment needed
```

### 3. Avoid var

```javascript
// Don't use var - function scope is confusing
// var oldStyle = 'bad';
```

### 4. Minimize scope

```javascript
// Good: Declare close to usage
function process() {
  const needed = "value";
  console.log(needed);
  // not needed elsewhere
}
```

### 5. Avoid global variables

```javascript
// Bad: Global pollutes namespace
// window.globalVar = 'bad';

// Good: Encapsulate in function
const myModule = (() => {
  const private = "private";
  return { public: "public" };
})();
```

## Summary

Scope controls variable accessibility:

- Global scope: accessible everywhere
- Function scope: var is function-scoped
- Block scope: let/const are block-scoped
- Scope chain: searches up the scope hierarchy
- Shadowing: inner names hide outer names
- Closures: functions remember their scope
- Best practice: const > let >> var
