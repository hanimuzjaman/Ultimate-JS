/* ===================================================================
   JAVASCRIPT BASICS - PRACTICE EXERCISES
   Topic: Calculator - Using Variables, Data Types, and Operators

   Instructions:
   1. Uncomment code blocks one at a time
   2. Read the comments explaining what each exercise does
   3. Modify and test the code in your browser console or Node.js
   4. Try to understand why the output is what it is

   Basic to Advanced progression
=================================================================== */

// ===================================================================
// EXERCISE 1: Basic Calculator (Beginner)
// ===================================================================
// Goal: Create a simple calculator that performs basic arithmetic

/*
const num1 = 20;
const num2 = 8;

const sum = num1 + num2;
const difference = num1 - num2;
const product = num1 * num2;
const quotient = num1 / num2;
const remainder = num1 % num2;
const power = num1 ** 2;

console.log(`${num1} + ${num2} = ${sum}`);
console.log(`${num1} - ${num2} = ${difference}`);
console.log(`${num1} * ${num2} = ${product}`);
console.log(`${num1} / ${num2} = ${quotient}`);
console.log(`${num1} % ${num2} = ${remainder}`);
console.log(`${num1} ^ 2 = ${power}`);
*/

// ===================================================================
// EXERCISE 2: Temperature Converter (Beginner)
// ===================================================================
// Goal: Convert between Celsius and Fahrenheit

/*
const celsius = 25;

// Formula: F = (C × 9/5) + 32
const fahrenheit = (celsius * 9/5) + 32;

console.log(`${celsius}°C is ${fahrenheit}°F`);
console.log(`${fahrenheit}°F is ${celsius}°C`);
*/

// ===================================================================
// EXERCISE 3: Bill Splitter (Beginner)
// ===================================================================
// Goal: Calculate the per-person cost when splitting a bill

/*
const totalBill = 450;
const numberOfPeople = 3;
const tipPercentage = 15;

const tipAmount = (totalBill * tipPercentage) / 100;
const totalWithTip = totalBill + tipAmount;
const perPersonCost = totalWithTip / numberOfPeople;

console.log(`Original Bill: ₹${totalBill}`);
console.log(`Tip (${tipPercentage}%): ₹${tipAmount}`);
console.log(`Total Bill: ₹${totalWithTip}`);
console.log(`Cost per person: ₹${perPersonCost.toFixed(2)}`);
*/

// ===================================================================
// EXERCISE 4: Compound Interest Calculator (Intermediate)
// ===================================================================
// Goal: Calculate compound interest using the formula
// A = P(1 + r/100)^t

/*
const principal = 10000;      // Initial amount
const rate = 5;               // Interest rate per annum (%)
const time = 2;               // Time period (years)
const compounds = 12;         // Compounding frequency per year

// Formula: A = P(1 + r/(100*n))^(n*t)
const amount = principal * Math.pow(1 + (rate / (100 * compounds)), compounds * time);
const interest = amount - principal;

console.log(`Principal: ₹${principal}`);
console.log(`Rate: ${rate}% per annum`);
console.log(`Time: ${time} years`);
console.log(`Final Amount: ₹${amount.toFixed(2)}`);
console.log(`Compound Interest: ₹${interest.toFixed(2)}`);
*/

// ===================================================================
// EXERCISE 5: BMI Calculator with Validation (Intermediate)
// ===================================================================
// Goal: Calculate BMI and determine health category
// BMI = weight (kg) / (height (m))^2

/*
const weight = 70;    // in kilograms
const height = 1.75;  // in meters

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

console.log(`Height: ${height}m, Weight: ${weight}kg`);
console.log(`BMI: ${bmi.toFixed(2)}`);
console.log(`Category: ${category}`);
*/

// ===================================================================
// EXERCISE 6: Discount Calculator with Type Coercion (Intermediate)
// ===================================================================
// Goal: Apply discount and understand type coercion

/*
const originalPrice = "5000";  // Price as string
const discountPercent = "20";   // Discount as string
const quantity = "3";           // Quantity as string

// Type coercion happens here - strings convert to numbers
const price = Number(originalPrice);
const discount = Number(discountPercent);
const qty = Number(quantity);

const discountAmount = (price * discount) / 100;
const priceAfterDiscount = price - discountAmount;
const totalCost = priceAfterDiscount * qty;

console.log(`Original Price: ₹${price} each`);
console.log(`Discount: ${discount}%`);
console.log(`Discount Amount: ₹${discountAmount}`);
console.log(`Price after Discount: ₹${priceAfterDiscount} each`);
console.log(`Quantity: ${qty}`);
console.log(`Total Cost: ₹${totalCost}`);
*/

