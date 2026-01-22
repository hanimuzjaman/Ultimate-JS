/**
 * Module 10: Async JavaScript
 * Concepts: Promises
 *
 * Comprehensive examples of Promises and async patterns
 */

// ============================================
// 1. CREATING A PROMISE
// ============================================
console.log("=== Creating Promises ===\n");

// Promise with resolve/reject
const myPromise = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Success!");
  } else {
    reject("Error!");
  }
});

myPromise
  .then((result) => console.log("Resolved:", result))
  .catch((error) => console.log("Rejected:", error));

// ============================================
// 2. PROMISE STATES
// ============================================
console.log("\n=== Promise States ===\n");

// Pending → Fulfilled/Rejected (immutable)

const pendingPromise = new Promise((resolve) => {
  // Still pending
});

const fulfilledPromise = Promise.resolve("Success");
console.log("Fulfilled:", fulfilledPromise);

const rejectedPromise = Promise.reject("Error");
rejectedPromise.catch(() => {}); // Handle rejection

// ============================================
// 3. PROMISE.RESOLVE AND PROMISE.REJECT
// ============================================
console.log("\n=== Promise Helpers ===\n");

// Create already-resolved promise
Promise.resolve(42).then((value) => {
  console.log("Resolved value:", value);
});

// Create already-rejected promise
Promise.reject("Error").catch((error) => {
  console.log("Rejected:", error);
});

// ============================================
// 4. THEN, CATCH, FINALLY
// ============================================
console.log("\n=== Then, Catch, Finally ===\n");

Promise.resolve(5)
  .then((value) => {
    console.log("Then:", value);
    return value * 2; // Pass to next then
  })
  .then((value) => {
    console.log("Then again:", value);
  })
  .catch((error) => {
    console.log("Caught error:", error);
  })
  .finally(() => {
    console.log("Finally always runs");
  });

// ============================================
// 5. PROMISE CHAINING
// ============================================
console.log("\n=== Promise Chaining ===\n");

function fetchUser() {
  return Promise.resolve({ id: 1, name: "John" });
}

function fetchPosts(userId) {
  return Promise.resolve([{ id: 1, title: "Post 1" }]);
}

fetchUser()
  .then((user) => {
    console.log("User:", user.name);
    return fetchPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts:", posts.length);
  });

// ============================================
// 6. PROMISE.ALL
// ============================================
console.log("\n=== Promise.all ===\n");

const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 100);
});
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then((results) => {
  console.log("All done:", results); // [1, 2, 3]
});

// ============================================
// 7. PROMISE.ALLSETTLED
// ============================================
console.log("\n=== Promise.allSettled ===\n");

const settled1 = Promise.resolve(1);
const settled2 = Promise.reject("Error");
const settled3 = Promise.resolve(3);

Promise.allSettled([settled1, settled2, settled3]).then((results) => {
  console.log("All settled:", results);
});

// ============================================
// 8. PROMISE.RACE
// ============================================
console.log("\n=== Promise.race ===\n");

const race1 = new Promise((resolve) => {
  setTimeout(() => resolve("First"), 100);
});

const race2 = new Promise((resolve) => {
  setTimeout(() => resolve("Second"), 50);
});

Promise.race([race1, race2]).then((result) => {
  console.log("Race winner:", result); // "Second"
});

// ============================================
// 9. ERROR HANDLING
// ============================================
console.log("\n=== Error Handling ===\n");

Promise.reject("Something went wrong")
  .catch((error) => {
    console.log("Caught:", error);
    return "recovered"; // Can recover
  })
  .then((value) => {
    console.log("After recovery:", value);
  });

// ============================================
// 10. PROMISE VS CALLBACK
// ============================================
console.log("\n=== Promise vs Callback ===\n");

// Callback style (callback hell)
/*
function loadData(callback) {
  loadUser((error, user) => {
    if (error) {
      callback(error);
    } else {
      loadPosts(user.id, (error, posts) => {
        if (error) {
          callback(error);
        } else {
          callback(null, posts);
        }
      });
    }
  });
}
*/

// Promise style (cleaner)
function loadDataPromise() {
  return loadUserPromise()
    .then((user) => loadPostsPromise(user.id))
    .catch((error) => console.log("Error:", error));
}

console.log("Promise vs callback shown");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== PROMISE SUMMARY ===\n");
console.log("✓ Represents value that may not be available yet");
console.log("✓ States: pending, fulfilled, rejected");
console.log("✓ then, catch, finally for handling");
console.log("✓ Chainable for sequential operations");
console.log("✓ Promise.all for concurrent operations");
console.log("✓ Better than callbacks for async code");
console.log("✓ Foundation for async/await");
