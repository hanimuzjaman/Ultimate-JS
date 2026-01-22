# FETCH VS AXIOS

## Fetch API

The Fetch API is a browser native, promise-based HTTP client built into JavaScript.

### Basic Fetch

```javascript
// Simple GET request
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Async/await syntax
async function getUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### POST Request with Fetch

```javascript
async function createUser(user) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

await createUser({ name: "John", email: "john@example.com" });
```

### Error Handling with Fetch

```javascript
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);

    // Must check response.ok manually
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error:", error.message);
    } else {
      console.error("Request error:", error.message);
    }
  }
}
```

## Axios

Axios is a popular third-party HTTP library with enhanced features and simpler API.

### Installation

```bash
npm install axios
```

### Basic Axios

```javascript
// Simple GET request
import axios from "axios";

axios
  .get("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error.message));

// Async/await syntax
async function getUser() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
```

### POST Request with Axios

```javascript
async function createUser(user) {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    user,
  );

  return response.data;
}

await createUser({ name: "John", email: "john@example.com" });
```

### Error Handling with Axios

```javascript
async function axiosWithErrorHandling(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      console.error("HTTP Error:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error("No response:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
}
```

## Feature Comparison

| Feature         | Fetch           | Axios              |
| --------------- | --------------- | ------------------ |
| Native          | Yes             | No (library)       |
| Install         | Built-in        | `npm install`      |
| Promise         | Yes             | Yes                |
| Status check    | Manual          | Automatic          |
| Timeout         | AbortController | Config option      |
| Interceptors    | No              | Yes                |
| Cancel requests | AbortController | Axios Cancel Token |
| Upload progress | Yes             | Yes                |
| Defaults        | No              | Yes                |
| HTTP/2          | Yes             | Yes                |

## Detailed Comparison

### 1. Response Status Handling

**Fetch (Manual):**

```javascript
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

**Axios (Automatic):**

```javascript
// Rejects promise for status >= 400 automatically
await axios.get(url); // Throws on 4xx, 5xx
```

### 2. Request/Response Transformation

**Fetch (Manual):**

```javascript
const response = await fetch(url);
const data = await response.json(); // Manual parsing
```

**Axios (Automatic):**

```javascript
const { data } = await axios.get(url); // Auto JSON parsing
```

### 3. Timeout Configuration

**Fetch (AbortController):**

```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch(url, { signal: controller.signal });
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request timeout");
  }
}
```

**Axios (Simple):**

```javascript
axios.get(url, { timeout: 5000 });
```

### 4. Request Interceptors

**Fetch (No built-in):**

```javascript
// Manual wrapper needed
async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, { ...options, headers });
}
```

**Axios (Built-in):**

```javascript
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.get(url); // Token automatically added
```

### 5. File Upload Progress

**Fetch:**

```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  return fetch("/upload", {
    method: "POST",
    body: formData,
  }).then((r) => r.json());
}
```

**Axios:**

```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post("/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentage = (progressEvent.loaded / progressEvent.total) * 100;
      console.log(`Upload: ${percentage}%`);
    },
  });
}
```

### 6. Default Headers

**Fetch (Set each time):**

```javascript
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer token",
};

fetch(url, { headers, method: "POST" });
```

**Axios (Global defaults):**

```javascript
axios.defaults.headers.common["Authorization"] = "Bearer token";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.post(url, data); // Headers automatically applied
```

## When to Use Each

**Use Fetch when:**

- ✓ No external dependencies wanted
- ✓ Simple requests without interceptors
- ✓ Building libraries
- ✓ Modern browser support only
- ✓ Minimal bundle size important

**Use Axios when:**

- ✓ Need interceptors
- ✓ Want simpler error handling
- ✓ Automatic JSON transformation needed
- ✓ Need backwards compatibility
- ✓ Building API wrappers
- ✓ Need upload/download progress

## Practical Example: API Wrapper

### With Fetch

```javascript
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
```

### With Axios

```javascript
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com",
});

// Add token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  },
);

export default apiClient;
```

## Best Practices

**Fetch:**
✓ Use AbortController for timeouts
✓ Always check response.ok
✓ Parse JSON explicitly
✓ Create wrapper functions
✓ Handle network errors

**Axios:**
✓ Use interceptors for common logic
✓ Set default headers
✓ Configure base URL
✓ Use instance for namespaced requests
✓ Leverage error handling

## Summary

- **Fetch**: Native, lightweight, modern
- **Axios**: Feature-rich, easier API, interceptors
- **Choice depends on**: Project size, requirements, bundle constraints
- **Both are production-ready** for most applications
