// LOADING STATES PRACTICE

// Practice 1: Basic Loading State
class DataLoader {
  constructor() {
    this.data = null;
    this.isLoading = false;
    this.error = null;
  }

  async load(url) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this.data = await response.json();
      return this.data;
    } catch (error) {
      this.error = error;
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  getStatus() {
    if (this.isLoading) return "Loading...";
    if (this.error) return `Error: ${this.error.message}`;
    return "Ready";
  }
}

// Usage example
async function demonstrateBasicLoading() {
  const loader = new DataLoader();
  console.log(loader.getStatus()); // "Ready"

  try {
    await loader.load("https://jsonplaceholder.typicode.com/users/1");
    console.log(loader.getStatus()); // "Ready"
    console.log("Data loaded:", loader.data.name);
  } catch (error) {
    console.error("Failed to load:", error.message);
  }
}

// Practice 2: Multiple Loading States with Progress
class ProgressiveLoader {
  constructor() {
    this.progress = 0;
    this.isLoading = false;
    this.currentStep = "";
  }

  async loadWithProgress() {
    this.isLoading = true;

    try {
      // Step 1: Authenticate
      this.currentStep = "Authenticating...";
      this.progress = 25;
      console.log(`${this.progress}% - ${this.currentStep}`);
      await this.delay(500);

      // Step 2: Fetch data
      this.currentStep = "Fetching data...";
      this.progress = 50;
      console.log(`${this.progress}% - ${this.currentStep}`);
      await this.delay(500);

      // Step 3: Process data
      this.currentStep = "Processing data...";
      this.progress = 75;
      console.log(`${this.progress}% - ${this.currentStep}`);
      await this.delay(500);

      // Step 4: Complete
      this.currentStep = "Complete!";
      this.progress = 100;
      console.log(`${this.progress}% - ${this.currentStep}`);
    } catch (error) {
      this.currentStep = "Error occurred";
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Usage example
async function demonstrateProgress() {
  const loader = new ProgressiveLoader();
  await loader.loadWithProgress();
}

// Practice 3: Skeletons/Placeholders During Loading
class SkeletonLoader {
  constructor() {
    this.items = [];
    this.isLoading = false;
  }

  async loadItems(itemCount = 5) {
    this.isLoading = true;
    this.items = this.generateSkeletons(itemCount);

    console.log("Showing skeletons:", this.items);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace skeletons with real data
      this.items = Array.from({ length: itemCount }, (_, i) => ({
        id: i + 1,
        title: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`,
        loaded: true,
      }));

      console.log("Skeletons replaced with real data");
    } finally {
      this.isLoading = false;
    }
  }

  generateSkeletons(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: "Loading...",
      description: "Loading...",
      loaded: false,
    }));
  }

  display() {
    this.items.forEach((item) => {
      const status = item.loaded ? "✓" : "⏳";
      console.log(`${status} ${item.title}: ${item.description}`);
    });
  }
}

// Usage example
async function demonstrateSkeletons() {
  const loader = new SkeletonLoader();
  loader.display(); // Show loading UI first
  await loader.loadItems(3);
  loader.display(); // Show real data
}

// Practice 4: Loading with Timeout and Cancellation
class CancellableLoader {
  constructor(timeoutMs = 5000) {
    this.controller = null;
    this.timeoutMs = timeoutMs;
    this.isLoading = false;
  }

  async fetch(url) {
    this.controller = new AbortController();
    this.isLoading = true;

    const timeoutId = setTimeout(() => {
      this.cancel();
    }, this.timeoutMs);

    try {
      const response = await fetch(url, {
        signal: this.controller.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      clearTimeout(timeoutId);
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        throw new Error("Request cancelled or timed out");
      }
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  cancel() {
    if (this.controller) {
      this.controller.abort();
      console.log("Request cancelled");
    }
  }
}

// Usage example
async function demonstrateCancellation() {
  const loader = new CancellableLoader(3000);

  try {
    const data = await loader.fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    console.log("Data loaded:", data);
  } catch (error) {
    console.error("Load error:", error.message);
  }
}

// Practice 5: Multiple Concurrent Loading States
class MultiLoader {
  constructor() {
    this.loadingStates = new Map();
  }

  startLoading(key) {
    this.loadingStates.set(key, { isLoading: true, data: null, error: null });
  }

  completeLoading(key, data) {
    const state = this.loadingStates.get(key);
    if (state) {
      state.isLoading = false;
      state.data = data;
    }
  }

  errorLoading(key, error) {
    const state = this.loadingStates.get(key);
    if (state) {
      state.isLoading = false;
      state.error = error;
    }
  }

  getStatus(key) {
    const state = this.loadingStates.get(key);
    if (!state) return "Not started";
    if (state.isLoading) return "Loading...";
    if (state.error) return `Error: ${state.error.message}`;
    return "Complete";
  }

  async loadMultiple(urls) {
    const promises = Object.entries(urls).map(([key, url]) => {
      this.startLoading(key);
      return fetch(url)
        .then((r) => r.json())
        .then((data) => {
          this.completeLoading(key, data);
          return { key, data };
        })
        .catch((error) => {
          this.errorLoading(key, error);
          return { key, error };
        });
    });

    return Promise.all(promises);
  }
}

// Usage example
async function demonstrateMultiLoading() {
  const loader = new MultiLoader();
  const urls = {
    user: "https://jsonplaceholder.typicode.com/users/1",
    posts: "https://jsonplaceholder.typicode.com/posts/1",
  };

  const promise = loader.loadMultiple(urls);
  console.log("User status:", loader.getStatus("user")); // Loading...
  console.log("Posts status:", loader.getStatus("posts")); // Loading...

  await promise;
  console.log("User status:", loader.getStatus("user")); // Complete
  console.log("Posts status:", loader.getStatus("posts")); // Complete
}

// Practice 6: Optimistic Updates
class OptimisticUpdater {
  constructor(initialData = []) {
    this.data = [...initialData];
    this.pendingUpdates = new Map();
  }

  async update(id, newValue) {
    // Immediately show new value (optimistic)
    const oldValue = this.data.find((item) => item.id === id)?.value;
    const itemIndex = this.data.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      this.data[itemIndex].value = newValue;
      this.pendingUpdates.set(id, { oldValue, newValue });

      console.log(`Optimistic update: ${newValue} (pending)`);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Confirm update
        this.pendingUpdates.delete(id);
        console.log(`Update confirmed: ${newValue}`);
      } catch (error) {
        // Rollback on error
        if (itemIndex !== -1) {
          this.data[itemIndex].value = oldValue;
        }
        this.pendingUpdates.delete(id);
        console.error("Update failed, rolled back");
        throw error;
      }
    }
  }
}

// Usage example
async function demonstrateOptimisticUpdates() {
  const updater = new OptimisticUpdater([{ id: 1, value: "Initial value" }]);
  console.log("Before update:", updater.data[0].value);

  await updater.update(1, "Updated value");
  console.log("After update:", updater.data[0].value);
}

// Practice 7: Debounced Loading
class DebouncedLoader {
  constructor(delay = 300) {
    this.delay = delay;
    this.timeoutId = null;
    this.isLoading = false;
  }

  async load(query, fetchFn) {
    this.isLoading = true;
    console.log(`Debounced loading: ${query}`);

    // Clear previous timeout
    clearTimeout(this.timeoutId);

    return new Promise((resolve) => {
      this.timeoutId = setTimeout(async () => {
        try {
          const result = await fetchFn(query);
          this.isLoading = false;
          resolve(result);
        } catch (error) {
          this.isLoading = false;
          throw error;
        }
      }, this.delay);
    });
  }
}

// Practice 8: Infinite Scroll Loading
class InfiniteScrollLoader {
  constructor(itemsPerPage = 10) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.items = [];
    this.isLoading = false;
    this.hasMore = true;
  }

  async loadMore() {
    if (this.isLoading || !this.hasMore) return;

    this.isLoading = true;
    console.log(`Loading page ${this.currentPage}...`);

    try {
      // Simulate API call
      const newItems = await this.fetchPage(this.currentPage);

      this.items.push(...newItems);
      this.currentPage++;

      // Check if more data available
      if (newItems.length < this.itemsPerPage) {
        this.hasMore = false;
      }

      console.log(
        `Loaded ${newItems.length} items (total: ${this.items.length})`,
      );
    } finally {
      this.isLoading = false;
    }
  }

  async fetchPage(page) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Array.from({ length: this.itemsPerPage }, (_, i) => ({
      id: (page - 1) * this.itemsPerPage + i + 1,
      title: `Item ${(page - 1) * this.itemsPerPage + i + 1}`,
    }));
  }
}

// Practice 9: Lazy Loading Images
class LazyImageLoader {
  constructor() {
    this.images = [];
    this.loadedCount = 0;
  }

  observeImages() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });

      this.images.forEach((img) => observer.observe(img));
    }
  }

  loadImage(imgElement) {
    const src = imgElement.dataset.src;
    imgElement.src = src;
    imgElement.removeAttribute("data-src");
    this.loadedCount++;
    console.log(`Loaded image (${this.loadedCount})`);
  }
}

// Practice 10: Retry with Backoff for Loading
class RetryLoader {
  constructor(maxRetries = 3) {
    this.maxRetries = maxRetries;
    this.attempts = 0;
  }

  async loadWithRetry(url) {
    this.attempts = 0;

    while (this.attempts < this.maxRetries) {
      try {
        this.attempts++;
        console.log(`Attempt ${this.attempts}...`);

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        console.log("✓ Success!");
        return await response.json();
      } catch (error) {
        if (this.attempts >= this.maxRetries) {
          throw error;
        }

        const delay = Math.pow(2, this.attempts) * 1000;
        console.log(`✗ Failed, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}

// Practice 11: Loading with Abort Signals
async function demonstrateAbortController() {
  const controller = new AbortController();

  const loader = fetch("https://jsonplaceholder.typicode.com/users/1", {
    signal: controller.signal,
  });

  // Cancel after 2 seconds
  setTimeout(() => {
    console.log("Cancelling request...");
    controller.abort();
  }, 2000);

  try {
    const response = await loader;
    console.log("Loaded:", await response.json());
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request was cancelled");
    }
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    DataLoader,
    ProgressiveLoader,
    SkeletonLoader,
    CancellableLoader,
    MultiLoader,
    OptimisticUpdater,
    DebouncedLoader,
    InfiniteScrollLoader,
    LazyImageLoader,
    RetryLoader,
  };
}
