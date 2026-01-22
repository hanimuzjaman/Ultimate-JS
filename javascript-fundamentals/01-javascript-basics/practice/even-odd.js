/* ===================================================================
   JAVASCRIPT BASICS - PRACTICE EXERCISES
   Topic: Even/Odd Number Checker

   Instructions:
   1. Work through each exercise
   2. Understand modulo operator (%)
   3. Progress from basic to advanced
=================================================================== */

// ===================================================================
// EXERCISE 1: Basic Even/Odd Check (Beginner)
// ===================================================================
// Goal: Determine if a number is even or odd
// Logic: If number % 2 === 0, it's even; otherwise it's odd

/*
function checkEvenOdd(num) {
  if (num % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}

console.log(checkEvenOdd(4));    // "Even"
console.log(checkEvenOdd(7));    // "Odd"
console.log(checkEvenOdd(0));    // "Even"
console.log(checkEvenOdd(-3));   // "Odd"
*/

// ===================================================================
// EXERCISE 2: Even/Odd with Arrow Function (Beginner)
// ===================================================================
// Goal: Use arrow function syntax

/*
const isEven = (num) => num % 2 === 0;
const isOdd = (num) => num % 2 !== 0;

console.log(isEven(10));  // true
console.log(isEven(11));  // false
console.log(isOdd(10));   // false
console.log(isOdd(11));   // true
*/

// ===================================================================
// EXERCISE 3: Check Multiple Numbers (Beginner)
// ===================================================================
// Goal: Check multiple numbers and display results

/*
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("Number | Type");
console.log("-------|-----");

numbers.forEach(num => {
  const type = num % 2 === 0 ? "Even" : "Odd";
  console.log(`${num}      | ${type}`);
});
*/

// ===================================================================
// EXERCISE 4: Count Even and Odd Numbers (Intermediate)
// ===================================================================
// Goal: Count total even and odd numbers in an array

/*
function countEvenOdd(arr) {
  let evenCount = 0;
  let oddCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evenCount++;
    } else {
      oddCount++;
    }
  }

  return { even: evenCount, odd: oddCount };
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = countEvenOdd(numbers);

console.log(`Numbers: ${numbers}`);
console.log(`Even count: ${result.even}`);
console.log(`Odd count: ${result.odd}`);
*/

// ===================================================================
// EXERCISE 5: Sum of Even and Odd Numbers (Intermediate)
// ===================================================================
// Goal: Calculate sum of even and odd numbers separately

/*
function sumEvenOdd(arr) {
  let evenSum = 0;
  let oddSum = 0;

  for (const num of arr) {
    if (num % 2 === 0) {
      evenSum += num;
    } else {
      oddSum += num;
    }
  }

  return { evenSum, oddSum };
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const { evenSum, oddSum } = sumEvenOdd(numbers);

console.log(`Numbers: ${numbers}`);
console.log(`Sum of even numbers: ${evenSum}`);  // 2+4+6+8+10 = 30
console.log(`Sum of odd numbers: ${oddSum}`);    // 1+3+5+7+9 = 25
*/

// ===================================================================
// EXERCISE 6: Filter Even and Odd Numbers (Intermediate)
// ===================================================================
// Goal: Separate numbers into even and odd arrays

/*
function separateEvenOdd(arr) {
  const even = arr.filter(num => num % 2 === 0);
  const odd = arr.filter(num => num % 2 !== 0);
  return { even, odd };
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const { even, odd } = separateEvenOdd(numbers);

console.log(`All numbers: ${numbers}`);
console.log(`Even numbers: ${even}`);
console.log(`Odd numbers: ${odd}`);
*/

// ===================================================================
// EXERCISE 7: Range Check (Intermediate)
// ===================================================================
// Goal: Find even/odd numbers within a specific range

/*
function findEvenInRange(start, end) {
  const evens = [];
  for (let i = start; i <= end; i++) {
    if (i % 2 === 0) {
      evens.push(i);
    }
  }
  return evens;
}

function findOddInRange(start, end) {
  const odds = [];
  for (let i = start; i <= end; i++) {
    if (i % 2 !== 0) {
      odds.push(i);
    }
  }
  return odds;
}

console.log("Even numbers 1-20:", findEvenInRange(1, 20));
console.log("Odd numbers 1-20:", findOddInRange(1, 20));
*/

