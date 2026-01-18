# Type Coercion in JavaScript

**Type coercion** is JavaScript’s automatic process of **converting one data type into another** during operations.

JavaScript does this to make operations possible between **different data types**.

**Simple definition:**

> When JavaScript changes a value’s type automatically, it is called **type coercion**.

---

## Real-Life Analogy

Imagine:

- You say: “I have **₹100**” (number)
- Someone asks: “Show it as **text** on screen”

JavaScript automatically converts the number into a **string**.

That automatic conversion is **type coercion**.

---

## Types of Type Coercion

JavaScript has **two types** of coercion:

1. **Implicit Type Coercion** (Automatic)
2. **Explicit Type Coercion** (Manual)

---

## 1. Implicit Type Coercion

JavaScript automatically converts data types **without asking you**.

### a. String Coercion

Occurs mostly with the `+` operator.

**Rule:**

- If one operand is a string → everything becomes a string

**Real-life example:**
Adding text to a number for display.

---

### b. Number Coercion

Occurs with mathematical operators like:
`-`, `*`, `/`, `%`

JavaScript tries to convert values to **numbers**.

**Real-life example:**
Calculating price even if input comes as text.

---

### c. Boolean Coercion

Occurs in **conditions** (`if`, `while`, logical operators).

**Falsy values:**

- `false`
- `0`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

Everything else is **truthy**.

**Real-life example:**
Checking if a user is logged in.

---

## 2. Explicit Type Coercion

When **you manually convert** one data type to another.

Common conversion methods:

- `Number()`
- `String()`
- `Boolean()`

**Real-life example:**
Converting user input (string) into a number before calculation.

---

## `==` vs `===` (Important)

### `==` (Loose Equality)

- Performs **type coercion**
- Can cause unexpected results

### `===` (Strict Equality)

- No type coercion
- Compares **value + type**
- Recommended in real projects

---

## Common Coercion Rules (Easy Memory)

- `+` → prefers **string**
- `- * / %` → prefers **number**
- `==` → allows coercion
- `===` → no coercion
- `if()` → converts to boolean

---

## Key Takeaways

- Type coercion is automatic type conversion by JavaScript
- Implicit coercion can cause bugs
- Prefer **explicit conversion**
- Always use `===` instead of `==` in production code

---
