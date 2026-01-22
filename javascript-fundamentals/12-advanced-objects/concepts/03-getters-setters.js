/**
 * Module 12: Advanced Objects
 * Concepts: Getters and Setters
 */

// ============================================
// 1. BASIC GETTER/SETTER
// ============================================
console.log("=== Getters and Setters ===\n");

class User {
  constructor(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get fullName() {
    return this._firstName + " " + this._lastName;
  }

  set fullName(name) {
    [this._firstName, this._lastName] = name.split(" ");
  }
}

const user = new User("John", "Doe");
console.log("Full name:", user.fullName);

user.fullName = "Jane Smith";
console.log("Updated:", user.fullName);

// ============================================
// SUMMARY
// ============================================
console.log("\n=== SUMMARY ===\n");
console.log("✓ get for computed properties");
console.log("✓ set for validation/transformation");
