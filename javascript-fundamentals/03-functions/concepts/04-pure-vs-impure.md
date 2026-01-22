# Pure vs Impure Functions

## What are Pure Functions?

A **pure function** is a function that:

1. Always returns the same output for the same input
2. Does not have side effects (doesn't modify external state)
3. Doesn't depend on external mutable state

```javascript
// Pure function
function add(a, b) {
  return a + b;
}

// Always returns 5 when called with (2, 3)
add(2, 3); // 5
add(2, 3); // 5
add(2, 3); // 5
```

## Pure Function Characteristics

### 1. Deterministic (Predictable)

Pure functions produce the same output for the same input:

```javascript
// Pure - deterministic
const square = (n) => n * n;
console.log(square(5)); // 25
console.log(square(5)); // 25 (always same)

// Impure - not deterministic
const random = () => Math.random();
console.log(random()); // 0.123...
console.log(random()); // 0.456... (different!)
```

### 2. No Side Effects

Pure functions don't modify anything outside their scope:

```javascript
// Pure - no side effects
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Impure - modifies external variable
let total = 0;
function addToTotal(price) {
  total += price; // Side effect!
  return total;
}

// Impure - modifies parameter
function addTax(product) {
  product.price *= 1.1; // Modifies input!
  return product;
}

// Pure - doesn't modify
function addTaxPure(product) {
  return {
    ...product,
    price: product.price * 1.1,
  };
}
```

### 3. No External Dependencies

Pure functions don't rely on external state:

```javascript
// Impure - depends on external variable
let conversionRate = 1.1;
function convertPrice(price) {
  return price * conversionRate; // Depends on external variable
}

// Pure - all data passed as arguments
function convertPricePure(price, rate) {
  return price * rate;
}
```

## Impure Functions

An **impure function** is one that:

1. Has side effects
2. Depends on external state
3. Returns different results with same input

### Examples of Impure Functions

```javascript
// 1. Modifies external state
let users = [];
function addUser(name) {
  users.push(name); // Side effect!
  return users.length;
}

// 2. Reads external state
const config = { tax: 0.1 };
function calculatePrice(price) {
  return price * (1 + config.tax); // Depends on external config
}

// 3. I/O operations
function saveToFile(data) {
  fs.writeFileSync("data.json", JSON.stringify(data)); // File I/O
  return true;
}

// 4. Unpredictable behavior
function getCurrentTime() {
  return Date.now(); // Different each call
}

// 5. DOM manipulation
function displayMessage(msg) {
  document.getElementById("message").textContent = msg; // DOM manipulation
  return msg;
}

// 6. Network requests
function fetchData(url) {
  return fetch(url).then((r) => r.json()); // Depends on network
}

// 7. Random values
function getRandomId() {
  return Math.random(); // Unpredictable
}

// 8. Modifies input
function upperCase(str) {
  str = str.toUpperCase(); // Actually: return str.toUpperCase()
  return str;
}

// 9. Calls other impure functions
function processUser(user) {
  console.log(user); // Side effect!
  saveToDatabase(user); // Calls impure function
  return user;
}

// 10. Array mutation
function removeItem(arr, index) {
  arr.splice(index, 1); // Mutates original array!
  return arr;
}
```

## Converting Impure to Pure

### Example 1: Adding to Array

```javascript
// ❌ Impure
const users = ["Alice"];
function addUserImpure(user) {
  users.push(user); // Modifies external array
  return users;
}

// ✅ Pure
function addUserPure(users, newUser) {
  return [...users, newUser]; // Returns new array
}

// Usage
const users2 = ["Bob"];
const result = addUserPure(users2, "Charlie");
console.log(users2); // ['Bob'] (unchanged)
console.log(result); // ['Bob', 'Charlie'] (new array)
```

### Example 2: Modifying Object

```javascript
// ❌ Impure
function updateUserImpure(user, name) {
  user.name = name; // Modifies original
  return user;
}

// ✅ Pure
function updateUserPure(user, name) {
  return { ...user, name }; // Returns new object
}

// Usage
const user = { name: "Diana", age: 25 };
const updated = updateUserPure(user, "Elena");
console.log(user); // { name: 'Diana', age: 25 } (unchanged)
console.log(updated); // { name: 'Elena', age: 25 } (new object)
```

### Example 3: Dependency Injection

```javascript
// ❌ Impure - depends on global tax rate
const taxRate = 0.1;
function calculateTotalImpure(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * (1 + taxRate); // Uses global
  }, 0);
}

// ✅ Pure - tax rate passed as parameter
function calculateTotalPure(items, taxRate) {
  return items.reduce((sum, item) => {
    return sum + item.price * (1 + taxRate);
  }, 0);
}

// Usage
const items = [{ price: 100 }, { price: 50 }];
console.log(calculateTotalPure(items, 0.1)); // 165
console.log(calculateTotalPure(items, 0.2)); // 180 (different rate)
```

## Benefits of Pure Functions

### 1. Testability

```javascript
// Easy to test - no mocking needed
function add(a, b) {
  return a + b;
}

// Test
console.assert(add(2, 3) === 5);
console.assert(add(-1, 1) === 0);
```

### 2. Reusability

```javascript
// Pure functions work anywhere
const numbers = [1, 2, 3, 4, 5];
const add = (a, b) => a + b;

// Works in map
console.log(numbers.map((n) => add(n, 10)));

// Works in reduce
console.log(numbers.reduce(add, 0));

// Works standalone
console.log(add(100, 200));
```

### 3. Predictability

```javascript
// Always behaves the same
const calculateAge = (birthYear) => new Date().getFullYear() - birthYear;

// Pure
const calculateAgePure = (birthYear, currentYear) => currentYear - birthYear;
console.log(calculateAgePure(1995, 2024)); // Always 29
```

### 4. Easier to Reason About

```javascript
// No need to check external state
const calculateDiscount = (price, percentOff) => {
  return price * (1 - percentOff / 100);
};

// What you see is what you get!
```

### 5. Parallelization Friendly

```javascript
// Pure functions can be safely parallelized
const processData = (data) => {
  return data.map((item) => expensiveCalculation(item));
};

// Can be run in parallel without worry
```

## Practical Patterns

### Immutability Helper

```javascript
// Immutable update for objects
const updateImmutable = (obj, updates) => ({
  ...obj,
  ...updates,
});

const user = { name: "Frank", age: 30 };
const updated = updateImmutable(user, { age: 31 });
console.log(user); // { name: 'Frank', age: 30 } (unchanged)
console.log(updated); // { name: 'Frank', age: 31 } (new object)
```

### Array Transformations

```javascript
// Pure array operations
const addToAll = (arr, value) => arr.map((x) => x + value);
const filterByType = (arr, type) => arr.filter((x) => typeof x === type);
const reverseOrder = (arr) => [...arr].reverse();

const numbers = [1, 2, 3];
console.log(addToAll(numbers, 10)); // [11, 12, 13]
console.log(numbers); // [1, 2, 3] (unchanged)
```

### Function Composition

```javascript
// Composing pure functions
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);

const increment = (n) => n + 1;
const double = (n) => n * 2;
const addThenDouble = compose(double, increment);

console.log(addThenDouble(5)); // (5 + 1) * 2 = 12
```

## When to Use Impure Functions

Not everything can be pure, and that's okay:

```javascript
// Necessary impure functions:
// 1. I/O operations
function saveUser(user) {
  return database.save(user); // I/O - must be impure
}

// 2. User interaction
function handleClick(event) {
  console.log("Button clicked"); // Side effect - necessary
}

// 3. External API calls
function getWeather(city) {
  return fetch(`/api/weather/${city}`).then((r) => r.json());
}

// Strategy: Keep impure code isolated
// Put pure logic in pure functions
// Wrap impure operations around them
```

## Best Practices

1. **Default to Pure:** Write functions as pure unless there's a good reason not to
2. **Isolate Side Effects:** Keep impure code at the edges of your application
3. **Separate Logic:** Pure logic in pure functions, side effects in impure ones
4. **Test Pure Functions:** No mocking needed, easy to test
5. **Document Impurity:** Clear about what impure functions do
6. **Use Immutability:** Don't modify inputs or external state

## Summary

| Aspect             | Pure                     | Impure           |
| ------------------ | ------------------------ | ---------------- |
| **Input → Output** | Same input → Same output | Can vary         |
| **Side Effects**   | None                     | May modify state |
| **External State** | Independent              | May depend on it |
| **Predictability** | Highly predictable       | Less predictable |
| **Testability**    | Very easy                | May need mocking |
| **Reusability**    | High                     | Lower            |

Pure functions are easier to understand, test, and maintain. Write pure functions whenever possible!
