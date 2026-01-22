/**
 * Module 3: Functions
 * Practice: Calculator Functions
 *
 * Practical exercises using functions for calculator operations
 * Difficulty: Beginner to Intermediate
 */

// ============================================
// Exercise 1: Basic Math Operations
// ============================================
function exercise1() {
  console.log("Exercise 1: Basic Math Operations");

  const add = (a, b) => a + b;
  const subtract = (a, b) => a - b;
  const multiply = (a, b) => a * b;
  const divide = (a, b) => (b !== 0 ? a / b : "Cannot divide by zero");

  console.log("10 + 5 =", add(10, 5)); // 15
  console.log("10 - 5 =", subtract(10, 5)); // 5
  console.log("10 * 5 =", multiply(10, 5)); // 50
  console.log("10 / 5 =", divide(10, 5)); // 2
  console.log("10 / 0 =", divide(10, 0)); // "Cannot divide by zero"
}

// ============================================
// Exercise 2: Multi-step Calculations
// ============================================
function exercise2() {
  console.log("\nExercise 2: Multi-step Calculations");

  // Calculate total bill with tax and tip
  function calculateBill(subtotal, taxRate = 0.08, tipPercent = 0.18) {
    const tax = subtotal * taxRate;
    const tip = subtotal * tipPercent;
    const total = subtotal + tax + tip;

    return {
      subtotal,
      tax: tax.toFixed(2),
      tip: tip.toFixed(2),
      total: total.toFixed(2),
    };
  }

  console.log(calculateBill(100)); // Default 8% tax, 18% tip
  console.log(calculateBill(50, 0.1, 0.2)); // Custom rates
}

// ============================================
// Exercise 3: Discount Calculator
// ============================================
function exercise3() {
  console.log("\nExercise 3: Discount Calculator");

  function applyDiscount(price, discountPercent) {
    const discount = price * (discountPercent / 100);
    const finalPrice = price - discount;
    return {
      originalPrice: price,
      discountPercent,
      discountAmount: discount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
    };
  }

  console.log(applyDiscount(100, 10)); // 10% off
  console.log(applyDiscount(50, 25)); // 25% off

  // Tiered discount
  function calculateDiscountTiered(price) {
    let discountPercent = 0;
    if (price > 1000) discountPercent = 20;
    else if (price > 500) discountPercent = 15;
    else if (price > 100) discountPercent = 10;
    else if (price > 50) discountPercent = 5;

    return applyDiscount(price, discountPercent);
  }

  console.log("Tiered discount for $150:", calculateDiscountTiered(150)); // 10% off
  console.log("Tiered discount for $600:", calculateDiscountTiered(600)); // 15% off
}

// ============================================
// Exercise 4: Interest Calculations
// ============================================
function exercise4() {
  console.log("\nExercise 4: Interest Calculations");

  // Simple Interest: I = P * R * T / 100
  function calculateSimpleInterest(principal, rate, years) {
    const interest = (principal * rate * years) / 100;
    const total = principal + interest;
    return {
      principal,
      rate,
      years,
      interest: interest.toFixed(2),
      total: total.toFixed(2),
    };
  }

  console.log("Simple Interest:", calculateSimpleInterest(1000, 5, 2));

  // Compound Interest: A = P(1 + r/100)^t
  function calculateCompoundInterest(principal, rate, years, frequency = 1) {
    const amount =
      principal * Math.pow(1 + rate / 100 / frequency, frequency * years);
    const interest = amount - principal;
    return {
      principal,
      rate,
      years,
      frequency,
      interest: interest.toFixed(2),
      amount: amount.toFixed(2),
    };
  }

  console.log(
    "Compound Interest (annual):",
    calculateCompoundInterest(1000, 5, 2, 1),
  );
  console.log(
    "Compound Interest (monthly):",
    calculateCompoundInterest(1000, 5, 2, 12),
  );
}

// ============================================
// Exercise 5: Weight and BMI Calculator
// ============================================
function exercise5() {
  console.log("\nExercise 5: BMI Calculator");

  // Calculate BMI: weight (kg) / (height (m))^2
  function calculateBMI(weight, height) {
    const bmi = weight / (height * height);
    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    return {
      weight,
      height,
      bmi: bmi.toFixed(1),
      category,
    };
  }

  console.log(calculateBMI(70, 1.75)); // 70 kg, 1.75 m
  console.log(calculateBMI(85, 1.8)); // 85 kg, 1.80 m
}

