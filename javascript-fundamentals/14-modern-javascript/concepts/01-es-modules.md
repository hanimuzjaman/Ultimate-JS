# ES6 MODULES

## What are ES6 Modules?

ES6 modules provide a standardized way to organize code into reusable, maintainable units. They support explicit dependencies and prevent global namespace pollution.

**Key Features:**

- Explicit imports/exports
- Circular dependency handling
- Static analysis friendly
- Scope isolation
- Code reusability

## Export Syntax

### Named Exports

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;

// Importing
import { add, subtract, PI } from "./math.js";
console.log(add(5, 3)); // 8
console.log(PI); // 3.14159
```

### Default Export

```javascript
// calculator.js
export default class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }
}

// Importing
import Calculator from "./calculator.js";
const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
```

### Mixed Exports

```javascript
// utils.js
export const VERSION = "1.0.0";

export function helper() {
  return "helpful";
}

export default class Utils {
  static log(msg) {
    console.log(msg);
  }
}

// Importing
import Utils, { VERSION, helper } from "./utils.js";
Utils.log(VERSION); // 1.0.0
```

## Import Patterns

### Aliasing Imports

```javascript
// Rename on import
import { add as sum, subtract as diff } from "./math.js";
console.log(sum(5, 3)); // 8

// Rename default export
import { default as Calc } from "./calculator.js";
```

### Import All

```javascript
// Import all as namespace
import * as math from "./math.js";
console.log(math.add(5, 3)); // 8
console.log(math.PI); // 3.14159
```

### Side-Effect Only

```javascript
// Just execute module, don't import anything
import "./polyfills.js";
import "./analytics.js";
```

## Module Organization

```javascript
// lib/http.js
export async function get(url) {
  const response = await fetch(url);
  return response.json();
}

export async function post(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

// lib/api.js
import * as http from "./http.js";

export const userAPI = {
  getUser: (id) => http.get(`/api/users/${id}`),
  createUser: (data) => http.post("/api/users", data),
};

// main.js
import { userAPI } from "./lib/api.js";
const user = await userAPI.getUser(1);
```

## Re-exporting

```javascript
// index.js (barrel export)
export { add, subtract } from "./math.js";
export { default as Calculator } from "./calculator.js";
export * from "./utils.js";

// Now consumers import from one place
import { add, Calculator } from "./index.js";
```

## Circular Dependencies

```javascript
// a.js
import { bFunction } from "./b.js";

export function aFunction() {
  return bFunction() + " from A";
}

// b.js
import { aFunction } from "./a.js";

export function bFunction() {
  return aFunction() + " from B";
}

// ⚠️ This causes circular dependency error
// Solution: Separate into 3rd module or restructure
```

## Dynamic Imports

```javascript
// Static import (loaded upfront)
import { feature } from "./feature.js";

// Dynamic import (loaded on demand)
button.addEventListener("click", async () => {
  const { feature } = await import("./feature.js");
  feature();
});

// Conditional imports
async function getPlugin(name) {
  const plugin = await import(`./plugins/${name}.js`);
  return plugin.default;
}
```

## Module Bundling

```javascript
// Before bundling: 10 separate module files
// main.js imports from module-a.js
// module-a.js imports from module-b.js
// ... etc

// After bundling with webpack/rollup: 1 file
// All modules combined
// Import statements replaced with internal references
```

## CommonJS vs ES6 Modules

**CommonJS (Node.js):**

```javascript
// Exporting
module.exports = { add, subtract };

// Importing
const math = require("./math.js");
```

**ES6 Modules:**

```javascript
// Exporting
export { add, subtract };

// Importing
import { add, subtract } from "./math.js";
```

| Feature         | CommonJS        | ES6             |
| --------------- | --------------- | --------------- |
| Sync/Async      | Synchronous     | Asynchronous    |
| Static Analysis | No              | Yes             |
| Tree Shaking    | No              | Yes             |
| Default Export  | module.exports  | export default  |
| Circular Deps   | Partial support | Better handling |

## Practical Example: User Module

```javascript
// models/User.js
export class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  getFullInfo() {
    return `${this.name} (${this.email})`;
  }
}

// services/userService.js
import { User } from "../models/User.js";

export async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return new User(data.id, data.name, data.email);
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// index.js (barrel)
export { User } from "./models/User.js";
export { fetchUser, validateEmail } from "./services/userService.js";

// main.js
import { User, fetchUser, validateEmail } from "./index.js";

const user = await fetchUser(1);
console.log(user.getFullInfo());
```

## Module Caching

```javascript
// modules/counter.js
export let count = 0;

export function increment() {
  count++;
}

// a.js
import { count, increment } from "./modules/counter.js";
increment();
console.log(count); // 1

// b.js
import { count } from "./modules/counter.js";
console.log(count); // 1 (same module instance, cached)
```

## Best Practices

✓ Use named exports for multiple values
✓ Use default export for main export
✓ Create barrel files for organization
✓ Keep modules focused (single responsibility)
✓ Prefer static imports
✓ Use dynamic imports for code splitting
✓ Avoid circular dependencies
✓ Document public APIs

✗ Don't mix named and default without reason
✗ Don't create circular dependencies
✗ Don't abuse dynamic imports
✗ Don't import everything with \*
✗ Don't modify imported bindings
