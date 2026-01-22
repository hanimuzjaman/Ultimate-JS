# INHERITANCE

## What is Inheritance?

Inheritance allows objects/classes to inherit properties and methods from a parent class. This promotes code reuse and establishes an "is-a" relationship.

## Prototype-Based Inheritance

```javascript
// Parent (prototype)
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  },
  move() {
    return `${this.name} is moving`;
  },
};

// Child (object with animal as prototype)
const dog = Object.create(animal);
dog.name = "Buddy";
dog.bark = function () {
  return `${this.name} barks`;
};

console.log(dog.speak()); // "Buddy makes a sound"
console.log(dog.bark()); // "Buddy barks"
```

## Constructor-Based Inheritance

```javascript
// Parent constructor
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.describe = function () {
  return `This is a ${this.type}`;
};

// Child constructor
function Car(type, doors) {
  Vehicle.call(this, type); // Call parent constructor
  this.doors = doors;
}

// Link prototypes
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// Add child-specific method
Car.prototype.openDoor = function (doorNum) {
  return `Door ${doorNum} opened`;
};

const car = new Car("sedan", 4);
console.log(car.describe()); // "This is a sedan"
console.log(car.openDoor(1)); // "Door 1 opened"
```

## Class-Based Inheritance

Modern approach using `extends`:

```javascript
// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

// Child class
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  speak() {
    // Call parent method
    return super.speak() + " - Woof!";
  }

  wagTail() {
    return `${this.name} wags tail`;
  }
}

const dog = new Dog("Buddy", "Labrador");
console.log(dog.speak()); // "Buddy makes a sound - Woof!"
console.log(dog.wagTail()); // "Buddy wags tail"
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
```

## Multi-Level Inheritance

```javascript
class Vehicle {
  constructor(wheels) {
    this.wheels = wheels;
  }
}

class Car extends Vehicle {
  constructor(wheels, doors) {
    super(wheels);
    this.doors = doors;
  }
}

class SportsCar extends Car {
  constructor(wheels, doors, maxSpeed) {
    super(wheels, doors);
    this.maxSpeed = maxSpeed;
  }

  accelerate() {
    return `Accelerating to ${this.maxSpeed} mph`;
  }
}

const sportsCar = new SportsCar(4, 2, 180);
console.log(sportsCar.wheels); // 4
console.log(sportsCar.doors); // 2
console.log(sportsCar.accelerate()); // "Accelerating to 180 mph"
```

## Method Overriding

Subclass can replace parent method:

```javascript
class Shape {
  area() {
    throw new Error("area() not implemented");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
const rectangle = new Rectangle(10, 20);

console.log(circle.area()); // 78.53...
console.log(rectangle.area()); // 200
```

## Super Calls

Access parent methods and constructor:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} speaks`;
  }

  describe() {
    return `Animal: ${this.name}`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Must call super before accessing this
    this.breed = breed;
  }

  speak() {
    // Call parent method
    const parentSpeak = super.speak();
    return `${parentSpeak} - Woof!`;
  }

  describe() {
    // Call parent method and extend
    const parentDesc = super.describe();
    return `${parentDesc}, Breed: ${this.breed}`;
  }
}

const dog = new Dog("Buddy", "Labrador");
console.log(dog.speak()); // "Buddy speaks - Woof!"
console.log(dog.describe()); // "Animal: Buddy, Breed: Labrador"
```

## instanceof with Inheritance

```javascript
class Vehicle {}
class Car extends Vehicle {}
class SportsCar extends Car {}

const sportsCar = new SportsCar();

console.log(sportsCar instanceof SportsCar); // true
console.log(sportsCar instanceof Car); // true
console.log(sportsCar instanceof Vehicle); // true
console.log(sportsCar instanceof Object); // true
```

## Composition Over Inheritance

Often better than inheritance:

```javascript
// Bad: Deep inheritance
class User extends Entity {}
class AdminUser extends User {}
class SuperAdminUser extends AdminUser {}

// Good: Composition
class User {
  constructor(name) {
    this.name = name;
    this.permissions = [];
  }

  addPermission(permission) {
    this.permissions.push(permission);
  }

  hasPermission(permission) {
    return this.permissions.includes(permission);
  }
}

const user = new User("John");
user.addPermission("read");
user.addPermission("write");
console.log(user.hasPermission("read")); // true
```

## Mixin Pattern

Add functionality without inheritance:

```javascript
const canEat = {
  eat() {
    return `${this.name} eats`;
  },
};

const canWalk = {
  walk() {
    return `${this.name} walks`;
  },
};

const canSwim = {
  swim() {
    return `${this.name} swims`;
  },
};

class Animal {
  constructor(name) {
    this.name = name;
  }
}

// Mix in functionality
const dog = Object.assign(new Animal("Buddy"), canEat, canWalk);
console.log(dog.eat()); // "Buddy eats"
console.log(dog.walk()); // "Buddy walks"

const duck = Object.assign(new Animal("Daffy"), canEat, canWalk, canSwim);
console.log(duck.swim()); // "Daffy swims"
```

## Protected Properties (Convention)

JavaScript doesn't have true private/protected, use convention:

```javascript
class Account {
  constructor(balance) {
    this._balance = balance; // Convention: protected
  }

  deposit(amount) {
    this._balance += amount;
  }

  getBalance() {
    return this._balance;
  }
}

class SavingsAccount extends Account {
  getBalance() {
    // Can access protected member in subclass
    return this._balance;
  }
}

const account = new SavingsAccount(1000);
console.log(account.getBalance()); // 1000
```

## Private Fields in Classes

```javascript
class BankAccount {
  #balance = 0; // Private field

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      return "Insufficient funds";
    }
    this.#balance -= amount;
    return `Withdrew ${amount}`;
  }

  getBalance() {
    return this.#balance;
  }
}

class HighYieldAccount extends BankAccount {
  getBalance() {
    // Cannot access private #balance from subclass
    return super.getBalance(); // Use public method
  }
}

const account = new HighYieldAccount(1000);
console.log(account.deposit(500)); // undefined (returns nothing)
console.log(account.getBalance()); // 1500
```

## Abstract Class Pattern

```javascript
class Database {
  constructor(config) {
    if (new.target === Database) {
      throw new Error("Cannot instantiate abstract Database class");
    }
    this.config = config;
  }

  connect() {
    throw new Error("connect() must be implemented");
  }

  query() {
    throw new Error("query() must be implemented");
  }
}

class MongoDatabase extends Database {
  connect() {
    return "Connected to MongoDB";
  }

  query(sql) {
    return `MongoDB query: ${sql}`;
  }
}

class SQLDatabase extends Database {
  connect() {
    return "Connected to SQL";
  }

  query(sql) {
    return `SQL query: ${sql}`;
  }
}

const mongo = new MongoDatabase({});
console.log(mongo.connect()); // "Connected to MongoDB"
```

## Best Practices

✓ Use inheritance when establishing "is-a" relationships
✓ Prefer composition when possible
✓ Keep inheritance chains shallow (max 3 levels)
✓ Use `super()` to call parent methods
✓ Document what subclasses must implement
✓ Use meaningful class/method names
✓ Override methods to customize behavior
✓ Consider mixins for cross-cutting concerns

✗ Don't create deep inheritance hierarchies
✗ Don't use inheritance just to share code (use composition)
✗ Don't forget to call `super()` in constructor
✗ Don't mix prototype and class inheritance
✗ Don't override methods unnecessarily
✗ Don't expose implementation details
