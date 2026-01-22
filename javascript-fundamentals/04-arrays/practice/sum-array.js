/**
 * Module 4: Arrays
 * Practice: Sum Array
 *
 * Various techniques to sum, aggregate, and calculate array values
 * Difficulty: Beginner to Intermediate
 */

// ============================================
// Exercise 1: Basic Array Sum
// ============================================
function exercise1() {
  console.log("Exercise 1: Basic Array Sum\n");

  // Method 1: reduce
  const sum1 = (arr) => arr.reduce((a, b) => a + b, 0);

  // Method 2: for loop
  const sum2 = (arr) => {
    let total = 0;
    for (let num of arr) total += num;
    return total;
  };

  // Method 3: forEach
  const sum3 = (arr) => {
    let total = 0;
    arr.forEach((num) => (total += num));
    return total;
  };

  const numbers = [1, 2, 3, 4, 5];
  console.log("Array:", numbers);
  console.log("Sum (reduce):", sum1(numbers)); // 15
  console.log("Sum (for):", sum2(numbers)); // 15
  console.log("Sum (forEach):", sum3(numbers)); // 15
}

// ============================================
// Exercise 2: Sum with Conditions
// ============================================
function exercise2() {
  console.log("\nExercise 2: Sum with Conditions\n");

  // Sum only even numbers
  const sumEvens = (arr) =>
    arr.filter((n) => n % 2 === 0).reduce((a, b) => a + b, 0);

  // Sum numbers greater than threshold
  const sumGreaterThan = (arr, threshold) =>
    arr.filter((n) => n > threshold).reduce((a, b) => a + b, 0);

  // Sum absolute values
  const sumAbsolute = (arr) =>
    arr.map((n) => Math.abs(n)).reduce((a, b) => a + b, 0);

  const numbers = [1, 2, 3, 4, 5, -6, 7, 8, -9, 10];

  console.log("Array:", numbers);
  console.log("Sum of evens:", sumEvens(numbers)); // 2 + 4 + 8 + 10 = 24
  console.log("Sum > 5:", sumGreaterThan(numbers, 5)); // 7 + 8 + 10 = 25
  console.log("Sum of absolutes:", sumAbsolute(numbers)); // 1+2+3+4+5+6+7+8+9+10 = 55
}

// ============================================
// Exercise 3: Sum with Weights
// ============================================
function exercise3() {
  console.log("\nExercise 3: Weighted Sum\n");

  // Weighted average
  const scores = [85, 90, 78, 92];
  const weights = [0.2, 0.3, 0.25, 0.25]; // 20%, 30%, 25%, 25%

  const weightedSum = scores.reduce(
    (sum, score, i) => sum + score * weights[i],
    0,
  );

  console.log("Scores:", scores);
  console.log("Weights:", weights);
  console.log("Weighted sum:", weightedSum.toFixed(2)); // 87.15

  // Portfolio value with quantities
  const items = [
    { name: "Apple", price: 100, quantity: 10 },
    { name: "Banana", price: 50, quantity: 5 },
    { name: "Orange", price: 75, quantity: 8 },
  ];

  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  console.log("\nPortfolio:");
  items.forEach((item) => {
    console.log(
      `  ${item.name}: $${item.price} × ${item.quantity} = $${item.price * item.quantity}`,
    );
  });
  console.log("Total value:", "$" + totalValue);
}

// ============================================
// Exercise 4: Sum by Category
// ============================================
function exercise4() {
  console.log("\nExercise 4: Sum by Category\n");

  const transactions = [
    { category: "Food", amount: 50 },
    { category: "Transport", amount: 30 },
    { category: "Food", amount: 45 },
    { category: "Entertainment", amount: 25 },
    { category: "Transport", amount: 35 },
    { category: "Food", amount: 40 },
  ];

  // Sum by category
  const sumByCategory = transactions.reduce((acc, trans) => {
    if (!acc[trans.category]) acc[trans.category] = 0;
    acc[trans.category] += trans.amount;
    return acc;
  }, {});

  console.log("Transactions:");
  transactions.forEach((t) => {
    console.log(`  ${t.category}: $${t.amount}`);
  });

  console.log("\nSum by category:");
  for (const [category, sum] of Object.entries(sumByCategory)) {
    console.log(`  ${category}: $${sum}`);
  }
}