// ===================================================================
// EXERCISE 7: Advanced Multi-Step Calculator (Advanced)
// ===================================================================
// Goal: Create a complex calculation with multiple operations

/*
// Scenario: Calculate profit margin for a business
const costPrice = 500;
const sellingPrice = 850;
const unitsSold = 150;

const profitPerUnit = sellingPrice - costPrice;
const totalRevenue = sellingPrice * unitsSold;
const totalCost = costPrice * unitsSold;
const totalProfit = totalRevenue - totalCost;
const profitMargin = (profitPerUnit / sellingPrice) * 100;
const roi = (totalProfit / totalCost) * 100;

console.log("=== PROFIT MARGIN ANALYSIS ===");
console.log(`Cost Price: ₹${costPrice}`);
console.log(`Selling Price: ₹${sellingPrice}`);
console.log(`Profit per Unit: ₹${profitPerUnit}`);
console.log(`Units Sold: ${unitsSold}`);
console.log(`Total Revenue: ₹${totalRevenue}`);
console.log(`Total Cost: ₹${totalCost}`);
console.log(`Total Profit: ₹${totalProfit}`);
console.log(`Profit Margin: ${profitMargin.toFixed(2)}%`);
console.log(`ROI (Return on Investment): ${roi.toFixed(2)}%`);
*/

// ===================================================================
// EXERCISE 8: Data Type Detection and Conversion (Advanced)
// ===================================================================
// Goal: Understand different data types and convert between them

/*
const values = [42, "Hello", true, null, undefined, 3.14];

console.log("=== DATA TYPE DETECTION ===");
values.forEach((value, index) => {
  console.log(`Value ${index}: ${value}`);
  console.log(`Type: ${typeof value}`);
  console.log(`String conversion: "${String(value)}"`);
  console.log(`Number conversion: ${Number(value)}`);
  console.log(`Boolean conversion: ${Boolean(value)}`);
  console.log("---");
});
*/

// ===================================================================
// EXERCISE 9: Operator Precedence and Evaluation (Advanced)
// ===================================================================
// Goal: Understand how JavaScript evaluates expressions with multiple operators

/*
// Without parentheses
const result1 = 10 + 5 * 2;        // Multiplication first: 10 + 10 = 20
const result2 = (10 + 5) * 2;      // Addition first: 15 * 2 = 30
const result3 = 10 + 5 * 2 ** 2;   // Exponent, then multiply, then add = 10 + 5 * 4 = 30

console.log(`10 + 5 * 2 = ${result1}`);
console.log(`(10 + 5) * 2 = ${result2}`);
console.log(`10 + 5 * 2 ** 2 = ${result3}`);

// Assignment operators with other operators
let x = 5;
x += 3 * 2;  // Multiplication happens first: x += 6, so x = 11
console.log(`x after += operation: ${x}`);
*/

// ===================================================================
// EXERCISE 10: Real-World Scenario - Budget Calculator (Advanced)
// ===================================================================
// Goal: Calculate monthly budget with multiple categories

/*
const monthlyIncome = 50000;

// Expenses as percentages
const rentPercent = 30;
const foodPercent = 25;
const transportPercent = 15;
const entertainmentPercent = 10;
const savingsPercent = 20;

// Calculate amounts
const rentAmount = (monthlyIncome * rentPercent) / 100;
const foodAmount = (monthlyIncome * foodPercent) / 100;
const transportAmount = (monthlyIncome * transportPercent) / 100;
const entertainmentAmount = (monthlyIncome * entertainmentPercent) / 100;
const savingsAmount = (monthlyIncome * savingsPercent) / 100;

// Verify all percentages add up to 100
const totalPercentage = rentPercent + foodPercent + transportPercent + entertainmentPercent + savingsPercent;

console.log("=== MONTHLY BUDGET ===");
console.log(`Total Income: ₹${monthlyIncome}`);
console.log(`---`);
console.log(`Rent (${rentPercent}%): ₹${rentAmount}`);
console.log(`Food (${foodPercent}%): ₹${foodAmount}`);
console.log(`Transport (${transportPercent}%): ₹${transportAmount}`);
console.log(`Entertainment (${entertainmentPercent}%): ₹${entertainmentAmount}`);
console.log(`Savings (${savingsPercent}%): ₹${savingsAmount}`);
console.log(`---`);
console.log(`Total Allocation: ${totalPercentage}%`);
console.log(`Remaining: ₹${monthlyIncome - (rentAmount + foodAmount + transportAmount + entertainmentAmount + savingsAmount)}`);
*/

console.log(
  "✅ Practice exercises are ready! Uncomment them one at a time and run them.",
);
