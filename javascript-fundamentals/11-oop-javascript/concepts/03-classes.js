/**
 * Module 11: OOP JavaScript
 * Concepts: Classes
 */

// ============================================
// 1. BASIC CLASS
// ============================================
console.log("=== Basic Classes ===\n");

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + " makes sound";
  }
}

const animal = new Animal("Lion");
console.log(animal.speak());

// ============================================
// 2. INHERITANCE
// ============================================
console.log("\n=== Inheritance ===\n");

class Dog extends Animal {
  speak() {
    return this.name + " barks";
  }
}

const dog = new Dog("Buddy");
console.log(dog.speak());

// ============================================
// 3. STATIC METHODS
// ============================================
console.log("\n=== Static Methods ===\n");

class Math2 {
  static add(a, b) {
    return a + b;
  }
}

console.log("2 + 3 =", Math2.add(2, 3));

// ============================================
// SUMMARY
// ============================================
console.log("\n=== CLASS SUMMARY ===\n");
console.log("✓ Syntactic sugar over prototypes");
console.log("✓ Constructor initializes instances");
console.log("✓ Extends for inheritance");
console.log("✓ Static for class methods");
