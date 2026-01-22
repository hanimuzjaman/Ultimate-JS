/* ===================================================================
   CONTROL FLOW - PRACTICE EXERCISES
   Topic: If/Else Statements

   Instructions:
   1. Uncomment exercise blocks one at a time
   2. Test in browser console or Node.js
   3. Modify values to understand the logic
   4. Progress from basic to advanced
=================================================================== */

// ===================================================================
// EXERCISE 1: Age Classification (Beginner)
// ===================================================================
// Goal: Classify a person's age group

/*
function classifyAge(age) {
  if (age < 13) {
    return "Child";
  } else if (age < 18) {
    return "Teen";
  } else if (age < 65) {
    return "Adult";
  } else {
    return "Senior";
  }
}

console.log(classifyAge(5));   // Child
console.log(classifyAge(15));  // Teen
console.log(classifyAge(30));  // Adult
console.log(classifyAge(70));  // Senior
*/

// ===================================================================
// EXERCISE 2: Grade Classification (Beginner)
// ===================================================================
// Goal: Convert score to grade

/*
function getGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

console.log(getGrade(95));  // A
console.log(getGrade(85));  // B
console.log(getGrade(75));  // C
console.log(getGrade(65));  // D
console.log(getGrade(45));  // F
*/

// ===================================================================
// EXERCISE 3: Login Validator (Intermediate)
// ===================================================================
// Goal: Validate login credentials

/*
function validateLogin(username, password) {
  if (!username || !password) {
    return "Username and password required";
  }

  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (username === "admin" && password === "admin123") {
    return "Login successful";
  } else {
    return "Invalid credentials";
  }
}

console.log(validateLogin("", ""));                    // Username and password required
console.log(validateLogin("ab", "password"));         // Username must be at least 3 characters
console.log(validateLogin("user", "pass"));           // Password must be at least 6 characters
console.log(validateLogin("admin", "admin123"));      // Login successful
console.log(validateLogin("user", "password"));       // Invalid credentials
*/

// ===================================================================
// EXERCISE 4: Number Classifier (Intermediate)
// ===================================================================
// Goal: Classify numbers as positive, negative, or zero

/*
function classifyNumber(num) {
  let type = "";
  let parity = "";

  // Determine type
  if (num > 0) {
    type = "positive";
  } else if (num < 0) {
    type = "negative";
  } else {
    type = "zero";
  }

  // Determine parity (if not zero)
  if (num !== 0) {
    parity = num % 2 === 0 ? "even" : "odd";
    return `${num} is a ${type}, ${parity} number`;
  } else {
    return `${num} is zero`;
  }
}

console.log(classifyNumber(5));    // 5 is a positive, odd number
console.log(classifyNumber(-4));   // -4 is a negative, even number
console.log(classifyNumber(10));   // 10 is a positive, even number
console.log(classifyNumber(0));    // 0 is zero
*/

// ===================================================================
// EXERCISE 5: Traffic Light System (Intermediate)
// ===================================================================
// Goal: Simulate a traffic light system

/*
function trafficLight(color) {
  if (color === "red") {
    return "Stop";
  } else if (color === "yellow") {
    return "Get Ready";
  } else if (color === "green") {
    return "Go";
  } else {
    return "Invalid color";
  }
}

function getWaitTime(color) {
  if (color === "red") {
    return "Wait 30 seconds";
  } else if (color === "yellow") {
    return "Prepare in 5 seconds";
  } else if (color === "green") {
    return "25 seconds to cross";
  } else {
    return "Unknown";
  }
}

console.log(trafficLight("red"), "-", getWaitTime("red"));
console.log(trafficLight("yellow"), "-", getWaitTime("yellow"));
console.log(trafficLight("green"), "-", getWaitTime("green"));
*/

// ===================================================================
// EXERCISE 6: BMI Calculator with Category (Intermediate)
// ===================================================================
// Goal: Calculate BMI and determine health category

/*
function calculateBMI(weight, height) {
  const bmi = weight / (height * height);

  let category;
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  return {
    bmi: bmi.toFixed(2),
    category: category
  };
}

const result = calculateBMI(70, 1.75);
console.log(`BMI: ${result.bmi}, Category: ${result.category}`);

const result2 = calculateBMI(85, 1.70);
console.log(`BMI: ${result2.bmi}, Category: ${result2.category}`);
*/

// ===================================================================
// EXERCISE 7: Discount Eligibility Checker (Advanced)
// ===================================================================
// Goal: Determine discount based on multiple conditions

