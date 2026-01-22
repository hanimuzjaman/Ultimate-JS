# ASYNC/AWAIT

## What is Async/Await?

Async/await is syntactic sugar over promises. It allows you to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain.

## The Async Keyword

```javascript
// Regular function
function getData() {
  return Promise.resolve("data");
}

// Async function (always returns a promise)
async function getDataAsync() {
  return "data";
}

const result = await getDataAsync();
console.log(result); // "data"
```

## The Await Keyword

```javascript
async function fetchUser(userId) {
  // Pause execution until promise resolves
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data;
}
```

## Error Handling with Try/Catch

```javascript
async function getUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error("User not found");
    return await response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  } finally {
    console.log("Request complete");
  }
}
```

## Sequential vs Parallel

```javascript
// Sequential (one after another)
async function sequential() {
  const user = await getUser(1);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  return { user, posts, comments };
}

// Parallel (all at once)
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    getUser(1),
    getPosts(1),
    getComments(1),
  ]);
  return { user, posts, comments };
}
```

## Combining Multiple Awaits

```javascript
async function getFullData() {
  try {
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);

    return {
      user,
      posts,
      comments,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
```

## Async Arrow Functions

```javascript
// Arrow function
const getData = async () => {
  const data = await fetch("/api/data");
  return data.json();
};

// With parameters
const getUser = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};
```

## Returning Values from Async

```javascript
async function compute() {
  const result = await slowOperation();
  return result * 2; // Can return non-promise values
}

// Calling async function
compute().then((result) => {
  console.log(result); // Still a promise!
});
```

## Await Expressions

```javascript
async function processItems(items) {
  const results = items.map(async (item) => {
    return await processItem(item);
  });

  // Must await the array of promises
  return await Promise.all(results);
}
```

## Timeout Pattern

```javascript
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayedGreeting() {
  console.log("Waiting...");
  await timeout(2000);
  console.log("Done!");
}
```

## Retry Pattern

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed");
      return response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await timeout(1000 * (i + 1)); // Exponential backoff
    }
  }
}
```

## Real-World Example

```javascript
async function loadUserDashboard(userId) {
  try {
    // Show loading state
    showLoading();

    // Fetch all data in parallel
    const [user, stats, notifications] = await Promise.all([
      fetchUser(userId),
      fetchStats(userId),
      fetchNotifications(userId),
    ]);

    // Update UI
    renderDashboard({ user, stats, notifications });
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}
```

## Async Limitations

```javascript
// ✗ Cannot await at top level (except in modules)
// await getData(); // Error in regular script

// ✓ Need to be in async function
async function main() {
  await getData(); // OK
}

// ✓ In modules you can await at top level
// await getData(); // OK in .mjs files
```

## Best Practices

✓ Use try/catch for error handling
✓ Use Promise.all() for parallel operations
✓ Avoid unnecessary await
✓ Always handle errors
✓ Use finally for cleanup
✓ Keep async functions focused
✓ Prefer async/await over promises for new code

✗ Don't forget to await promises
✗ Don't mix async/await and .then()
✗ Don't create unnecessary async functions
✗ Don't ignore errors
✗ Don't use await in loops unnecessarily
