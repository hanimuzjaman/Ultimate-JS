# JavaScript Variables: The Fundamentals

A variable is a "named container" for storing data values. In JavaScript, how you declare a variable determines its scope, hoisting behavior, and whether its value can be reassigned.

---

## 1. Declaration Keywords

Modern JavaScript (ES6+) provides three ways to declare variables. Choosing the right one is crucial for code safety and readability.

| Feature          | `var`               | `let`         | `const`       |
| :--------------- | :------------------ | :------------ | :------------ |
| **Scope**        | Function Scope      | Block Scope   | Block Scope   |
| **Reassignable** | Yes                 | Yes           | No            |
| **Redeclarable** | Yes                 | No            | No            |
| **Hoisting**     | Hoisted (undefined) | Hoisted (TDZ) | Hoisted (TDZ) |

### `var`

The legacy keyword. It is function-scoped, meaning if it is declared inside a function, it belongs to that function; otherwise, it becomes global. It ignores block boundaries like `if` or `for` loops.

### `let`

The modern choice for variables that need to change. It is block-scoped, meaning it only exists within the nearest set of curly braces `{}`.

### `const`

Used for values that should remain constant. Note that while you cannot reassign a `const` variable, you **can** modify the contents of an object or array assigned to a `const`.

---

## 2. Understanding Scope

Scope defines the accessibility of variables.

- **Global Scope:** Accessible from anywhere in the script.
- **Function Scope:** Created by `var`. Accessible only within the function.
- **Block Scope:** Created by `let` and `const`. Accessible only within `{ }`.

---

## 3. The Temporal Dead Zone & Hoisting

**Hoisting** is JavaScript's behavior of moving declarations to the top of their scope during the compile phase.

- **`var`**: Is hoisted and initialized as `undefined`. You can access it before declaration without a crash.
- **`let`/`const`**: Are hoisted but **not initialized**. The period between the start of the block and the declaration is called the **Temporal Dead Zone (TDZ)**. Accessing them here results in a `ReferenceError`.

---

## 4. Naming Rules (Identifiers)

To write valid JavaScript, variable names must follow these rules:

1.  **Case Sensitivity:** `lastName` and `lastname` are two different variables.
2.  **Start Characters:** Must begin with a letter (a-z, A-Z), an underscore (`_`), or a dollar sign (`$`). They **cannot** start with a number.
3.  **No Reserved Words:** You cannot use words like `if`, `while`, `class`, or `function` as names.
4.  **Convention:** Use `camelCase` for variable and function names (e.g., `isLoggedIn`). Use `UPPER_SNAKE_CASE` for hard-coded constants (e.g., `MAX_RETRY_ATTEMPTS`).

---

## 5. Dynamic Typing

JavaScript is a **dynamically typed** language. You do not need to declare the type of data a variable will hold. The type is automatically inferred and can change at runtime.

```javascript
let response = 200; // Currently a Number
response = "Success"; // Now a String
```
