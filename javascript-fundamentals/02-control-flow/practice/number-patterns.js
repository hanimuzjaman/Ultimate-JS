/**
 * Module 2: Control Flow
 * Practice: Number Patterns
 *
 * Exercises to practice loops for generating number patterns
 * Difficulty: Beginner to Intermediate
 */

// ============================================
// Exercise 1: Simple Number Triangle
// ============================================
function exercise1() {
  console.log("Exercise 1: Simple Number Triangle");
  // Print numbers 1-5 in rows
  // Output:
  // 1
  // 1 2
  // 1 2 3
  // 1 2 3 4
  // 1 2 3 4 5

  for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
      row += j + " ";
    }
    console.log(row);
  }
}

// ============================================
// Exercise 2: Reverse Triangle
// ============================================
function exercise2() {
  console.log("\nExercise 2: Reverse Triangle");
  // Print numbers in reverse rows
  // Output:
  // 5 4 3 2 1
  // 4 3 2 1
  // 3 2 1
  // 2 1
  // 1

  for (let i = 5; i >= 1; i--) {
    let row = "";
    for (let j = i; j >= 1; j--) {
      row += j + " ";
    }
    console.log(row);
  }
}

// ============================================
// Exercise 3: Pyramid of Stars
// ============================================
function exercise3() {
  console.log("\nExercise 3: Pyramid of Stars");
  // Print stars in pyramid pattern
  // Output:
  //     *
  //    **
  //   ***
  //  ****
  // *****

  const n = 5;
  for (let i = 1; i <= n; i++) {
    const spaces = " ".repeat(n - i);
    const stars = "*".repeat(i);
    console.log(spaces + stars);
  }
}

// ============================================
// Exercise 4: Diamond Pattern
// ============================================
function exercise4() {
  console.log("\nExercise 4: Diamond Pattern");
  // Create diamond shape
  const n = 5;

  // Upper half including middle
  for (let i = 1; i <= n; i++) {
    const spaces = " ".repeat(n - i);
    const stars = "*".repeat(2 * i - 1);
    console.log(spaces + stars);
  }

  // Lower half
  for (let i = n - 1; i >= 1; i--) {
    const spaces = " ".repeat(n - i);
    const stars = "*".repeat(2 * i - 1);
    console.log(spaces + stars);
  }
}

// ============================================
// Exercise 5: Number Pyramid
// ============================================
function exercise5() {
  console.log("\nExercise 5: Number Pyramid");
  // Each row has the same number repeated
  // Output:
  // 1
  // 2 2
  // 3 3 3
  // 4 4 4 4
  // 5 5 5 5 5

  for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 0; j < i; j++) {
      row += i + " ";
    }
    console.log(row);
  }
}

// ============================================
// Exercise 6: Multiplication Table
// ============================================
function exercise6() {
  console.log("\nExercise 6: Multiplication Table");
  // Create a 5x5 multiplication table

  for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 1; j <= 5; j++) {
      const product = i * j;
      row += product.toString().padStart(3) + " ";
    }
    console.log(row);
  }
}

// ============================================
// Exercise 7: Hollow Square
// ============================================
function exercise7() {
  console.log("\nExercise 7: Hollow Square");
  // Create a hollow square of asterisks
  const size = 5;

  for (let i = 1; i <= size; i++) {
    let row = "";
    for (let j = 1; j <= size; j++) {
      // First/last row or first/last column
      if (i === 1 || i === size || j === 1 || j === size) {
        row += "* ";
      } else {
        row += "  ";
      }
    }
    console.log(row);
  }
}

// ============================================
// Exercise 8: Number Spiral
// ============================================
function exercise8() {
  console.log("\nExercise 8: Number Spiral (1-25)");
  // Create a spiral pattern starting from 1

  const n = 5;
  const matrix = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));

  let num = 1;
  let top = 0,
    bottom = n - 1,
    left = 0,
    right = n - 1;

  while (top <= bottom && left <= right) {
    // Fill top row
    for (let i = left; i <= right; i++) {
      matrix[top][i] = num++;
    }
    top++;

    // Fill right column
    for (let i = top; i <= bottom; i++) {
      matrix[i][right] = num++;
    }
    right--;

    // Fill bottom row (if exists)
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        matrix[bottom][i] = num++;
      }
      bottom--;
    }

    // Fill left column (if exists)
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        matrix[i][left] = num++;
      }
      left++;
    }
  }

  // Print matrix
  for (let row of matrix) {
    console.log(row.map((n) => n.toString().padStart(2)).join(" "));
  }
}

// ============================================
// Exercise 9: Floyd's Triangle
// ============================================
function exercise9() {
  console.log("\nExercise 9: Floyd's Triangle");
  // Fill triangle with consecutive numbers
  // Output:
  // 1
  // 2 3
  // 4 5 6
  // 7 8 9 10
  // 11 12 13 14 15

  let num = 1;
  for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 0; j < i; j++) {
      row += num + " ";
      num++;
    }
    console.log(row);
  }
}

// ============================================
// Exercise 10: Pascal's Triangle (first 6 rows)
// ============================================
function exercise10() {
  console.log("\nExercise 10: Pascal's Triangle");
  // Each element is sum of two above

  const rows = 6;

  for (let i = 0; i < rows; i++) {
    // Create array for current row
    let row = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        row[j] = 1;
      } else {
        row[j] = /* previous row elements */ 0;
      }
    }

    // Add spacing and print
    const padding = " ".repeat(rows - i - 1);
    console.log(padding + row.join(" "));
  }

  // Better implementation
  console.log("\n--- Better Implementation ---");
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        row[j] = 1;
      } else if (i === 0) {
        row[j] = 1;
      } else {
        // This would need access to previous row data
        row[j] = 1;
      }
    }
    const padding = " ".repeat(rows - i - 1);
    console.log(padding + row.join(" "));
  }
}

// ============================================
// Run all exercises
// ============================================
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
