# Events & Browser APIs: Timers

## setTimeout

Executes a function once after a specified delay (in milliseconds).

### Syntax

```javascript
const timeoutId = setTimeout(callback, delay, arg1, arg2, ...);
clearTimeout(timeoutId); // Cancel before execution
```

### Examples

```javascript
// Basic usage
setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);

// With arguments
setTimeout(
  (name, age) => {
    console.log(`${name} is ${age}`);
  },
  1000,
  "Alice",
  25,
);

// Clear timeout
const id = setTimeout(() => {
  console.log("This won't run");
}, 1000);
clearTimeout(id); // Cancels the timeout
```

## setInterval

Executes a function repeatedly at fixed intervals (in milliseconds).

### Syntax

```javascript
const intervalId = setInterval(callback, delay, arg1, arg2, ...);
clearInterval(intervalId); // Stop repetition
```

### Examples

```javascript
// Basic usage
let count = 0;
const id = setInterval(() => {
  count++;
  console.log(`Count: ${count}`);

  if (count >= 5) {
    clearInterval(id); // Stop after 5 iterations
  }
}, 1000);

// With arguments
setInterval(
  (message) => {
    console.log(message);
  },
  1000,
  "Hello!",
);
```

## Zero Delay setTimeout

setTimeout with 0 delay doesn't execute immediately. It's asynchronous:

```javascript
console.log("Start");

setTimeout(() => {
  console.log("setTimeout(0)"); // Runs after all sync code
}, 0);

console.log("End");

// Output:
// Start
// End
// setTimeout(0)
```

## Debouncing

Execute function only after action has stopped for specified time:

```javascript
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const handleSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 500);

// Multiple calls, but only executes once
handleSearch("a");
handleSearch("ab");
handleSearch("abc"); // Only this one executes after 500ms
```

### Use Cases for Debouncing

- Search input (wait for user to stop typing)
- Window resize (wait for resize to complete)
- Auto-save (wait for edits to stop)
- Form validation (validate after user stops typing)

## Throttling

Execute function at most once per specified time period:

```javascript
function throttle(func, limit) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

const handleScroll = throttle((event) => {
  console.log("Scroll handled");
}, 1000);

// Calls multiple times, but only once per second
// window.addEventListener('scroll', handleScroll);
```

### Use Cases for Throttling

- Scroll event (update position at intervals)
- Window resize (recalculate layout periodically)
- Mouse move (track position without lag)
- Button clicks (prevent double-submit)

## requestAnimationFrame

Schedules callback to run before next browser repaint. Better for animations:

```javascript
function animate() {
  console.log("Drawing frame");

  // Continue animation
  requestAnimationFrame(animate);
}

const frameId = requestAnimationFrame(animate);

// Cancel animation
cancelAnimationFrame(frameId);
```

### Advantages Over setTimeout

- Syncs with browser refresh rate (~60fps)
- Better performance for animations
- Browser optimizes accordingly
- Doesn't run if tab is hidden

### Animation Example

```javascript
let position = 0;
const element = document.getElementById("box");

function slide() {
  position += 5;
  element.style.left = position + "px";

  if (position < 300) {
    requestAnimationFrame(slide);
  }
}

requestAnimationFrame(slide);
```

## Recursive setTimeout

Better than setInterval for operations that need cleanup:

```javascript
function repeatingTask() {
  console.log("Task executing");

  // Schedule next execution
  setTimeout(repeatingTask, 1000);
}

repeatingTask();
```

### Advantages Over setInterval

- Easier to cancel (just don't reschedule)
- Timing is more precise
- Can handle variable delays
- Better for complex operations

## Timer Edge Cases

### Maximum Delay

```javascript
const MAX_INT = 2147483647; // ~24.8 days
setTimeout(() => {
  console.log("Maximum delay reached");
}, MAX_INT);
```

### Timer Execution Order

```javascript
// Timers with same delay execute in order added
setTimeout(() => console.log("First"), 100);
setTimeout(() => console.log("Second"), 100);
// Output: First, Second
```

### Nested setTimeout

```javascript
function nested() {
  console.log("Nested call");
  setTimeout(nested, 100);
}

const id = setTimeout(nested, 100);
clearTimeout(id); // Clears first timeout only
```

## setTimeout vs setInterval

| Feature      | setTimeout       | setInterval      |
| ------------ | ---------------- | ---------------- |
| Execution    | Once             | Repeated         |
| Control      | Single ID        | Needs tracking   |
| Timing       | More precise     | Drifts over time |
| Cancellation | Simple           | Need to track ID |
| Use case     | One-time actions | Regular updates  |

## Practical Patterns

### Pattern 1: Delayed Action

```javascript
const delayedAction = setTimeout(() => {
  // Do something after 2 seconds
}, 2000);

// Can cancel if needed
clearTimeout(delayedAction);
```

### Pattern 2: Polling

```javascript
let attempts = 0;
const maxAttempts = 5;

function poll() {
  attempts++;
  console.log(`Attempt ${attempts}`);

  if (checkCondition()) {
    console.log("Condition met");
  } else if (attempts < maxAttempts) {
    setTimeout(poll, 1000); // Retry after 1s
  }
}

poll();
```

### Pattern 3: Debounced Search

```javascript
let searchTimeout;

document.getElementById("search").addEventListener("input", (e) => {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    const query = e.target.value;
    performSearch(query);
  }, 300);
});
```

## Best Practices

1. **Always clear timers**: Prevent memory leaks
2. **Use debounce/throttle**: Optimize event handlers
3. **Prefer requestAnimationFrame**: For smooth animations
4. **Use recursive setTimeout**: For complex repeating tasks
5. **Store timer IDs**: So you can cancel them
6. **Handle errors**: Wrap timer callbacks in try-catch
7. **Avoid blocking timers**: Don't do heavy work in callbacks

## Common Mistakes

```javascript
// ❌ Wrong: Missing clearInterval
setInterval(() => {
  console.log("Memory leak!");
}, 1000);

// ✅ Correct: Store ID and clear
const id = setInterval(() => {
  console.log("Managed properly");
}, 1000);
// Later: clearInterval(id);

// ❌ Wrong: Forgetting setTimeout is async
const result = setTimeout(() => "done", 100);
console.log(result); // undefined (not the result)

// ✅ Correct: Use callback or promise
new Promise((resolve) => {
  setTimeout(() => resolve("done"), 100);
}).then((result) => console.log(result));
```

## Summary

Timers are essential for delayed and repeated actions:

- **setTimeout**: Execute once after delay
- **setInterval**: Execute repeatedly
- **requestAnimationFrame**: Optimize animations
- **Debounce/Throttle**: Control event frequency
- **Always clear timers**: Prevent memory leaks
- **Async by nature**: Even 0ms delay is asynchronous
