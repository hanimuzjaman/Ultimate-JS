/**
 * Module 7: Events & Browser APIs
 * Concepts: Local & Session Storage
 *
 * Comprehensive examples of browser storage APIs
 */

// ============================================
// 1. LOCALSTORAGE BASICS
// ============================================
console.log("=== localStorage Basics ===\n");

// localStorage stores data persistently (until manually cleared)
// Data persists across browser sessions
// Same-origin policy applies
// ~5-10MB storage limit

// Setting values
localStorage.setItem("username", "john_doe");
localStorage.setItem("theme", "dark");
localStorage.setItem("language", "en");

console.log("Set 3 items in localStorage");

// Getting values
const username = localStorage.getItem("username");
const theme = localStorage.getItem("theme");

console.log("Username:", username); // 'john_doe'
console.log("Theme:", theme); // 'dark'

// Getting non-existent key returns null
const nonExistent = localStorage.getItem("missing");
console.log("Non-existent:", nonExistent); // null

// ============================================
// 2. SESSIONSTORAGE BASICS
// ============================================
console.log("\n=== sessionStorage Basics ===\n");

// sessionStorage stores data for current tab session only
// Data cleared when tab is closed
// Separate storage per tab
// Same API as localStorage

sessionStorage.setItem("sessionId", "abc123");
sessionStorage.setItem("tempData", "will be cleared");

const sessionId = sessionStorage.getItem("sessionId");
console.log("Session ID:", sessionId); // 'abc123'

// ============================================
// 3. REMOVING ITEMS
// ============================================
console.log("\n=== Removing Items ===\n");

// Remove specific item
localStorage.removeItem("language");
console.log("Removed 'language' from localStorage");

// Check if it's gone
const removed = localStorage.getItem("language");
console.log("After removal:", removed); // null

// ============================================
// 4. CLEARING ALL STORAGE
// ============================================
console.log("\n=== Clearing All Storage ===\n");

// Clear all items from localStorage
localStorage.setItem("temp1", "value1");
localStorage.setItem("temp2", "value2");
console.log("Added temp items");

localStorage.clear();
console.log("Cleared all localStorage");

// ============================================
// 5. CHECKING STORAGE LENGTH
// ============================================
console.log("\n=== Storage Length ===\n");

// localStorage.length = number of items stored
localStorage.setItem("item1", "value1");
localStorage.setItem("item2", "value2");
localStorage.setItem("item3", "value3");

console.log("Items in storage:", localStorage.length); // 3

// Iterate through storage
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}

// ============================================
// 6. STORING OBJECTS (JSON)
// ============================================
console.log("\n=== Storing Objects ===\n");

// Storage only works with strings
// Must convert objects to JSON

const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  preferences: {
    notifications: true,
    theme: "dark",
  },
};

// Stringify before storing
localStorage.setItem("user", JSON.stringify(user));
console.log("Stored user object as JSON");

// Parse when retrieving
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log("Retrieved user:", storedUser);
console.log("User name:", storedUser.name);

// ============================================
// 7. STORING ARRAYS
// ============================================
console.log("\n=== Storing Arrays ===\n");

const favorites = ["apple", "banana", "cherry", "date"];

// Store array as JSON
localStorage.setItem("favorites", JSON.stringify(favorites));
console.log("Stored favorites array");

// Retrieve and parse
const retrievedFavorites = JSON.parse(localStorage.getItem("favorites"));
console.log("Favorites:", retrievedFavorites);
console.log("First favorite:", retrievedFavorites[0]); // 'apple'

// ============================================
// 8. DEFAULT VALUES
// ============================================
console.log("\n=== Default Values ===\n");

// Pattern: get value or use default if not found
const storedTheme = localStorage.getItem("theme") || "light";
console.log("Theme:", storedTheme);

const storedLayout = localStorage.getItem("layout") || "grid";
console.log("Layout:", storedLayout);

// Or with explicit null check
const storedMode = localStorage.getItem("mode");
const mode = storedMode !== null ? storedMode : "normal";
console.log("Mode:", mode);

// ============================================
// 9. STORAGE EVENT LISTENER
// ============================================
console.log("\n=== Storage Events ===\n");

// Listen for storage changes (from other tabs/windows)
/*
window.addEventListener('storage', (event) => {
  console.log('Storage changed:');
  console.log('Key:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('URL:', event.url);
});

// Change in another tab triggers this event in other tabs
localStorage.setItem('data', 'new value');
*/

console.log("Storage event listener pattern shown");

// ============================================
// 10. PRACTICAL: USER PREFERENCES
// ============================================
console.log("\n=== User Preferences Example ===\n");

const preferences = {
  theme: "dark",
  language: "en",
  fontSize: 14,
  notifications: true,
};

// Save preferences
localStorage.setItem("preferences", JSON.stringify(preferences));

// Load preferences
const savedPrefs = JSON.parse(localStorage.getItem("preferences")) || {
  theme: "light",
  language: "en",
  fontSize: 12,
  notifications: false,
};

console.log("Loaded preferences:", savedPrefs);

// Update preference
savedPrefs.theme = "light";
localStorage.setItem("preferences", JSON.stringify(savedPrefs));
console.log("Updated theme preference");

// ============================================
// 11. PRACTICAL: FORM DATA RECOVERY
// ============================================
console.log("\n=== Form Data Recovery ===\n");

/*
const form = document.getElementById('myForm');

// Auto-save form data
form.addEventListener('input', (event) => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  localStorage.setItem('formDraft', JSON.stringify(data));
});

// Restore form data on page load
window.addEventListener('load', () => {
  const draft = localStorage.getItem('formDraft');
  if (draft) {
    const data = JSON.parse(draft);
    Object.entries(data).forEach(([key, value]) => {
      const input = form.elements[key];
      if (input) input.value = value;
    });
  }
});

// Clear draft after submission
form.addEventListener('submit', () => {
  localStorage.removeItem('formDraft');
});
*/

console.log("Form auto-save pattern shown");

// ============================================
// 12. DIFFERENCES: LOCALSTORAGE VS SESSIONSTORAGE
// ============================================
console.log("\n=== localStorage vs sessionStorage ===\n");

// Both have same API but different lifetimes:

// localStorage:
localStorage.setItem("persistent", "survives restart");

// sessionStorage:
sessionStorage.setItem("temporary", "cleared on close");

console.log("localStorage - survives browser restart");
console.log("sessionStorage - cleared when tab closes");

// ============================================
// 13. STORAGE QUOTA AND ERRORS
// ============================================
console.log("\n=== Storage Quota ===\n");

// Try-catch for quota exceeded
try {
  const largeData = "x".repeat(1000000); // 1MB string
  localStorage.setItem("largeData", largeData);
  console.log("Large data stored successfully");
} catch (error) {
  if (error.name === "QuotaExceededError") {
    console.log("Storage quota exceeded!");
    // Handle: delete old data or show user message
  }
}

// Check available space (rough estimate)
console.log("Approximate storage used for " + localStorage.length + " items");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== STORAGE SUMMARY ===\n");
console.log("✓ localStorage: Persistent, cross-session");
console.log("✓ sessionStorage: Temporary, current session only");
console.log("✓ Same API: setItem, getItem, removeItem, clear");
console.log("✓ String-only: Use JSON for objects/arrays");
console.log("✓ ~5-10MB limit: Check for quota exceeded");
console.log("✓ Storage events: Listen for changes from other tabs");
console.log("✓ Use for: Preferences, form drafts, user data");
