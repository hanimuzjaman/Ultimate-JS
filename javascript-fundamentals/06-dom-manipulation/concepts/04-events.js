// ================================================
// DOM EVENTS - Practical Code Examples
// ================================================

// ===== 1. ADDEVENTLISTENER - BASIC SETUP =====
console.log("\n--- 1. ADDEVENTLISTENER ---");

// In a browser environment:
// const button = document.getElementById("myButton");
// button.addEventListener("click", function(event) {
//   console.log("Button clicked!");
// });

// Mock event object
const mockEvent = {
  type: "click",
  target: { id: "myButton", textContent: "Click me" },
  currentTarget: { id: "myButton" },
  preventDefault: function () {
    console.log("Default prevented");
  },
  stopPropagation: function () {
    console.log("Propagation stopped");
  },
};

console.log("Event object structure:", Object.keys(mockEvent));

// ===== 2. COMMON EVENT TYPES =====
console.log("\n--- 2. COMMON EVENT TYPES ---");

const eventTypes = {
  "Mouse Events": [
    "click - Single mouse click",
    "dblclick - Double click",
    "mouseover - Mouse enters element",
    "mouseout - Mouse leaves element",
    "mouseenter - Mouse enters (no bubbling)",
    "mouseleave - Mouse leaves (no bubbling)",
    "mousedown - Mouse button pressed",
    "mouseup - Mouse button released",
    "mousemove - Mouse moves",
  ],
  "Keyboard Events": [
    "keydown - Key is pressed",
    "keyup - Key is released",
    "keypress - Key is pressed (deprecated)",
  ],
  "Form Events": [
    "input - Input value changes",
    "change - Form value changed (confirmed)",
    "focus - Element gets focus",
    "blur - Element loses focus",
    "submit - Form submitted",
  ],
  "Window Events": [
    "load - Page loaded",
    "unload - Page unloading",
    "scroll - Page scrolled",
    "resize - Window resized",
    "beforeunload - Before leaving page",
  ],
};

console.log("Event Types:");
for (const [category, events] of Object.entries(eventTypes)) {
  console.log(`\n${category}:`);
  events.forEach((e) => console.log(`  • ${e}`));
}

// ===== 3. CLICK EVENT =====
console.log("\n--- 3. CLICK EVENT ---");

function handleClick(event) {
  console.log("Button clicked!");
  console.log("Event type:", event.type);
  console.log("Target element:", event.target.id);
}

// Simulated:
// button.addEventListener("click", handleClick);

console.log("Click handler registered");

// ===== 4. EVENT OBJECT PROPERTIES =====
console.log("\n--- 4. EVENT OBJECT PROPERTIES ---");

function analyzeEvent(event) {
  console.log("Event Properties:");
  console.log("  type:", event.type); // "click"
  console.log("  target:", event.target); // Element that triggered
  console.log("  currentTarget:", event.currentTarget); // Element with listener
  console.log("  timestamp:", event.timestamp); // When event occurred
  console.log("  bubbles:", event.bubbles); // Does it bubble?
  console.log("  cancelable:", event.cancelable); // Can it be prevented?
}

// Mock:
analyzeEvent(mockEvent);

// ===== 5. MOUSE EVENT PROPERTIES =====
console.log("\n--- 5. MOUSE EVENT PROPERTIES ---");

function handleMouseEvent(event) {
  console.log("Mouse Position:");
  // event.clientX - Position within viewport
  // event.clientY
  // event.pageX - Position within page
  // event.pageY
  // event.screenX - Position within screen
  // event.screenY
  // event.offsetX - Position within target element
  // event.offsetY

  // Which mouse button:
  // event.button: 0=left, 1=middle, 2=right
}

console.log("Mouse event properties available");

// ===== 6. KEYBOARD EVENT PROPERTIES =====
console.log("\n--- 6. KEYBOARD EVENT PROPERTIES ---");

function handleKeyDown(event) {
  console.log("Key Information:");
  // event.key - The key pressed ("a", "Enter", "Shift", etc.)
  // event.code - Physical key code ("KeyA", "Enter", "ShiftLeft")
  // event.keyCode - Numeric code (deprecated)
  // event.altKey - Alt pressed?
  // event.ctrlKey - Ctrl pressed?
  // event.shiftKey - Shift pressed?
  // event.metaKey - Cmd/Windows pressed?

  // Example:
  // if (event.key === "Enter") { ... }
  // if (event.ctrlKey && event.key === "s") { ... }
}

console.log("Keyboard event properties available");

// ===== 7. FORM EVENTS - INPUT =====
console.log("\n--- 7. FORM EVENTS - INPUT ---");

