# MEMOIZATION

## What is Memoization?

Memoization is a technique to optimize function performance by caching the results of expensive function calls based on input arguments.

**Use Case**: Expensive calculations, recursive functions, API responses, computed properties

## Basic Memoization

```javascript
function memoize(func) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log("Cache hit for", args);
      return cache[key];
    }

    console.log("Computing for", args);
    const result = func.apply(this, args);
    cache[key] = result;

    return result;
  };
}

// Expensive calculation
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(5)); // Computes
console.log(fibonacci(5)); // Cache hit
```

## Memoization with TTL (Time-To-Live)

```javascript
function memoizeWithTTL(func, ttl = 5000) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (key in cache) {
      const { value, timestamp } = cache[key];
      if (now - timestamp < ttl) {
        console.log("Cache hit:", args);
        return value;
      } else {
        delete cache[key];
      }
    }

    console.log("Computing:", args);
    const result = func.apply(this, args);
    cache[key] = { value: result, timestamp: now };

    return result;
  };
}

// API fetch with cache expiration
const fetchUser = memoizeWithTTL(async (id) => {
  return fetch(`/api/users/${id}`).then((r) => r.json());
}, 10000);
```

## Memoization with LRU Cache

```javascript
class LRUCache {
  constructor(maxSize = 10) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    this.cache.delete(key);
    this.cache.set(key, this.cache.get(key));
    return this.cache.get(key);
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

function memoizeWithLRU(func, maxSize = 10) {
  const cache = new LRUCache(maxSize);

  return function (...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);

    if (cached !== null) {
      console.log("Cache hit:", args);
      return cached;
    }

    console.log("Computing:", args);
    const result = func.apply(this, args);
    cache.set(key, result);

    return result;
  };
}
```

## React useMemo Hook

```javascript
// Without memoization: recalculates on every render
function expensiveOperation(arr) {
  console.log("Computing expensive operation");
  return arr.reduce((sum, num) => sum + num, 0);
}

function Component({ numbers }) {
  // Recalculates every render
  const total = expensiveOperation(numbers);
  return <div>{total}</div>;
}

// With useMemo: caches until dependencies change
import { useMemo } from "react";

function Component({ numbers }) {
  const total = useMemo(() => {
    console.log("Computing expensive operation");
    return numbers.reduce((sum, num) => sum + num, 0);
  }, [numbers]); // Only recalculates if numbers changes

  return <div>{total}</div>;
}
```

## React.memo for Component Memoization

```javascript
// Without memoization: always re-renders
const UserCard = ({ user, onDelete }) => {
  console.log("UserCard re-rendered");
  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
};

// With memoization: only re-renders if props change
const UserCard = React.memo(({ user, onDelete }) => {
  console.log("UserCard re-rendered");
  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
});

// Custom comparison
const UserCard = React.memo(
  ({ user, onDelete }) => {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id;
  },
);
```

## Memoization with Maximum Size

```javascript
function memoizeWithMaxSize(func, maxSize = 50) {
  const cache = [];

  return function (...args) {
    const key = JSON.stringify(args);
    const cached = cache.find((c) => c.key === key);

    if (cached) {
      console.log("Cache hit:", args);
      return cached.value;
    }

    console.log("Computing:", args);
    const result = func.apply(this, args);

    cache.push({ key, value: result });
    if (cache.length > maxSize) {
      cache.shift();
    }

    return result;
  };
}
```

## Performance Comparison

```javascript
// Without memoization
const slowFibonacci = (n) => {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
};

console.time("slowFibonacci");
console.log(slowFibonacci(35)); // ~5000ms
console.timeEnd("slowFibonacci");

// With memoization
const fastFibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fastFibonacci(n - 1) + fastFibonacci(n - 2);
});

console.time("fastFibonacci");
console.log(fastFibonacci(35)); // ~1ms
console.timeEnd("fastFibonacci");
```

## Cache Invalidation

```javascript
function createMemoizedFunction(func) {
  const cache = {};

  function memoized(...args) {
    const key = JSON.stringify(args);
    if (!(key in cache)) {
      cache[key] = func.apply(this, args);
    }
    return cache[key];
  }

  memoized.clear = () => {
    Object.keys(cache).forEach((key) => delete cache[key]);
  };

  memoized.clearKey = (...args) => {
    const key = JSON.stringify(args);
    delete cache[key];
  };

  return memoized;
}

const compute = createMemoizedFunction((x) => x * x);
console.log(compute(5)); // Computing
console.log(compute(5)); // Cached
compute.clearKey(5);
console.log(compute(5)); // Computing again
compute.clear();
```

## Best Practices

✓ Use for pure functions only
✓ Cache expensive operations
✓ Set reasonable cache sizes
✓ Implement TTL for dynamic data
✓ Clear cache when data changes
✓ Test cache hit rates
✓ Monitor memory usage

✗ Don't memoize simple operations
✗ Don't cache impure functions
✗ Don't ignore memory limits
✗ Don't cache user-sensitive data
✗ Don't use objects as args without normalization
