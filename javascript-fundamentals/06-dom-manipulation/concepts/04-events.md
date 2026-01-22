# Event Handling

## What are Events?

Events are actions or occurrences on the page triggered by user interaction or the browser.

**Common Events:**

- **Click:** User clicks an element
- **Input:** User types in form field
- **Submit:** Form is submitted
- **Focus:** Element receives focus
- **Blur:** Element loses focus
- **Mouseover/Mouseout:** Mouse enters/leaves element
- **Keydown/Keyup:** Keyboard key pressed/released
- **Load:** Page/resource loaded
- **Scroll:** Page scrolled
- **Resize:** Window resized

## addEventListener()

Attach event listener to element:

```javascript
const button = document.getElementById("myButton");

// Listen for click event
button.addEventListener("click", function () {
  console.log("Button clicked!");
});

// Or with arrow function
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

**Multiple listeners** on same element and event:

```javascript
const button = document.getElementById("myButton");

button.addEventListener("click", () => {
  console.log("First listener");
});

button.addEventListener("click", () => {
  console.log("Second listener");
});

// Both execute when clicked
```

## Event Object

Function receives **event** object with information:

```javascript
button.addEventListener("click", function (event) {
  console.log(event); // Event object
  console.log(event.type); // "click"
  console.log(event.target); // Element clicked
  console.log(event.currentTarget); // Element with listener
  console.log(event.timestamp); // When event occurred
});
```

### Common Event Properties

```javascript
element.addEventListener("click", (e) => {
  e.type; // Event type ("click", "submit", etc)
  e.target; // Element that triggered event
  e.currentTarget; // Element with listener
  e.preventDefault(); // Cancel default behavior
  e.stopPropagation(); // Stop event bubbling
  e.stopImmediatePropagation(); // Stop all listeners
});
```

## Types of Events

### Mouse Events

```javascript
element.addEventListener("click", () => {
  console.log("Clicked");
});

element.addEventListener("dblclick", () => {
  console.log("Double clicked");
});

element.addEventListener("mouseover", () => {
  console.log("Mouse over");
});

element.addEventListener("mouseout", () => {
  console.log("Mouse left");
});

element.addEventListener("mouseenter", () => {
  console.log("Mouse entered");
});

element.addEventListener("mouseleave", () => {
  console.log("Mouse left");
});

element.addEventListener("mousedown", () => {
  console.log("Mouse button down");
});

element.addEventListener("mouseup", () => {
  console.log("Mouse button released");
});
```

### Keyboard Events

```javascript
input.addEventListener("keydown", (e) => {
  console.log("Key pressed:", e.key);
  console.log("Key code:", e.code);
});

input.addEventListener("keyup", (e) => {
  console.log("Key released:", e.key);
});

input.addEventListener("keypress", (e) => {
  console.log("Key pressed:", e.key);
});
```

Key properties:

```javascript
document.addEventListener("keydown", (e) => {
  console.log(e.key); // 'a', 'Enter', 'Shift', etc
  console.log(e.code); // 'KeyA', 'Enter', 'ShiftLeft', etc
  console.log(e.shiftKey); // true if Shift held
  console.log(e.ctrlKey); // true if Ctrl held
  console.log(e.altKey); // true if Alt held
});
```

### Form Events

```javascript
input.addEventListener("input", (e) => {
  console.log("User typing:", e.target.value);
});

input.addEventListener("change", (e) => {
  console.log("Value changed:", e.target.value);
});

input.addEventListener("focus", (e) => {
  console.log("Field focused");
});

input.addEventListener("blur", (e) => {
  console.log("Field lost focus");
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop default submission
  console.log("Form submitted");
});
```

### Window Events

```javascript
window.addEventListener("load", () => {
  console.log("Page fully loaded");
});

window.addEventListener("scroll", () => {
  console.log("Page scrolled");
});

window.addEventListener("resize", () => {
  console.log("Window resized");
  console.log("Width:", window.innerWidth);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready");
});
```

## Event Delegation

Listen on parent element for child events:

```javascript
// HTML: <ul id="list">
//         <li>Item 1</li>
//         <li>Item 2</li>
//         <li>Item 3</li>
//       </ul>

const list = document.getElementById("list");

// Single listener on parent
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
  }
});

// Works for dynamically added items too!
const newItem = document.createElement("li");
newItem.textContent = "Item 4";
list.appendChild(newItem); // Still triggers parent listener
```

**Benefits:**

- Fewer event listeners
- Works with dynamic elements
- Better performance

## Event Propagation

Events bubble up the DOM tree:

```javascript
// HTML: <div id="parent">
//         <button id="child">Click me</button>
//       </div>

const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", () => {
  console.log("Parent clicked");
});

child.addEventListener("click", () => {
  console.log("Child clicked");
});

// Clicking child logs:
// "Child clicked"
// "Parent clicked"
```

### Stop Propagation

```javascript
child.addEventListener("click", (e) => {
  e.stopPropagation(); // Don't bubble
  console.log("Child clicked");
});

// Now clicking child only logs "Child clicked"
// Parent listener doesn't run
```

### Event Capturing

```javascript
// Capture phase - runs first
document.addEventListener(
  "click",
  (e) => {
    console.log("Document capturing");
  },
  true,
); // true = capture phase

// Bubbling phase - runs second
document.addEventListener(
  "click",
  (e) => {
    console.log("Document bubbling");
  },
  false,
); // false = bubble phase (default)
```

## Preventing Default Behavior

```javascript
const link = document.querySelector("a");

link.addEventListener("click", (e) => {
  e.preventDefault(); // Don't navigate to href
  console.log("Link clicked but not navigating");
});

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Don't submit form
  // Handle submission manually
});

// Right-click menu
document.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // Prevent context menu
});
```

## Removing Event Listeners

```javascript
const button = document.getElementById("button");

function handleClick() {
  console.log("Clicked");
}

// Add listener
button.addEventListener("click", handleClick);

// Remove listener
button.removeEventListener("click", handleClick);
```

**Important:** Must use same function reference

```javascript
// ❌ Won't work - different function reference
button.addEventListener("click", () => {
  console.log("Click");
});
button.removeEventListener("click", () => {
  console.log("Click");
});

// ✓ Works - same function reference
function handleClick() {
  console.log("Click");
}
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

## Event Delegation Pattern

Efficient way to handle many similar elements:

```javascript
const list = document.querySelector(".todo-list");

list.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  if (deleteBtn) {
    const item = deleteBtn.closest(".todo-item");
    item.remove();
  }

  const checkbox = e.target.closest(".toggle");
  if (checkbox) {
    checkbox.parentElement.classList.toggle("completed");
  }
});
```

## Practical Examples

### Toggle Dark Mode

```javascript
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light",
  );
});
```

### Form Validation

```javascript
const form = document.getElementById("form");
const emailInput = form.querySelector('input[name="email"]');

emailInput.addEventListener("blur", () => {
  if (!emailInput.value.includes("@")) {
    emailInput.classList.add("error");
  } else {
    emailInput.classList.remove("error");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Submit form data
});
```

### Debounced Search

```javascript
const searchInput = document.getElementById("search");

let debounceTimer;

searchInput.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const query = e.target.value;
    console.log("Searching for:", query);
    // Perform search
  }, 300);
});
```
