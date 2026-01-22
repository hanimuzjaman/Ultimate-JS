/**
 * Module 4: Arrays
 * Practice: Custom Map and Filter
 *
 * Implement and understand map and filter behavior
 * Difficulty: Beginner to Intermediate
 */

// ============================================
// Exercise 1: Implement Custom Map
// ============================================
function exercise1() {
  console.log("Exercise 1: Custom Map Implementation\n");

  // Create our own map function
  function customMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(callback(array[i], i, array));
    }
    return result;
  }

  const numbers = [1, 2, 3, 4, 5];

  const doubled = customMap(numbers, (n) => n * 2);
  console.log("Doubled:", doubled); // [2, 4, 6, 8, 10]

  const squared = customMap(numbers, (n) => n * n);
  console.log("Squared:", squared); // [1, 4, 9, 16, 25]

  // Compare with native map
  const nativeDoubled = numbers.map((n) => n * 2);
  console.log(
    "Are they equal?",
    JSON.stringify(doubled) === JSON.stringify(nativeDoubled),
  );
}

// ============================================
// Exercise 2: Implement Custom Filter
// ============================================
function exercise2() {
  console.log("\nExercise 2: Custom Filter Implementation\n");

  function customFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i], i, array)) {
        result.push(array[i]);
      }
    }
    return result;
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const evens = customFilter(numbers, (n) => n % 2 === 0);
  console.log("Even numbers:", evens); // [2, 4, 6, 8, 10]

  const largerThanFive = customFilter(numbers, (n) => n > 5);
  console.log("Numbers > 5:", largerThanFive); // [6, 7, 8, 9, 10]

  // Compare with native filter
  const nativeEvens = numbers.filter((n) => n % 2 === 0);
  console.log(
    "Are they equal?",
    JSON.stringify(evens) === JSON.stringify(nativeEvens),
  );
}

// ============================================
// Exercise 3: Chaining Map and Filter
// ============================================
function exercise3() {
  console.log("\nExercise 3: Chaining Map and Filter\n");

  const products = [
    { name: "Laptop", price: 1000, inStock: true },
    { name: "Mouse", price: 50, inStock: false },
    { name: "Keyboard", price: 150, inStock: true },
    { name: "Monitor", price: 300, inStock: true },
    { name: "Headphones", price: 200, inStock: false },
  ];

  // Find in-stock items with discounted price
  const inStockDiscounted = products
    .filter((p) => p.inStock)
    .map((p) => ({
      name: p.name,
      originalPrice: p.price,
      discountedPrice: p.price * 0.9,
      savings: p.price * 0.1,
    }));

  console.log("In-stock discounted products:");
  inStockDiscounted.forEach((p) => {
    console.log(
      `  ${p.name}: $${p.originalPrice} → $${p.discountedPrice.toFixed(2)}`,
    );
  });
}

// ============================================
// Exercise 4: Complex Transformations
// ============================================
function exercise4() {
  console.log("\nExercise 4: Complex Transformations\n");

  const students = [
    { name: "Alice", grades: [85, 90, 88] },
    { name: "Bob", grades: [75, 80, 82] },
    { name: "Charlie", grades: [95, 92, 98] },
    { name: "Diana", grades: [88, 85, 90] },
  ];

  // Calculate average and grade letter
  const studentGrades = students.map((student) => {
    const avg =
      student.grades.reduce((a, b) => a + b, 0) / student.grades.length;
    let grade = "";
    if (avg >= 90) grade = "A";
    else if (avg >= 80) grade = "B";
    else if (avg >= 70) grade = "C";
    else grade = "F";

    return {
      name: student.name,
      average: avg.toFixed(2),
      grade,
    };
  });

  console.log("Student grades:");
  console.table(studentGrades);

  // Find all A students
  const aStudents = studentGrades.filter((s) => s.grade === "A");
  console.log(
    "A-grade students:",
    aStudents.map((s) => s.name),
  );
}

