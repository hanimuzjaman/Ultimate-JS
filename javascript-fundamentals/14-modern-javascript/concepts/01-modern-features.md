# Modern JavaScript Features & Best Practices

## Template Literals

String interpolation with backticks:

```javascript
const name = "Alice";
const age = 30;

// ❌ Old way
const message1 = "My name is " + name + " and I am " + age + " years old";

// ✓ Modern way
const message2 = `My name is ${name} and I am ${age} years old`;

// Multi-line strings
const html = `
  <div>
    <h1>Welcome</h1>
    <p>This is HTML</p>
  </div>
`;
```

Tagged template literals:

```javascript
function highlight(strings, ...values) {
  let result = "";
  strings.forEach((str, i) => {
    result += str + (values[i] ? `<b>${values[i]}</b>` : "");
  });
  return result;
}

const name = "John";
const message = highlight`Hello ${name}, welcome!`;
// "Hello <b>John</b>, welcome!"
```

## Destructuring

### Array Destructuring

```javascript
const arr = [1, 2, 3];

// Assignment
const [a, b, c] = arr;

// Skip elements
const [first, , third] = arr;

// Rest
const [head, ...tail] = arr; // head = 1, tail = [2, 3]

// Defaults
const [x = 10, y = 20] = [5]; // x = 5, y = 20
```

### Object Destructuring

```javascript
const user = { name: "John", age: 30, city: "NYC" };

// Basic
const { name, age } = user;

// Rename
const { name: fullName, age: years } = user;

// Defaults
const { country = "USA" } = user;

// Nested
const {
  address: { street },
} = user;

// Rest
const { name, ...rest } = user; // rest has other properties
```

### Function Parameters

```javascript
// Destructure in parameters
function greet({ name, age = 25 }) {
  console.log(`${name} is ${age}`);
}

greet({ name: "John", age: 30 });

// Array destructuring in parameters
function sum([a, b]) {
  return a + b;
}

sum([5, 3]); // 8
```

## Default Parameters

```javascript
function greet(name = "Guest", greeting = "Hello") {
  console.log(`${greeting}, ${name}`);
}

greet(); // "Hello, Guest"
greet("Alice"); // "Hello, Alice"
greet("Bob", "Hi"); // "Hi, Bob"

// Can use previous parameters
function createUser(name, email = `${name.toLowerCase()}@example.com`) {
  return { name, email };
}

createUser("John"); // email = "john@example.com"
```

## Rest & Spread

### Rest Parameters

Collect remaining arguments:

```javascript
function sum(first, ...rest) {
  return first + rest.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4, 5); // 15
// first = 1, rest = [2, 3, 4, 5]
```

### Spread Operator

Expand arrays/objects:

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2 }

// Copy array
const copy = [...arr1];

// Function arguments
Math.max(...[5, 3, 8]); // 8
```

## Arrow Functions

```javascript
// Traditional
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => {
  return a + b;
};

// Concise
const add = (a, b) => a + b;

// Single parameter
const double = (x) => x * 2;

// No parameters
const greet = () => "Hello";

// Return object
const createUser = (name) => ({ name, created: Date.now() });
```

## Enhanced Object Literals

```javascript
const name = "John";
const age = 30;

// Property shorthand
const user = { name, age };

// Method shorthand
const obj = {
  name: "John",
  greet() {
    return `Hello, ${this.name}`;
  },
};

// Computed property names
const propName = "email";
const user2 = {
  name: "Jane",
  [propName]: "jane@example.com",
  [`_${propName}`]: null, // Computed with prefix
};
```

## for...of Loop

```javascript
const arr = ["a", "b", "c"];

// Index and value
for (const [index, value] of arr.entries()) {
  console.log(index, value);
}

// Values only
for (const value of arr) {
  console.log(value);
}

// String
for (const char of "Hello") {
  console.log(char);
}

// Works with custom iterables
const iterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

for (const value of iterable) {
  console.log(value);
}
```

## Promises & Async/Await

```javascript
// Promise
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Async/Await (cleaner)
async function getData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getData();
```

## Classes

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  greet() {
    return `Hello, ${this.name}`;
  }

  static create(name, email) {
    return new User(name, email);
  }

  get displayName() {
    return this.name.toUpperCase();
  }

  set displayName(name) {
    this.name = name;
  }
}

const user = new User("John", "john@example.com");
console.log(user.greet());

class Admin extends User {
  constructor(name, email, role) {
    super(name, email);
    this.role = role;
  }

  greet() {
    return `Welcome admin, ${this.name}`;
  }
}
```

