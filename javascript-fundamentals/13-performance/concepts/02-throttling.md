# THROTTLING

## What is Throttling?

Throttling ensures a function executes at most once per specified time interval. It executes regularly at fixed intervals rather than waiting for a pause.

**Use Case**: Scroll events, resize events, button clicks, API polling

## Basic Throttle Pattern

```javascript
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

// Usage
const throttledScroll = throttle(() => {
  console.log("Scroll event fired");
}, 300);

window.addEventListener("scroll", throttledScroll);
```

## Throttle with Timestamp

```javascript
function throttle(func, limit) {
  let lastFunc;
  let lastRan;

  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
}
```

## Scroll Position Tracking

```javascript
class ScrollTracker {
  constructor() {
    this.throttledScroll = throttle(() => {
      this.updateScrollPosition();
    }, 200);
  }

  updateScrollPosition() {
    const scrollPercentage =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    console.log(`Scroll: ${scrollPercentage.toFixed(2)}%`);
  }

  attach() {
    window.addEventListener("scroll", this.throttledScroll);
  }

  detach() {
    window.removeEventListener("scroll", this.throttledScroll);
  }
}

const tracker = new ScrollTracker();
tracker.attach();
```

## Window Resize Handler

```javascript
const throttledResize = throttle(() => {
  console.log(`Window size: ${window.innerWidth}x${window.innerHeight}`);
  adjustLayout();
}, 250);

window.addEventListener("resize", throttledResize);
```

## Mouse Move Tracking

```javascript
const throttledMouseMove = throttle((event) => {
  updateCursorPosition(event.clientX, event.clientY);
}, 100);

document.addEventListener("mousemove", throttledMouseMove);
```

## Difference Between Debounce and Throttle

**Debounce:**

- Waits for pause in calls
- Executes once after delay
- Good for: search, validation
- Last value wins

**Throttle:**

- Executes at regular intervals
- Maintains execution frequency
- Good for: scroll, resize, tracking
- Both first and last values can execute

## Visual Comparison

```javascript
// Original: 5 rapid calls
//
// Debounce (300ms):
// ▁▁▁▁▁ (wait) X
//                 └─ Executes once
//
// Throttle (300ms):
// X▁▁▁X▁▁▁X
//   └────────── Executes every 300ms
```

## Performance Impact

```javascript
// Without throttle: 60 events per scroll animation
const unthrottledScroll = () => {
  updateUI(); // 60 calls = expensive
};

// With throttle (100ms): ~10 events per scroll
const throttledScroll = throttle(() => {
  updateUI(); // 10 calls = optimized
}, 100);
```

## Best Practices

✓ Use for high-frequency events (scroll, mousemove, resize)
✓ Adjust interval based on performance needs
✓ Always provide visual feedback
✓ Test across devices
✓ Clean up listeners on unmount
✓ Combine with debounce for complex flows

✗ Don't throttle critical operations
✗ Don't use excessive delays
✗ Don't ignore trailing function calls
✗ Don't throttle everything indiscriminately

## Advanced: RequestAnimationFrame Throttle

```javascript
function throttleRAF(func) {
  let frameId;
  let lastRan = 0;

  return function (...args) {
    if (!frameId) {
      frameId = requestAnimationFrame(() => {
        func.apply(this, args);
        frameId = null;
      });
    }
  };
}

// Syncs with browser repaint (60fps)
const throttledRAFScroll = throttleRAF(() => {
  updateAnimations();
});

window.addEventListener("scroll", throttledRAFScroll);
```
