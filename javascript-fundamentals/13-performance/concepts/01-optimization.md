# Performance Optimization Techniques

## Debouncing

Delay execution until user stops triggering events:

```javascript
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 300);

// Every keystroke resets the timer
input.addEventListener("input", (e) => {
  search(e.target.value);
});
// Actually searches only 300ms after user stops typing
```

## Throttling

Limit execution frequency:

```javascript
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll event");
  updateUI();
}, 1000);

window.addEventListener("scroll", handleScroll);
// Fires at most once per second
```

## Memoization

Cache function results:

```javascript
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("From cache");
      return cache.get(key);
    }

    console.log("Computing");
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // Computing...
console.log(fibonacci(10)); // From cache
```

## Lazy Loading

Delay loading until needed:

```javascript
// Image lazy loading
const images = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

images.forEach((img) => imageObserver.observe(img));
```

## RequestAnimationFrame

Synchronize with browser refresh rate:

```javascript
// ❌ Bad - arbitrary timing
setInterval(() => {
  updateAnimation();
}, 16);

// ✓ Good - synced with browser
function animate() {
  updateAnimation();
  requestAnimationFrame(animate);
}

animate();
```

## Code Splitting

Load code only when needed:

```javascript
// Dynamic import
async function handleClick() {
  const module = await import("./heavy-module.js");
  module.doSomething();
}

button.addEventListener("click", handleClick);
// Module only loads when button clicked
```

## Virtual Scrolling

Render only visible items in long lists:

```javascript
class VirtualList {
  constructor(items, itemHeight, container) {
    this.items = items;
    this.itemHeight = itemHeight;
    this.container = container;
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight);

    this.container.addEventListener("scroll", () => this.render());
    this.render();
  }

  render() {
    const scrollTop = this.container.scrollTop;
    const startIndex = Math.floor(scrollTop / this.itemHeight);

    const visibleItems = this.items.slice(
      startIndex,
      startIndex + this.visibleCount + 1,
    );

    // Render only visible items
    this.container.innerHTML = visibleItems
      .map((item) => `<div>${item}</div>`)
      .join("");
  }
}
```

## DocumentFragment for Batch DOM Updates

```javascript
// ❌ Slow - multiple DOM updates
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  ul.appendChild(li); // Reflow each time
}

// ✓ Fast - single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
ul.appendChild(fragment); // Single reflow
```

## Web Workers

Run JS in background thread:

```javascript
// main.js
const worker = new Worker("worker.js");

worker.postMessage({ number: 10 });

worker.onmessage = (e) => {
  console.log("Result:", e.data);
};

// worker.js
self.onmessage = (e) => {
  const result = heavyComputation(e.data.number);
  self.postMessage(result);
};
```

## Intersection Observer

Detect when elements enter viewport:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Load content, start animation, etc
    } else {
      entry.target.classList.remove("visible");
    }
  });
});

// Observe multiple elements
document.querySelectorAll(".lazy-load").forEach((el) => {
  observer.observe(el);
});
```

## Memory Management

Prevent memory leaks:

```javascript
// ❌ Memory leak - event listener not removed
element.addEventListener("click", handleClick);
// If element is removed, listener still in memory

// ✓ Remove listeners when cleanup
element.addEventListener("click", handleClick);
element.addEventListener("destroy", () => {
  element.removeEventListener("click", handleClick);
});

// ✓ Or use once option
element.addEventListener("click", handleClick, { once: true });

// Avoid closures holding references
function createHandlers() {
  const handlers = [];
  for (let i = 0; i < 1000; i++) {
    handlers.push(() => {
      // Don't reference large data structures
      return i;
    });
  }
  return handlers; // Keep handlers small
}
```

## Big O Notation

Time complexity analysis:

```javascript
// O(1) - Constant time
function getFirstElement(arr) {
  return arr[0];
}

// O(n) - Linear time
function findMax(arr) {
  let max = arr[0];
  for (let item of arr) {
    if (item > max) max = item;
  }
  return max;
}

// O(n²) - Quadratic time - avoid for large datasets
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// O(log n) - Binary search (fast)
function binarySearch(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

## Algorithmic Optimization

```javascript
// Finding duplicates

// ❌ O(n²) - nested loop
function hasDuplicate_Slow(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// ✓ O(n) - using Set
function hasDuplicate_Fast(arr) {
  return new Set(arr).size !== arr.length;
}

// Remove duplicates

// ❌ O(n²)
function removeDuplicates_Slow(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// ✓ O(n)
function removeDuplicates_Fast(arr) {
  return [...new Set(arr)];
}
```

## Profiling and Measurement

```javascript
// Performance API
const start = performance.now();
expensiveOperation();
const end = performance.now();
console.log(`Took ${end - start}ms`);

// Console timing
console.time("myTimer");
expensiveOperation();
console.timeEnd("myTimer"); // Logs time

// Mark and measure
performance.mark("startComputation");
compute();
performance.mark("endComputation");
performance.measure("computation", "startComputation", "endComputation");

const measure = performance.getEntriesByName("computation")[0];
console.log(`Time: ${measure.duration}ms`);
```

## Practical Optimization Example

```javascript
class DataProcessor {
  constructor(data) {
    this.data = data;
    this.cache = new Map();
  }

  // Memoized computation
  getStatistics(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const stats = {
      sum: this.data.reduce((a, b) => a + b, 0),
      mean: this.data.reduce((a, b) => a + b, 0) / this.data.length,
      max: Math.max(...this.data),
      min: Math.min(...this.data),
    };

    this.cache.set(key, stats);
    return stats;
  }

  // Batch operations
  processInBatches(batchSize = 100) {
    const results = [];
    for (let i = 0; i < this.data.length; i += batchSize) {
      const batch = this.data.slice(i, i + batchSize);
      results.push(this.processBatch(batch));
    }
    return results;
  }

  processBatch(batch) {
    return batch.map((item) => item * 2);
  }
}
```
