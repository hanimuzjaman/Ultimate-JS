# DOM Selectors

## What is the DOM?

The **Document Object Model (DOM)** is a tree representation of your HTML document. It allows JavaScript to interact with and manipulate web pages.

```html
<!-- HTML Structure -->
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p id="intro">Welcome</p>
    <ul class="list">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </body>
</html>

<!-- DOM Tree -->
document └── html ├── head │ └── title └── body ├── h1 ├── p#intro └── ul.list
├── li └── li
```

## Accessing the Document

```javascript
// The global document object provides access to the DOM
console.log(document);
console.log(document.title); // "Page Title"
console.log(document.body);
console.log(document.head);
```

## getElementById()

Select single element by **ID**:

```javascript
// HTML: <div id="header">Header</div>

const header = document.getElementById("header");
console.log(header); // HTMLDivElement
console.log(header.textContent); // "Header"
```

**Important:** IDs should be unique on a page.

```javascript
// ✓ Correct - ID is unique
<div id="main-content">Main</div>

// ❌ Wrong - ID appears twice
<div id="content">First</div>
<div id="content">Second</div> <!-- Conflicts with above -->
```

## getElementsByClassName()

Select all elements with **class**:

```javascript
// HTML: <p class="text">Paragraph 1</p>
//       <p class="text highlight">Paragraph 2</p>

const textElements = document.getElementsByClassName("text");
console.log(textElements); // HTMLCollection [p, p]
console.log(textElements.length); // 2

// Loop through results
for (let element of textElements) {
  console.log(element.textContent);
}
```

**Live Collection:** Changes as DOM updates.

```javascript
const list = document.getElementsByClassName("item");
console.log(list.length); // 3

// Add new element with 'item' class
const newItem = document.createElement("div");
newItem.className = "item";
document.body.appendChild(newItem);

console.log(list.length); // 4 - automatically updated!
```

## getElementsByTagName()

Select all elements with specific **tag**:

```javascript
// HTML: <p>Paragraph 1</p>
//       <p>Paragraph 2</p>
//       <p>Paragraph 3</p>

const paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length); // 3

// Get all divs
const divs = document.getElementsByTagName("div");

// Get all elements (wildcard)
const allElements = document.getElementsByTagName("*");
```

## querySelector() - Single Element

Select first element matching **CSS selector**:

```javascript
// HTML: <div id="main">
//         <p class="intro">Hello</p>
//         <p>World</p>
//       </div>

// By ID
const main = document.querySelector("#main");

// By class
const intro = document.querySelector(".intro");

// By tag
const paragraph = document.querySelector("p");

// By attribute
const link = document.querySelector("a[href]");

// By complex selector
const firstListItem = document.querySelector("ul.menu li");

// :first-child pseudo-selector
const firstChild = document.querySelector("p:first-child");
```

**Returns:** First matching element or **null**.

```javascript
const notFound = document.querySelector(".non-existent");
console.log(notFound); // null
```

## querySelectorAll() - Multiple Elements

Select **all** elements matching **CSS selector**:

```javascript
// HTML: <div class="box">Box 1</div>
//       <div class="box">Box 2</div>
//       <div class="box">Box 3</div>

const boxes = document.querySelectorAll(".box");
console.log(boxes.length); // 3

// Loop through
boxes.forEach((box) => {
  console.log(box.textContent);
});

// Complex selectors
const menuItems = document.querySelectorAll("nav ul li");
const evenParagraphs = document.querySelectorAll("p:nth-child(even)");
const allInputs = document.querySelectorAll('input[type="text"]');
```

**Returns:** Static NodeList (snapshot).

```javascript
const items = document.querySelectorAll(".item");
console.log(items.length); // 3

// Add new item
const newItem = document.createElement("div");
newItem.className = "item";
document.body.appendChild(newItem);

// NodeList count doesn't change
console.log(items.length); // Still 3 (static, not live)
```

## Selector Comparison

| Selector                   | Returns        | Updates |
| -------------------------- | -------------- | ------- |
| `getElementById()`         | Single element | -       |
| `getElementsByClassName()` | HTMLCollection | Live    |
| `getElementsByTagName()`   | HTMLCollection | Live    |
| `querySelector()`          | Single element | -       |
| `querySelectorAll()`       | NodeList       | Static  |

