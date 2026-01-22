/**
 * Module 11: OOP JavaScript
 * Concepts: Constructors and Inheritance
 */

// ============================================
// 1. CONSTRUCTOR FUNCTIONS
// ============================================
console.log("=== Constructor Functions ===\n");

function Car(make, model) {
  this.make = make;
  this.model = model;
}

Car.prototype.drive = function () {
  return this.make + " " + this.model + " is driving";
};

const car = new Car("Toyota", "Camry");
console.log(car.drive());

// ============================================
// 2. INHERITANCE WITH CONSTRUCTORS
// ============================================
console.log("\n=== Constructor Inheritance ===\n");

function Vehicle(type) {
  this.type = type;
}

function Truck(type, capacity) {
  Vehicle.call(this, type);
  this.capacity = capacity;
}

Truck.prototype = Object.create(Vehicle.prototype);
Truck.prototype.constructor = Truck;

const truck = new Truck("pickup", 1000);
console.log(truck.type, truck.capacity);

// ============================================
// SUMMARY
// ============================================
console.log("\n=== CONSTRUCTOR SUMMARY ===\n");
console.log("✓ Constructor function creates instances");
console.log("✓ this refers to new instance");
console.log("✓ Prototype for shared methods");
console.log("✓ Object.create for inheritance");
