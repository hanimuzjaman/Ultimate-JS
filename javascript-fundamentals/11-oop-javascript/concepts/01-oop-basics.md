# Object-Oriented Programming in JavaScript

## Prototypes

Every JavaScript object has a **prototype** - an object from which it inherits properties:

```javascript
const person = { name: "John" };
console.log(Object.getPrototypeOf(person)); // Object.prototype

// Access prototype methods
console.log(person.toString()); // Inherited from Object.prototype
```

### Prototype Chain

Objects inherit from other objects forming a chain:

```javascript
const animal = {
  eat() {
    console.log("Eating");
  },
};

const dog = Object.create(animal);
dog.bark = function () {
  console.log("Woof!");
};

dog.eat(); // Inherited from animal
dog.bark(); // Own property

// Prototype chain: dog -> animal -> Object.prototype
```

## Constructor Functions

Function that creates objects:

```javascript
function Animal(name) {
  this.name = name; // 'this' refers to new object
}

// Define method on prototype
Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
};

const dog = new Animal("Dog");
dog.speak(); // "Dog makes a sound"

const cat = new Animal("Cat");
cat.speak(); // "Cat makes a sound"
```

**Without `new`:**

```javascript
// ❌ Without 'new' - this = global/undefined
Animal("Dog"); // Error or 'this' not what expected

// ✓ With 'new' - creates new object
new Animal("Dog"); // Correct
```

## Classes

Modern syntax for constructors (syntactic sugar):

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }

  static info() {
    console.log("I am an Animal class");
  }
}

const dog = new Animal("Dog");
dog.speak(); // "Dog makes a sound"

Animal.info(); // "I am an Animal class"
```

## Inheritance

### Prototype Inheritance

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  console.log(`${this.name} eats`);
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log("Woof!");
};

const dog = new Dog("Rex", "Labrador");
dog.eat(); // Inherited
dog.bark(); // Own method
```

### Class Inheritance

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} eats`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog("Rex", "Labrador");
dog.eat(); // Inherited
dog.bark(); // Own method
```

## Encapsulation

Control access to object properties:

```javascript
class BankAccount {
  #balance = 0; // Private field (# prefix)

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    this.#balance -= amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500); // 1500
// account.#balance = -10000; // Error - private
```

**Protected pattern (convention):**

```javascript
class User {
  constructor(name) {
    this._name = name; // Convention: _ means "private"
  }

  getName() {
    return this._name;
  }
}

// Still accessible but convention says don't use directly
const user = new User("John");
console.log(user._name); // "John" but shouldn't access this way
```

## Polymorphism

Different objects respond to same method differently:

```javascript
class Shape {
  calculateArea() {
    throw new Error("Must be implemented in subclass");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }
}

const shapes = [new Circle(5), new Rectangle(4, 6)];

shapes.forEach((shape) => {
  console.log(shape.calculateArea()); // Different result for each
});
```

## Static Methods

Methods that belong to class, not instances:

```javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}

console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.multiply(5, 3)); // 15

// Can't call on instance
const utils = new MathUtils();
// utils.add(5, 3); // Error
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

  get celsius() {
    return this._celsius;
  }

  // Setter
  set celsius(value) {
    if (value < -273.15) {
      throw new Error("Temperature too low");
    }
    this._celsius = value;
  }

  set fahrenheit(value) {
    this._celsius = ((value - 32) * 5) / 9;
  }
}

const temp = new Temperature(25);
console.log(temp.fahrenheit); // 77
temp.fahrenheit = 86; // Uses setter
console.log(temp.celsius); // ~30
```

## Composition over Inheritance

Combine simple objects rather than deep inheritance:

```javascript
// ❌ Deep inheritance chain
class Animal {
  /* ... */
}
class Canine extends Animal {
  /* ... */
}
class Dog extends Canine {
  /* ... */
}

// ✓ Composition - combine behaviors
const canBark = {
  bark() {
    console.log("Woof!");
  },
};

const canEat = {
  eat() {
    console.log("Eating");
  },
};

function Dog(name) {
  this.name = name;
}

Object.assign(Dog.prototype, canBark, canEat);

const dog = new Dog("Rex");
dog.bark(); // Woof!
dog.eat(); // Eating
```

## Mixin Pattern

Add functionality to classes dynamically:

```javascript
const TimestampMixin = {
  setCreatedAt() {
    this.createdAt = new Date();
  },

  getCreatedAt() {
    return this.createdAt;
  },
};

const LoggingMixin = {
  log(message) {
    console.log(`[${this.constructor.name}] ${message}`);
  },
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// Apply mixins
Object.assign(User.prototype, TimestampMixin, LoggingMixin);

const user = new User("John");
user.setCreatedAt();
user.log("User created"); // [User] User created
```

## instanceof Operator

Check if object is instance of class:

```javascript
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
console.log({} instanceof Dog); // false
```

## Object.create for Inheritance

Alternative to prototype chaining:

```javascript
const animalMethods = {
  eat() {
    console.log("Eating");
  },
  sleep() {
    console.log("Sleeping");
  },
};

function createDog(name) {
  const dog = Object.create(animalMethods);
  dog.name = name;
  dog.bark = () => console.log("Woof!");
  return dog;
}

const dog = createDog("Rex");
dog.eat(); // Inherited
dog.bark(); // Own method
```

## Practical Example - Game Classes

```javascript
class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    // Override in subclass
  }

  update(deltaTime) {
    // Override in subclass
  }
}

class Player extends Entity {
  constructor(x, y) {
    super(x, y, 50, 50);
    this.speed = 5;
    this.health = 100;
  }

  move(dx, dy) {
    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  draw() {
    console.log(`Drawing player at (${this.x}, ${this.y})`);
  }
}

class Enemy extends Entity {
  constructor(x, y) {
    super(x, y, 30, 30);
    this.health = 20;
  }

  attack(target) {
    target.takeDamage(10);
  }

  draw() {
    console.log(`Drawing enemy at (${this.x}, ${this.y})`);
  }
}

const player = new Player(100, 100);
const enemy = new Enemy(200, 200);

player.move(10, 0);
enemy.attack(player);
```
