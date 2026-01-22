# Call Stack: Execution Order

## What is the Call Stack?

The call stack is a data structure that JavaScript uses to keep track of function calls. It's a Last-In-First-Out (LIFO) structure, meaning the most recently called function is at the top and gets executed first.

## How the Call Stack Works

```javascript
function first() {
  console.log("In first");
  second();
  console.log("Back in first");
}

function second() {
  console.log("In second");
  third();
  console.log("Back in second");
}

function third() {
  console.log("In third");
}

first();
```

### Stack Evolution

1. **Initial**: `[Global]`
2. **first() called**: `[Global, first()]`
3. **second() called**: `[Global, first(), second()]`
4. **third() called**: `[Global, first(), second(), third()]`
5. **third() returns**: `[Global, first(), second()]`
6. **second() returns**: `[Global, first()]`
7. **first() returns**: `[Global]`

## Stack Overflow

Infinite recursion exceeds the stack limit:

```javascript
function infinite() {
  infinite(); // RangeError: Maximum call stack size exceeded
}
```

## Safe Recursion with Base Case

```javascript
function countdown(n) {
  if (n <= 0) return; // Base case - stop recursion
  console.log(n);
  countdown(n - 1);
}

countdown(5); // 5, 4, 3, 2, 1
```

## Call Stack Depth

Modern JavaScript engines typically allow:

- Chrome/Firefox: ~10,000-15,000 frames
- Safari: ~30,000+ frames
- Varies by system and browser

## Tail Call Optimization (TCO)

Some engines optimize tail calls (ES6 strict mode in Safari):

```javascript
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  // Tail call - returns result directly
  return factorial(n - 1, n * acc);
}

// With TCO, stack doesn't grow (reuses frame)
```

## Stack Traces

Errors display stack traces showing the call order:

```javascript
function a() {
  b();
}

function b() {
  c();
}

function c() {
  throw new Error("Error here");
}

a(); // Stack trace: a() → b() → c()
```

## Call Stack vs Memory Heap

| Call Stack             | Memory Heap        |
| ---------------------- | ------------------ |
| Function calls         | Objects, arrays    |
| Variables (primitives) | Dynamic data       |
| LIFO structure         | No specific order  |
| Limited size           | Larger size        |
| Automatic cleanup      | Garbage collection |

## Practical Example: Call Stack Order

```javascript
function taskA() {
  console.log("A: start");
  taskB();
  console.log("A: end");
}

function taskB() {
  console.log("B: start");
  taskC();
  console.log("B: end");
}

function taskC() {
  console.log("C: start");
  console.log("C: end");
}

taskA();
```

Output:

```
A: start
B: start
C: start
C: end
B: end
A: end
```

## Debugging with Call Stack

Use browser DevTools or Node.js debugger to view call stack:

```javascript
function problem() {
  // Set breakpoint here in DevTools
  const error = new Error();
  console.log(error.stack); // View stack trace
}

problem();
```

## Summary

The call stack:

- Tracks function call order (LIFO)
- Automatically pushes on function call
- Automatically pops on function return
- Limited depth causes stack overflow
- Essential for debugging
- Different from memory heap
