// DEBOUNCED SEARCH PRACTICE

// Practice 1: Basic Debounced Search
// Create a search input that shows results after debouncing
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const mockUsers = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "David Wilson" },
  { id: 5, name: "Eve Davis" },
];

function performSearch(query) {
  console.log(`Searching for: "${query}"`);
  if (query.length === 0) return [];
  return mockUsers.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase()),
  );
}

const debouncedSearch = debounce(performSearch, 300);

// Simulate typing
const queries = ["a", "al", "ali", "alic", "alice"];
queries.forEach((query, index) => {
  setTimeout(() => debouncedSearch(query), index * 100);
});

// Practice 2: Search with API Call
// Simulates a more realistic scenario with delayed response
function simulateAPICall(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockUsers.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()),
      );
      console.log(`API results for "${query}":`, results);
      resolve(results);
    }, 500);
  });
}

const debouncedAPISearch = debounce(async (query) => {
  if (query.length > 0) {
    const results = await simulateAPICall(query);
    displayResults(results);
  }
}, 400);

function displayResults(results) {
  console.log("Displaying results:", results);
}

// Test
setTimeout(() => {
  debouncedAPISearch("ch");
}, 0);
setTimeout(() => {
  debouncedAPISearch("cha");
}, 50);
setTimeout(() => {
  debouncedAPISearch("charl");
}, 100);
setTimeout(() => {
  debouncedAPISearch("charlie");
}, 150);

// Practice 3: Form Validation Debounce
// Validate email in real-time with debounce
function validateEmail(email) {
  console.log(`Validating email: ${email}`);
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (isValid) {
    console.log("✓ Email is valid");
  } else {
    console.log("✗ Email is invalid");
  }
  return isValid;
}

const debouncedValidateEmail = debounce(validateEmail, 500);

// Simulate user typing email
const emails = [
  "j",
  "jo",
  "joh",
  "john",
  "john@",
  "john@ex",
  "john@exam",
  "john@example",
  "john@example.",
  "john@example.c",
  "john@example.co",
  "john@example.com",
];

emails.forEach((email, index) => {
  setTimeout(() => debouncedValidateEmail(email), index * 50);
});

// Practice 4: Auto-save Functionality
// Save document after user stops typing
class AutoSaveDocument {
  constructor() {
    this.content = "";
    this.saveCount = 0;
    this.debouncedSave = debounce(() => this.save(), 1000);
  }

  updateContent(newContent) {
    this.content = newContent;
    console.log(`Content changed: ${this.content.length} characters`);
    this.debouncedSave();
  }

  save() {
    this.saveCount++;
    console.log(
      `Saving (count: ${this.saveCount})... Content: "${this.content}"`,
    );
  }

  getContent() {
    return this.content;
  }
}

const doc = new AutoSaveDocument();
doc.updateContent("Hello");
setTimeout(() => doc.updateContent("Hello world"), 200);
setTimeout(() => doc.updateContent("Hello world!"), 400);
setTimeout(() => doc.updateContent("Hello world! How are you?"), 2000);

// Practice 5: Debounce with Leading and Trailing
// Execute immediately and after pause
function debounceWithOptions(func, delay, options = {}) {
  const { leading = false, trailing = true } = options;
  let timeoutId;
  let lastCallTime = 0;

  return function (...args) {
    const now = Date.now();

    if (leading && now - lastCallTime >= delay) {
      func.apply(this, args);
      lastCallTime = now;
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (trailing) {
        func.apply(this, args);
      }
      lastCallTime = Date.now();
    }, delay);
  };
}

const trackMousePosition = debounceWithOptions(
  (x, y) => {
    console.log(`Mouse position: ${x}, ${y}`);
  },
  200,
  { leading: true, trailing: false },
);

// Practice 6: Cancel Pending Debounce
// Ability to cancel debounced function
function debounceWithCancel(func, delay) {
  let timeoutId;

  const debouncedFunc = function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };

  debouncedFunc.cancel = () => clearTimeout(timeoutId);

  return debouncedFunc;
}

const cancelableSearch = debounceWithCancel((query) => {
  console.log(`Executing search for: ${query}`);
}, 500);

cancelableSearch("query1");
cancelableSearch("query2");
cancelableSearch("query3");
setTimeout(() => {
  cancelableSearch.cancel();
  console.log("Search cancelled!");
}, 200);

// Practice 7: Debounce vs Immediate Execution
// Show difference between waiting and executing immediately
function handleButtonClick() {
  console.log("Button clicked!");
}

const debouncedClick = debounce(handleButtonClick, 500);
const debouncedClickImmediate = debounceWithOptions(handleButtonClick, 500, {
  leading: true,
  trailing: false,
});

console.log("\n=== Debounced (waits 500ms) ===");
debouncedClick();
debouncedClick();
debouncedClick();

console.log("\n=== Debounced Immediate (executes right away) ===");
debouncedClickImmediate();
debouncedClickImmediate();
debouncedClickImmediate();

// Practice 8: Search with Loading State
// Show loading indicator while searching
function searchWithLoadingState(query) {
  console.log("🔄 Loading...");

  setTimeout(() => {
    const results = mockUsers.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    );
    console.log("✓ Results loaded:", results.length, "items");
  }, 300);
}

const debouncedLoadingSearch = debounce(searchWithLoadingState, 300);

debouncedLoadingSearch("john");
setTimeout(() => debouncedLoadingSearch("alice"), 200);
setTimeout(() => debouncedLoadingSearch("bob"), 400);

// Practice 9: Multiple Debounced Handlers
// Handle multiple inputs with different debounce timings
const handlers = {
  username: debounce((value) => {
    console.log(`Validating username: ${value}`);
  }, 300),

  password: debounce((value) => {
    console.log(`Checking password strength for: ${value.length} chars`);
  }, 500),

  email: debounce((value) => {
    console.log(`Verifying email: ${value}`);
  }, 400),
};

handlers.username("john");
handlers.username("john_doe");
handlers.password("secret");
handlers.password("secret123");
handlers.email("john@example.com");

// Practice 10: Debounce with Trailing Value
// Ensure final value is always processed
function debounceWithFinalValue(func, delay) {
  let timeoutId;
  let lastArgs;

  return function (...args) {
    lastArgs = args;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, lastArgs);
    }, delay);
  };
}

const logger = debounceWithFinalValue((message) => {
  console.log(`Final message logged: ${message}`);
}, 300);

logger("Hello");
logger("Hello there");
logger("Hello there, how are you?");

// Practice 11: Combine Debounce with Throttle
// Use debounce for input validation, throttle for display updates
const throttle = (func, limit) => {
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
};

const validateAndDisplay = (value) => {
  const debouncedValidate = debounce((val) => {
    console.log(`Validating: ${val}`);
  }, 300);

  const throttledDisplay = throttle((val) => {
    console.log(`Displaying: ${val}`);
  }, 200);

  return (newValue) => {
    debouncedValidate(newValue);
    throttledDisplay(newValue);
  };
};

const handler = validateAndDisplay("");
["a", "ab", "abc", "abcd", "abcde"].forEach((val) => {
  handler(val);
});
