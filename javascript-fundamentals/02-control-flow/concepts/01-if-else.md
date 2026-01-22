# Control Flow: If/Else Statements

## What is Control Flow?

Control flow determines **which code executes** and **in what order**. Without control flow, programs would execute all code line by line without any decision-making. With control flow, you can create logic: "IF this condition is true, THEN do this; OTHERWISE do that."

## Conditional Statements

Conditional statements allow your program to make decisions and execute different code based on different conditions.

### The If Statement

The `if` statement executes a block of code only if a specified condition is `true`.

**Syntax:**

```javascript
if (condition) {
  // Code to execute if condition is true
}
```

**Example:**

```javascript
let age = 18;

if (age >= 18) {
  console.log("You are an adult");
}
```

### The If...Else Statement

The `if...else` statement executes one block if a condition is `true` and another block if the condition is `false`.

**Syntax:**

```javascript
if (condition) {
  // Code if condition is true
} else {
  // Code if condition is false
}
```

**Example:**

```javascript
let age = 15;

if (age >= 18) {
  console.log("You can vote");
} else {
  console.log("You are not old enough to vote");
}
```

### The If...Else If...Else Statement

When you have multiple conditions, use `else if`:

**Syntax:**

```javascript
if (condition1) {
  // Code if condition1 is true
} else if (condition2) {
  // Code if condition2 is true
} else if (condition3) {
  // Code if condition3 is true
} else {
  // Code if all conditions are false
}
```

**Example:**

```javascript
let score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
```

## Comparison Operators

These are used to create conditions:

| Operator | Meaning                    | Example             |
| -------- | -------------------------- | ------------------- |
| `==`     | Equal to (loose equality)  | `5 == "5"` → true   |
| `===`    | Equal to (strict equality) | `5 === "5"` → false |
| `!=`     | Not equal to               | `5 != 3` → true     |
| `!==`    | Not equal to (strict)      | `5 !== "5"` → true  |
| `>`      | Greater than               | `10 > 5` → true     |
| `<`      | Less than                  | `3 < 10` → true     |
| `>=`     | Greater than or equal      | `10 >= 10` → true   |
| `<=`     | Less than or equal         | `5 <= 10` → true    |

### Loose (==) vs Strict (===) Equality

```javascript
// Loose equality - converts types
5 == "5"; // true (converts string to number)
0 == false; // true (false converts to 0)
null == undefined; // true

// Strict equality - no type conversion
5 === "5"; // false (different types)
0 === false; // false (different types)
null === undefined; // false (different types)
```

**Best Practice:** Always use `===` and `!==` to avoid unexpected type coercion.

## Logical Operators

Combine multiple conditions:

| Operator | Meaning                        | Example                    |
| -------- | ------------------------------ | -------------------------- |
| `&&`     | AND (all must be true)         | `age > 18 && hasLicense`   |
| `\|\|`   | OR (at least one must be true) | `isWeekend \|\| isHoliday` |
| `!`      | NOT (reverses condition)       | `!isRaining`               |

**Example:**

```javascript
let age = 25;
let hasLicense = true;
let hasInsurance = false;

if (age >= 18 && hasLicense && hasInsurance) {
  console.log("You can drive");
} else {
  console.log("You cannot drive");
}
```

## Nested If Statements

You can put if statements inside other if statements:

```javascript
let isStudent = true;
let hasValidID = true;

if (isStudent) {
  console.log("Student verified");

  if (hasValidID) {
    console.log("ID verified");
    console.log("Full access granted");
  } else {
    console.log("ID not verified");
    console.log("Limited access");
  }
} else {
  console.log("Not a student");
}
```

## Truthy and Falsy Values

Any value can be evaluated in a boolean context:

**Falsy values** (evaluated as `false`):

- `false`
- `0`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

**Truthy values** (everything else):

```javascript
if ("hello") console.log("Truthy"); // Prints
if (1) console.log("Truthy"); // Prints
if ([]) console.log("Truthy"); // Prints
if ({}) console.log("Truthy"); // Prints
```

This is useful for checking if a variable has a value:

```javascript
let username = "";

if (username) {
  console.log(`Welcome, ${username}`);
} else {
  console.log("Please enter a username");
}
```

## Common Patterns

### Validation Pattern

```javascript
if (!username || username.length < 3) {
  console.log("Username must be at least 3 characters");
  return;
}

if (!email.includes("@")) {
  console.log("Invalid email");
  return;
}

// If we reach here, validation passed
console.log("Form is valid");
```

### Early Return Pattern

```javascript
function processUser(user) {
  if (!user) return;
  if (!user.name) return;
  if (!user.email) return;

  // Process user if all checks pass
  console.log("Processing:", user.name);
}
```

### Toggle Pattern

```javascript
let isVisible = false;

if (isVisible) {
  isVisible = false;
} else {
  isVisible = true;
}

// Shorter way
isVisible = !isVisible;
```

## Best Practices

1. **Use `===` instead of `==`** - avoid unexpected type coercion
2. **Keep conditions simple** - break complex conditions into variables
3. **Avoid deeply nested if statements** - use early returns instead
4. **Use meaningful variable names** - makes conditions readable
5. **Group related conditions** - use parentheses for clarity

```javascript
// ✅ Good
const isAdult = age >= 18;
const hasLicense = true;
const canDrive = isAdult && hasLicense;

if (canDrive) {
  console.log("You can drive");
}

// ❌ Bad
if (age >= 18 && true) {
  console.log("You can drive");
}
```

## Summary

- **if** - Execute code if condition is true
- **if...else** - Execute one block if true, another if false
- **if...else if...else** - Multiple conditions
- **Logical operators** - Combine conditions with `&&`, `||`, `!`
- **Comparison operators** - Create conditions with `===`, `>`, `<`, etc.
- **Truthy/Falsy** - Any value can be evaluated as boolean

Control flow is the foundation of all decision-making in programs. Master if/else statements and you'll be able to write programs that respond intelligently to different situations!
