# Operators in JavaScript

**Operators** are symbols used to perform operations on values and variables. If variables are the "boxes," operators are the "tools" used to manipulate, compare, and calculate the data inside them.

**Real-life analogies:**

- `+` → Adding items to a shopping cart.
- `>` → Comparing heights to enter a ride.
- `=` → Storing a document in a specific folder.

---

## Categories of Operators in JavaScript

JavaScript operators are broadly classified into:

1. Arithmetic Operators
2. Assignment Operators
3. Comparison Operators
4. Logical Operators
5. Unary Operators
6. Ternary (Conditional) Operator
7. Bitwise Operators

---

## 1. Arithmetic Operators

Used to perform **mathematical calculations**.

| Operator | Name                   | Example       |
| :------- | :--------------------- | :------------ |
| `+`      | Addition               | `10 + 5 = 15` |
| `-`      | Subtraction            | `10 - 5 = 5`  |
| `*`      | Multiplication         | `10 * 5 = 50` |
| `/`      | Division               | `10 / 2 = 5`  |
| `%`      | Remainder (Modulus)    | `10 % 3 = 1`  |
| `**`     | Exponentiation (Power) | `2 ** 3 = 8`  |

---

## 2. Assignment Operators

Used to **assign or update values** in variables.

- `=` → Assign: `x = 10`
- `+=` → Add and assign: `x += 5` (Same as `x = x + 5`)
- `-=` → Subtract and assign: `x -= 5`
- `*=` → Multiply and assign: `x *= 2`
- `/=` → Divide and assign: `x /= 2`

---

## 3. Comparison Operators

Used to **compare two values** and return a Boolean (`true` or `false`).

- `==` → Equal (Loose: compares value only)
- `===` → **Strict Equal** (Compares value **and** data type)
- `!=` → Not equal (Loose)
- `!==` → **Strict Not equal**
- `>` / `<` → Greater than / Less than
- `>=` / `<=` → Greater or equal / Less or equal

**Real-life use:** Checking eligibility (age ≥ 18).

> **Pro Tip:** Always use `===` to avoid bugs caused by automatic type conversion.

---

## 4. Logical Operators

Used to **combine multiple conditions** or reverse logic.

- `&&` (AND) → Returns `true` if **both** conditions are true.
- `||` (OR) → Returns `true` if **at least one** condition is true.
- `!` (NOT) → Reverses the logical state (turns `true` to `false`).

---

## 5. Unary Operators

Operate on **a single operand** (one variable/value).

- `++` → Increment (Adds 1)
- `--` → Decrement (Subtracts 1)
- `typeof` → Returns the data type string.
- `-` → Unary negation (Converts a number to negative).

---

## 6. Ternary (Conditional) Operator

A shorthand for `if...else` statements. It is the only operator that takes **three operands**.

**Syntax:**

```js
condition ? valueIfTrue : valueIfFalse;
```

## Real-life use: Checking if a user is an adult:

```js
let status = age >= 18 ? "Adult" : "Minor";
```

## 7. Bitwise Operators (Advanced)

Operate on numbers at the binary (bit) level. Used in performance optimization, cryptography, or low-level programming.

- `&` → Bitwise AND

- `|` → Bitwise OR

- `^` → Bitwise XOR

- `~` → Bitwise NOT

- `<<` / `>>` → Bitwise Shifts