// ===================================================================
// EXERCISE 8: Consecutive Even Numbers (Intermediate)
// ===================================================================
// Goal: Find the longest sequence of consecutive even/odd numbers

/*
function findLongestSequence(arr) {
  if (arr.length === 0) return [];

  let maxSequence = [];
  let currentSequence = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    const prevIsEven = arr[i - 1] % 2 === 0;
    const currIsEven = arr[i] % 2 === 0;

    if (prevIsEven === currIsEven) {
      // Same parity (both even or both odd)
      currentSequence.push(arr[i]);
    } else {
      // Different parity
      if (currentSequence.length > maxSequence.length) {
        maxSequence = [...currentSequence];
      }
      currentSequence = [arr[i]];
    }
  }

  // Check last sequence
  if (currentSequence.length > maxSequence.length) {
    maxSequence = currentSequence;
  }

  return maxSequence;
}

const numbers = [1, 2, 4, 6, 8, 3, 5, 7, 10, 12, 14, 1];
console.log(`Numbers: ${numbers}`);
console.log(`Longest sequence: ${findLongestSequence(numbers)}`);
*/

// ===================================================================
// EXERCISE 9: Statistics (Advanced)
// ===================================================================
// Goal: Calculate statistics for even and odd numbers

/*
function getEvenOddStats(arr) {
  const evens = arr.filter(n => n % 2 === 0);
  const odds = arr.filter(n => n % 2 !== 0);

  const evenAvg = evens.length > 0 ? evens.reduce((a, b) => a + b, 0) / evens.length : 0;
  const oddAvg = odds.length > 0 ? odds.reduce((a, b) => a + b, 0) / odds.length : 0;

  return {
    evenNumbers: evens,
    evenCount: evens.length,
    evenSum: evens.reduce((a, b) => a + b, 0),
    evenAverage: evenAvg.toFixed(2),
    oddNumbers: odds,
    oddCount: odds.length,
    oddSum: odds.reduce((a, b) => a + b, 0),
    oddAverage: oddAvg.toFixed(2)
  };
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stats = getEvenOddStats(numbers);

console.log("=== EVEN ODD STATISTICS ===");
console.log(`Input: ${numbers}\n`);
console.log("EVEN NUMBERS:");
console.log(`  Numbers: ${stats.evenNumbers}`);
console.log(`  Count: ${stats.evenCount}`);
console.log(`  Sum: ${stats.evenSum}`);
console.log(`  Average: ${stats.evenAverage}\n`);
console.log("ODD NUMBERS:");
console.log(`  Numbers: ${stats.oddNumbers}`);
console.log(`  Count: ${stats.oddCount}`);
console.log(`  Sum: ${stats.oddSum}`);
console.log(`  Average: ${stats.oddAverage}`);
*/

// ===================================================================
// EXERCISE 10: Game - Guess Even or Odd (Advanced)
// ===================================================================
// Goal: Simple game where user guesses if a number is even or odd

/*
function playGuessGame() {
  // In real scenario, would get user input
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  const userGuess = "even";  // User's guess

  const isEven = secretNumber % 2 === 0;
  const userGuessCorrect = (userGuess === "even" && isEven) || (userGuess === "odd" && !isEven);

  console.log(`I'm thinking of a number: ${secretNumber}`);
  console.log(`You guessed: ${userGuess}`);
  console.log(`The number is ${isEven ? "even" : "odd"}`);
  console.log(`You ${userGuessCorrect ? "WON! 🎉" : "LOST! 😢"}`);

  return userGuessCorrect;
}

// Play a few rounds
console.log("=== GUESS THE NUMBER GAME ===\n");
let wins = 0;
for (let round = 1; round <= 3; round++) {
  console.log(`Round ${round}:`);
  if (playGuessGame()) wins++;
  console.log();
}
console.log(`You won ${wins} out of 3 games!`);
*/

console.log("✅ Even/Odd exercises are ready! Uncomment them one at a time.");
