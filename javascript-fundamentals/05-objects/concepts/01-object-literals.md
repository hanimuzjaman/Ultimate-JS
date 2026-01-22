# Objects in JavaScript

## What are Objects?

An **object** is a collection of **key-value pairs** (also called properties). Objects are used to represent real-world entities with multiple characteristics.

**Real-life analogy:** An object is like a blueprint or form. A person object might have properties like name, age, email, etc.

## Object Literals

The simplest way to create objects is using **object literal notation**:

```javascript
const person = {
  name: "John",
  age: 30,
  email: "john@example.com",
  country: "USA",
};
```

## Accessing Properties

### Dot Notation

```javascript
const person = {
  name: "John",
  age: 30,
};

console.log(person.name); // "John"
console.log(person.age); // 30
```

### Bracket Notation

```javascript
const person = {
  name: "John",
  age: 30,
};

console.log(person["name"]); // "John"
console.log(person["age"]); // 30

// Useful when key is in a variable
const key = "name";
console.log(person[key]); // "John"
```

**When to use bracket notation:**

- Key is stored in a variable
- Key contains spaces or special characters
- Key starts with a number

```javascript
const obj = {
  "first name": "John",
  "last-name": "Doe",
};

console.log(obj["first name"]); // "John"
console.log(obj["last-name"]); // "Doe"
```

## Modifying Properties

### Add or Update Property

```javascript
const person = { name: "John" };

// Update existing property
person.age = 30;
person["city"] = "New York";

console.log(person);
// { name: "John", age: 30, city: "New York" }
```

### Delete Property

```javascript
const person = {
  name: "John",
  age: 30,
  city: "New York",
};

delete person.city;
console.log(person); // { name: "John", age: 30 }
```

## Methods

Methods are **functions inside objects**:

```javascript
const person = {
  name: "John",
  age: 30,
  greet: function () {
    return `Hello, I'm ${this.name}`;
  },
};

console.log(person.greet()); // "Hello, I'm John"
```

### Shorthand Method Syntax

```javascript
const person = {
  name: "John",
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};

console.log(person.greet()); // "Hello, I'm John"
```

### The `this` Keyword

Inside a method, `this` refers to the object itself:

```javascript
const user = {
  name: "Alice",
  email: "alice@example.com",
  displayInfo() {
    console.log(`${this.name}: ${this.email}`);
  },
};

user.displayInfo(); // "Alice: alice@example.com"
```

**Important:** Arrow functions don't have their own `this`. Use regular functions in objects:

```javascript
const obj = {
  name: "Test",
  // ✅ Correct
  regularMethod() {
    console.log(this.name);
  },
  // ❌ Wrong - arrow function doesn't bind this
  arrowMethod: () => {
    console.log(this.name); // undefined
  },
};
```

## Nested Objects

Objects can contain other objects:

```javascript
const person = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
  },
  contact: {
    email: "john@example.com",
    phone: "555-1234",
  },
};

console.log(person.address.city); // "New York"
console.log(person.contact.email); // "john@example.com"
console.log(person["address"]["country"]); // "USA"
```

## Destructuring Objects

Extract properties into variables:

```javascript
const person = {
  name: "John",
  age: 30,
  city: "New York",
};

// Destructure
const { name, age } = person;
console.log(name); // "John"
console.log(age); // 30

// Rename properties
const { name: fullName, age: yearsOld } = person;
console.log(fullName); // "John"

// Default values
const { name, country = "USA" } = person;
console.log(country); // "USA"

// Rest operator
const { name, ...rest } = person;
console.log(rest); // { age: 30, city: "New York" }
```

## Nested Destructuring

```javascript
const person = {
  name: "John",
  address: {
    city: "New York",
    country: "USA",
  },
};

const {
  name,
  address: { city },
} = person;
console.log(name); // "John"
console.log(city); // "New York"
```

## Object Spread Operator

Spread operator (`...`) copies properties from one object to another:

```javascript
const person = { name: "John", age: 30 };
const location = { city: "New York", country: "USA" };