// ============================================
// Exercise 5: Running Total
// ============================================
function exercise5() {
  console.log("\nExercise 5: Running Total / Cumulative Sum\n");

  function runningTotal(arr) {
    let sum = 0;
    return arr.map((n) => {
      sum += n;
      return sum;
    });
  }

  const numbers = [10, 20, 30, 40, 50];
  console.log("Numbers:", numbers);
  console.log("Running total:", runningTotal(numbers)); // [10, 30, 60, 100, 150]

  // Monthly expenses running total
  const monthlyExpenses = [100, 150, 120, 200, 180];
  const cumulativeExpenses = runningTotal(monthlyExpenses);

  console.log("\nMonthly expenses:", monthlyExpenses);
  console.log("Cumulative:", cumulativeExpenses);
}

// ============================================
// Exercise 6: Min, Max, Average
// ============================================
function exercise6() {
  console.log("\nExercise 6: Statistical Calculations\n");

  function arrayStats(arr) {
    if (arr.length === 0) return null;

    const sum = arr.reduce((a, b) => a + b, 0);
    const average = sum / arr.length;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min;

    return { sum, average, min, max, range };
  }

  const numbers = [15, 24, 32, 18, 45, 22];
  const stats = arrayStats(numbers);

  console.log("Array:", numbers);
  console.log("Statistics:");
  console.log(`  Sum: ${stats.sum}`);
  console.log(`  Average: ${stats.average.toFixed(2)}`);
  console.log(`  Min: ${stats.min}`);
  console.log(`  Max: ${stats.max}`);
  console.log(`  Range: ${stats.range}`);
}

// ============================================
// Exercise 7: Sum Nested Arrays
// ============================================
function exercise7() {
  console.log("\nExercise 7: Sum Nested Arrays\n");

  // Sum 2D array
  function sum2D(matrix) {
    return matrix.reduce(
      (sum, row) => sum + row.reduce((rowSum, val) => rowSum + val, 0),
      0,
    );
  }

  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  console.log("Matrix:", matrix);
  console.log("Total sum:", sum2D(matrix)); // 45

  // Sum flattened array
  const nested = [
    [1, 2],
    [3, [4, 5]],
    [[6, 7], 8],
  ];
  const flatSum = nested.flat(Infinity).reduce((a, b) => a + b, 0);

  console.log("Nested array sum:", flatSum); // 36
}

// ============================================
// Exercise 8: Cumulative Percentage
// ============================================
function exercise8() {
  console.log("\nExercise 8: Cumulative Percentage\n");

  function cumulativePercentage(arr) {
    const total = arr.reduce((a, b) => a + b, 0);
    let runningSum = 0;

    return arr.map((val) => {
      runningSum += val;
      return ((runningSum / total) * 100).toFixed(2) + "%";
    });
  }

  const sales = [100, 150, 200, 175, 225];
  const cumPercent = cumulativePercentage(sales);

  console.log("Sales by quarter:", sales);
  console.log(
    "Total:",
    sales.reduce((a, b) => a + b, 0),
  );
  console.log("Cumulative %:", cumPercent);
}

// ============================================
// Exercise 9: Grouped Sum
// ============================================
function exercise9() {
  console.log("\nExercise 9: Group and Sum\n");

  const orders = [
    { customerId: 1, amount: 100 },
    { customerId: 2, amount: 150 },
    { customerId: 1, amount: 75 },
    { customerId: 3, amount: 200 },
    { customerId: 2, amount: 50 },
    { customerId: 1, amount: 125 },
  ];

  // Sum by customer
  const customerTotals = orders.reduce((acc, order) => {
    if (!acc[order.customerId]) {
      acc[order.customerId] = 0;
    }
    acc[order.customerId] += order.amount;
    return acc;
  }, {});

  console.log("Orders:", orders);
  console.log("Customer totals:");
  for (const [customerId, total] of Object.entries(customerTotals)) {
    console.log(`  Customer ${customerId}: $${total}`);
  }
}

// ============================================
// Exercise 10: Performance Test
// ============================================
function exercise10() {
  console.log("\nExercise 10: Performance Comparison\n");

  // Create large array
  const largeArray = Array.from({ length: 1000000 }, (_, i) => i + 1);

  // Method 1: reduce
  console.time("reduce");
  const sum1 = largeArray.reduce((a, b) => a + b, 0);
  console.timeEnd("reduce");

  // Method 2: for loop
  console.time("for loop");
  let sum2 = 0;
  for (let num of largeArray) sum2 += num;
  console.timeEnd("for loop");

  // Method 3: forEach
  console.time("forEach");
  let sum3 = 0;
  largeArray.forEach((num) => (sum3 += num));
  console.timeEnd("forEach");

  console.log("All methods equal?", sum1 === sum2 && sum2 === sum3);
  console.log("Result:", sum1.toLocaleString());
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
