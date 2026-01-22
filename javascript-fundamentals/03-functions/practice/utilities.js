/**
 * Module 3: Functions
 * Practice: Utility Functions
 *
 * Collection of useful utility functions for common tasks
 * Difficulty: Beginner to Intermediate
 */

// ============================================
// String Utilities
// ============================================
console.log("=== String Utilities ===\n");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === reverseString(cleaned);
}

function countVowels(str) {
  const vowels = str.toLowerCase().match(/[aeiou]/g);
  return vowels ? vowels.length : 0;
}

function removeDuplicates(str) {
  return [...new Set(str)].join("");
}

console.log('capitalize("hello"):', capitalize("hello")); // "Hello"
console.log('capitalizeWords("hello world"):', capitalizeWords("hello world")); // "Hello World"
console.log('reverseString("JavaScript"):', reverseString("JavaScript")); // "tpircSavaJ"
console.log('isPalindrome("racecar"):', isPalindrome("racecar")); // true
console.log('countVowels("hello"):', countVowels("hello")); // 2
console.log('removeDuplicates("aabbcc"):', removeDuplicates("aabbcc")); // "abc"

// ============================================
// Number Utilities
// ============================================
console.log("\n=== Number Utilities ===\n");

function isEven(n) {
  return n % 2 === 0;
}

function isOdd(n) {
  return n % 2 !== 0;
}

function isPositive(n) {
  return n > 0;
}

function isNegative(n) {
  return n < 0;
}

function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

console.log("isEven(4):", isEven(4)); // true
console.log("isOdd(7):", isOdd(7)); // true
console.log("isPrime(17):", isPrime(17)); // true
console.log("factorial(5):", factorial(5)); // 120
console.log("gcd(48, 18):", gcd(48, 18)); // 6
console.log("lcm(12, 18):", lcm(12, 18)); // 36

// ============================================
// Array Utilities
// ============================================
console.log("\n=== Array Utilities ===\n");

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function average(arr) {
  return arr.length > 0 ? sum(arr) / arr.length : 0;
}

function findMax(arr) {
  return Math.max(...arr);
}

function findMin(arr) {
  return Math.min(...arr);
}

function removeDuplicatesArray(arr) {
  return [...new Set(arr)];
}

function flatten(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

function shuffle(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const numbers = [1, 2, 3, 4, 5];
console.log("sum([1,2,3,4,5]):", sum(numbers)); // 15
console.log("average([1,2,3,4,5]):", average(numbers)); // 3
console.log("findMax([1,2,3,4,5]):", findMax(numbers)); // 5
console.log(
  "removeDuplicates([1,1,2,2,3]):",
  removeDuplicatesArray([1, 1, 2, 2, 3]),
); // [1,2,3]
console.log(
  "flatten([[1,2],[3,[4,5]]]):",
  flatten([
    [1, 2],
    [3, [4, 5]],
  ]),
); // [1,2,3,4,5]
console.log("chunk([1,2,3,4,5], 2):", chunk(numbers, 2)); // [[1,2],[3,4],[5]]

// ============================================
// Object Utilities
// ============================================
console.log("\n=== Object Utilities ===\n");

function keys(obj) {
  return Object.keys(obj);
}

function values(obj) {
  return Object.values(obj);
}

function entries(obj) {
  return Object.entries(obj);
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function invert(obj) {
  const inverted = {};
  for (const [key, value] of Object.entries(obj)) {
    inverted[value] = key;
  }
  return inverted;
}

function merge(...objects) {
  return Object.assign({}, ...objects);
}

const user = { name: "Alice", age: 25, city: "NYC" };
console.log("keys(user):", keys(user)); // ['name', 'age', 'city']
console.log("values(user):", values(user)); // ['Alice', 25, 'NYC']
console.log("isEmpty({}):", isEmpty({})); // true
console.log("isEmpty(user):", isEmpty(user)); // false
console.log('invert({a:"x",b:"y"}):', invert({ a: "x", b: "y" })); // {x:'a',y:'b'}
console.log("merge({a:1}, {b:2}):", merge({ a: 1 }, { b: 2 })); // {a:1,b:2}

// ============================================
// Validation Utilities
// ============================================
console.log("\n=== Validation Utilities ===\n");

function isEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isPhoneNumber(phone) {
  const regex = /^\d{10}$/;
  return regex.test(phone.replace(/\D/g, ""));
}

function isStrongPassword(password) {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
}

function isURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidDate(date) {
  return !isNaN(new Date(date).getTime());
}

console.log('isEmail("test@example.com"):', isEmail("test@example.com")); // true
console.log('isEmail("invalid"):', isEmail("invalid")); // false
console.log('isPhoneNumber("1234567890"):', isPhoneNumber("1234567890")); // true
console.log('isStrongPassword("Weak123"):', isStrongPassword("Weak123")); // false
console.log('isStrongPassword("Strong@123"):', isStrongPassword("Strong@123")); // true
console.log('isURL("https://example.com"):', isURL("https://example.com")); // true
console.log('isValidDate("2024-01-01"):', isValidDate("2024-01-01")); // true

// ============================================
// Formatting Utilities
// ============================================
console.log("\n=== Formatting Utilities ===\n");

function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

function formatDate(date, format = "MM/DD/YYYY") {
  const d = new Date(date);
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let result = format;
  result = result.replace("YYYY", d.getFullYear());
  result = result.replace("MM", months[d.getMonth()]);
  result = result.replace("DD", String(d.getDate()).padStart(2, "0"));

  return result;
}

function formatPercent(value, decimals = 2) {
  return (value * 100).toFixed(decimals) + "%";
}

function truncate(str, length = 20) {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

console.log("formatCurrency(1234.56):", formatCurrency(1234.56)); // $1,234.56
console.log('formatDate("2024-01-15"):', formatDate("2024-01-15")); // 01/15/2024
console.log("formatPercent(0.755):", formatPercent(0.755)); // 75.50%
console.log(
  'truncate("This is a long string", 10):',
  truncate("This is a long string", 10),
); // "This is a..."

// ============================================
// Type Checking Utilities
// ============================================
console.log("\n=== Type Checking Utilities ===\n");

function getType(value) {
  return typeof value;
}

function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNull(value) {
  return value === null;
}

function isUndefined(value) {
  return value === undefined;
}

function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

console.log("getType(123):", getType(123)); // "number"
console.log('getType("hello"):', getType("hello")); // "string"
console.log("isArray([1,2,3]):", isArray([1, 2, 3])); // true
console.log("isObject({a:1}):", isObject({ a: 1 })); // true
console.log("isNullOrUndefined(null):", isNullOrUndefined(null)); // true
console.log("isNullOrUndefined(undefined):", isNullOrUndefined(undefined)); // true

// ============================================
// Timing and Performance Utilities
// ============================================
console.log("\n=== Timing Utilities ===\n");

function timeFunction(fn) {
  const start = performance.now();
  fn();
  const end = performance.now();
  return (end - start).toFixed(2) + "ms";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function debounce(fn, delayMs) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delayMs);
  };
}

function throttle(fn, delayMs) {
  let lastCallTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCallTime >= delayMs) {
      fn(...args);
      lastCallTime = now;
    }
  };
}

// Test timing
console.log(
  "Time to sum array of 1M elements:",
  timeFunction(() => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) sum += i;
  }),
);

console.log("\nAll utility functions demonstrated!");
