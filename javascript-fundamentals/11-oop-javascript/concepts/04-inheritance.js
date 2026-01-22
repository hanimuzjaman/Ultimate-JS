/**
 * Module 11: OOP JavaScript
 * Concepts: Inheritance Patterns
 */

// ============================================
// 1. PROTOTYPE INHERITANCE
// ============================================
console.log("=== Prototype Inheritance ===\n");

const parent = {
  greet() {
    return "Hello";
  },
};

const child = Object.create(parent);
console.log(child.greet());

// ============================================
// 2. CLASS INHERITANCE
// ============================================
console.log("\n=== Class Inheritance ===\n");

class Shape {
  constructor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle("red", 5);
console.log("Color:", circle.getColor());
console.log("Area:", circle.getArea());

// ============================================
// SUMMARY
// ============================================
console.log("\n=== INHERITANCE SUMMARY ===\n");
console.log("✓ Inheritance chains functionality");
console.log("✓ Object.create for prototypal");
console.log("✓ extends for class-based");
console.log("✓ super to call parent methods");
