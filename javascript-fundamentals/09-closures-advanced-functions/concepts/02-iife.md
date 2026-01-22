# Immediately Invoked Function Expressions (IIFE)

## What is an IIFE?

An IIFE is a JavaScript function that executes immediately after it is defined. It's a self-executing anonymous function.

## Syntax

```javascript
(function () {
  console.log("Runs immediately");
})();

// With parameters
(function (name) {
  console.log("Hello, " + name);
})("Alice");
```

## Why Use IIFE?

1. **Avoid global namespace pollution**
2. **Create private variables**
3. **Execute code immediately**
4. **Module pattern implementation**

## Module Pattern

```javascript
const myModule = (function () {
  let privateVar = "private";

  return {
    publicMethod() {
      return privateVar;
    },
  };
})();

myModule.publicMethod(); // Works
myModule.privateVar; // undefined
```

## Creating Private Variables

```javascript
const counter = (function () {
  let count = 0;

  return {
    increment() {
      return ++count;
    },
    getCount() {
      return count;
    },
  };
})();

counter.increment(); // 1
counter.count; // undefined (private)
```

## Revealing Module Pattern

```javascript
const api = (function () {
  const privateFunc = () => "private";
  const publicFunc = () => privateFunc();

  return { publicFunc };
})();
```

## Namespace Management

```javascript
const app = (function () {
  return {
    version: "1.0",
    config: { debug: true },
  };
})();
```

## Singleton Pattern

```javascript
const singleton = (function () {
  let instance;

  return {
    getInstance() {
      if (!instance) {
        instance = {};
      }
      return instance;
    },
  };
})();
```

## IIFE Variations

### Standard Syntax

```javascript
(function () {})();
```

### Alternative Syntax

```javascript
(function () {})();
```

### Arrow Function

```javascript
(() => {})();
```

## IIFE with Parameters

```javascript
(function (global) {
  global.myGlobal = "value";
})(window || global);
```

## Avoiding Global Pollution

```javascript
// Without IIFE (pollutes global)
var x = 1;
var y = 2;

// With IIFE (isolated)
(function () {
  var x = 1;
  var y = 2;
})();
```

## Factory Pattern with IIFE

```javascript
const userFactory = (function () {
  function User(name) {
    this.name = name;
  }

  return {
    create(name) {
      return new User(name);
    },
  };
})();

const user = userFactory.create("John");
```

## Practical Example: Configuration Manager

```javascript
const config = (function () {
  const defaults = { debug: false };
  const userConfig = {};

  return {
    set(key, value) {
      userConfig[key] = value;
    },
    get(key) {
      return userConfig[key] !== undefined ? userConfig[key] : defaults[key];
    },
  };
})();

config.set("debug", true);
config.get("debug"); // true
```

## Common Uses

1. **Module definition**
2. **Avoiding variable conflicts**
3. **Creating private state**
4. **Initializing code**
5. **Plugin patterns**

## IIFE vs ES6 Modules

```javascript
// Old way (IIFE)
const module1 = (function () {
  return { export: "value" };
})();

// Modern way (ES6)
export const module2 = { export: "value" };
```

## Summary

IIFEs are powerful for:

- Creating private scope
- Avoiding global namespace pollution
- Implementing module pattern
- Self-executing code
- Creating closures automatically

With ES6 modules becoming standard, IIFE usage has decreased, but understanding them is still important for legacy code.
