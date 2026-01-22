/* ===================================================================
   CONTROL FLOW - PRACTICE EXERCISES
   Topic: Loops - For, While, Do-While

   Instructions:
   1. Understand loop syntax and when to use each type
   2. Uncomment and run each exercise
   3. Modify to understand the logic
=================================================================== */

// ===================================================================
// EXERCISE 1: Simple For Loop (Beginner)
// ===================================================================
// Goal: Print numbers from 1 to 10

/*
console.log("=== Print 1 to 10 ===");
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
*/

// ===================================================================
// EXERCISE 2: For Loop with Arrays (Beginner)
// ===================================================================
// Goal: Iterate over array elements

/*
const fruits = ["apple", "banana", "orange", "mango"];

console.log("=== Fruits ===");
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i + 1}. ${fruits[i]}`);
}

// Simpler way with forEach
fruits.forEach((fruit, index) => {
  console.log(`${index + 1}. ${fruit}`);
});
*/

// ===================================================================
// EXERCISE 3: While Loop (Beginner)
// ===================================================================
// Goal: Print countdown from 10 to 1

/*
console.log("=== Countdown ===");
let count = 10;
while (count >= 1) {
  console.log(count);
  count--;
}
console.log("Blastoff! 🚀");
*/

// ===================================================================
// EXERCISE 4: Do-While Loop (Beginner)
// ===================================================================
// Goal: Demonstrate do-while (executes at least once)

/*
let input = 0;

console.log("=== Do-While Example ===");
do {
  console.log(`Input: ${input}`);
  input++;
} while (input < 3);

// Comparison: while loop wouldn't execute if condition is false initially
let number = 5;
while (number < 3) {
  console.log(number);  // This doesn't print
}
*/

// ===================================================================
// EXERCISE 5: Sum Numbers in Loop (Intermediate)
// ===================================================================
// Goal: Calculate sum of numbers 1 to 100

/*
function sumNumbers(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log(`Sum 1-10: ${sumNumbers(10)}`);      // 55
console.log(`Sum 1-100: ${sumNumbers(100)}`);    // 5050
console.log(`Sum 1-1000: ${sumNumbers(1000)}`);  // 500500
*/

// ===================================================================
// EXERCISE 6: Nested Loops - Multiplication Table (Intermediate)
// ===================================================================
// Goal: Create a multiplication table using nested loops

/*
console.log("=== 5x5 Multiplication Table ===");
for (let i = 1; i <= 5; i++) {
  let row = "";
  for (let j = 1; j <= 5; j++) {
    row += (i * j) + "\t";  // \t for tab spacing
  }
  console.log(row);
}
*/

// ===================================================================
// EXERCISE 7: Pattern Printing with Nested Loops (Intermediate)
// ===================================================================
// Goal: Print a pyramid pattern

/*
function printPyramid(n) {
  for (let i = 1; i <= n; i++) {
    let pattern = "";
    for (let j = 1; j <= i; j++) {
      pattern += "* ";
    }
    console.log(pattern);
  }
}

console.log("=== Pyramid Pattern ===");
printPyramid(5);
*/

// ===================================================================
// EXERCISE 8: Loop with Conditions (Intermediate)
// ===================================================================
// Goal: Print only even numbers and their squares

/*
console.log("=== Even Numbers and Their Squares ===");
for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    console.log(`${i} -> ${i * i}`);
  }
}
*/

// ===================================================================
// EXERCISE 9: Break and Continue Statements (Advanced)
// ===================================================================
// Goal: Understand break and continue

/*
console.log("=== Using Break (stop at 5) ===");
for (let i = 1; i <= 10; i++) {
  if (i === 6) {
    break;  // Exit loop completely
  }
  console.log(i);
}

console.log("\n=== Using Continue (skip even numbers) ===");
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;  // Skip this iteration
  }
  console.log(i);
}
*/

// ===================================================================
// EXERCISE 10: Complex Loop - Prime Numbers (Advanced)
// ===================================================================
// Goal: Find all prime numbers up to 50

/*
function findPrimesInRange(limit) {
  const primes = [];

  for (let num = 2; num <= limit; num++) {
    let isPrime = true;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;  // No need to check further
      }
    }

    if (isPrime) {
      primes.push(num);
    }
  }

  return primes;
}

const primes = findPrimesInRange(50);
console.log("Prime numbers 1-50:", primes.join(", "));
*/

// ===================================================================
// EXERCISE 11: Loop with Array Methods (Advanced)
// ===================================================================
// Goal: Understand different ways to loop through arrays

/*
const numbers = [1, 2, 3, 4, 5];

// Traditional for loop
console.log("=== Traditional For Loop ===");
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// forEach
console.log("\n=== forEach ===");
numbers.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});

// for...of (modern)
console.log("\n=== for...of ===");
for (const num of numbers) {
  console.log(num);
}

// map (returns new array)
console.log("\n=== map (square each number) ===");
const squared = numbers.map(num => num * num);
console.log(squared);
*/

// ===================================================================
// EXERCISE 12: Real-World Scenario - Shopping Cart (Advanced)
// ===================================================================
// Goal: Calculate total price with loops

/*
function calculateCartTotal(items) {
  let total = 0;
  let totalItems = 0;
  let discount = 0;

  // Calculate total
  for (const item of items) {
    total += item.price * item.quantity;
    totalItems += item.quantity;
  }

  // Apply volume discount
  if (totalItems >= 10) {
    discount = total * 0.1;  // 10% discount
  } else if (totalItems >= 5) {
    discount = total * 0.05; // 5% discount
  }

  const finalTotal = total - discount;

  return {
    subtotal: total.toFixed(2),
    items: totalItems,
    discount: discount.toFixed(2),
    total: finalTotal.toFixed(2)
  };
}

const cartItems = [
  { name: "Laptop", price: 50000, quantity: 1 },
  { name: "Mouse", price: 500, quantity: 3 },
  { name: "Keyboard", price: 2000, quantity: 1 },
  { name: "Monitor", price: 12000, quantity: 1 },
  { name: "USB Cable", price: 200, quantity: 6 }
];

const cartTotal = calculateCartTotal(cartItems);
console.log("=== Shopping Cart ===");
console.log(cartItems);
console.log("\n=== Total Calculation ===");
console.log(`Items: ${cartTotal.items}`);
console.log(`Subtotal: ₹${cartTotal.subtotal}`);
console.log(`Discount: ₹${cartTotal.discount}`);
console.log(`Final Total: ₹${cartTotal.total}`);
*/

console.log("✅ Loop exercises are ready! Uncomment them one at a time.");