## Combining Selectors

### AND - All conditions must match

```javascript
// HTML: <p class="text highlight">Text</p>
//       <p class="text">Other</p>

// Element + class
const p = document.querySelector("p.text.highlight");

// Tag + ID
const main = document.querySelector("div#main");
```

### OR - Any condition matches

```javascript
// HTML: <h1>Title</h1>
//       <h2>Subtitle</h2>

// Not supported in single selector, use multiple
const headings = document.querySelectorAll("h1, h2, h3");
```

### Nested selectors

```javascript
// HTML: <div id="menu">
//         <ul>
//           <li><a href="#">Link 1</a></li>
//           <li><a href="#">Link 2</a></li>
//         </ul>
//       </div>

// Child combinator (direct children)
const links = document.querySelectorAll("#menu > ul > li > a");

// Descendant combinator (any descendant)
const allLinks = document.querySelectorAll("#menu a");
```

## Pseudo-selectors

```javascript
// First element
document.querySelector("li:first-child");

// Last element
document.querySelector("li:last-child");

// Nth element
document.querySelector("li:nth-child(2)");

// Odd/even
document.querySelectorAll("li:nth-child(odd)");
document.querySelectorAll("li:nth-child(even)");

// First of type
document.querySelector("p:first-of-type");

// Not selector
document.querySelectorAll("li:not(.active)");
```

## Attribute selectors

```javascript
// HTML: <input type="text" name="username">
//       <a href="https://example.com" target="_blank">Link</a>
//       <input data-id="123">

// Has attribute
document.querySelector("a[href]");

// Attribute equals value
document.querySelector('input[type="text"]');

// Attribute starts with
document.querySelector('a[href^="https"]');

// Attribute ends with
document.querySelector('a[href$=".pdf"]');

// Attribute contains
document.querySelector('a[href*="example"]');

// Custom data attributes
document.querySelector('[data-id="123"]');
```

## Scoped Selection

Select **within** a specific element:

```javascript
// HTML: <div id="sidebar">
//         <p>Sidebar text</p>
//       </div>
//       <div id="main">
//         <p>Main text</p>
//       </div>

const sidebar = document.getElementById("sidebar");

// Find p within sidebar only
const sidebarText = sidebar.querySelector("p");
console.log(sidebarText.textContent); // "Sidebar text"

// Find all p within sidebar only
const mainDiv = document.getElementById("main");
const mainParagraphs = mainDiv.querySelectorAll("p");
```

## Performance Comparison

**querySelector() is slower** for simple selections but more flexible:

```javascript
// Fast
const el1 = document.getElementById("main");

// Slower (but same result)
const el2 = document.querySelector("#main");

// Use fastest method when selecting by ID
const el3 = document.getElementById("main"); // ✓ Best

// querySelector good for complex selectors
const items = document.querySelectorAll(
  'ul > li.active[data-type="important"]',
);
```

## Checking if Element Exists

```javascript
const element = document.getElementById("nonexistent");

// Check before using
if (element) {
  element.textContent = "Found!";
} else {
  console.log("Element not found");
}

// Or use optional chaining
element?.textContent = "Found!";

// Or use ? operator
const value = element?.textContent ?? "Not found";
```

## Common Selection Patterns

```javascript
// Select all links
const links = document.querySelectorAll("a");

// Select all inputs in a form
const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input");

// Select all active items
const active = document.querySelectorAll(".active");

// Select all data attributes
const dataElements = document.querySelectorAll("[data-*]");

// Select all disabled form elements
const disabled = document.querySelectorAll("input:disabled, button:disabled");

// Select form by name
const searchForm = document.querySelector('form[name="search"]');

// Select by combination
const primaryButtons = document.querySelectorAll(
  "button.btn-primary:not(:disabled)",
);
```

## Advantages of querySelector()

- **Unified API:** Learn one method for most selectors
- **CSS selector syntax:** Use familiar CSS skills
- **Powerful:** Complex selectors easily possible
- **Consistent:** Works across modern browsers

```javascript
// Instead of:
const item = document.getElementById("item");
const items = document.getElementsByClassName("item");

// Use:
const item = document.querySelector("#item");
const items = document.querySelectorAll(".item");
```
