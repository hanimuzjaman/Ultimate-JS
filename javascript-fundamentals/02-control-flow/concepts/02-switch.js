// ===============================
// Basic switch Statement
// ===============================

let day = 1;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Invalid day");
}

// ===============================
// Why break is Important
// ===============================

let number = 2;

switch (number) {
  case 1:
    console.log("One");
  case 2:
    console.log("Two");
  case 3:
    console.log("Three");
}

// Output:
// Two
// Three
// (Execution continues without break)

// ===============================
// Grouping Multiple Cases
// ===============================

let character = "a";

switch (character) {
  case "a":
  case "e":
  case "i":
  case "o":
  case "u":
    console.log("Vowel");
    break;
  default:
    console.log("Consonant");
}

// ===============================
// switch with Strings
// ===============================

let role = "admin";

switch (role) {
  case "admin":
    console.log("Full access");
    break;
  case "editor":
    console.log("Edit access");
    break;
  case "viewer":
    console.log("Read-only access");
    break;
  default:
    console.log("Unknown role");
}

// ===============================
// switch Uses Strict Equality (===)
// ===============================

let value = "10";

switch (value) {
  case 10:
    console.log("Number 10");
    break;
  case "10":
    console.log("String 10");
    break;
}

// ===============================
// Expression inside switch
// ===============================

let a = 5;
let b = 10;

switch (a + b) {
  case 15:
    console.log("Sum is 15");
    break;
  default:
    console.log("Other value");
}

// ===============================
// switch(true) Pattern (Advanced)
// ===============================

let marks = 82;

switch (true) {
  case marks >= 90:
    console.log("Grade A");
    break;
  case marks >= 75:
    console.log("Grade B");
    break;
  case marks >= 60:
    console.log("Grade C");
    break;
  default:
    console.log("Fail");
}

// ===============================
// Nested switch Statement
// ===============================

let category = "electronics";
let product = "laptop";

switch (category) {
  case "electronics":
    switch (product) {
      case "mobile":
        console.log("Mobile phone");
        break;
      case "laptop":
        console.log("Laptop computer");
        break;
      default:
        console.log("Unknown electronic item");
    }
    break;
  default:
    console.log("Unknown category");
}

// ===============================
// Real-World Example: Menu System
// ===============================

let choice = 3;

switch (choice) {
  case 1:
    console.log("Create Account");
    break;
  case 2:
    console.log("Login");
    break;
  case 3:
    console.log("Logout");
    break;
  default:
    console.log("Invalid choice");
}

// ===============================
// Best Practices Reminder
// ===============================

// Always use break
// Use default case
// Prefer switch for fixed values
// Use if-else for ranges (unless using switch(true))