/*
function calculateDiscount(purchaseAmount, isStudent, isSenior, isEmployee) {
  let discountPercent = 0;

  if (isEmployee) {
    discountPercent = 25;
  } else if (isStudent || isSenior) {
    discountPercent = 15;
  } else if (purchaseAmount > 10000) {
    discountPercent = 10;
  } else if (purchaseAmount > 5000) {
    discountPercent = 5;
  } else {
    discountPercent = 0;
  }

  const discount = (purchaseAmount * discountPercent) / 100;
  const finalPrice = purchaseAmount - discount;

  return {
    originalPrice: purchaseAmount,
    discountPercent: discountPercent,
    discount: discount,
    finalPrice: finalPrice.toFixed(2)
  };
}

console.log(calculateDiscount(15000, false, false, true));   // Employee
console.log(calculateDiscount(15000, true, false, false));   // Student
console.log(calculateDiscount(15000, false, false, false));  // Regular customer
*/

// ===================================================================
// EXERCISE 8: Weather Advice System (Advanced)
// ===================================================================
// Goal: Give advice based on temperature and weather condition

/*
function getWeatherAdvice(temperature, condition) {
  let advice = "";

  if (temperature < 0) {
    advice = "It's freezing! ";
    advice += "Wear heavy coat, gloves, and warm hat. ";
  } else if (temperature < 15) {
    advice = "It's cold! ";
    advice += "Wear a warm jacket. ";
  } else if (temperature < 25) {
    advice = "Pleasant weather! ";
    advice += "Light clothing is fine. ";
  } else {
    advice = "It's hot! ";
    advice += "Wear light clothing and drink water. ";
  }

  // Add condition-specific advice
  if (condition === "rainy") {
    advice += "Don't forget your umbrella!";
  } else if (condition === "sunny") {
    advice += "Don't forget sunscreen!";
  } else if (condition === "windy") {
    advice += "Hold on to your hat!";
  }

  return advice;
}

console.log(getWeatherAdvice(-5, "sunny"));
console.log(getWeatherAdvice(10, "rainy"));
console.log(getWeatherAdvice(30, "sunny"));
*/

// ===================================================================
// EXERCISE 9: Eligibility Checker for Programs (Advanced)
// ===================================================================
// Goal: Check eligibility for multiple programs based on criteria

/*
function checkProgramEligibility(age, experience, education, salary) {
  let eligiblePrograms = [];

  // MBA Program: Age 25+, Experience 3+ years, Education: Graduate
  if (age >= 25 && experience >= 3 && education === "graduate") {
    eligiblePrograms.push("MBA");
  }

  // Leadership Program: Age 30+, Experience 5+ years
  if (age >= 30 && experience >= 5) {
    eligiblePrograms.push("Leadership");
  }

  // Scholarship Program: Salary < 50000 and Age < 35
  if (salary < 50000 && age < 35) {
    eligiblePrograms.push("Scholarship");
  }

  // Executive Program: Experience 10+ years
  if (experience >= 10) {
    eligiblePrograms.push("Executive");
  }

  if (eligiblePrograms.length === 0) {
    return "Not eligible for any program";
  } else {
    return `Eligible for: ${eligiblePrograms.join(", ")}`;
  }
}

console.log(checkProgramEligibility(28, 4, "graduate", 60000));
console.log(checkProgramEligibility(35, 12, "graduate", 80000));
console.log(checkProgramEligibility(22, 1, "graduate", 30000));
*/

// ===================================================================
// EXERCISE 10: Comprehensive User Profile Validator (Advanced)
// ===================================================================
// Goal: Validate user profile with multiple checks

/*
function validateUserProfile(user) {
  const errors = [];

  // Check name
  if (!user.name || user.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  // Check age
  if (!user.age || user.age < 18) {
    errors.push("Must be at least 18 years old");
  }

  // Check email
  if (!user.email || !user.email.includes("@")) {
    errors.push("Invalid email format");
  }

  // Check password strength
  if (!user.password || user.password.length < 8) {
    errors.push("Password must be at least 8 characters");
  } else if (!user.password.match(/\d/)) {
    errors.push("Password must contain at least one number");
  }

  // Check phone (optional but if provided, must be valid)
  if (user.phone && user.phone.length !== 10) {
    errors.push("Phone must be 10 digits");
  }

  // Return result
  if (errors.length === 0) {
    return {
      valid: true,
      message: "Profile is valid!",
      errors: []
    };
  } else {
    return {
      valid: false,
      message: "Profile has errors:",
      errors: errors
    };
  }
}

const validUser = {
  name: "John Doe",
  age: 25,
  email: "john@example.com",
  password: "secure123",
  phone: "9876543210"
};

const invalidUser = {
  name: "J",
  age: 17,
  email: "invalidemail",
  password: "weak",
  phone: "123"
};

console.log(validateUserProfile(validUser));
console.log("\n");
console.log(validateUserProfile(invalidUser));
*/

console.log("✅ If/Else exercises are ready! Uncomment them one at a time.");
