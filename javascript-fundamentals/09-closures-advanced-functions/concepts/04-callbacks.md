# Callbacks: Functions As Arguments

## What is a Callback?

A callback is a function passed as an argument to another function, to be called at a later time.

## Basic Example

```javascript
function greet(name, callback) {
  console.log("Hello, " + name);
  callback(); // Invoke callback
}

greet("Alice", () => {
  console.log("Greeting sent");
});
```

## Callbacks with Parameters

```javascript
function fetchData(id, callback) {
  const data = { id, name: "John" };
  callback(data);
}

fetchData(1, (data) => {
  console.log("Received:", data);
});
```

## Error Handling Callbacks

```javascript
function divide(a, b, onSuccess, onError) {
  if (b === 0) {
    onError("Division by zero");
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
```

## Array Callbacks

Array methods use callbacks extensively:

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach((n) => console.log(n));

// map
const doubled = numbers.map((n) => n * 2);

// filter
const evens = numbers.filter((n) => n % 2 === 0);

// find
const first = numbers.find((n) => n > 3);

// reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

## Timer Callbacks

```javascript
// Execute after delay
setTimeout(() => {
  console.log("After 1 second");
}, 1000);

// Execute repeatedly
const id = setInterval(() => {
  console.log("Every 1 second");
}, 1000);

clearInterval(id);
```

## Event Callbacks

```javascript
button.addEventListener("click", (event) => {
  console.log("Button clicked");
});
```

## Callback Hell (Pyramid of Doom)

Problem with deeply nested callbacks:

```javascript
// ❌ Hard to read
function loadData(id, callback) {
  fetchUser(id, (user) => {
    fetchPosts(user.id, (posts) => {
      fetchComments(posts[0].id, (comments) => {
        callback(comments);
      });
    });
  });
}
```

## Solutions to Callback Hell

### Named Functions

```javascript
function handleUser(user) {
  fetchPosts(user.id, handlePosts);
}

function handlePosts(posts) {
  fetchComments(posts[0].id, handleComments);
}

fetchUser(1, handleUser);
```

### Promises

```javascript
fetchUser(1)
  .then((user) => fetchPosts(user.id))
  .then((posts) => fetchComments(posts[0].id))
  .then((comments) => console.log(comments));
```

### Async/Await

```javascript
async function loadData(id) {
  const user = await fetchUser(id);
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  return comments;
}
```

## Practical Pattern: API with Callbacks

```javascript
function makeRequest(url, onSuccess, onError) {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      onSuccess({ status: 200, data: [] });
    } else {
      onError("Network error");
    }
  }, 1000);
}

makeRequest(
  "/api/users",
  (response) => console.log("Success:", response),
  (error) => console.log("Error:", error),
);
```

## Callback Context (this)

```javascript
const obj = {
  name: "MyObject",
  process(arr, callback) {
    arr.forEach((item) => {
      callback.call(this, item);
    });
  },
};

obj.process([1, 2, 3], function (item) {
  console.log(this.name, item);
});
```

## Best Practices

1. **Use named callbacks**: Improves readability
2. **Use Promises/Async**: For complex async flows
3. **Handle errors**: Always provide error handling
4. **Keep callbacks simple**: Avoid deep nesting
5. **Use arrow functions**: For lexical this
6. **Document callbacks**: Explain expected behavior

## Modern Alternatives

### Promises

```javascript
fetch("/api/users")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

### Async/Await

```javascript
async function getData() {
  const res = await fetch("/api/users");
  const data = await res.json();
  console.log(data);
}
```

## Summary

Callbacks:

- Functions passed as arguments
- Called at appropriate time
- Used for event handling, timers, array methods
- Can lead to callback hell with complex async
- Modern alternatives: Promises and Async/Await
- Still important to understand
