# PROTOTYPES & PROTOTYPE CHAIN

## What Are Prototypes?

JavaScript uses **prototype-based inheritance**, not class-based (though classes are syntactic sugar). Every JavaScript object has a prototype—an internal object that provides default methods and properties.

## Understanding the Prototype

```javascript
// When you create an object
const obj = { name: "test" };

// It has an internal [[Prototype]] (accessed via __proto__)
// obj.__proto__ points to Object.prototype

// Object.prototype has methods like:
// - toString()
// - hasOwnProperty()
// - valueOf()
```

## Function Prototypes

Functions have a special `prototype` property used with the `new` keyword:

```javascript
function Animal(name) {
  this.name = name;
}

// This prototype is used as the [[Prototype]] for new instances
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

const dog = new Animal("Dog");
console.log(dog.speak()); // "Dog makes a sound"
```

## The Prototype Chain

When you access a property, JavaScript searches:

1. The object itself
2. Its prototype ([[Prototype]])
3. The prototype's prototype
4. Up the chain until Object.prototype
5. Returns undefined if not found

```javascript
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.drive = function () {
  return `${this.type} is driving`;
};

function Car(type, doors) {
  Vehicle.call(this, type);
  this.doors = doors;
}

// Link prototypes
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.openTrunk = function () {
  return "Trunk opened";
};

const myCar = new Car("sedan", 4);
console.log(myCar.drive()); // Works! Through prototype chain
console.log(myCar.openTrunk()); // Works on Car
```

## Checking Prototype Relationships

```javascript
// instanceof checks prototype chain
console.log(myCar instanceof Car); // true
console.log(myCar instanceof Vehicle); // true
console.log(myCar instanceof Object); // true

// isPrototypeOf checks if object is in another's prototype chain
console.log(Vehicle.prototype.isPrototypeOf(myCar)); // true

// hasOwnProperty checks object itself (not prototype)
console.log(myCar.hasOwnProperty("type")); // true
console.log(myCar.hasOwnProperty("drive")); // false (it's on prototype)
```

## Object.create() for Inheritance

Modern approach to prototype-based inheritance:

```javascript
const animal = {
  speak() {
    return `${this.name} speaks`;
  },
};

const dog = Object.create(animal);
dog.name = "Buddy";
dog.breed = "Labrador";

console.log(dog.speak()); // "Buddy speaks"
```

## Modifying Prototypes

Be cautious when modifying prototypes:

```javascript
// Adding to Object.prototype affects EVERYTHING
// Usually bad practice
Object.prototype.custom = function () {
  return "This will be on EVERY object!";
};

// Better: extend specific prototype
Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0);
};

console.log([1, 2, 3].sum()); // 6
```

## Constructor Functions vs Literals

```javascript
// Constructor function approach
function User(name, email) {
  this.name = name;
  this.email = email;
}

User.prototype.getInfo = function () {
  return `${this.name} <${this.email}>`;
};

const user1 = new User("Alice", "alice@example.com");

// Object literal approach (no inheritance setup)
const user2 = {
  name: "Bob",
  email: "bob@example.com",
  getInfo() {
    return `${this.name} <${this.email}>`;
  },
};
```

## Prototype vs Own Properties

```javascript
const person = { age: 30 };
person.name = "John";

console.log(person.hasOwnProperty("name")); // true (own property)
console.log(person.hasOwnProperty("toString")); // false (from prototype)

// Iterating only own properties
for (const key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key, person[key]);
  }
}

// Or use Object.keys (only own properties)
console.log(Object.keys(person)); // ["age", "name"]
```

## Visualizing Prototype Chain

```
myCar
├── type: "sedan"
├── doors: 4
└── [[Prototype]] → Car.prototype
    ├── constructor: Car
    ├── openTrunk: function
    └── [[Prototype]] → Vehicle.prototype
        ├── drive: function
        └── [[Prototype]] → Object.prototype
            ├── toString: function
            ├── hasOwnProperty: function
            └── [[Prototype]] → null
```

## Shadow Properties

When you set a property on an object that exists on its prototype, it creates a shadow property:

```javascript
Array.prototype.length = 100;
const arr = [1, 2, 3];
console.log(arr.length); // 3 (own property shadows prototype)

arr.length = 5; // Sets own property
// Now arr.length is 5, not shadowing Array.prototype
```

## Modern Alternative: Classes

Classes are syntactic sugar over prototypes:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} speaks`;
  }
}

class Dog extends Animal {
  bark() {
    return `${this.name} barks`;
  }
}

const dog = new Dog("Buddy");
console.log(dog.speak()); // Uses prototype chain under the hood
console.log(dog instanceof Animal); // true
```

## Performance Notes

- Property lookups through long prototype chains are slower
- Cache frequently accessed methods
- Prefer direct properties for hot code paths

```javascript
// Slower: property lookup through chain
class Slow {
  method() {
    return "result";
  }
}

// Faster: direct property
const fast = {
  method() {
    return "result";
  },
};
```

## Best Practices

✓ Use classes for most modern JavaScript
✓ Understand prototypes for debugging
✓ Use Object.create() for custom inheritance
✓ Avoid modifying built-in prototypes
✓ Use hasOwnProperty() when iterating
✓ Keep inheritance chains reasonably shallow
✓ Document prototype relationships

✗ Don't create circular prototype chains
✗ Don't pollute Object.prototype
✗ Don't rely on prototype modifications for compatibility
✗ Don't nest prototypes too deeply