// ============================================
// Exercise 6: Currency Converter
// ============================================
function exercise6() {
  console.log("\nExercise 6: Currency Converter");

  const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.5,
    INR: 83.12,
  };

  function convertCurrency(amount, fromCurrency, toCurrency) {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      return "Invalid currency";
    }

    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];

    return {
      original: `${amount} ${fromCurrency}`,
      converted: `${convertedAmount.toFixed(2)} ${toCurrency}`,
    };
  }

  console.log(convertCurrency(100, "USD", "EUR")); // USD to EUR
  console.log(convertCurrency(100, "EUR", "GBP")); // EUR to GBP
  console.log(convertCurrency(1000, "USD", "INR")); // USD to INR
}

// ============================================
// Exercise 7: Percentage Calculator
// ============================================
function exercise7() {
  console.log("\nExercise 7: Percentage Calculator");

  // What percent is A of B?
  function getPercentage(part, whole) {
    return ((part / whole) * 100).toFixed(2) + "%";
  }

  // What is X% of Y?
  function calculatePercent(percent, value) {
    return ((percent * value) / 100).toFixed(2);
  }

  // Percentage increase/decrease
  function percentageChange(original, new_value) {
    const change = new_value - original;
    const percent = ((change / original) * 100).toFixed(2);
    return {
      original,
      new: new_value,
      change,
      percentChange: percent + "%",
    };
  }

  console.log("What % is 25 of 100?", getPercentage(25, 100)); // 25%
  console.log("What is 20% of 150?", calculatePercent(20, 150)); // 30
  console.log("Percent change from 100 to 150:", percentageChange(100, 150));
}

// ============================================
// Exercise 8: Loan Calculator
// ============================================
function exercise8() {
  console.log("\nExercise 8: Loan Calculator");

  // Calculate monthly payment: M = P * [r(1+r)^n] / [(1+r)^n-1]
  function calculateMonthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;

    const monthlyPayment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      principal,
      annualRate,
      years,
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
  }

  console.log("Loan $200,000 at 5% for 30 years:");
  console.log(calculateMonthlyPayment(200000, 5, 30));

  console.log("\nLoan $50,000 at 3% for 5 years:");
  console.log(calculateMonthlyPayment(50000, 3, 5));
}

// ============================================
// Exercise 9: Grade Calculator
// ============================================
function exercise9() {
  console.log("\nExercise 9: Grade Calculator");

  function calculateGrade(marks) {
    const total = marks.reduce((a, b) => a + b, 0);
    const average = total / marks.length;
    let grade = "";

    if (average >= 90) grade = "A";
    else if (average >= 80) grade = "B";
    else if (average >= 70) grade = "C";
    else if (average >= 60) grade = "D";
    else grade = "F";

    return {
      marks,
      total,
      average: average.toFixed(2),
      grade,
      passed: grade !== "F",
    };
  }

  console.log(calculateGrade([85, 90, 78, 92, 88]));
  console.log(calculateGrade([60, 65, 55, 70]));
}

// ============================================
// Exercise 10: Distance and Speed Calculator
// ============================================
function exercise10() {
  console.log("\nExercise 10: Distance and Speed Calculator");

  // Distance = Speed * Time
  function calculateDistance(speed, time) {
    return {
      speed,
      time,
      distance: speed * time,
    };
  }

  // Speed = Distance / Time
  function calculateSpeed(distance, time) {
    return {
      distance,
      time,
      speed: (distance / time).toFixed(2),
    };
  }

  // Time = Distance / Speed
  function calculateTime(distance, speed) {
    return {
      distance,
      speed,
      time: (distance / speed).toFixed(2),
    };
  }

  console.log("Distance at 60 km/h for 2.5 hours:", calculateDistance(60, 2.5));
  console.log("Speed: 150 km in 2.5 hours:", calculateSpeed(150, 2.5));
  console.log("Time to travel 300 km at 75 km/h:", calculateTime(300, 75));
}

// Run all exercises
exercise1();
exercise2();
exercise3();
exercise4();
exercise5();
exercise6();
exercise7();
exercise8();
exercise9();
exercise10();
