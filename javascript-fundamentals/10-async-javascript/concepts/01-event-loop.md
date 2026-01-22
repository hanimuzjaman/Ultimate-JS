# The Event Loop: How JavaScript Handles Async

## What is the Event Loop?

The event loop is JavaScript's mechanism for handling asynchronous operations. It's constantly checking if there's work to do and executing code appropriately.

## Call Stack and Event Queue

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Async");
}, 0);

console.log("End");

// Output:
// Start
// End
// Async
```

The synchronous code (`Start`, `End`) executes first, then the async callback.

## Microtasks vs Macrotasks

### Microtasks

Execute before the next paint:

- Promises (`then`, `catch`, `finally`)
- `queueMicrotask()`
- `MutationObserver`

### Macrotasks

Execute one at a time:

- `setTimeout`
- `setInterval`
- `setImmediate` (Node.js)
- I/O operations
- UI rendering

## Event Loop Order

1. Execute all synchronous code (call stack)
2. Execute all microtasks (promise queues)
3. Render (if needed)
4. Execute next macrotask
5. Back to step 2

## Example: Execution Order

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// Output:
// Start
// End
// Promise (microtask)
// Timeout (macrotask)
```

## Multiple Promises

```javascript
Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

setTimeout(() => {
  console.log("Timeout");
}, 0);

// Output:
// Promise 1
// Promise 2
// Timeout
```

All microtasks run before any macrotasks.

## Blocking the Event Loop

Long operations freeze the UI:

```javascript
// ❌ Blocks event loop
function heavyComputation() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i; // Takes seconds!
  }
  return sum;
}

// ✅ Better: use async
async function betterComputation() {
  const result = await heavyComputation();
  // Doesn't block
}
```

## requestAnimationFrame

Executes before repaint (between macrotask and paint):

```javascript
requestAnimationFrame(() => {
  // Runs ~60fps, synced with display
  console.log("Animation frame");
});
```

## Visual Timeline

```
┌─────────────────────────────────────┐
│ 1. Call Stack                       │
│    (Synchronous code)               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 2. Microtask Queue                  │
│    (Promises, queueMicrotask)       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 3. Render (if needed)               │
│    (Animation frames)               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 4. Macrotask Queue                  │
│    (setTimeout, I/O)                │
└─────────────────────────────────────┘
              ↓
           Repeat
```

## Complex Example

```javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3");
    setTimeout(() => {
      console.log("4");
    }, 0);
  })
  .then(() => {
    console.log("5");
  });

console.log("6");

// Output:
// 1
// 6
// 3
// 5
// 2
// 4
```

## Practical Implications

### 1. Promises Execute First

```javascript
// This logs before setTimeout
Promise.resolve().then(() => console.log("Promise"));
setTimeout(() => console.log("Timeout"), 0);
```

### 2. Always Use Async for Heavy Work

```javascript
// ❌ Blocks UI
while (count < 1000000) count++;

// ✅ Doesn't block
for (let i = 0; i < 1000; i++) {
  await delay(0); // Yield to event loop
}
```

### 3. Understand Timing

```javascript
setTimeout(() => {
  console.log('This might not be "immediate"');
  // Depends on other tasks
}, 0);
```

## Debugging Event Loop Issues

Use DevTools Performance tab to see:

- Long tasks blocking main thread
- Janky animations (dropped frames)
- Memory issues

## Summary

The event loop:

- Powers JavaScript's async capabilities
- Handles microtasks before macrotasks
- Synchronous code runs first
- Promises execute before setTimeout
- Understanding it helps write responsive code
- Long operations should be broken into chunks
