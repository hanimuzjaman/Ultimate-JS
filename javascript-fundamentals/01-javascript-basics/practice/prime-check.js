/* ===================================================================
   JAVASCRIPT BASICS - PRACTICE EXERCISES
   Topic: Prime Number Checker

   Instructions:
   A prime number is a natural number greater than 1 that has no
   positive divisors other than 1 and itself.

   Progress from basic to advanced implementations
=================================================================== */

// ===================================================================
// EXERCISE 1: Basic Prime Check (Beginner)
// ===================================================================
// Goal: Check if a single number is prime

/*
function isPrime(num) {
  // Numbers less than 2 are not prime
  if (num < 2) {
    return false;
  }

  // Check if any number from 2 to num-1 divides num
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(2));   // true
console.log(isPrime(5));   // true
console.log(isPrime(10));  // false
console.log(isPrime(17));  // true
console.log(isPrime(1));   // false
console.log(isPrime(0));   // false
*/

// ===================================================================
// EXERCISE 2: Optimized Prime Check (Beginner)
// ===================================================================
// Goal: More efficient prime checking using square root
// Logic: Only need to check up to √num

/*
function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  // Only check odd numbers up to √num
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(2));    // true
console.log(isPrime(17));   // true
console.log(isPrime(97));   // true
console.log(isPrime(100));  // false
*/

// ===================================================================
// EXERCISE 3: Find All Primes in Range (Beginner)
// ===================================================================
// Goal: Find all prime numbers within a range

/*
function findPrimesInRange(start, end) {
  const primes = [];

  for (let num = start; num <= end; num++) {
    let isPrime = true;

    if (num < 2) {
      isPrime = false;
    } else {
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          isPrime = false;
          break;
        }
      }
    }

    if (isPrime) {
      primes.push(num);
    }
  }

  return primes;
}

console.log("Primes 1-20:", findPrimesInRange(1, 20));
console.log("Primes 1-50:", findPrimesInRange(1, 50));
console.log("Primes 100-150:", findPrimesInRange(100, 150));
*/

// ===================================================================
// EXERCISE 4: Count Primes (Intermediate)
// ===================================================================
// Goal: Count how many primes are in a range

/*
function countPrimesInRange(start, end) {
  let count = 0;

  for (let num = start; num <= end; num++) {
    if (num < 2) continue;

    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) count++;
  }

  return count;
}

console.log(`Number of primes 1-100: ${countPrimesInRange(1, 100)}`);
console.log(`Number of primes 1-1000: ${countPrimesInRange(1, 1000)}`);
*/

// ===================================================================
// EXERCISE 5: Sieve of Eratosthenes (Intermediate)
// ===================================================================
// Goal: Find all primes using the ancient Sieve algorithm
// More efficient for finding multiple primes

/*
function sieveOfEratosthenes(limit) {
  const primes = new Array(limit + 1).fill(true);
  primes[0] = primes[1] = false;

  for (let i = 2; i * i <= limit; i++) {
    if (primes[i]) {
      // Mark all multiples of i as not prime
      for (let j = i * i; j <= limit; j += i) {
        primes[j] = false;
      }
    }
  }

  // Collect all prime numbers
  const result = [];
  for (let i = 2; i <= limit; i++) {
    if (primes[i]) {
      result.push(i);
    }
  }

  return result;
}

console.log("Primes 1-50 (Sieve):", sieveOfEratosthenes(50));
console.log("Primes 1-100 (Sieve):", sieveOfEratosthenes(100));
console.log(`Count of primes 1-1000: ${sieveOfEratosthenes(1000).length}`);
*/

// ===================================================================
// EXERCISE 6: Prime Factors (Intermediate)
// ===================================================================
// Goal: Find all prime factors of a number

/*
function getPrimeFactors(num) {
  const factors = [];
  let divisor = 2;

  while (divisor * divisor <= num) {
    while (num % divisor === 0) {
      factors.push(divisor);
      num /= divisor;
    }
    divisor++;
  }

  if (num > 1) {
    factors.push(num);
  }

  return factors;
}

console.log("Prime factors of 12:", getPrimeFactors(12));    // [2, 2, 3]
console.log("Prime factors of 100:", getPrimeFactors(100));  // [2, 2, 5, 5]
console.log("Prime factors of 17:", getPrimeFactors(17));    // [17] (prime number)
console.log("Prime factors of 1:", getPrimeFactors(1));      // []
*/

// ===================================================================
// EXERCISE 7: Check Twin Primes (Intermediate)
// ===================================================================
// Goal: Twin primes are pairs of primes that differ by 2

/*
function isTwinPrime(num) {
  const isPrime = (n) => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  return isPrime(num) && (isPrime(num - 2) || isPrime(num + 2));
}

function findTwinPrimes(limit) {
  const twins = [];
  for (let i = 2; i <= limit; i++) {
    if (isTwinPrime(i)) {
      twins.push(i);
    }
  }
  return twins;
}

console.log("Twin primes up to 50:", findTwinPrimes(50));
console.log("Twin primes up to 100:", findTwinPrimes(100));
*/

// ===================================================================
// EXERCISE 8: Palindromic Primes (Advanced)
// ===================================================================
// Goal: Find primes that are also palindromes (read same forwards/backwards)

/*
function isPalindrome(num) {
  const str = num.toString();
  return str === str.split('').reverse().join('');
}

function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function findPalindromicPrimes(limit) {
  const palindromicPrimes = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i) && isPalindrome(i)) {
      palindromicPrimes.push(i);
    }
  }
  return palindromicPrimes;
}

console.log("Palindromic primes up to 100:", findPalindromicPrimes(100));
console.log("Palindromic primes up to 1000:", findPalindromicPrimes(1000));
*/

// ===================================================================
// EXERCISE 9: Prime Gaps (Advanced)
// ===================================================================
// Goal: Find gaps between consecutive prime numbers

/*
function findPrimes(limit) {
  const primes = [];
  for (let num = 2; num <= limit; num++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(num);
  }
  return primes;
}

function findPrimeGaps(limit) {
  const primes = findPrimes(limit);
  const gaps = [];

  for (let i = 1; i < primes.length; i++) {
    const gap = primes[i] - primes[i - 1];
    gaps.push({
      from: primes[i - 1],
      to: primes[i],
      gap: gap
    });
  }

  return gaps;
}

const gaps = findPrimeGaps(30);
console.log("Prime gaps up to 30:");
gaps.forEach(g => {
  console.log(`${g.from} to ${g.to}: gap of ${g.gap}`);
});
*/

// ===================================================================
// EXERCISE 10: Prime Checking with Performance Metrics (Advanced)
// ===================================================================
// Goal: Compare performance of different prime checking methods

/*
function isPrimeBasic(num) {
  if (num < 2) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function isPrimeOptimized(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function benchmarkPrimeCheck(num, method) {
  const start = performance.now();
  const result = method(num);
  const end = performance.now();
  return {
    isPrime: result,
    timeTaken: (end - start).toFixed(4) + " ms"
  };
}

const testNumber = 1000000007;  // Large prime number

console.log(`Testing prime check for ${testNumber}:\n`);
console.log("Basic method:", benchmarkPrimeCheck(testNumber, isPrimeBasic));
console.log("Optimized method:", benchmarkPrimeCheck(testNumber, isPrimeOptimized));
*/

console.log(
  "✅ Prime checker exercises are ready! Uncomment them one at a time.",
);
