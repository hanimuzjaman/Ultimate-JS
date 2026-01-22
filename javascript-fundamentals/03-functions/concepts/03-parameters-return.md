# Function Parameters and Return Values

## Parameters (Arguments)

### Basic Parameters

Parameters are variables in the function definition that receive values when the function is called.

```javascript
// Define parameters
function greet(name, greeting) {
  return `${greeting}, ${name}!`;
}

// Pass arguments
console.log(greet("Alice", "Hello")); // "Hello, Alice!"
```

### Default Parameters

Provide default values if argument is not provided:

```javascript
function introduce(name = "Guest", age = "Unknown") {
  return `${name} is ${age} years old`;
}

console.log(introduce("Bob", 25)); // "Bob is 25 years old"
console.log(introduce("Charlie")); // "Charlie is Unknown years old"
console.log(introduce()); // "Guest is Unknown years old"

// Defaults can be expressions
const defaultRole = () => "user";
function createAccount(username, role = defaultRole()) {
  return { username, role };
}
```

### Rest Parameters

Collect remaining arguments into an array using `...`:

```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Mix regular and rest parameters
function greetAll(greeting, ...names) {
  return names.map(name => `${greeting}, ${name}`);
}

console.log(greetAll('Hi', 'Alice', 'Bob', 'Charlie'));
// ["Hi, Alice", "Hi, Bob", "Hi, Charlie"]

// Rest parameter must be last
function wrong(a, ...rest, b) { } // SyntaxError!
```

### Destructuring Parameters

Destructure objects and arrays in parameters:

```javascript
// Object destructuring
function displayUser({ name, age, city }) {
  console.log(`${name}, ${age} from ${city}`);
}

displayUser({ name: "Alice", age: 28, city: "NYC" });

// With default values
function createConfig({ host = "localhost", port = 3000 } = {}) {
  return { host, port };
}

console.log(createConfig()); // { host: 'localhost', port: 3000 }
console.log(createConfig({ port: 8080 })); // { host: 'localhost', port: 8080 }

// Array destructuring
function swap([a, b]) {
  return [b, a];
}

console.log(swap([1, 2])); // [2, 1]
```

### Named vs Positional Parameters

```javascript
// Positional - order matters
function positional(first, second, third) {
  return [first, second, third];
}
positional(1, 2, 3); // Works as expected

// Named (using object) - order doesn't matter
function named({ first, second, third }) {
  return [first, second, third];
}

named({ third: 3, first: 1, second: 2 }); // Same result
```

## Return Statements

### Basic Return

```javascript
function add(a, b) {
  return a + b; // Returns and exits function
}

console.log(add(2, 3)); // 5

// Function without return returns undefined
function noReturn() {
  console.log("Hello");
  // implicit return undefined
}

console.log(noReturn()); // undefined
```

### Early Returns

Return early to avoid unnecessary code execution:

```javascript
function processUser(user) {
  if (!user) {
    return null; // Early exit
  }

  if (!user.isActive) {
    return "User is inactive"; // Early exit
  }

  // Continue processing
  return `Processing ${user.name}`;
}

// More readable than nested ifs
function validate(input) {
  if (input === null) return false;
  if (input === undefined) return false;
  if (input.length === 0) return false;
  return true;
}
```

### Returning Objects

```javascript
// Returning new object
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    greet() {
      return `Hello, I'm ${this.name}`;
    },
  };
}

const person = createPerson("Alice", 25);
console.log(person.greet()); // "Hello, I'm Alice"

// Shorthand property names
function createPoint(x, y) {
  return { x, y }; // Same as { x: x, y: y }
}
```

### Returning Functions

```javascript
function makeGreeter(greeting) {
  return (name) => `${greeting}, ${name}!`;
}

const hello = makeGreeter("Hello");
const hi = makeGreeter("Hi");

console.log(hello("Alice")); // "Hello, Alice!"
console.log(hi("Bob")); // "Hi, Bob!"
```

### Returning Multiple Values

```javascript
// Using object
function calculateStats(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = sum / numbers.length;
  const max = Math.max(...numbers);
  return { sum, avg, max };
}

const { sum, avg, max } = calculateStats([10, 20, 30, 40]);
console.log(sum, avg, max); // 100, 25, 40

// Using array
function getCoordinates() {
  return [10, 20]; // x, y
}

const [x, y] = getCoordinates();
console.log(x, y); // 10, 20
```

## Parameter Best Practices

### 1. Use Descriptive Names

```javascript
// Bad
function calc(a, b, c) {
  return a + b * c;
}

// Good
function calculateTotal(basePrice, quantity, taxRate) {
  return basePrice + quantity * taxRate;
}
```

### 2. Limit Number of Parameters

```javascript
// Too many parameters
function createUser(name, email, age, city, country, phone, address) {}

// Better - use object
function createUser({ name, email, age, city, country, phone, address }) {}
```

### 3. Use Default Values Appropriately

```javascript
// Good use of defaults
function formatDate(date = new Date(), format = "MM/DD/YYYY") {
  // format date
}

function retry(fn, maxAttempts = 3, delayMs = 1000) {
  // retry logic
}
```

### 4. Order Parameters Logically

```javascript
// Required first, optional last
function fetch(url, options = {}) {
  // url is required, options is optional
}

// Grouping related params
function createServer(host, port, ssl = false, timeout = 5000) {
  // Required: host, port
  // Optional: ssl, timeout
}
```

## Return Value Best Practices

### 1. Be Consistent

```javascript
// Inconsistent - sometimes returns value, sometimes not
function saveUser(user) {
  if (!user.name) {
    console.log("Name required");
    // No return
  }
  // Save user
  return user;
}

// Better - always return something
function saveUser(user) {
  if (!user.name) {
    return { success: false, error: "Name required" };
  }
  // Save user
  return { success: true, data: user };
}
```

### 2. Use Meaningful Return Values

```javascript
// Better - return something useful
function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

// Even better - return details
function validateEmail(email) {
  const hasAt = email.includes("@");
  const hasDot = email.includes(".");

  if (!hasAt) return { valid: false, reason: "Missing @" };
  if (!hasDot) return { valid: false, reason: "Missing domain" };
  return { valid: true };
}
```

### 3. Return Early for Edge Cases

```javascript
function processArray(arr) {
  if (!arr) return null;
  if (arr.length === 0) return [];
  if (arr.length === 1) return arr;

  // Process non-trivial cases
  return arr.filter((x) => x !== null);
}
```

## Summary

- **Parameters** receive values passed to functions
- **Default parameters** provide fallback values
- **Rest parameters** (`...`) collect remaining arguments
- **Destructuring** simplifies parameter access
- **Return** sends value back and exits function
- **Early returns** improve code readability
- Use **consistent**, **meaningful** return values
- Order parameters: required first, optional last