// ============================================
// Exercise 5: Implement Custom Reduce
// ============================================
function exercise5() {
  console.log("\nExercise 5: Custom Reduce Implementation\n");

  function customReduce(array, callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    if (initialValue === undefined && array.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    if (initialValue === undefined) {
      accumulator = array[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
      accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
  }

  const numbers = [1, 2, 3, 4, 5];

  // Sum
  const sum = customReduce(numbers, (acc, n) => acc + n, 0);
  console.log("Sum:", sum); // 15

  // Product
  const product = customReduce(numbers, (acc, n) => acc * n, 1);
  console.log("Product:", product); // 120

  // Count occurrences
  const items = ["apple", "banana", "apple", "cherry", "banana", "apple"];
  const counts = customReduce(
    items,
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    },
    {},
  );
  console.log("Counts:", counts);
}

// ============================================
// Exercise 6: Transform to Different Format
// ============================================
function exercise6() {
  console.log("\nExercise 6: Format Transformation\n");

  // API response to readable format
  const apiData = [
    { id: 1, first_name: "John", last_name: "Doe", email: "john@example.com" },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@example.com",
    },
  ];

  // Transform to camelCase
  const transformed = apiData.map((user) => ({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    displayName: `${user.first_name} ${user.last_name}`,
  }));

  console.log("Transformed data:");
  console.table(transformed);
}

// ============================================
// Exercise 7: Grouping with Reduce
// ============================================
function exercise7() {
  console.log("\nExercise 7: Grouping with Reduce\n");

  const purchases = [
    { category: "Electronics", amount: 100 },
    { category: "Groceries", amount: 50 },
    { category: "Electronics", amount: 200 },
    { category: "Clothing", amount: 75 },
    { category: "Groceries", amount: 30 },
    { category: "Electronics", amount: 150 },
  ];

  // Group by category
  const grouped = purchases.reduce((acc, purchase) => {
    if (!acc[purchase.category]) {
      acc[purchase.category] = [];
    }
    acc[purchase.category].push(purchase.amount);
    return acc;
  }, {});

  console.log("Purchases by category:");
  for (const [category, amounts] of Object.entries(grouped)) {
    const total = amounts.reduce((a, b) => a + b, 0);
    console.log(`${category}: $${total} (${amounts.length} purchases)`);
  }
}

// ============================================
// Exercise 8: Filter and Flatten
// ============================================
function exercise8() {
  console.log("\nExercise 8: Filter and Flatten\n");

  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  // Flatten and filter
  const result = matrix
    .flat() // Flatten to [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .filter((n) => n % 2 !== 0) // Keep odd numbers
    .map((n) => n * n); // Square them

  console.log("Odd numbers squared:", result); // [1, 9, 25, 49, 81]
}

// ============================================
// Exercise 9: Map with Index
// ============================================
function exercise9() {
  console.log("\nExercise 9: Map with Index\n");

  const items = ["apple", "banana", "cherry", "date"];

  // Create numbered list
  const numbered = items.map((item, index) => `${index + 1}. ${item}`);

  console.log("Numbered list:");
  console.log(numbered.join("\n"));

  // Create with position info
  const withPosition = items.map((item, index) => ({
    item,
    index,
    position:
      index === 0 ? "first" : index === items.length - 1 ? "last" : "middle",
  }));

  console.log("\nWith position:");
  console.table(withPosition);
}

// ============================================
// Exercise 10: Practical Data Processing
// ============================================
function exercise10() {
  console.log("\nExercise 10: Real-World Data Processing\n");

  // E-commerce data
  const orders = [
    {
      id: 1,
      items: [
        { name: "Laptop", price: 1000, qty: 1 },
        { name: "Mouse", price: 50, qty: 2 },
      ],
    },
    { id: 2, items: [{ name: "Keyboard", price: 150, qty: 1 }] },
    {
      id: 3,
      items: [
        { name: "Monitor", price: 300, qty: 2 },
        { name: "Headphones", price: 200, qty: 1 },
      ],
    },
  ];

  // Process orders
  const processedOrders = orders.map((order) => {
    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return {
      orderId: order.id,
      itemCount: order.items.reduce((count, item) => count + item.qty, 0),
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      items: order.items.map((item) => `${item.qty}x ${item.name}`),
    };
  });

  console.log("Processed Orders:");
  console.table(processedOrders);

  // Get high-value orders
  const highValue = processedOrders
    .filter((o) => parseFloat(o.total) > 500)
    .map((o) => `Order #${o.orderId}: $${o.total}`);

  console.log("\nHigh-value orders (>$500):");
  console.log(highValue);
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
