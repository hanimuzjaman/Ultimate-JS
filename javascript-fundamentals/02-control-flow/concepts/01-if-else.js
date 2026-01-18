// ===============================
// Basic if Statement
// ===============================
let age = 20;

if (age >= 18) {
  console.log("You are an adult");
}

// ===============================
// if–else Statement
// ===============================
let isRaining = false;

if (isRaining) {
  console.log("Take an umbrella");
} else {
  console.log("No umbrella needed");
}

// ===============================
// if–else if–else Ladder
// ===============================
let marks = 75;

if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 75) {
  console.log("Grade B");
} else if (marks >= 50) {
  console.log("Grade C");
} else {
  console.log("Fail");
}

// ===============================
// Nested if Statement
// ===============================
let isLoggedIn = true;
let isAdmin = false;

if (isLoggedIn) {
  if (isAdmin) {
    console.log("Admin Dashboard");
  } else {
    console.log("User Dashboard");
  }
}

// ===============================
// Using Logical Operators
// ===============================
let username = "admin";
let password = "1234";

if (username === "admin" && password === "1234") {
  console.log("Login successful");
} else {
  console.log("Invalid credentials");
}

// ===============================
// Truthy & Falsy Example
// ===============================
let email = "";

if (email) {
  console.log("Email provided");
} else {
  console.log("Email is missing");
}
