# PROMISES

## What is a Promise?

A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It's a way to handle asynchronous code in a cleaner way than callbacks.

## Promise States

A Promise starts in a **pending** state and can transition to:

- **Fulfilled**: Operation completed successfully (`.then()`)
- **Rejected**: Operation failed (`.catch()`)
- **Settled**: Either fulfilled or rejected

```javascript
const promise = new Promise((resolve, reject) => {
  if (success) {
    resolve(value); // Fulfilled state
  } else {
    reject(error); // Rejected state
  }
});
```

## Creating Promises

```javascript
// Promise that resolves after 1 second
const delay = new Promise((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// Promise that rejects
const error = new Promise((resolve, reject) => {
  reject(new Error("Something went wrong"));
});

// Promise with immediate value
const immediate = Promise.resolve("value");

// Promise that's already rejected
const failed = Promise.reject(new Error("Failed"));
```

## .then() for Success

```javascript
Promise.resolve(5)
  .then((value) => {
    console.log(value); // 5
    return value * 2;
  })
  .then((value) => {
    console.log(value); // 10
  });
```

## .catch() for Errors

```javascript
Promise.reject(new Error("Oops"))
  .catch((error) => {
    console.log("Caught error:", error.message);
    return "Recovered";
  })
  .then((value) => {
    console.log(value); // "Recovered"
  });
```

## .finally() for Cleanup

```javascript
fetchData()
  .then((data) => processData(data))
  .catch((error) => handleError(error))
  .finally(() => {
    console.log("Request complete, cleanup done");
  });
```

## Promise.all() - Wait for All

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(([v1, v2, v3]) => {
  console.log(v1, v2, v3); // 1 2 3
});

// If ANY promise rejects:
Promise.all([
  Promise.resolve(1),
  Promise.reject("Error"),
  Promise.resolve(3),
]).catch((error) => console.log(error)); // "Error"
```

## Promise.race() - First to Settle

```javascript
const fast = new Promise((resolve) => {
  setTimeout(() => resolve("Fast"), 100);
});

const slow = new Promise((resolve) => {
  setTimeout(() => resolve("Slow"), 1000);
});

Promise.race([fast, slow]).then((value) => {
  console.log(value); // "Fast"
});
```

## Promise.allSettled() - Get All Results

```javascript
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("Error"),
  Promise.resolve(3),
]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Success:", result.value);
    } else {
      console.log("Failed:", result.reason);
    }
  });
});
```

## Promise Chaining

```javascript
fetch("/api/user")
  .then((response) => response.json())
  .then((user) => fetch(`/api/posts/${user.id}`))
  .then((response) => response.json())
  .then((posts) => console.log(posts))
  .catch((error) => console.error("Error:", error));
```

## Real-World Example: Fetch

```javascript
function getUser(userId) {
  return fetch(`/api/users/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Failed to fetch user:", error);
      throw error;
    });
}

getUser(1)
  .then((user) => console.log("User:", user))
  .catch((error) => console.error("Error:", error));
```

## Common Patterns

### Promisify Callbacks

```javascript
function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}
```

### Sequential Operations

```javascript
function doSequentially() {
  return step1()
    .then(() => step2())
    .then(() => step3());
}
```

### Parallel Operations

```javascript
function doParallel() {
  return Promise.all([step1(), step2(), step3()]);
}
```

## Best Practices

✓ Use `.catch()` for error handling
✓ Use `.finally()` for cleanup
✓ Chain promises instead of nesting
✓ Return promises from `.then()`
✓ Use `Promise.all()` for parallel operations
✓ Avoid promise constructor if possible
✓ Use async/await for modern code

✗ Don't nest `.then()` calls
✗ Don't ignore errors
✗ Don't mix callbacks and promises
✗ Don't create unnecessary promises
