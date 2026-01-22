/**
 * Module 2: Control Flow
 * Practice: Sum of Digits
 *
 * Exercises to practice digit manipulation and loops
 * Difficulty: Beginner to Intermediate
 */

// ============================================
// Exercise 1: Sum of Digits
// ============================================
function exercise1() {
  console.log("Exercise 1: Sum of Digits");

  function sumOfDigits(num) {
    // Remove negative sign if present
    num = Math.abs(num);
    let sum = 0;

    while (num > 0) {
      sum += num % 10; // Get last digit
      num = Math.floor(num / 10); // Remove last digit
    }

    return sum;
  }

  console.log("Sum of 12345:", sumOfDigits(12345)); // 15
  console.log("Sum of 999:", sumOfDigits(999)); // 27
  console.log("Sum of 100:", sumOfDigits(100)); // 1
}

// ============================================
// Exercise 2: Count Digits
// ============================================
function exercise2() {
  console.log("\nExercise 2: Count Digits");

  function countDigits(num) {
    num = Math.abs(num);
    let count = 0;

    while (num > 0) {
      count++;
      num = Math.floor(num / 10);
    }

    return count || 1; // Handle 0
  }

  // Alternative: using string
  function countDigitsString(num) {
    return Math.abs(num).toString().length;
  }

  console.log("Digits in 12345:", countDigits(12345)); // 5
  console.log("Digits in 0:", countDigits(0)); // 1
  console.log("Digits in -789:", countDigits(-789)); // 3
}

// ============================================
// Exercise 3: Reverse a Number
// ============================================
function exercise3() {
  console.log("\nExercise 3: Reverse a Number");

  function reverseNumber(num) {
    const isNegative = num < 0;
    num = Math.abs(num);
    let reversed = 0;

    while (num > 0) {
      reversed = reversed * 10 + (num % 10);
      num = Math.floor(num / 10);
    }

    return isNegative ? -reversed : reversed;
  }

  console.log("Reverse of 12345:", reverseNumber(12345)); // 54321
  console.log("Reverse of -456:", reverseNumber(-456)); // -654
  console.log("Reverse of 1000:", reverseNumber(1000)); // 1
}

// ============================================
// Exercise 4: Check if Palindrome
// ============================================
function exercise4() {
  console.log("\nExercise 4: Check if Palindrome");

  function isPalindrome(num) {
    const original = Math.abs(num);
    let reversed = 0;
    let temp = original;

    while (temp > 0) {
      reversed = reversed * 10 + (temp % 10);
      temp = Math.floor(temp / 10);
    }

    return original === reversed;
  }

  console.log("Is 121 palindrome?", isPalindrome(121)); // true
  console.log("Is 12345 palindrome?", isPalindrome(12345)); // false
  console.log("Is 9009 palindrome?", isPalindrome(9009)); // true
  console.log("Is 0 palindrome?", isPalindrome(0)); // true
}

// ============================================
// Exercise 5: Find Largest and Smallest Digit
// ============================================
function exercise5() {
  console.log("\nExercise 5: Find Largest and Smallest Digit");

  function findDigitExtremes(num) {
    num = Math.abs(num);
    let max = -Infinity;
    let min = Infinity;

    while (num > 0) {
      const digit = num % 10;
      max = Math.max(max, digit);
      min = Math.min(min, digit);
      num = Math.floor(num / 10);
    }

    return { max, min };
  }

  console.log("Extremes of 45821:", findDigitExtremes(45821)); // max: 8, min: 1
  console.log("Extremes of 111:", findDigitExtremes(111)); // max: 1, min: 1
  console.log("Extremes of 90:", findDigitExtremes(90)); // max: 9, min: 0
}

// ============================================
// Exercise 6: Armstrong Number
// ============================================
function exercise6() {
  console.log("\nExercise 6: Armstrong Number");
  // A number is Armstrong if sum of cubes of digits equals the number
  // Example: 153 = 1³ + 5³ + 3³

  function isArmstrong(num) {
    const digits = Math.abs(num).toString().split("");
    const n = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, n), 0);
    return sum === Math.abs(num);
  }

  console.log("Is 153 Armstrong?", isArmstrong(153)); // true
  console.log("Is 370 Armstrong?", isArmstrong(370)); // true
  console.log("Is 123 Armstrong?", isArmstrong(123)); // false
  console.log("Is 9474 Armstrong?", isArmstrong(9474)); // true (4 digits)
}

// ============================================
// Exercise 7: Product of Digits
// ============================================
function exercise7() {
  console.log("\nExercise 7: Product of Digits");

  function productOfDigits(num) {
    num = Math.abs(num);
    let product = 1;

    while (num > 0) {
      product *= num % 10;
      num = Math.floor(num / 10);
    }

    return product;
  }

  console.log("Product of 123:", productOfDigits(123)); // 6
  console.log("Product of 456:", productOfDigits(456)); // 120
  console.log("Product of 100:", productOfDigits(100)); // 0
}

// ============================================
// Exercise 8: Count Occurrence of Digit
// ============================================
function exercise8() {
  console.log("\nExercise 8: Count Occurrence of Digit");

  function countDigitOccurrence(num, digit) {
    num = Math.abs(num);
    let count = 0;

    while (num > 0) {
      if (num % 10 === digit) {
        count++;
      }
      num = Math.floor(num / 10);
    }

    return count;
  }

  console.log("Occurrence of 1 in 121212:", countDigitOccurrence(121212, 1)); // 3
  console.log("Occurrence of 5 in 55555:", countDigitOccurrence(55555, 5)); // 5
  console.log("Occurrence of 9 in 12345:", countDigitOccurrence(12345, 9)); // 0
}

// ============================================
// Exercise 9: Remove Digit from Number
// ============================================
function exercise9() {
  console.log("\nExercise 9: Remove Digit from Number");

  function removeDigit(num, digitToRemove) {
    const isNegative = num < 0;
    num = Math.abs(num);
    let result = "";

    while (num > 0) {
      const digit = num % 10;
      if (digit !== digitToRemove) {
        result = digit + result;
      }
      num = Math.floor(num / 10);
    }

    return isNegative ? -parseInt(result) : parseInt(result) || 0;
  }

  console.log("Remove 1 from 121121:", removeDigit(121121, 1)); // 22
  console.log("Remove 5 from 15255:", removeDigit(15255, 5)); // 12
  console.log("Remove 9 from 9999:", removeDigit(9999, 9)); // 0
}

// ============================================
// Exercise 10: Sum of Series
// ============================================
function exercise10() {
  console.log("\nExercise 10: Sum of Series");
  // Sum digits of each number in a series

  function sumOfSeriesDigits(numbers) {
    let totalSum = 0;

    for (let num of numbers) {
      num = Math.abs(num);
      while (num > 0) {
        totalSum += num % 10;
        num = Math.floor(num / 10);
      }
    }

    return totalSum;
  }

  const numbers = [12, 34, 56, 78];
  console.log("Sum of digits in [12, 34, 56, 78]:", sumOfSeriesDigits(numbers));
  // 12: 1+2=3, 34: 3+4=7, 56: 5+6=11, 78: 7+8=15
  // Total: 3+7+11+15 = 36
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
