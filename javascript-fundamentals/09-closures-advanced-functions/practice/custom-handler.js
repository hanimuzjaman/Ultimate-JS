// CUSTOM HANDLER PRACTICE - CLOSURES & EVENT HANDLERS

// Practice 1: Button Click Handler with Closure
function createClickHandler(buttonId) {
  let clickCount = 0;

  return function handleClick() {
    clickCount++;
    console.log(`Button clicked ${clickCount} times`);
    return clickCount;
  };
}

const btnHandler = createClickHandler("submit-btn");
btnHandler(); // 1
btnHandler(); // 2
btnHandler(); // 3

// Practice 2: Input Validator with Feedback
function createInputValidator(minLength = 3) {
  let lastValue = "";

  return function validateInput(value) {
    lastValue = value;

    return {
      isValid: value.length >= minLength,
      length: value.length,
      minRequired: minLength,
      feedback:
        value.length < minLength
          ? `Need ${minLength - value.length} more characters`
          : "Input is valid",
    };
  };
}

const emailValidator = createInputValidator(5);
console.log("\n=== Input Validator ===");
console.log(emailValidator("abc"));
console.log(emailValidator("abcdefgh"));

// Practice 3: Event Listener with Cleanup
function createEventListener(eventName, callback) {
  let isListening = false;

  return {
    attach: function () {
      isListening = true;
      console.log(`Listening to ${eventName}`);
    },

    detach: function () {
      isListening = false;
      console.log(`Stopped listening to ${eventName}`);
    },

    trigger: function (event) {
      if (isListening) {
        callback(event);
      }
    },

    isActive: function () {
      return isListening;
    },
  };
}

const clickListener = createEventListener("click", (event) => {
  console.log(`Event triggered: ${event.type}`);
});

clickListener.attach();
clickListener.trigger({ type: "click" });
clickListener.detach();
clickListener.trigger({ type: "click" }); // No output

// Practice 4: Form Handler with Validation State
function createFormHandler() {
  const formData = {};
  const errors = {};

  return {
    setField: function (name, value) {
      formData[name] = value;
      console.log(`Field ${name} set to ${value}`);
    },

    validate: function (name, validator) {
      const value = formData[name];
      const result = validator(value);

      if (!result.isValid) {
        errors[name] = result.error;
      } else {
        delete errors[name];
      }

      return result;
    },

    getErrors: function () {
      return { ...errors };
    },

    isFormValid: function () {
      return Object.keys(errors).length === 0;
    },

    getFormData: function () {
      return { ...formData };
    },

    reset: function () {
      Object.keys(formData).forEach((key) => delete formData[key]);
      Object.keys(errors).forEach((key) => delete errors[key]);
    },
  };
}

const form = createFormHandler();
form.setField("username", "john");
form.validate("username", (val) => ({
  isValid: val.length >= 3,
  error: "Username must be at least 3 characters",
}));

console.log("\n=== Form Handler ===");
console.log("Form valid:", form.isFormValid());
console.log("Form data:", form.getFormData());

