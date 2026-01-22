// FETCH API PRACTICE

// Practice 1: Simple GET Request
async function getUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );

    // Check if response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    console.log("User fetched:", user.name);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
  }
}

// Practice 2: POST Request with JSON Data
async function createUser(userData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.status}`);
    }

    const createdUser = await response.json();
    console.log("User created:", createdUser);
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
}

// Practice 3: Fetch with Query Parameters
async function searchUsers(query) {
  try {
    const params = new URLSearchParams({ q: query });
    const url = `https://jsonplaceholder.typicode.com/users?${params}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const users = await response.json();
    console.log(`Found ${users.length} users matching "${query}"`);
    return users;
  } catch (error) {
    console.error("Search error:", error.message);
  }
}

// Practice 4: Fetch Multiple Resources in Parallel
async function fetchUserAndPosts(userId) {
  try {
    // Fetch both in parallel
    const [userResponse, postsResponse] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`),
    ]);

    if (!userResponse.ok || !postsResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const user = await userResponse.json();
    const posts = await postsResponse.json();

    console.log(`${user.name} has ${posts.length} posts`);
    return { user, posts };
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Practice 5: Request with Headers
async function fetchWithHeaders(url, headers = {}) {
  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const response = await fetch(url, {
      method: "GET",
      headers: { ...defaultHeaders, ...headers },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

// Practice 6: Form Data Upload
async function uploadFormData(formData) {
  try {
    // Note: URLSearchParams example
    const data = new URLSearchParams();
    data.append("username", "john");
    data.append("email", "john@example.com");

    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: data,
    });

    if (!response.ok) throw new Error("Upload failed");

    const result = await response.json();
    console.log("Form uploaded:", result);
    return result;
  } catch (error) {
    console.error("Upload error:", error.message);
  }
}

// Practice 7: Handle Different Response Types
async function fetchDifferentTypes() {
  try {
    // JSON response
    const jsonResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    const json = await jsonResponse.json();
    console.log("JSON:", json.name);

    // Text response
    const textUrl = "https://jsonplaceholder.typicode.com/users/1";
    const textResponse = await fetch(textUrl);
    const text = await textResponse.text();
    console.log("Text length:", text.length);

    // Blob response (for files)
    // const blobResponse = await fetch("image.jpg");
    // const blob = await blobResponse.blob();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Practice 8: Handle Errors Properly
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);

    // Check for network errors
    if (!response.ok) {
      // Different error handling based on status
      if (response.status === 404) {
        throw new Error("Resource not found");
      } else if (response.status === 500) {
        throw new Error("Server error");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error (no internet?):", error.message);
    } else {
      console.error("Request error:", error.message);
    }
    // Return default/fallback value
    return null;
  }
}

// Practice 9: Request Timeout
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.error(`Request timeout after ${timeoutMs}ms`);
    } else {
      console.error("Fetch error:", error.message);
    }
    return null;
  }
}

// Practice 10: Retry Logic
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Don't retry on 404 (not found)
        if (response.status === 404) throw new Error("Not found");
        // Retry on 5xx errors
        if (response.status >= 500) throw new Error("Server error");
      }

      return await response.json();
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Practice 11: Streaming Response (reading chunks)
async function fetchStream(url) {
  try {
    const response = await fetch(url);

    if (!response.body) {
      throw new Error("Response body not available");
    }

    const reader = response.body.getReader();
    let result = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      result += new TextDecoder().decode(value);
    }

    console.log("Streamed data length:", result.length);
    return result;
  } catch (error) {
    console.error("Stream error:", error.message);
  }
}

// Practice 12: Fetch with CORS Headers
async function fetchCORS(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "content-type",
      },
      mode: "cors", // Enable CORS
      credentials: "include", // Include cookies
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("CORS fetch error:", error.message);
    return null;
  }
}

// Practice 13: Sequential Requests
async function fetchSequentially() {
  try {
    // Fetch first user
    const user1 = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const userData1 = await user1.json();
    console.log("User 1:", userData1.name);

    // Fetch second user after first completes
    const user2 = await fetch("https://jsonplaceholder.typicode.com/users/2");
    const userData2 = await user2.json();
    console.log("User 2:", userData2.name);

    // Fetch third user after second completes
    const user3 = await fetch("https://jsonplaceholder.typicode.com/users/3");
    const userData3 = await user3.json();
    console.log("User 3:", userData3.name);

    return [userData1, userData2, userData3];
  } catch (error) {
    console.error("Sequential fetch error:", error.message);
  }
}

// Practice 14: Batch Requests
async function fetchBatch(userIds) {
  try {
    const promises = userIds.map((id) =>
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((r) =>
        r.json(),
      ),
    );

    const users = await Promise.all(promises);
    console.log(`Fetched ${users.length} users`);
    return users;
  } catch (error) {
    console.error("Batch fetch error:", error.message);
  }
}

// Practice 15: Custom Fetch Wrapper
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
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

  put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }
}

// Usage of APIClient
const api = new APIClient("https://jsonplaceholder.typicode.com");

async function demonstrateAPIClient() {
  try {
    // GET
    const user = await api.get("/users/1");
    console.log("Fetched user:", user.name);

    // POST
    const newPost = await api.post("/posts", {
      title: "New Post",
      body: "This is a new post",
      userId: 1,
    });
    console.log("Created post with ID:", newPost.id);

    // PUT
    const updated = await api.put("/users/1", {
      name: "Updated Name",
    });

    // DELETE
    await api.delete("/posts/1");
    console.log("Post deleted");
  } catch (error) {
    console.error("API Client error:", error.message);
  }
}

// Run demonstrations (in a real app)
// getUser();
// fetchWithTimeout("https://jsonplaceholder.typicode.com/users/1");
// fetchWithRetry("https://jsonplaceholder.typicode.com/users/1");
