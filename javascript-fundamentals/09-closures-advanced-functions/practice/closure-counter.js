/**
 * Module 9: Closures & Advanced Functions
 * Practice: Closure Counter, Custom Handler, Private State
 *
 * Practice exercises for closures and advanced functions
 */

// ============================================
// EXERCISE 1: CLOSURE COUNTER
// ============================================
console.log("=== Exercise 1: Closure Counter ===\n");

function makeCounter() {
  let count = 0;

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = makeCounter();
console.log("Counter:", counter.increment()); // 1
console.log("Counter:", counter.increment()); // 2
console.log("Counter:", counter.decrement()); // 1

// ============================================
// EXERCISE 2: CUSTOM HANDLER
// ============================================
console.log("\n=== Exercise 2: Custom Handler ===\n");

function createEventHandler() {
  const listeners = [];

  return {
    subscribe(callback) {
      listeners.push(callback);
    },
    emit(...args) {
      listeners.forEach((fn) => fn(...args));
    },
  };
}

const handler = createEventHandler();

handler.subscribe((msg) => {
  console.log("Listener 1:", msg);
});

handler.subscribe((msg) => {
  console.log("Listener 2:", msg);
});

handler.emit("Event fired!");

// ============================================
// EXERCISE 3: PRIVATE STATE
// ============================================
console.log("\n=== Exercise 3: Private State ===\n");

const bankAccount = (function () {
  let balance = 1000;

  return {
    deposit(amount) {
      balance += amount;
      return `Deposited: $${amount}, Balance: $${balance}`;
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return `Withdrew: $${amount}, Balance: $${balance}`;
      }
      return "Insufficient funds";
    },
    getBalance() {
      return balance;
    },
  };
})();

console.log(bankAccount.deposit(500));
console.log(bankAccount.withdraw(200));
console.log("Balance:", bankAccount.getBalance());

// ============================================
// EXERCISE 4: RATE LIMITER
// ============================================
console.log("\n=== Exercise 4: Rate Limiter ===\n");

function createRateLimiter(maxCalls, timeWindow) {
  let calls = [];

  return function (fn) {
    return function (...args) {
      const now = Date.now();
      calls = calls.filter((time) => now - time < timeWindow);

      if (calls.length < maxCalls) {
        calls.push(now);
        return fn(...args);
      } else {
        return "Rate limit exceeded";
      }
    };
  };
}

const limiter = createRateLimiter(2, 1000);
const limitedLog = limiter((msg) => console.log("LOG:", msg));

console.log(limitedLog("Message 1")); // Works
console.log(limitedLog("Message 2")); // Works
console.log(limitedLog("Message 3")); // Rate limit exceeded

// ============================================
// SUMMARY
// ============================================
console.log("\n=== PRACTICE SUMMARY ===\n");
console.log("✓ Closure Counter: private state");
console.log("✓ Custom Handler: event emitter pattern");
console.log("✓ Private State: encapsulation");
console.log("✓ Rate Limiter: throttling pattern");