// Practice 5: Debounce Handler Creator
function createDebounceHandler(callback, delay) {
  let timeoutId;

  return function debounce(...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

const searchHandler = createDebounceHandler((query) => {
  console.log(`Searching for: ${query}`);
}, 500);

console.log("\n=== Debounce Handler ===");
searchHandler("java");
searchHandler("javascript");
setTimeout(() => {
  searchHandler("typescript");
}, 600);

// Practice 6: Throttle Handler Creator
function createThrottleHandler(callback, limit) {
  let inThrottle;

  return function throttle(...args) {
    if (!inThrottle) {
      callback.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

let scrollCount = 0;
const scrollHandler = createThrottleHandler(() => {
  scrollCount++;
  console.log(`Scroll handled (count: ${scrollCount})`);
}, 300);

console.log("\n=== Throttle Handler ===");
for (let i = 0; i < 5; i++) {
  scrollHandler();
}

// Practice 7: Counter Handler with Methods
function createCounter(initialValue = 0) {
  let count = initialValue;

  return {
    increment: function (amount = 1) {
      count += amount;
      return count;
    },

    decrement: function (amount = 1) {
      count -= amount;
      return count;
    },

    get: function () {
      return count;
    },

    set: function (value) {
      count = value;
      return count;
    },

    reset: function () {
      count = initialValue;
      return count;
    },

    getHistory: function () {
      return count;
    },
  };
}

const counter = createCounter(10);
console.log("\n=== Counter Handler ===");
console.log("Current:", counter.get());
console.log("After +5:", counter.increment(5));
console.log("After -3:", counter.decrement(3));
console.log("After reset:", counter.reset());

// Practice 8: API Handler with Rate Limiting
function createAPIHandler(maxRequests = 5, windowMs = 1000) {
  let requestCount = 0;
  const requests = [];

  return {
    request: async function (url) {
      const now = Date.now();

      // Clean old requests
      while (requests.length > 0 && now - requests[0] > windowMs) {
        requests.shift();
      }

      if (requests.length >= maxRequests) {
        throw new Error("Rate limit exceeded");
      }

      requests.push(now);
      requestCount++;

      console.log(`Request ${requestCount} to ${url}`);
      return { status: 200, data: "Success" };
    },

    getRequestCount: function () {
      return requestCount;
    },

    getRemaining: function () {
      const now = Date.now();
      const recent = requests.filter((time) => now - time <= 1000);
      return maxRequests - recent.length;
    },
  };
}

const apiHandler = createAPIHandler(3, 1000);
console.log("\n=== API Handler ===");
apiHandler.request("/api/users");
apiHandler.request("/api/posts");
console.log("Remaining:", apiHandler.getRemaining());

// Practice 9: Modal Dialog Handler
function createModalHandler() {
  let isOpen = false;
  const callbacks = {
    onOpen: [],
    onClose: [],
    onSubmit: [],
  };

  return {
    on: function (event, callback) {
      if (callbacks[event]) {
        callbacks[event].push(callback);
      }
    },

    open: function () {
      isOpen = true;
      callbacks.onOpen.forEach((cb) => cb());
      console.log("Modal opened");
    },

    close: function () {
      isOpen = false;
      callbacks.onClose.forEach((cb) => cb());
      console.log("Modal closed");
    },

    submit: function (data) {
      callbacks.onSubmit.forEach((cb) => cb(data));
      console.log("Modal submitted");
      this.close();
    },

    isOpen: function () {
      return isOpen;
    },
  };
}

const modal = createModalHandler();
modal.on("onOpen", () => console.log("  - Focus first input"));
modal.on("onClose", () => console.log("  - Cleanup"));
modal.on("onSubmit", (data) => console.log("  - Submitting:", data));

console.log("\n=== Modal Handler ===");
modal.open();
modal.submit({ username: "john" });

// Practice 10: Conditional Handler Chain
function createConditionalHandler() {
  const handlers = [];

  return {
    when: function (condition, callback) {
      handlers.push({ condition, callback });
      return this; // Enable chaining
    },

    execute: function (data) {
      for (const { condition, callback } of handlers) {
        if (condition(data)) {
          callback(data);
          break;
        }
      }
    },

    clear: function () {
      handlers.length = 0;
    },
  };
}

const conditionalHandler = createConditionalHandler();
conditionalHandler
  .when(
    (val) => val > 100,
    (val) => console.log(`Large: ${val}`),
  )
  .when(
    (val) => val > 50,
    (val) => console.log(`Medium: ${val}`),
  )
  .when(
    (val) => val > 0,
    (val) => console.log(`Small: ${val}`),
  );

console.log("\n=== Conditional Handler ===");
conditionalHandler.execute(120);
conditionalHandler.execute(75);
conditionalHandler.execute(25);

// Practice 11: Timer Handler
function createTimerHandler(callback, interval) {
  let timerId = null;
  let isRunning = false;

  return {
    start: function () {
      if (!isRunning) {
        isRunning = true;
        timerId = setInterval(callback, interval);
        console.log("Timer started");
      }
    },

    stop: function () {
      if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
        console.log("Timer stopped");
      }
    },

    reset: function () {
      this.stop();
      this.start();
    },

    isRunning: function () {
      return isRunning;
    },
  };
}

let timerCount = 0;
const timer = createTimerHandler(() => {
  timerCount++;
  if (timerCount <= 3) {
    console.log(`Timer tick ${timerCount}`);
  }
}, 500);

console.log("\n=== Timer Handler ===");
timer.start();
setTimeout(() => timer.stop(), 2000);

// Practice 12: Request Handler with Caching
function createCachedRequestHandler() {
  const cache = new Map();
  let requestCount = 0;

  return {
    fetch: async function (key, fetchFn) {
      if (cache.has(key)) {
        console.log(`Cache hit for ${key}`);
        return cache.get(key);
      }

      requestCount++;
      console.log(`Request ${requestCount}: Fetching ${key}`);

      const data = await fetchFn();
      cache.set(key, data);

      return data;
    },

    clear: function (key) {
      if (key) {
        cache.delete(key);
      } else {
        cache.clear();
      }
    },

    has: function (key) {
      return cache.has(key);
    },

    getStats: function () {
      return {
        totalRequests: requestCount,
        cachedItems: cache.size,
      };
    },
  };
}

const cachedFetch = createCachedRequestHandler();
console.log("\n=== Cached Request Handler ===");

cachedFetch.fetch("user1", async () => ({ id: 1, name: "John" }));
cachedFetch.fetch("user1", async () => ({ id: 1, name: "John" })); // Cache hit
console.log("Stats:", cachedFetch.getStats());

// Export handlers
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createClickHandler,
    createInputValidator,
    createEventListener,
    createFormHandler,
    createDebounceHandler,
    createThrottleHandler,
    createCounter,
    createAPIHandler,
    createModalHandler,
    createConditionalHandler,
    createTimerHandler,
    createCachedRequestHandler,
  };
}
