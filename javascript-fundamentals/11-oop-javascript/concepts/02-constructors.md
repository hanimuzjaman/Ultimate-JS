# CONSTRUCTOR FUNCTIONS

## What is a Constructor Function?

A constructor function is a regular function that creates and initializes objects. It's called with the `new` keyword and sets up the object's properties and prototype.

## The `new` Keyword

When you call a function with `new`, it:

1. Creates a new empty object
2. Sets the object's [[Prototype]] to function.prototype
3. Calls the function with `this` bound to the object
4. Returns the object (unless function explicitly returns an object)

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const john = new Person("John", 30);
// Steps:
// 1. john = {}
// 2. john[[Prototype]] = Person.prototype
// 3. Person.call(john, "John", 30)
// 4. return john
```

## Constructor vs Regular Function

```javascript
function User(email) {
  this.email = email;
  this.created = new Date();
}

// Called with new - creates instance
const user1 = new User("user1@example.com");
console.log(user1.email); // "user1@example.com"

// Called without new - 'this' is global object (bad!)
const user2 = User("user2@example.com");
console.log(user2); // undefined
console.log(window.email); // "user2@example.com" (in browser)
```

## Adding Methods to Prototypes

```javascript
function Animal(name) {
  this.name = name;
}

// Add shared methods to prototype
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

Animal.prototype.move = function () {
  return `${this.name} is moving`;
};

const dog = new Animal("Dog");
const cat = new Animal("Cat");

console.log(dog.speak()); // "Dog makes a sound"
console.log(cat.speak()); // "Cat makes a sound"
```

## Constructor Pattern

```javascript
function Book(title, author, year) {
  // Private variables (not accessible from outside)
  const createdAt = Date.now();

  // Instance properties
  this.title = title;
  this.author = author;
  this.year = year;
  this.updated = createdAt;

  // Instance methods (not ideal - duplicated for each instance)
  // this.getInfo = function() { ... };
}

// Prototype methods (shared by all instances)
Book.prototype.getInfo = function () {
  return `"${this.title}" by ${this.author} (${this.year})`;
};

Book.prototype.isOld = function () {
  return Date.now() - this.updated > 365 * 24 * 60 * 60 * 1000;
};

const book1 = new Book("JavaScript", "Crockford", 2008);
const book2 = new Book("Eloquent JS", "Haverbeke", 2018);

console.log(book1.getInfo());
console.log(book2.getInfo());
```

## Constructor Properties

Every function has a `constructor` property pointing back:

```javascript
function Dog(name) {
  this.name = name;
}

const myDog = new Dog("Buddy");

console.log(myDog.constructor); // [Function: Dog]
console.log(myDog.constructor === Dog); // true
console.log(myDog instanceof Dog); // true
```

## Inheritance with Constructors

```javascript
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.describe = function () {
  return `This is a ${this.type}`;
};

function Car(type, doors) {
  // Call parent constructor
  Vehicle.call(this, type);
  this.doors = doors;
}

// Set up inheritance chain
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car; // Restore constructor

Car.prototype.openDoor = function (doorNumber) {
  return `Door ${doorNumber} opened`;
};

const car = new Car("sedan", 4);
console.log(car.describe()); // "This is a sedan"
console.log(car.openDoor(1)); // "Door 1 opened"
```

## Constructor Function Patterns

### Lazy Initialization

```javascript
function Database() {
  this.connection = null;
}

Database.prototype.connect = function () {
  if (!this.connection) {
    this.connection = "connected";
  }
  return this.connection;
};
```

### Default Values

```javascript
function Config(name, options = {}) {
  this.name = name;
  this.debug = options.debug || false;
  this.timeout = options.timeout || 5000;
  this.retries = options.retries || 3;
}
```

### Validation

```javascript
function Email(address) {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!EMAIL_REGEX.test(address)) {
    throw new Error("Invalid email address");
  }

  this.address = address;
}
```

## Static Methods

Methods on the constructor function itself:

```javascript
function User(email) {
  this.email = email;
}

// Static method (on constructor, not instances)
User.create = function (email) {
  if (!email.includes("@")) {
    throw new Error("Invalid email");
  }
  return new User(email);
};

User.getAllCount = function () {
  return User.count || 0;
};

// Usage:
const user = User.create("john@example.com");
console.log(User.getAllCount()); // 0
```

## Checking Constructor Functions

```javascript
function Dog(name) {
  this.name = name;
}

const myDog = new Dog("Buddy");

// Is it an instance?
console.log(myDog instanceof Dog); // true
console.log(myDog instanceof Object); // true

// Get constructor
console.log(myDog.constructor); // [Function: Dog]
console.log(myDog.constructor === Dog); // true

// Is it NOT an instance?
console.log(!(myDog instanceof Cat)); // true
```

## Naming Conventions

```javascript
// Constructor functions start with uppercase
function User(email) {
  this.email = email;
}

// Regular functions start with lowercase
function validateEmail(email) {
  return email.includes("@");
}

// This makes it clear how to use them
const user = new User("test@example.com"); // Constructor
const isValid = validateEmail("test@example.com"); // Function
```

## Problems with Constructor Functions

### 1. Forgetting `new`

```javascript
function User(name) {
  this.name = name;
}

// Forgot new - creates global property!
const badUser = User("John");
console.log(window.name); // "John" (oops)

// Solution: Check for 'new'
function SafeUser(name) {
  if (!(this instanceof SafeUser)) {
    return new SafeUser(name);
  }
  this.name = name;
}
```

### 2. Methods Duplicated on Each Instance

```javascript
function Dog(name) {
  this.name = name;
  // Bad: method created for each instance
  this.bark = function () {
    return `${this.name} barks`;
  };
}

const dog1 = new Dog("Buddy");
const dog2 = new Dog("Max");
console.log(dog1.bark === dog2.bark); // false (different functions!)

// Good: put on prototype (shared)
function Cat(name) {
  this.name = name;
}

Cat.prototype.meow = function () {
  return `${this.name} meows`;
};

const cat1 = new Cat("Whiskers");
const cat2 = new Cat("Mittens");
console.log(cat1.meow === cat2.meow); // true (same function)
```

## Modern Alternative: Classes

Classes are syntactic sugar over constructors:

```javascript
// Old way
function User(name) {
  this.name = name;
}

User.prototype.getName = function () {
  return this.name;
};

// New way (equivalent)
class User {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

// Both work the same way
const user = new User("John");
console.log(user.getName()); // "John"
console.log(user instanceof User); // true
```

## Best Practices

✓ Use classes instead of constructors in modern code
✓ Put shared methods on prototype
✓ Use uppercase for constructor functions
✓ Use instanceof to check instances
✓ Document what constructor expects
✓ Validate inputs in constructor
✓ Use Object.create() for proper inheritance

✗ Don't forget the `new` keyword
✗ Don't add methods to instances (put on prototype)
✗ Don't pollute the global object
✗ Don't use complex constructors (keep simple)
