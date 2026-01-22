/**
 * Module 10: Async JavaScript
 * Concepts: Async/Await
 */

// ============================================
// 1. BASIC ASYNC/AWAIT
// ============================================
console.log("=== Basic Async/Await ===\n");

async function greetAsync() {
  console.log("Hello");
  return "Greeting sent";
}

greetAsync().then((result) => {
  console.log("Result:", result);
});

// ============================================
// 2. AWAIT BASICS
// ============================================
console.log("\n=== Await ===\n");

async function getData() {
  const result = await Promise.resolve("Data");
  console.log("Data:", result);
  return result;
}

getData();

// ============================================
// 3. ASYNC FUNCTION RETURNS PROMISE
// ============================================
console.log("\n=== Async Returns Promise ===\n");

async function asyncFunc() {
  return 42;
}

asyncFunc().then((value) => {
  console.log("Async returned:", value);
});

// ============================================
// 4. SEQUENTIAL VS PARALLEL
// ============================================
console.log("\n=== Sequential vs Parallel ===\n");

async function sequential() {
  const user = await Promise.resolve({ id: 1 });
  const posts = await Promise.resolve([]);
  return { user, posts };
}

async function parallel() {
  const [user, posts] = await Promise.all([
    Promise.resolve({ id: 1 }),
    Promise.resolve([]),
  ]);
  return { user, posts };
}

sequential().then((data) => console.log("Sequential done"));
parallel().then((data) => console.log("Parallel done"));

// ============================================
// 5. ERROR HANDLING
// ============================================
console.log("\n=== Error Handling ===\n");

async function withErrorHandling() {
  try {
    const result = await Promise.reject("Error");
  } catch (error) {
    console.log("Caught error:", error);
  } finally {
    console.log("Finally block");
  }
}

withErrorHandling();

// ============================================
// 6. CHAINING ASYNC
// ============================================
console.log("\n=== Chaining ===\n");

async function chain() {
  const step1 = await Promise.resolve(1);
  const step2 = await Promise.resolve(step1 + 1);
  const step3 = await Promise.resolve(step2 + 1);
  return step3;
}

chain().then((result) => {
  console.log("Chain result:", result);
});

// ============================================
// SUMMARY
// ============================================
console.log("\n=== ASYNC/AWAIT SUMMARY ===\n");
console.log("✓ Async: function that returns promise");
console.log("✓ Await: pauses until promise resolves");
console.log("✓ Cleaner than .then() chains");
console.log("✓ Use try/catch for errors");
console.log("✓ Promise.all for parallel");
console.log("✓ Sequential for dependent calls");
