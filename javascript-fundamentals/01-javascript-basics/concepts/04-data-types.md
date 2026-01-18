# Data Types in JavaScript

A **data type** defines the kind of value a variable can hold and determines **how the value is stored, accessed, and manipulated** in memory.

JavaScript is a **dynamically typed language**, meaning variable types are determined **at runtime**, not at declaration.

---

## Categories of Data Types in JavaScript

JavaScript data types are broadly classified into:

1. **Primitive Data Types**
2. **Non-Primitive (Reference) Data Types**

---

## 1. Primitive Data Types

Primitive types store **single, immutable values** and are copied **by value**.

### a. `Number`

- Represents integers and floating-point numbers
- Includes special values like `Infinity` and `NaN`

### b. `String`

- Represents textual data
- Enclosed in single (`'`), double (`"`), or backticks (`` ` ``)

### c. `Boolean`

- Logical type with two values: `true` or `false`

### d. `Undefined`

- A variable declared but not assigned a value

### e. `Null`

- Represents an intentional absence of value
- Assigned explicitly by the developer

### f. `Symbol` (ES6)

- Represents a unique and immutable identifier
- Commonly used as object keys

### g. `BigInt`

- Used to represent very large integers beyond `Number` limits

---

## 2. Non-Primitive (Reference) Data Types

Non-primitive types store **references to memory locations** and are copied **by reference**.

### a. `Object`

- Collection of key–value pairs

### b. `Array`

- Ordered list of values (special type of object)

### c. `Function`

- Callable objects used to execute reusable logic

---

## Special Note: `typeof` Operator

- Used to determine the data type of a value
- `typeof null` returns `"object"` (known JavaScript quirk)