function handleInput(event) {
  const value = event.target.value;
  console.log("Input value:", value);
  // This fires as user types
}

// Simulated:
// input.addEventListener("input", handleInput);

// Live filtering example:
function filterList(event) {
  const searchTerm = event.target.value.toLowerCase();
  // Filter items based on searchTerm
  console.log("Filtering for:", searchTerm);
}

console.log("Input event handler ready");

// ===== 8. FORM EVENTS - CHANGE VS INPUT =====
console.log("\n--- 8. CHANGE VS INPUT ---");

console.log("input event:");
console.log("  • Fires on every value change");
console.log("  • Fires while typing");
console.log("  • Use for live filtering");

console.log("change event:");
console.log("  • Fires after value confirmed");
console.log("  • Fires on blur or enter");
console.log("  • Use for form submission validation");

// ===== 9. FORM EVENTS - FOCUS AND BLUR =====
console.log("\n--- 9. FOCUS AND BLUR ---");

function handleFocus(event) {
  console.log("Element focused:", event.target.id);
  // Highlight or show helper text
  event.target.style.borderColor = "blue";
}

function handleBlur(event) {
  console.log("Element blurred:", event.target.id);
  // Validate or hide helper
  event.target.style.borderColor = "gray";
}

// Usage:
// input.addEventListener("focus", handleFocus);
// input.addEventListener("blur", handleBlur);

console.log("Focus and blur handlers ready");

// ===== 10. FORM SUBMISSION =====
console.log("\n--- 10. FORM SUBMISSION ---");

function handleSubmit(event) {
  // Prevent default form submission
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  console.log("Form submitted with data:", data);
  // Send to server, validate, etc.
}

// Usage:
// form.addEventListener("submit", handleSubmit);

console.log("Form submission handler ready");

// ===== 11. PREVENT DEFAULT =====
console.log("\n--- 11. PREVENT DEFAULT ---");

function preventDefaultExample(event) {
  // Prevent default browser behavior
  event.preventDefault();

  // Examples:
  // - Link not navigating
  // - Form not submitting
  // - Checkbox not toggling
  // - Right-click context menu not appearing
}

console.log("preventDefault() stops default behavior");

// ===== 12. STOP PROPAGATION =====
console.log("\n--- 12. STOP PROPAGATION ---");

// Event bubbling: click on child → fires on parent too
// Event capturing: opposite direction

function innerClick(event) {
  console.log("Inner element clicked");
  // Prevent event from bubbling to parent
  event.stopPropagation();
}

function outerClick(event) {
  console.log("Outer element clicked");
}

// Usage:
// inner.addEventListener("click", innerClick);
// outer.addEventListener("click", outerClick);
// When inner is clicked, only innerClick fires

console.log("stopPropagation() prevents bubbling");

// ===== 13. EVENT DELEGATION =====
console.log("\n--- 13. EVENT DELEGATION ---");

// Instead of adding listener to each item:
// list.addEventListener("click", function(event) {
//   if (event.target.tagName === "LI") {
//     console.log("Item clicked:", event.target.textContent);
//   }
// });

function delegatedClick(event) {
  // Check what was actually clicked
  if (event.target.classList.contains("item")) {
    console.log("Item clicked:", event.target.textContent);
  }
}

console.log("Event delegation: One listener, many targets");

// ===== 14. MULTIPLE LISTENERS =====
console.log("\n--- 14. MULTIPLE LISTENERS ---");

const element = {
  listeners: [],
  addEventListener: function (type, handler) {
    this.listeners.push({ type, handler });
  },
};

// Add multiple listeners
element.addEventListener("click", () => console.log("Handler 1"));
element.addEventListener("click", () => console.log("Handler 2"));

console.log("Multiple listeners for same event work");

// ===== 15. REMOVE EVENT LISTENER =====
console.log("\n--- 15. REMOVE EVENT LISTENER ---");

function myHandler(event) {
  console.log("Handler executed");
}

// Add listener
// element.addEventListener("click", myHandler);

// Remove listener (must be named function)
// element.removeEventListener("click", myHandler);

console.log("Use removeEventListener to stop listening");

// ===== 16. ONCE OPTION =====
console.log("\n--- 16. ONCE OPTION ---");

// Listen only once, then auto-remove
// button.addEventListener("click", () => {
//   console.log("This fires only once!");
// }, { once: true });

console.log("Options: { once: true, passive: false, capture: false }");

// ===== 17. EVENT DELEGATION WITH CLOSEST =====
console.log("\n--- 17. DELEGATION WITH CLOSEST() ---");

