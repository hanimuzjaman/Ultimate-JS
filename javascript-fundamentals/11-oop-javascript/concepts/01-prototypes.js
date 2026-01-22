/**
 * Module 11: OOP JavaScript
 * Concepts: Prototypes
 */

// ============================================
// 1. PROTOTYPE BASICS
// ============================================
console.log("=== Prototype Basics ===\n");

function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return "Hello, " + this.name;
};

const person = new Person("John");
console.log(person.greet());

// ============================================
// 2. PROTOTYPE CHAIN
// ============================================
console.log("\n=== Prototype Chain ===\n");

function Animal(type) {
  this.type = type;
}

Animal.prototype.move = function () {
  return this.type + " is moving";
};

function Dog(name) {
  Animal.call(this, "dog");
  this.name = name;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.bark = function () {
  return this.name + " barks";
};

const dog = new Dog("Buddy");
console.log(dog.move());
console.log(dog.bark());

// ============================================
// SUMMARY
// ============================================
console.log("\n=== PROTOTYPE SUMMARY ===\n");
console.log("✓ Every object has prototype");
console.log("✓ Prototype chain for inheritance");
console.log("✓ Methods on prototype shared");
console.log("✓ Object.create for proper inheritance");
