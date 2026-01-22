# The 'this' Keyword

## What is 'this'?

The `this` keyword refers to the **context object** - the object that a function is called on. Its value depends on **how** the function is called, not where it's defined.

## Global Context

### In Browser

```javascript
// In global scope
console.log(this); // window object

function greet() {
  console.log(this); // window (non-strict mode)
}

greet(); // window
```

### In Node.js

```javascript
// In global scope
console.log(this); // global object (or module.exports)

function greet() {
  console.log(this); // global (non-strict mode)
}

greet(); // global
```

### Strict Mode

```javascript
"use strict";

function greet() {
  console.log(this); // undefined
}

greet(); // undefined
```

## Method Context

When a function is called as a method, `this` refers to the **object it's called on**:

```javascript
const user = {
  name: "Alice",
  greet: function () {
    console.log(`Hello, ${this.name}`);
  },
};

user.greet(); // "Hello, Alice" - this = user
```

## Object Methods

```javascript
const person = {
  name: "Bob",
  age: 30,
  describe: function () {
    return `${this.name} is ${this.age} years old`;
  },
};

console.log(person.describe()); // "Bob is 30 years old"
```

## Constructor Functions

When called with `new`, `this` refers to the **new object being created**:

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

const user1 = new User("Charlie", 25);
console.log(user1.name); // "Charlie"
console.log(user1.age); // 25
```

## Class Context

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

const dog = new Animal("Dog");
dog.speak(); // "Dog makes a sound"
```

## Arrow Functions (Lexical `this`)

Arrow functions don't have their own `this` - they inherit it from the **outer scope**:

```javascript
const user = {
  name: "Diana",
  greet: function () {
    const arrow = () => {
      console.log(this.name); // Inherits 'this' from greet
    };
    arrow();
  },
};

user.greet(); // "Diana"

// Broken example
const user2 = {
  name: "Eve",
  greet: () => {
    console.log(this.name); // 'this' from outer scope (global)
  },
};

user2.greet(); // undefined
```

## Explicit Context: call(), apply(), bind()

### call()

Execute function with specific `this`, pass arguments normally:

```javascript
function greet(greeting) {
  return `${greeting}, ${this.name}`;
}

const user = { name: "Frank" };

console.log(greet.call(user, "Hello")); // "Hello, Frank"
```

### apply()

Like `call()` but pass arguments as array:

```javascript
function sum(a, b, c) {
  return a + b + c + this.bonus;
}

const obj = { bonus: 10 };

console.log(sum.apply(obj, [1, 2, 3])); // 16
```

### bind()

Create new function with fixed `this` context:

```javascript
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const user = { name: "Grace" };
const boundGreet = greet.bind(user);

boundGreet("Hi"); // "Hi, Grace"

// Use for event handlers
const button = document.querySelector("button");
button.addEventListener("click", boundGreet.bind(user, "Clicked"));
```

## Common Pitfalls

### Losing `this` Context

```javascript
// ❌ Wrong - 'this' is lost
const user = {
  name: "Henry",
  getName: function () {
    return this.name;
  },
};

const getName = user.getName;
console.log(getName()); // undefined (this = window/global)

// ✓ Solution 1: Use bind
const getName1 = user.getName.bind(user);
console.log(getName1()); // "Henry"

// ✓ Solution 2: Use arrow function
const getName2 = () => user.getName();
console.log(getName2()); // "Henry"
```

### In setTimeout

```javascript
// ❌ Wrong
const user = {
  name: "Iris",
  greet: function () {
    setTimeout(function () {
      console.log(this.name); // undefined (this = window)
    }, 1000);
  },
};

user.greet();

// ✓ Solution 1: Arrow function
const user2 = {
  name: "Jack",
  greet: function () {
    setTimeout(() => {
      console.log(this.name); // "Jack"
    }, 1000);
  },
};

user2.greet();

// ✓ Solution 2: Bind
const user3 = {
  name: "Karen",
  greet: function () {
    setTimeout(
      function () {
        console.log(this.name); // "Karen"
      }.bind(this),
      1000,
    );
  },
};

user3.greet();
```

### In Array Methods

```javascript
const user = {
  name: "Leo",
  friends: ["Alice", "Bob"],
  showFriends: function () {
    // ❌ forEach callback loses 'this'
    this.friends.forEach(function (friend) {
      console.log(`${this.name} knows ${friend}`); // 'this' is undefined
    });

    // ✓ Use arrow function
    this.friends.forEach((friend) => {
      console.log(`${this.name} knows ${friend}`); // Works!
    });
  },
};

user.showFriends();
```

## Checking Context

```javascript
function whoAmI() {
  console.log(this);
}

const obj = { whoAmI };

whoAmI(); // window/global
obj.whoAmI(); // obj

// Using call
whoAmI.call(obj); // obj
whoAmI.call(null); // window/global or undefined
```

## Summary Table

| Context                    | `this` refers to              |
| -------------------------- | ----------------------------- |
| **Regular function**       | Global object (window/global) |
| **Method (obj.method())**  | The object (obj)              |
| **Constructor (new Func)** | New instance                  |
| **Arrow function**         | Outer scope context           |
| **call() / apply()**       | First argument                |
| **bind()**                 | Fixed context                 |

## Best Practices

1. **Use arrow functions for callbacks** when you need parent context:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  fetchData() {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => {
        console.log(`${this.name} received:`, data); // Works!
      });
  }
}
```

2. **Use bind() for event handlers:**

```javascript
class Button {
  constructor(text) {
    this.text = text;
  }

  handleClick() {
    console.log(`Clicked: ${this.text}`);
  }
}

const btn = new Button("Submit");
element.addEventListener("click", btn.handleClick.bind(btn));
```

3. **Avoid arrow functions in method definitions if you need `this`:**

```javascript
// ❌ Wrong
const obj = {
  value: 42,
  getValue: () => this.value, // 'this' not the object!
};

// ✓ Correct
const obj = {
  value: 42,
  getValue() {
    return this.value; // 'this' is obj
  },
};
```
