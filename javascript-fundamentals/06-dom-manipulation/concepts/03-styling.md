# CSS Styling & DOM Manipulation

## Inline Styles

### style Object

Access and modify CSS through the **style** property:

```javascript
const element = document.getElementById("header");

// Set individual properties (camelCase)
element.style.color = "blue";
element.style.backgroundColor = "yellow";
element.style.fontSize = "20px";
element.style.padding = "10px";
element.style.border = "2px solid red";
```

CSS property names in JavaScript:

| CSS                | JavaScript        |
| ------------------ | ----------------- |
| `background-color` | `backgroundColor` |
| `font-size`        | `fontSize`        |
| `border-radius`    | `borderRadius`    |
| `text-align`       | `textAlign`       |
| `z-index`          | `zIndex`          |

### Object.assign for Multiple Styles

```javascript
const box = document.getElementById("box");

const styles = {
  width: "200px",
  height: "200px",
  backgroundColor: "navy",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
};

Object.assign(box.style, styles);
```

## Class-Based Styling

### classList API

Manage classes without overwriting:

```javascript
const element = document.getElementById("box");

// Add single class
element.classList.add("highlight");

// Add multiple classes
element.classList.add("large", "active", "primary");

// Remove class
element.classList.remove("highlight");

// Check if has class
if (element.classList.contains("active")) {
  console.log("Element is active");
}

// Toggle class (add if missing, remove if present)
element.classList.toggle("active");

// Get all classes
console.log(element.classList); // DOMTokenList
```

### When to Use Classes vs Inline Styles

```javascript
// ✓ Use classes for complex styling
element.classList.add("dark-theme");
// CSS: .dark-theme { color: #fff; background: #333; border: ... }

// ✓ Use inline styles for single properties
element.style.opacity = "0.5";

// Use classes for responsive, reusable styling
// Use inline styles for dynamic values
element.style.width = Math.random() * 100 + "px";
```

## Computed Styles

Get final CSS values applied to element:

```javascript
const element = document.getElementById("box");

// Get computed style
const computed = window.getComputedStyle(element);

// Access properties
console.log(computed.backgroundColor);
console.log(computed.fontSize);
console.log(computed.display);

// Computed values are read-only
computed.color = "red"; // No effect
element.style.color = "red"; // Works
```

## Display and Visibility

### Display Property

Hide/show element completely (removes from layout):

```javascript
const element = document.getElementById("modal");

// Hide completely
element.style.display = "none"; // Takes up no space

// Show
element.style.display = "block"; // Block element
element.style.display = "inline"; // Inline element
element.style.display = "flex"; // Flex container
element.style.display = "grid"; // Grid container
```

### Visibility Property

Hide but keep space (layout not affected):

```javascript
element.style.visibility = "hidden"; // Hidden but space reserved
element.style.visibility = "visible"; // Show again
```

### Opacity

```javascript
element.style.opacity = "0"; // Fully transparent but interactive
element.style.opacity = "0.5"; // 50% transparent
element.style.opacity = "1"; // Fully opaque (default)
```

## Positioning

### Absolute Positioning

```javascript
const popup = document.getElementById("popup");

popup.style.position = "absolute";
popup.style.top = "100px";
popup.style.left = "200px";
popup.style.width = "400px";
popup.style.height = "300px";
```

### Fixed Positioning

```javascript
const header = document.getElementById("header");

header.style.position = "fixed";
header.style.top = "0";
header.style.left = "0";
header.style.right = "0";
header.style.zIndex = "1000";
```

## Dynamic Styling Examples

### Theme Switcher

```javascript
function setTheme(themeName) {
  const root = document.documentElement;

  const themes = {
    light: {
      "--bg-color": "#ffffff",
      "--text-color": "#000000",
      "--primary-color": "#007bff",
    },
    dark: {
      "--bg-color": "#1e1e1e",
      "--text-color": "#ffffff",
      "--primary-color": "#00d4ff",
    },
  };

  const theme = themes[themeName];
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

setTheme("dark");
```

### Conditional Styling

```javascript
function toggleHighlight(element) {
  if (element.style.backgroundColor === "yellow") {
    element.style.backgroundColor = "";
  } else {
    element.style.backgroundColor = "yellow";
  }
}

// Or cleaner with classList
function toggleHighlight(element) {
  element.classList.toggle("highlighted");
}
```

### Responsive Styling

```javascript
function adjustLayout() {
  const width = window.innerWidth;
  const container = document.getElementById("container");

  if (width < 600) {
    container.style.gridTemplateColumns = "1fr";
  } else if (width < 1200) {
    container.style.gridTemplateColumns = "1fr 1fr";
  } else {
    container.style.gridTemplateColumns = "1fr 1fr 1fr";
  }
}

// Listen to resize
window.addEventListener("resize", adjustLayout);
adjustLayout(); // Initial call
```

## CSS Transitions with JavaScript

```javascript
const box = document.getElementById("box");

box.style.transition = "all 0.3s ease";

// Change style (transition will animate)
box.style.backgroundColor = "red";
box.style.transform = "scale(1.5)";

// Trigger animation from user action
button.addEventListener("click", () => {
  box.style.opacity = box.style.opacity === "1" ? "0" : "1";
});
```

## Batch Style Updates

**Efficient approach** - modify once:

```javascript
// ❌ Inefficient - multiple reflows
element.style.width = "100px";
element.style.height = "100px";
element.style.backgroundColor = "blue";
element.style.borderRadius = "10px";

// ✓ Efficient - single update
element.style.cssText =
  "width: 100px; height: 100px; background-color: blue; border-radius: 10px;";

// ✓ Or use class
element.classList.add("styled-box");
/* CSS: .styled-box { width: 100px; height: 100px; background-color: blue; border-radius: 10px; } */
```

## Practical Examples

### Highlight Search Results

```javascript
function highlightText(text) {
  const elements = document.querySelectorAll("p");

  elements.forEach((el) => {
    if (el.textContent.includes(text)) {
      el.classList.add("highlight");
    }
  });
}
```

### Toggle Dark Mode

```javascript
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
}

// Restore on load
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}
```

### Loading State

```javascript
function setLoading(button, isLoading) {
  button.disabled = isLoading;
  button.style.opacity = isLoading ? "0.6" : "1";
  button.textContent = isLoading ? "Loading..." : "Click me";
}

button.addEventListener("click", async () => {
  setLoading(button, true);
  await fetch("/api/data");
  setLoading(button, false);
});
```
