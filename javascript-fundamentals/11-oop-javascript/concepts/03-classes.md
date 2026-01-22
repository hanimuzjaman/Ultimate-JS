# CLASSES

## Introduction to Classes

Classes provide a cleaner syntax for creating objects and setting up inheritance. Under the hood, they use prototypes, but the syntax is more familiar to developers from other languages.

## Basic Class Syntax

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

const dog = new Animal("Dog");
console.log(dog.speak()); // "Dog makes a sound"
console.log(dog instanceof Animal); // true
```

## Class Components

### Constructor

Runs when creating a new instance:

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.created = new Date();
  }
}

const user = new User("John", "john@example.com");
```

### Methods

Defined on the prototype:

```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }
}

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
```

### Properties

Instance properties:

```javascript
class Book {
  constructor(title, pages) {
    this.title = title;
    this.pages = pages;
    this.isRead = false;
  }

  markAsRead() {
    this.isRead = true;
  }
}
```

## Getters and Setters

```javascript
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }

  // Getter
  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  }

  // Setter
  set fahrenheit(value) {
    this._celsius = ((value - 32) * 5) / 9;
  }

  get celsius() {
    return this._celsius;
  }
}

const temp = new Temperature(25);
console.log(temp.fahrenheit); // 77
temp.fahrenheit = 86;
console.log(temp.celsius); // 30
```

## Static Methods

Methods on the class itself, not instances:

```javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static PI = 3.14159;

  static isPositive(num) {
    return num > 0;
  }
}

console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.isPositive(-5)); // false

// Can't call on instance
const utils = new MathUtils();
// utils.add(5, 3); // Error!
```

## Inheritance with `extends`

```javascript
class Vehicle {
  constructor(type) {
    this.type = type;
  }

  describe() {
    return `This is a ${this.type}`;
  }
}

class Car extends Vehicle {
  constructor(type, doors) {
    super(type); // Call parent constructor
    this.doors = doors;
  }

  describe() {
    return `${super.describe()} with ${this.doors} doors`;
  }
}

const car = new Car("sedan", 4);
console.log(car.describe()); // "This is a sedan with 4 doors"
```

## `super` Keyword

Use `super` to call parent class methods:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  speak() {
    // Call parent method
    const parentSound = super.speak();
    return `${parentSound} - Woof!`;
  }
}

const dog = new Dog("Buddy", "Labrador");
console.log(dog.speak()); // "Buddy makes a sound - Woof!"
```

## Private Fields

Use `#` to create private properties:

```javascript
class BankAccount {
  #balance = 0; // Private field

  constructor(initialBalance) {
    #balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }

  // #balance is not accessible from outside
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // SyntaxError: private field
```

## Practical Class Example

```javascript
class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  addTodo(text) {
    this.todos.push({
      id: this.nextId++,
      text: text,
      completed: false,
    });
  }

  completeTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.completed = true;
  }

  removeTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  getAll() {
    return this.todos;
  }

  getCompleted() {
    return this.todos.filter((t) => t.completed);
  }

  getRemaining() {
    return this.todos.filter((t) => !t.completed);
  }
}

const list = new TodoList();
list.addTodo("Learn JavaScript");
list.addTodo("Build a project");
console.log(list.getAll());
```

## Class vs Function Constructor

```javascript
// Function constructor
function UserFunc(name) {
  this.name = name;
}
UserFunc.prototype.getName = function () {
  return this.name;
};

// Class (equivalent)
class UserClass {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

// Both work identically
const user1 = new UserFunc("John");
const user2 = new UserClass("Jane");
console.log(user1.getName()); // "John"
console.log(user2.getName()); // "Jane"
```

## Abstract Patterns

Enforce method implementation in subclasses:

```javascript
class Shape {
  constructor(name) {
    if (new.target === Shape) {
      throw new Error("Cannot instantiate abstract Shape");
    }
    this.name = name;
  }

  area() {
    throw new Error("area() must be implemented");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

// const shape = new Shape(); // Error!
const circle = new Circle(5);
console.log(circle.area()); // 78.53981...
```

## Method Chaining

```javascript
class QueryBuilder {
  constructor(table) {
    this.table = table;
    this.filters = [];
  }

  where(field, operator, value) {
    this.filters.push({ field, operator, value });
    return this; // Return this for chaining
  }

  limit(count) {
    this.maxResults = count;
    return this;
  }

  build() {
    return `SELECT * FROM ${this.table} WHERE ${this.filters.map((f) => `${f.field} ${f.operator} ${f.value}`).join(" AND ")}`;
  }
}

const query = new QueryBuilder("users")
  .where("age", ">", 18)
  .where("status", "=", "active")
  .limit(10)
  .build();

console.log(query);
```

## instanceof and Classes

```javascript
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
```

## Best Practices

✓ Use classes for object-oriented code
✓ Keep constructors simple
✓ Use getters/setters for computed properties
✓ Use static methods for utility functions
✓ Use private fields for encapsulation
✓ Extend only when appropriate
✓ Override methods to customize behavior
✓ Document class contracts

✗ Don't forget to call `super()` in constructor
✗ Don't overuse inheritance
✗ Don't mix instance and static properties
✗ Don't expose internal details
✗ Don't use classes just because (use objects if simpler)