// Merge objects
const user = { ...person, ...location };
console.log(user);
// { name: "John", age: 30, city: "New York", country: "USA" }

// Copy object
const copy = { ...person };
copy.name = "Jane";
console.log(person.name); // "John" - original unchanged
console.log(copy.name); // "Jane"

// Override properties
const updated = { ...person, name: "Jane", age: 25 };
console.log(updated); // { name: "Jane", age: 25 }
```

## Object Methods

### Object.keys()

Returns array of property names:

```javascript
const obj = { name: "John", age: 30, city: "New York" };
const keys = Object.keys(obj);
console.log(keys); // ["name", "age", "city"]
```

### Object.values()

Returns array of property values:

```javascript
const obj = { name: "John", age: 30, city: "New York" };
const values = Object.values(obj);
console.log(values); // ["John", 30, "New York"]
```

### Object.entries()

Returns array of [key, value] pairs:

```javascript
const obj = { name: "John", age: 30 };
const entries = Object.entries(obj);
console.log(entries);
// [["name", "John"], ["age", 30]]

// Useful for loops
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
```

### Object.assign()

Copy properties from source to target:

```javascript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 3, c: 4 }
console.log(target); // Also { a: 1, b: 3, c: 4 } - modifies target
```

Better to use spread operator:

```javascript
const combined = { ...target, ...source };
```

## Checking Properties

### in Operator

```javascript
const obj = { name: "John", age: 30 };
console.log("name" in obj); // true
console.log("email" in obj); // false
console.log("toString" in obj); // true (inherited)
```

### hasOwnProperty()

```javascript
const obj = { name: "John", age: 30 };
console.log(obj.hasOwnProperty("name")); // true
console.log(obj.hasOwnProperty("email")); // false
console.log(obj.hasOwnProperty("toString")); // false (not own property)
```

## Object Patterns

### Config Object

```javascript
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  debug: false,
};

function fetch(url, options = config) {
  console.log(`Fetching from ${options.apiUrl}`);
}
```

### Constructor Pattern

```javascript
function User(name, email) {
  this.name = name;
  this.email = email;
  this.active = true;
}

const user = new User("John", "john@example.com");
```

### Factory Function

```javascript
function createUser(name, email) {
  return {
    name,
    email,
    active: true,
    deactivate() {
      this.active = false;
    },
  };
}

const user = createUser("John", "john@example.com");
```

## Best Practices

1. **Use meaningful property names** - Clear intent is important

```javascript
// ✅ Good
const user = {
  firstName: "John",
  lastName: "Doe",
  emailAddress: "john@example.com",
};

// ❌ Bad
const user = {
  fn: "John",
  ln: "Doe",
  em: "john@example.com",
};
```

2. **Use methods for related actions**

```javascript
// ✅ Good
const user = {
  name: "John",
  email: "john@example.com",
  greet() {
    return `Hello, ${this.name}`;
  },
};

// ❌ Bad
function greet(user) {
  return `Hello, ${user.name}`;
}
```

3. **Keep object structure flat** - Avoid deep nesting

```javascript
// ✅ Better
const user = {
  name: "John",
  email: "john@example.com",
  city: "New York",
  country: "USA",
};

// ❌ Avoid
const user = {
  name: "John",
  contact: {
    email: "john@example.com",
  },
  address: {
    location: {
      city: "New York",
      country: "USA",
    },
  },
};
```

## Summary

- **Objects** are collections of key-value pairs
- **Access** properties with dot or bracket notation
- **Methods** are functions inside objects
- **this** refers to the object in methods
- **Spread operator** (`...`) copies/merges objects
- **Destructuring** extracts properties into variables
- **Object methods** - keys(), values(), entries(), assign()
- **Best practices** - meaningful names, flat structure, use methods

Objects are fundamental to JavaScript. Everything in JavaScript is an object (except primitives)! Master objects and you'll understand JavaScript deeply.
