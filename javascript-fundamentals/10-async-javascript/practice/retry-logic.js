// RETRY LOGIC PRACTICE

// Practice 1: Simple Retry with Fixed Delay
async function fetchWithSimpleRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}: Fetching ${url}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      console.log("✓ Success!");
      return await response.json();
    } catch (error) {
      console.error(`✗ Attempt ${attempt} failed: ${error.message}`);

      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts`);
      }

      // Fixed delay before retry
      const delay = 1000;
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Practice 2: Exponential Backoff Retry
async function fetchWithExponentialBackoff(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      console.log("✓ Success!");
      return await response.json();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff: 2^attempt * 1000ms
      const delay = Math.pow(2, attempt) * 1000;
      console.log(
        `Attempt ${attempt} failed, retrying in ${delay}ms (${(delay / 1000).toFixed(1)}s)`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Practice 3: Linear Backoff Retry
async function fetchWithLinearBackoff(url, maxRetries = 3, delayMs = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (attempt === maxRetries) throw error;

      // Linear backoff: attempt * delayMs
      const delay = attempt * delayMs;
      console.log(`Retry in ${delay}ms (attempt ${attempt}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Practice 4: Smart Retry - Only for Retryable Errors
async function fetchWithSmartRetry(url, maxRetries = 3) {
  const retryableStatuses = [408, 429, 500, 502, 503, 504];

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);

      // Only retry on specific HTTP status codes
      if (!response.ok) {
        if (!retryableStatuses.includes(response.status)) {
          throw new Error(
            `Non-retryable error: HTTP ${response.status} (${response.statusText})`,
          );
        }
        throw new Error(`Retryable error: HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Don't retry network errors
      if (error instanceof TypeError) {
        throw new Error(`Network error (not retrying): ${error.message}`);
      }

      if (attempt === maxRetries) {
        throw error;
      }

      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Practice 5: Retry with Jitter (Random Delay)
async function fetchWithJitter(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (attempt === maxRetries) throw error;

      // Exponential backoff with jitter
      const baseDelay = Math.pow(2, attempt) * 1000;
      const jitter = Math.random() * baseDelay;
      const delay = Math.min(baseDelay + jitter, 30000); // Max 30s

      console.log(
        `Attempt ${attempt} failed, retrying in ${delay.toFixed(0)}ms (base: ${baseDelay}ms, jitter: ${jitter.toFixed(0)}ms)`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Practice 6: Retry Class for Reusability
class RetryHandler {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.initialDelay = options.initialDelay || 1000;
    this.maxDelay = options.maxDelay || 30000;
    this.backoffMultiplier = options.backoffMultiplier || 2;
    this.useJitter = options.useJitter || true;
    this.retryableStatuses = options.retryableStatuses || [
      408, 429, 500, 502, 503, 504,
    ];
  }

  calculateDelay(attempt) {
    const exponentialDelay =
      this.initialDelay * Math.pow(this.backoffMultiplier, attempt);
    const cappedDelay = Math.min(exponentialDelay, this.maxDelay);

    if (this.useJitter) {
      const jitter = Math.random() * cappedDelay;
      return Math.min(cappedDelay + jitter, this.maxDelay);
    }

    return cappedDelay;
  }

  isRetryable(error, status) {
    if (error instanceof TypeError) return false; // Network errors not retryable
    if (status && !this.retryableStatuses.includes(status)) return false;
    return true;
  }

  async fetch(url, options = {}) {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          if (!this.isRetryable(new Error(), response.status)) {
            throw new Error(`Non-retryable HTTP ${response.status}`);
          }
          throw new Error(`HTTP ${response.status}`);
        }

        console.log(`✓ Success on attempt ${attempt}`);
        return await response.json();
      } catch (error) {
        if (!this.isRetryable(error, null) || attempt === this.maxRetries) {
          throw error;
        }

        const delay = this.calculateDelay(attempt);
        console.log(
          `✗ Attempt ${attempt} failed, retrying in ${delay.toFixed(0)}ms`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}

// Usage example
async function demonstrateRetryHandler() {
  const handler = new RetryHandler({
    maxRetries: 3,
    initialDelay: 500,
    backoffMultiplier: 2,
    useJitter: true,
  });

  try {
    const data = await handler.fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    console.log("Data:", data.name);
  } catch (error) {
    console.error("Final error:", error.message);
  }
}

// Practice 7: Retry with Circuit Breaker
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.successCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = "CLOSED"; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }

  async execute(fn) {
    // If open and timeout not expired, fail fast
    if (this.state === "OPEN" && Date.now() < this.nextAttempt) {
      throw new Error("Circuit breaker is OPEN");
    }

    // If open and timeout expired, try half-open
    if (this.state === "OPEN" && Date.now() >= this.nextAttempt) {
      this.state = "HALF_OPEN";
      console.log("Circuit breaker: HALF_OPEN (testing)");
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    if (this.state === "HALF_OPEN") {
      this.state = "CLOSED";
      console.log("Circuit breaker: CLOSED (recovered)");
    }
  }

  onFailure() {
    this.failureCount++;
    console.log(`Failures: ${this.failureCount}/${this.threshold}`);

    if (this.failureCount >= this.threshold) {
      this.state = "OPEN";
      this.nextAttempt = Date.now() + this.timeout;
      console.log(`Circuit breaker: OPEN (failed ${this.failureCount} times)`);
    }
  }

  getState() {
    return this.state;
  }
}

// Practice 8: Batch Retry with Partial Success
async function retryBatch(urls, maxRetries = 2) {
  const results = new Map();
  const failed = new Set(urls);

  for (let attempt = 1; attempt <= maxRetries && failed.size > 0; attempt++) {
    console.log(`Attempt ${attempt}: ${failed.size} items remaining`);

    const promises = Array.from(failed).map((url) =>
      fetch(url)
        .then((r) =>
          r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)),
        )
        .then((data) => {
          results.set(url, { success: true, data });
          failed.delete(url);
        })
        .catch((error) => {
          results.set(url, { success: false, error });
        }),
    );

    await Promise.all(promises);

    if (failed.size > 0 && attempt < maxRetries) {
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Waiting ${delay}ms before next retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return results;
}

// Practice 9: Timeout with Retry
async function fetchWithTimeoutAndRetry(url, timeoutMs = 5000, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (error.name === "AbortError") {
        console.log(`Attempt ${attempt}: Timeout after ${timeoutMs}ms`);
      } else {
        console.log(`Attempt ${attempt}: ${error.message}`);
      }

      if (attempt === maxRetries) throw error;

      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Practice 10: Retry with Fallback Values
async function fetchWithFallback(urls, fallbackValue = null) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.log(`Failed to fetch ${url}: ${error.message}`);
    }
  }

  console.log("All URLs failed, using fallback");
  return fallbackValue;
}

// Practice 11: Conditional Retry Logic
async function smartRetry(fn, options = {}) {
  const {
    maxRetries = 3,
    shouldRetry = () => true,
    onRetry = () => {},
    onFailure = () => {},
  } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const shouldRetryNext = shouldRetry(error, attempt);

      if (!shouldRetryNext || attempt === maxRetries) {
        onFailure(error, attempt);
        throw error;
      }

      onRetry(error, attempt);
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000),
      );
    }
  }
}

// Usage example
async function demonstrateSmartRetry() {
  const handler = smartRetry(
    () =>
      fetch("https://jsonplaceholder.typicode.com/users/1").then((r) =>
        r.json(),
      ),
    {
      maxRetries: 3,
      shouldRetry: (error, attempt) => {
        // Only retry on network errors, not on 404
        return error.name === "AbortError" || error.message.includes("5");
      },
      onRetry: (error, attempt) => {
        console.log(`Retry attempt ${attempt}: ${error.message}`);
      },
      onFailure: (error, attempt) => {
        console.log(`Final failure after ${attempt} attempts`);
      },
    },
  );

  try {
    const result = await handler;
    console.log("Success:", result);
  } catch (error) {
    console.error("Failed:", error.message);
  }
}

// Practice 12: Retry with Monitoring/Logging
class RetryMonitor {
  constructor() {
    this.attempts = [];
    this.startTime = null;
  }

  async retry(fn, options = {}) {
    const { maxRetries = 3, delayMs = 1000 } = options;
    this.startTime = Date.now();

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const attemptStart = Date.now();

      try {
        const result = await fn();
        this.recordAttempt(attempt, true, Date.now() - attemptStart);
        return result;
      } catch (error) {
        this.recordAttempt(attempt, false, Date.now() - attemptStart, error);

        if (attempt === maxRetries) throw error;
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
      }
    }
  }

  recordAttempt(attemptNum, success, duration, error = null) {
    this.attempts.push({
      number: attemptNum,
      success,
      duration,
      error: error?.message,
      timestamp: new Date(),
    });

    const status = success ? "✓" : "✗";
    console.log(`${status} Attempt ${attemptNum}: ${duration}ms`);
  }

  getSummary() {
    const totalDuration = Date.now() - this.startTime;
    const successCount = this.attempts.filter((a) => a.success).length;

    return {
      totalAttempts: this.attempts.length,
      successes: successCount,
      failures: this.attempts.length - successCount,
      totalDuration,
      attempts: this.attempts,
    };
  }
}

// Export for use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    fetchWithSimpleRetry,
    fetchWithExponentialBackoff,
    fetchWithLinearBackoff,
    fetchWithSmartRetry,
    fetchWithJitter,
    RetryHandler,
    CircuitBreaker,
    retryBatch,
    fetchWithTimeoutAndRetry,
    fetchWithFallback,
    smartRetry,
    RetryMonitor,
  };
}
