# Asynchronous JavaScript

## Synchronous vs Asynchronous

### Synchronous Code

Executes line by line, waits for each to finish:

```javascript
console.log("Start");

function slowTask() {
  console.log("Task running...");
  for (let i = 0; i < 1000000000; i++) {} // Slow operation
  console.log("Task done");
}

slowTask();
console.log("End");

// Output:
// Start
// Task running...
// Task done
// End
```

### Asynchronous Code

Doesn't wait for operation to finish:

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Delayed task");
}, 1000);

console.log("End");

// Output:
// Start
// End
// Delayed task (after 1 second)
```

## Callbacks

Traditional way to handle async operations:

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data); // Call when done
  }, 1000);
}

fetchData((data) => {
  console.log(data); // Runs after 1 second
});
```

### Callback Hell (Pyramid of Doom)

Multiple nested callbacks become unreadable:

```javascript
// ❌ Hard to read
getUser(1, (user) => {
  getProfile(user.id, (profile) => {
    getPosts(user.id, (posts) => {
      getSocialMediaData(user.id, (social) => {
        console.log(user, profile, posts, social);
      });
    });
  });
});
```

## Promises

Better alternative to callbacks:

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "John" };
      resolve(data); // Success
    }, 1000);
  });
}

// Use promise
fetchData()
  .then((data) => {
    console.log(data); // When resolved
  })
  .catch((error) => {
    console.log(error); // When rejected
  });
```

### Promise States

```javascript
const promise = new Promise((resolve, reject) => {
  // Pending state - operation in progress

  if (success) {
    resolve(value); // Fulfilled
  } else {
    reject(error); // Rejected
  }
});

// Once fulfilled or rejected, state doesn't change
promise.then(onFulfilled).catch(onRejected);
```

### Promise Chaining

```javascript
fetch("/api/user/1")
  .then((response) => response.json())
  .then((user) => fetch(`/api/posts/${user.id}`))
  .then((response) => response.json())
  .then((posts) => {
    console.log(posts);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
```

### Promise Methods

```javascript
// All promises must resolve
Promise.all([promise1, promise2, promise3])
  .then((results) => console.log(results))
  .catch((error) => console.log(error));

// First promise to resolve wins
Promise.race([promise1, promise2]).then((result) => console.log(result));

// Resolve all (doesn't fail on rejection)
Promise.allSettled([promise1, promise2]).then((results) => {
  results.forEach((r) => {
    if (r.status === "fulfilled") console.log(r.value);
    else console.log(r.reason);
  });
});

// Single value
Promise.resolve(value);
Promise.reject(error);
```

## Async/Await

Modern way to write async code (looks synchronous):

```javascript
async function fetchUser() {
  const response = await fetch("/api/user/1");
  const user = await response.json();
  return user;
}

fetchUser().then((user) => {
  console.log(user);
});
```

### Error Handling

```javascript
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log("Done");
  }
}
```

### Multiple Awaits

```javascript
// Sequential (slower)
async function slowWay() {
  const user = await fetch("/api/user/1").then((r) => r.json());
  const posts = await fetch(`/api/posts/${user.id}`).then((r) => r.json());
  return { user, posts };
}

// Parallel (faster)
async function fastWay() {
  const [user, posts] = await Promise.all([
    fetch("/api/user/1").then((r) => r.json()),
    fetch("/api/posts/1").then((r) => r.json()),
  ]);
  return { user, posts };
}
```

## setTimeout and setInterval

### setTimeout

Execute function after delay:

```javascript
setTimeout(() => {
  console.log("Executed after 1 second");
}, 1000);

// Cancel timeout
const id = setTimeout(() => {
  console.log("Won't execute");
}, 1000);

clearTimeout(id);
```

### setInterval

Execute function repeatedly:

```javascript
let count = 0;
const id = setInterval(() => {
  count++;
  console.log(count); // 1, 2, 3, ...

  if (count === 5) {
    clearInterval(id); // Stop after 5 times
  }
}, 1000);
```

## Event Loop

JavaScript is single-threaded but handles async through event loop:

```javascript
console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise");
});

console.log("4. End");

// Output:
// 1. Start
// 4. End
// 3. Promise (microtask)
// 2. Timeout (macrotask)
```

**Execution Order:**

1. Synchronous code (call stack)
2. Promises/Microtasks (microtask queue)
3. setTimeout/Callbacks (callback queue)

## Practical Examples

### Fetch Data

```javascript
async function getUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error("User not found");
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}

getUser(1).then((user) => console.log(user));
```

### Retry Logic

```javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### Debounced Fetch

```javascript
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const debouncedSearch = debounce(async (query) => {
  const results = await fetch(`/api/search?q=${query}`).then((r) => r.json());
  console.log(results);
}, 300);

// Use in search input
input.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```
