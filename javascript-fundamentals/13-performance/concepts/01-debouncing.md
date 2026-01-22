# DEBOUNCING

## What is Debouncing?

Debouncing is a technique to limit how often a function executes. It delays execution until after a specified time has passed without new calls.

**Use Case**: Search input, window resize, form validation

## Basic Debounce Pattern

```javascript
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 300);

input.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

## With Leading and Trailing Options

```javascript
function debounce(func, delay, options = {}) {
  let timeoutId;
  const { leading = false, trailing = true } = options;
  let lastCallTime;

  return function (...args) {
    const now = Date.now();

    // Call on leading edge
    if (leading && !timeoutId) {
      func.apply(this, args);
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      if (trailing) {
        func.apply(this, args);
      }
      timeoutId = null;
    }, delay);
  };
}
```

## Real-World Example: Search

```javascript
class SearchAPI {
  search(query) {
    return fetch(`/api/search?q=${query}`).then((r) => r.json());
  }
}

const api = new SearchAPI();
const debouncedSearch = debounce((query) => {
  api.search(query).then((results) => {
    displayResults(results);
  });
}, 300);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

## Form Validation Example

```javascript
const validateEmail = debounce((email) => {
  if (!email.includes("@")) {
    showError("Invalid email");
  } else {
    clearError();
  }
}, 500);

emailInput.addEventListener("input", (e) => {
  validateEmail(e.target.value);
});
```

## Immediate Debounce

```javascript
function debounceImmediate(func, delay) {
  let timeoutId;

  return function (...args) {
    const callNow = !timeoutId;

    if (callNow) {
      func.apply(this, args);
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, delay);
  };
}

// Calls function immediately, then ignores rapid calls
const debouncedClick = debounceImmediate(() => {
  submitForm();
}, 1000);
```

## Comparison with Throttle

| Debounce                | Throttle                  |
| ----------------------- | ------------------------- |
| Wait for pause in calls | Execute regularly         |
| Last value wins         | First/last value executed |
| Good for validation     | Good for scroll/resize    |

## Best Practices

✓ Use for expensive operations
✓ Set appropriate delay (300-500ms typical)
✓ Return function from debounce
✓ Clear timeout on unmount
✓ Combine with other techniques
✓ Document the delay value

✗ Don't debounce critical operations
✗ Don't ignore edge cases
✗ Don't use excessive delays
