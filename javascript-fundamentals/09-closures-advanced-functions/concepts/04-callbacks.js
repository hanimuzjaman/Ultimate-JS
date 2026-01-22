/**
 * Module 9: Closures & Advanced Functions
 * Concepts: Callbacks
 *
 * Comprehensive examples of callback functions
 */

// ============================================
// 1. BASIC CALLBACK
// ============================================
console.log("=== Basic Callbacks ===\n");

function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}

greet("Alice", () => {
  console.log("Greeting complete");
});

// ============================================
// 2. CALLBACK WITH PARAMETERS
// ============================================
console.log("\n=== Callbacks with Parameters ===\n");

function fetchUser(id, callback) {
  // Simulate API call
  const user = { id, name: "John Doe" };
  callback(user);
}

fetchUser(1, (user) => {
  console.log("User:", user.name);
});

// ============================================
// 3. CALLBACK FOR ERRORS
// ============================================
console.log("\n=== Error Callbacks ===\n");

function divide(a, b, onSuccess, onError) {
  if (b === 0) {
    onError("Cannot divide by zero");
  } else {
    onSuccess(a / b);
  }
}

divide(
  10,
  2,
  (result) => console.log("Result:", result),
  (error) => console.log("Error:", error),
);

divide(
  10,
  0,
  (result) => console.log("Result:", result),
  (error) => console.log("Error:", error),
);

// ============================================
// 4. ARRAY CALLBACKS
// ============================================
console.log("\n=== Array Callbacks ===\n");

const numbers = [1, 2, 3, 4, 5];

// forEach - no return
numbers.forEach((n) => {
  console.log("Number:", n);
});

// map - returns new array
const squared = numbers.map((n) => n * n);
console.log("Squared:", squared);

// filter - returns filtered array
const evens = numbers.filter((n) => n % 2 === 0);
console.log("Evens:", evens);

// find - returns first match
const firstEven = numbers.find((n) => n % 2 === 0);
console.log("First even:", firstEven);

// ============================================
// 5. TIMER CALLBACKS
// ============================================
console.log("\n=== Timer Callbacks ===\n");

setTimeout(() => {
  console.log("Executed after 500ms");
}, 500);

let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log("Interval:", count);
  if (count >= 2) {
    clearInterval(intervalId);
  }
}, 300);

// ============================================
// 6. CALLBACK HELL (PYRAMID OF DOOM)
// ============================================
console.log("\n=== Callback Hell ===\n");

// Problem: deeply nested callbacks
/*
function step1(callback) {
  setTimeout(() => {
    console.log("Step 1");
    callback();
  }, 100);
}

function step2(callback) {
  setTimeout(() => {
    console.log("Step 2");
    callback();
  }, 100);
}

// Callback hell
step1(() => {
  step2(() => {
    step3(() => {
      // ...
    });
  });
});
*/

console.log("Callback hell: deeply nested callbacks");

// ============================================
// 7. NAMED CALLBACKS (BETTER)
// ============================================
console.log("\n=== Named Callbacks ===\n");

function processStep1(callback) {
  console.log("Processing step 1");
  callback();
}

function processStep2(callback) {
  console.log("Processing step 2");
  callback();
}

function afterStep1() {
  processStep2(afterStep2);
}

function afterStep2() {
  console.log("All steps complete");
}

processStep1(afterStep1);

// ============================================
// 8. CALLBACK WITH ARRAY PROCESSING
// ============================================
console.log("\n=== Processing with Callbacks ===\n");

function processArray(array, callback) {
  const results = [];

  for (let item of array) {
    results.push(callback(item));
  }

  return results;
}

const numbers2 = [1, 2, 3, 4];
const doubled = processArray(numbers2, (n) => n * 2);
console.log("Processed:", doubled);

// ============================================
// 9. EVENT LISTENER CALLBACKS
// ============================================
console.log("\n=== Event Callbacks ===\n");

/*
const button = document.getElementById('myButton');

button.addEventListener('click', (event) => {
  console.log("Button clicked");
  console.log("Event:", event);
});
*/

console.log("Event listeners use callbacks");

// ============================================
// 10. PROMISE AS ALTERNATIVE
// ============================================
console.log("\n=== Promise Alternative ===\n");

// Callback version
function fetchDataCallback(id, callback) {
  setTimeout(() => {
    callback(null, { id, name: "User" });
  }, 200);
}

// Promise version
function fetchDataPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, name: "User" });
    }, 200);
  });
}

// Callbacks
fetchDataCallback(1, (error, data) => {
  if (error) console.log("Error:", error);
  else console.log("Data:", data);
});

// Promises
fetchDataPromise(1)
  .then((data) => console.log("Data:", data))
  .catch((error) => console.log("Error:", error));

// ============================================
// 11. CALLBACK WITH CONTEXT (THIS)
// ============================================
console.log("\n=== Callback Context ===\n");

const obj = {
  name: "Object",
  process(array, callback) {
    array.forEach((item) => {
      callback.call(this, item);
    });
  },
};

obj.process([1, 2, 3], function (item) {
  console.log(this.name + " processed:", item);
});

// ============================================
// 12. PRACTICAL: FILE PROCESSING
// ============================================
console.log("\n=== Practical Example ===\n");

function processFile(filename, onSuccess, onError) {
  // Simulate file reading
  if (filename.endsWith(".txt")) {
    onSuccess(`Contents of ${filename}`);
  } else {
    onError("Invalid file type");
  }
}

processFile(
  "file.txt",
  (contents) => console.log("Success:", contents),
  (error) => console.log("Error:", error),
);

processFile(
  "file.exe",
  (contents) => console.log("Success:", contents),
  (error) => console.log("Error:", error),
);

// ============================================
// SUMMARY
// ============================================
console.log("\n=== CALLBACK SUMMARY ===\n");
console.log("✓ Function passed as argument");
console.log("✓ Called at appropriate time");
console.log("✓ Used in async operations");
console.log("✓ Callbacks can cause nesting (callback hell)");
console.log("✓ Promises and async/await preferred for async");
console.log("✓ Still used for: event handlers, array methods");
console.log("✓ Named callbacks improve readability");