// Better delegation using closest()
function delegatedClickWithClosest(event) {
  // Find nearest ancestor matching selector
  // const button = event.target.closest("button");
  // if (button) {
  //   console.log("Button clicked:", button.textContent);
  // }
}

console.log("closest() finds nearest matching ancestor");

// ===== 18. CUSTOM EVENTS =====
console.log("\n--- 18. CUSTOM EVENTS ---");

// Create custom event
const customEvent = new Event("myEvent", {
  bubbles: true,
  cancelable: true,
});

// Dispatch it
// element.dispatchEvent(customEvent);

// Listen for it
// element.addEventListener("myEvent", () => {
//   console.log("Custom event triggered!");
// });

console.log("Custom events for component communication");

// ===== 19. PRACTICAL: FORM VALIDATION =====
console.log("\n--- 19. PRACTICAL: FORM VALIDATION ---");

const formExample = {
  email: { value: "" },
  password: { value: "" },
};

function validateEmail(event) {
  const email = event.target.value;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  event.target.style.borderColor = isValid ? "green" : "red";
  console.log("Email validation:", isValid ? "Valid" : "Invalid");
}

console.log("Form validation with real-time feedback");

// ===== 20. PRACTICAL: SEARCH WITH DEBOUNCE =====
console.log("\n--- 20. DEBOUNCED SEARCH ---");

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

function handleSearch(event) {
  const query = event.target.value;
  console.log("Searching for:", query);
  // Make API call
}

// Apply debounce (waits 300ms after user stops typing)
// const debouncedSearch = debounce(handleSearch, 300);
// searchInput.addEventListener("input", debouncedSearch);

console.log("Debounced search prevents excessive calls");

// ===== 21. PRACTICAL: DYNAMIC LIST HANDLING =====
console.log("\n--- 21. DYNAMIC LIST HANDLING ---");

// HTML:
// <ul id="list">
//   <li class="item">Item 1 <button class="delete">×</button></li>
//   <li class="item">Item 2 <button class="delete">×</button></li>
// </ul>

function setupListHandlers() {
  // One listener for entire list
  // document.getElementById("list").addEventListener("click", (e) => {
  //   if (e.target.classList.contains("delete")) {
  //     e.target.closest("li").remove();
  //   }
  // });

  console.log("Dynamic list click handler set up");
}

// ===== 22. PRACTICAL: THEME TOGGLE =====
console.log("\n--- 22. THEME TOGGLE ---");

function toggleTheme(event) {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  console.log("Theme switched to:", isDark ? "dark" : "light");
}

// Usage:
// themeButton.addEventListener("click", toggleTheme);

console.log("Theme toggle with localStorage persistence");

// ===== 23. PRACTICAL: CLICK OUTSIDE TO CLOSE =====
console.log("\n--- 23. CLICK OUTSIDE TO CLOSE ---");

function setupClickOutsideHandler(element, onClickOutside) {
  // document.addEventListener("click", (event) => {
  //   if (!element.contains(event.target)) {
  //     onClickOutside();
  //   }
  // });

  console.log("Click outside handler set up");
}

// Usage:
// setupClickOutsideHandler(modal, () => modal.close());

// ===== 24. KEYBOARD SHORTCUTS =====
console.log("\n--- 24. KEYBOARD SHORTCUTS ---");

function setupKeyboardShortcuts() {
  // document.addEventListener("keydown", (e) => {
  //   if (e.ctrlKey && e.key === "k") {
  //     e.preventDefault();
  //     openSearchPalette();
  //   }
  //   if (e.key === "Escape") {
  //     closeModals();
  //   }
  // });

  console.log("Keyboard shortcuts registered");
}

// Common shortcuts:
// Ctrl+K - Command palette
// Escape - Close modal
// Enter - Submit
// ArrowUp/Down - Navigate

// ===== 25. EVENT OBJECT IMMUTABILITY =====
console.log("\n--- 25. EVENT OBJECT ---");

console.log("Important event object facts:");
console.log("• Event object is reused (don't store it)");
console.log("• Store values from event: const value = event.target.value");
console.log("• If you need async code, use event.preventDefault() first");

console.log("\n=== Events Summary ===");
console.log("addEventListener() - Add event handler");
console.log("removeEventListener() - Remove handler");
console.log("event.preventDefault() - Prevent default behavior");
console.log("event.stopPropagation() - Stop bubbling");
console.log("event.target - Element that triggered event");
console.log("Event delegation - One listener for many elements");
console.log("Debounce - Reduce event firing frequency");
console.log("Custom events - Create your own events");
