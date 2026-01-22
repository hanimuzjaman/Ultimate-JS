// OPTIMIZED TASK EXECUTION PRACTICE

// Practice 1: Task Batching - Execute Tasks Efficiently
class TaskBatcher {
  constructor(batchSize = 100) {
    this.queue = [];
    this.batchSize = batchSize;
    this.isProcessing = false;
  }

  addTask(task) {
    this.queue.push(task);
    if (!this.isProcessing) {
      this.processBatch();
    }
  }

  processBatch() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const batch = this.queue.splice(0, this.batchSize);

    // Execute batch
    const startTime = Date.now();
    batch.forEach((task) => task());
    const duration = Date.now() - startTime;

    console.log(`Processed batch of ${batch.length} tasks in ${duration}ms`);

    // Schedule next batch
    setImmediate(() => this.processBatch());
  }
}

// Test task batcher
const batcher = new TaskBatcher(50);
for (let i = 0; i < 250; i++) {
  batcher.addTask(() => {
    // Simulate work
    let sum = 0;
    for (let j = 0; j < 1000; j++) {
      sum += j;
    }
  });
}

// Practice 2: Debounce and Throttle for Event Handlers
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Simulated scroll event optimization
const scrollMetrics = {
  unoptimized: 0,
  throttled: 0,
  debounced: 0,
};

const unoptimizedScroll = () => {
  scrollMetrics.unoptimized++;
};

const throttledScroll = throttle(() => {
  scrollMetrics.throttled++;
}, 100);

const debouncedScroll = debounce(() => {
  scrollMetrics.debounced++;
}, 100);

console.log("\n=== Event Handler Optimization ===");

// Simulate 100 rapid scroll events
for (let i = 0; i < 100; i++) {
  unoptimizedScroll();
  throttledScroll();
  debouncedScroll();
}

setTimeout(() => {
  console.log("After 100 events:");
  console.log(`  Unoptimized: ${scrollMetrics.unoptimized} handler calls`);
  console.log(`  Throttled: ${scrollMetrics.throttled} handler calls`);
  console.log(
    `  Debounced: ${scrollMetrics.debounced} handler calls (pending)`,
  );
}, 200);

// Practice 3: Lazy Loading with Intersection Observer Pattern
class LazyLoader {
  constructor() {
    this.items = [];
    this.loadedCount = 0;
  }

  observe(itemId) {
    // Simulate intersection observer
    this.items.push(itemId);
    return {
      isIntersecting: false,
      target: { id: itemId },
    };
  }

  load(itemId) {
    console.log(`Loading item: ${itemId}`);
    this.loadedCount++;
  }

  simulateScroll() {
    // Simulate items coming into view as user scrolls
    this.items.forEach((itemId, index) => {
      setTimeout(() => {
        this.load(itemId);
      }, index * 100);
    });
  }
}

const lazyLoader = new LazyLoader();
for (let i = 0; i < 10; i++) {
  lazyLoader.observe(`item_${i}`);
}
lazyLoader.simulateScroll();

// Practice 4: Request Deduplication
class RequestDeduplicator {
  constructor() {
    this.pendingRequests = new Map();
  }