## Modules (ES6)

### Export

```javascript
// Named exports
export function add(a, b) {
  return a + b;
}

export const PI = 3.14159;

// Default export
export default class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

// Export object
export const math = { add, PI };
```

### Import

```javascript
// Named imports
import { add, PI } from "./math.js";

// Default import
import Calculator from "./math.js";

// Mix
import Calc, { add, PI } from "./math.js";

// Import all
import * as math from "./math.js";
// math.add, math.PI

// Dynamic import
const module = await import("./math.js");
```

## Regular Expressions

```javascript
// Create regex
const pattern1 = /hello/i; // i = case insensitive
const pattern2 = new RegExp("hello", "i");

// Test if matches
/test/.test("this is a test"); // true

// Find matches
"hello world hello".match(/hello/g); // ['hello', 'hello']

// Replace
"hello world".replace(/hello/, "hi"); // "hi world"
"hello hello".replace(/hello/g, "hi"); // "hi hi"

// Split
"a,b,c".split(/,/); // ['a', 'b', 'c']

// Common patterns
/\d+/.test("123"); // Digits
/[a-z]+/.test("abc"); // Letters
/^hello/.test("hello world"); // Starts with
/world$/.test("hello world"); // Ends with
```

## Array Methods

```javascript
const arr = [1, 2, 3, 4, 5];

// Transform
arr.map((x) => x * 2); // [2, 4, 6, 8, 10]

// Filter
arr.filter((x) => x > 2); // [3, 4, 5]

// Reduce
arr.reduce((sum, x) => sum + x, 0); // 15

// Find
arr.find((x) => x > 3); // 4

// Some/Every
arr.some((x) => x > 4); // true
arr.every((x) => x > 0); // true

// Flat
[1, [2, [3]]].flat(2); // [1, 2, 3]

// FlatMap
arr.flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, ...]
```

## String Methods

```javascript
const str = "JavaScript";

// Case
str.toLowerCase(); // "javascript"
str.toUpperCase(); // "JAVASCRIPT"

// Check
str.includes("Script"); // true
str.startsWith("Java"); // true
str.endsWith("Script"); // true

// Extract
str.slice(0, 4); // "Java"
str.substring(4, 10); // "Script"
str.charAt(0); // "J"

// Replace
str.replace("Script", "Code"); // "JavaCode"
str.replaceAll("a", "@"); // "J@v@Script"

// Split
str.split(""); // ['J', 'a', 'v', ...]

// Trim
"  hello  ".trim(); // "hello"
```

## Let vs Const vs Var

```javascript
// var - function scoped, can be hoisted
var x = 1;
x = 2; // ✓ Can reassign

// let - block scoped, temporal dead zone
let y = 1;
y = 2; // ✓ Can reassign

// const - block scoped, immutable
const z = 1;
z = 2; // ✗ Cannot reassign
const obj = {};
obj.prop = "value"; // ✓ Can modify properties
```

## Error Handling

```javascript
try {
  throw new Error("Something went wrong");
} catch (error) {
  console.error(error.message);
  console.error(error.stack);
} finally {
  console.log("Cleanup");
}

// Custom errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

throw new ValidationError("Invalid input");
```

## JSON

```javascript
const obj = { name: "John", age: 30 };

// To JSON string
const json = JSON.stringify(obj);
// '{"name":"John","age":30}'

// From JSON string
const parsed = JSON.parse(json);
// { name: 'John', age: 30 }

// Pretty print
JSON.stringify(obj, null, 2);

// Custom replacer
JSON.stringify(obj, (key, value) => {
  if (typeof value === "number") return value.toString();
  return value;
});
```

## Best Practices

1. **Use const by default**, let when needed, avoid var
2. **Use arrow functions** for concise callbacks
3. **Use template literals** for string interpolation
4. **Use destructuring** for cleaner code
5. **Use async/await** instead of .then chains
6. **Use classes** for OOP
7. **Use modules** for organization
8. **Handle errors** with try/catch
9. **Avoid global scope** pollution
10. **Write clean, readable code**
