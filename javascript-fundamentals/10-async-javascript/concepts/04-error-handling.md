# ERROR HANDLING IN ASYNC CODE

## Try/Catch/Finally

The standard way to handle errors in async code:

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    // Handle or rethrow
    throw error;
  } finally {
    console.log("Request complete");
  }
}
```

## Promise Error Handling

```javascript
fetch("/api/data")
  .then((response) => {
    if (!response.ok) throw new Error("Failed");
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error))
  .finally(() => console.log("Done"));
```

## Common Error Types

```javascript
// Network errors
try {
  await fetch("/api/data");
} catch (error) {
  if (error instanceof TypeError) {
    console.log("Network error");
  }
}

// HTTP errors
async function handleHttpError() {
  try {
    const response = await fetch("/api/data");
    if (response.status === 404) {
      throw new Error("Not found");
    }
    if (response.status === 500) {
      throw new Error("Server error");
    }
  } catch (error) {
    console.error(error);
  }
}

// JSON parse errors
try {
  const data = await response.json();
} catch (error) {
  console.error("Invalid JSON:", error);
}
```

## Error Recovery Patterns

```javascript
// Fallback value
async function getUserSafe(id) {
  try {
    return await getUser(id);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return { id, name: "Unknown User" };
  }
}

// Retry logic
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

// Timeout
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
```

## Error Context

```javascript
async function processUser(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    return { user, posts };
  } catch (error) {
    // Add context
    error.userId = userId;
    error.operation = "processUser";
    throw error;
  }
}
```

## Promise.allSettled() for Partial Failures

```javascript
async function fetchMultiple(urls) {
  const results = await Promise.allSettled(urls.map((url) => fetch(url)));

  return results.map((result) => {
    if (result.status === "fulfilled") {
      return { success: true, data: result.value };
    } else {
      return { success: false, error: result.reason };
    }
  });
}
```

## Custom Error Classes

```javascript
class APIError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new APIError(response.status, "User not found");
    }
    return response.json();
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`API Error ${error.status}:`, error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}
```

## Global Error Handling

```javascript
// Unhandled promise rejection
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled rejection:", event.reason);
  // Prevent default behavior
  event.preventDefault();
});

// Uncaught errors
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
});
```

## Best Practices

✓ Always use try/catch with async/await
✓ Use .catch() with promise chains
✓ Add context to errors
✓ Log errors appropriately
✓ Use .finally() for cleanup
✓ Handle specific error types
✓ Provide fallback values when appropriate
✓ Use Promise.allSettled() for multiple requests

✗ Don't ignore caught errors
✗ Don't throw without message
✗ Don't overwrite error information
✗ Don't use bare catch
✗ Don't mix error handling styles
