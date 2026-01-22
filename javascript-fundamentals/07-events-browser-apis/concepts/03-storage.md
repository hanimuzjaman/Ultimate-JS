# Events & Browser APIs: Storage

## What is Web Storage?

Web Storage provides a way for web applications to store data locally in the user's browser. There are two types: localStorage and sessionStorage. Both use the same API but have different lifetimes.

## localStorage

### Characteristics

- **Persistent**: Data survives browser restart
- **Cross-session**: Available as long as not manually cleared
- **Same-origin policy**: Accessible only from same domain
- **Storage limit**: ~5-10MB per domain (varies by browser)
- **Synchronous**: Blocks execution during read/write

### Basic Operations

```javascript
// Setting a value
localStorage.setItem("key", "value");

// Getting a value
const value = localStorage.getItem("key");

// Removing a value
localStorage.removeItem("key");

// Clearing all values
localStorage.clear();

// Getting number of items
console.log(localStorage.length);

// Getting key by index
localStorage.key(0);
```

## sessionStorage

### Characteristics

- **Temporary**: Data cleared when tab is closed
- **Tab-specific**: Each tab has its own storage
- **Same-origin policy**: Same as localStorage
- **Storage limit**: Same as localStorage
- **Use cases**: Temporary data, form drafts, session IDs

### Basic Operations

```javascript
// Same API as localStorage
sessionStorage.setItem("sessionId", "abc123");
const id = sessionStorage.getItem("sessionId");
sessionStorage.removeItem("sessionId");
sessionStorage.clear();
```

## Storing Objects

Since storage only accepts strings, convert objects to JSON:

```javascript
const user = { name: "Alice", age: 25 };

// Store as JSON
localStorage.setItem("user", JSON.stringify(user));

// Retrieve and parse
const retrieved = JSON.parse(localStorage.getItem("user"));
console.log(retrieved.name); // 'Alice'
```

## Storing Arrays

```javascript
const favorites = ["apple", "banana", "cherry"];

// Store as JSON
localStorage.setItem("favorites", JSON.stringify(favorites));

// Retrieve and parse
const retrieved = JSON.parse(localStorage.getItem("favorites"));
console.log(retrieved[0]); // 'apple'
```

## Default Values

```javascript
// Get value or use default
const theme = localStorage.getItem("theme") || "light";

// Or with null check
const mode = localStorage.getItem("mode");
const finalMode = mode !== null ? mode : "normal";
```

## Iterating Storage

```javascript
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}
```

## Storage Events

Listen for storage changes from other tabs/windows:

```javascript
window.addEventListener("storage", (event) => {
  console.log("Key changed:", event.key);
  console.log("Old value:", event.oldValue);
  console.log("New value:", event.newValue);
  console.log("Changed in URL:", event.url);
});
```

**Note**: Storage event fires in OTHER tabs, not the tab that made the change.

## Practical Examples

### Example 1: User Preferences

```javascript
const preferences = {
  theme: "dark",
  language: "en",
  fontSize: 14,
};

// Save
localStorage.setItem("preferences", JSON.stringify(preferences));

// Load with defaults
const saved = JSON.parse(localStorage.getItem("preferences")) || {
  theme: "light",
  language: "en",
  fontSize: 12,
};
```

### Example 2: Auto-Save Form

```javascript
const form = document.getElementById("form");

// Save on input
form.addEventListener("input", () => {
  const data = Object.fromEntries(new FormData(form));
  localStorage.setItem("formDraft", JSON.stringify(data));
});

// Restore on load
const draft = localStorage.getItem("formDraft");
if (draft) {
  const data = JSON.parse(draft);
  Object.entries(data).forEach(([key, value]) => {
    const input = form.elements[key];
    if (input) input.value = value;
  });
}

// Clear draft after submit
form.addEventListener("submit", () => {
  localStorage.removeItem("formDraft");
});
```

### Example 3: User Settings Cache

```javascript
const cacheKey = "userSettings";
const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours

function saveSettings(settings) {
  const data = {
    settings,
    timestamp: Date.now(),
  };
  localStorage.setItem(cacheKey, JSON.stringify(data));
}

function getSettings() {
  const stored = localStorage.getItem(cacheKey);
  if (!stored) return null;

  const data = JSON.parse(stored);
  const now = Date.now();

  // Check if cache expired
  if (now - data.timestamp > cacheDuration) {
    localStorage.removeItem(cacheKey);
    return null;
  }

  return data.settings;
}
```

## Error Handling

```javascript
try {
  localStorage.setItem("data", largeString);
} catch (error) {
  if (error.name === "QuotaExceededError") {
    console.log("Storage quota exceeded");
    // Delete old data or show user message
  }
}
```

## localStorage vs sessionStorage

| Feature       | localStorage     | sessionStorage         |
| ------------- | ---------------- | ---------------------- |
| Lifetime      | Until cleared    | Until tab closes       |
| Persistence   | Survives restart | Lost on close          |
| Scope         | Per origin       | Per tab per origin     |
| Use case      | User preferences | Temporary session data |
| Data retained | Browser restart  | Tab switch             |

## Storage Limits

- **Chrome/Firefox/Safari**: ~10MB
- **IE**: ~10MB
- **Storage limit is per origin**: domain + protocol + port
- **Check available space** with try-catch

## Best Practices

1. **Use localStorage for**: User preferences, settings, cached data
2. **Use sessionStorage for**: Form drafts, temporary data, session IDs
3. **Always parse JSON**: Don't forget JSON.parse() when retrieving
4. **Handle quota errors**: Wrap setItem in try-catch
5. **Check for null**: getItem returns null if key doesn't exist
6. **Use clear() sparingly**: Only when necessary to clear all data
7. **Prefix keys**: Use namespacing to avoid conflicts

## When NOT to Use

- **Sensitive data**: Never store passwords, tokens, or PII
- **Large data**: Avoid storing large objects (use IndexedDB instead)
- **Frequent updates**: Too many updates may cause performance issues
- **Private browsing**: Cleared immediately in private mode

## Storage Alternatives

- **IndexedDB**: For large amounts of structured data
- **Cookies**: For small data needed on server side
- **SessionStorage**: For temporary tab-specific data
- **Cache API**: For offline web app support

## Browser Support

Both localStorage and sessionStorage are supported in all modern browsers. They're part of the HTML5 Web Storage API.

## Summary

Web Storage provides simple key-value storage for browsers:

- localStorage persists across sessions
- sessionStorage clears when tab closes
- Both use same API (setItem, getItem, removeItem)
- Perfect for user preferences and form drafts
- Limit around 5-10MB per origin
- Handle errors and quota exceeding gracefully