  async request(key, fn) {
    // If request already pending, return existing promise
    if (this.pendingRequests.has(key)) {
      console.log(`Request ${key}: Using cached promise`);
      return this.pendingRequests.get(key);
    }

    console.log(`Request ${key}: Creating new request`);
    const promise = fn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

const deduplicator = new RequestDeduplicator();

async function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  Fetched user ${userId} data`);
      resolve({ id: userId, name: `User ${userId}` });
    }, 500);
  });
}

async function testDeduplication() {
  console.log("\n=== Request Deduplication ===");

  // Multiple requests for same user
  await Promise.all([
    deduplicator.request("user_1", () => fetchUserData(1)),
    deduplicator.request("user_1", () => fetchUserData(1)),
    deduplicator.request("user_1", () => fetchUserData(1)),
  ]);
}

testDeduplication().catch(console.error);

// Practice 5: Memory-Efficient Array Processing
function processLargeArray(fn) {
  const size = 1000000;
  const chunkSize = 1000;

  console.log("\n=== Memory-Efficient Array Processing ===");
  console.log(`Processing ${size} items in chunks of ${chunkSize}`);

  let processed = 0;
  const startTime = Date.now();

  function processChunk(start) {
    if (start >= size) {
      const duration = Date.now() - startTime;
      console.log(`Processed ${processed} items in ${duration}ms`);
      return;
    }

    const end = Math.min(start + chunkSize, size);
    for (let i = start; i < end; i++) {
      fn(i);
      processed++;
    }

    // Yield to event loop
    setImmediate(() => processChunk(end));
  }

  processChunk(0);
}

processLargeArray((item) => {
  // Simulate work
  Math.sqrt(item);
});

// Practice 6: Connection Pooling Simulation
class ConnectionPool {
  constructor(maxConnections = 5) {
    this.maxConnections = maxConnections;
    this.activeConnections = 0;
    this.queue = [];
  }

  async execute(task) {
    while (this.activeConnections >= this.maxConnections) {
      await new Promise((resolve) => this.queue.push(resolve));
    }

    this.activeConnections++;
    console.log(
      `Executing task (${this.activeConnections}/${this.maxConnections} active)`,
    );

    try {
      return await task();
    } finally {
      this.activeConnections--;
      const resolve = this.queue.shift();
      if (resolve) resolve();
    }
  }
}

async function testConnectionPooling() {
  console.log("\n=== Connection Pooling ===");
  const pool = new ConnectionPool(3);

  const tasks = Array.from(
    { length: 10 },
    (_, i) => () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log(`  Task ${i} completed`);
          resolve();
        }, 100);
      }),
  );

  await Promise.all(tasks.map((task) => pool.execute(task)));
}

testConnectionPooling().catch(console.error);

// Practice 7: Memoization Cache with Size Limit
class LRUCache {
  constructor(maxSize = 10) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    // Move to end (most recent)
    this.cache.delete(key);
    this.cache.set(key, this.cache.get(key));
    return this.cache.get(key);
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

const memoCache = new LRUCache(5);
console.log("\n=== LRU Cache Memoization ===");

function expensiveFunction(n) {
  const cached = memoCache.get(n);
  if (cached !== null) {
    console.log(`Cache hit for ${n}`);
    return cached;
  }

  console.log(`Computing for ${n}`);
  const result = n * n;
  memoCache.set(n, result);
  return result;
}

for (let i = 1; i <= 8; i++) {
  expensiveFunction(i);
}

// Practice 8: Priority Queue for Task Scheduling
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const item = { element, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (item.priority > this.items[i].priority) {
        this.items.splice(i, 0, item);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(item);
    }
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

console.log("\n=== Priority Queue Task Scheduling ===");
const taskQueue = new PriorityQueue();

taskQueue.enqueue("Low priority task", 1);
taskQueue.enqueue("High priority task", 10);
taskQueue.enqueue("Medium priority task", 5);

while (!taskQueue.isEmpty()) {
  const task = taskQueue.dequeue();
  console.log(`Executing: ${task.element} (priority: ${task.priority})`);
}

// Practice 9: Batch Operations with Microtask Queue
function batchOperations(operations) {
  console.log("\n=== Batch Operations with Microtasks ===");

  const results = [];

  return new Promise((resolve) => {
    let index = 0;

    function processBatch() {
      const batchSize = 10;
      const end = Math.min(index + batchSize, operations.length);

      for (; index < end; index++) {
        results.push(operations[index]());
      }

      if (index < operations.length) {
        // Use microtask queue (faster than setTimeout)
        Promise.resolve().then(processBatch);
      } else {
        resolve(results);
      }
    }

    processBatch();
  });
}

const operations = Array.from({ length: 50 }, (_, i) => () => i * 2);
batchOperations(operations).then((results) => {
  console.log(`Processed ${results.length} operations`);
});

// Practice 10: Resource Cleanup Pattern
class Resource {
  constructor(id) {
    this.id = id;
    this.data = new Array(1000).fill(0);
  }

  dispose() {
    console.log(`Cleaning up resource ${this.id}`);
    this.data = null;
  }
}

class ResourceManager {
  constructor(maxResources = 5) {
    this.maxResources = maxResources;
    this.resources = new Map();
  }

  create(id) {
    if (this.resources.size >= this.maxResources) {
      const oldestId = this.resources.keys().next().value;
      this.resources.get(oldestId).dispose();
      this.resources.delete(oldestId);
    }

    const resource = new Resource(id);
    this.resources.set(id, resource);
    return resource;
  }

  get(id) {
    return this.resources.get(id);
  }

  dispose() {
    this.resources.forEach((resource) => resource.dispose());
    this.resources.clear();
  }
}

console.log("\n=== Resource Cleanup Pattern ===");
const manager = new ResourceManager(3);

for (let i = 0; i < 5; i++) {
  manager.create(i);
  console.log(`Created resource ${i} (total: ${manager.resources.size})`);
}

manager.dispose();
console.log("All resources cleaned up");

// Practice 11: Pattern Selection Guide
console.log("\n=== Performance Pattern Selection Guide ===");
console.log(
  "✓ Use Debounce for: search inputs, form validation, resize handlers",
);
console.log("✓ Use Throttle for: scroll events, mouse move, resize tracking");
console.log("✓ Use Batching for: processing large datasets without blocking");
console.log("✓ Use Caching for: expensive computations, API responses");
console.log("✓ Use Connection Pooling for: database/HTTP requests");
console.log("✓ Use Request Deduplication for: avoiding duplicate API calls");
console.log("✓ Use Priority Queue for: task scheduling with urgency");
console.log("✓ Use Resource Cleanup for: preventing memory leaks");
