# Creating and Removing Elements

## Creating Elements

### createElement()

Create a new **HTML element**:

```javascript
// Create elements
const div = document.createElement("div");
const p = document.createElement("p");
const img = document.createElement("img");
const button = document.createElement("button");

console.log(div); // <div></div>
console.log(p); // <p></p>
```

The element exists in memory but **not yet in the DOM**.

```javascript
// Element created but not visible on page
const heading = document.createElement("h1");
heading.textContent = "Hello World";
// Not in DOM yet - not visible!
```

### Adding Content

**textContent** - Plain text:

```javascript
const p = document.createElement("p");
p.textContent = "This is a paragraph";
console.log(p.textContent); // "This is a paragraph"
```

**innerHTML** - HTML content:

```javascript
const div = document.createElement("div");
div.innerHTML = "<strong>Bold text</strong> and <em>italic</em>";
// div contains HTML elements
```

**textContent vs innerHTML**:

```javascript
const container = document.createElement("div");

// textContent - treats as plain text
container.textContent = "<p>Hello</p>";
// Result: <div>&lt;p&gt;Hello&lt;/p&gt;</div>

// innerHTML - parses as HTML
container.innerHTML = "<p>Hello</p>";
// Result: <div><p>Hello</p></div>
```

### Setting Attributes

Using **setAttribute()**:

```javascript
const img = document.createElement("img");
img.setAttribute("src", "image.jpg");
img.setAttribute("alt", "My Image");
img.setAttribute("width", "200");

// Access with getAttribute
console.log(img.getAttribute("src")); // "image.jpg"
```

Direct property assignment:

```javascript
const img = document.createElement("img");
img.src = "photo.jpg";
img.alt = "Photo";
img.width = 300;

// Special cases
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter name";
input.disabled = true;

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = true; // Boolean attribute
```

### Setting Classes

Using **className**:

```javascript
const div = document.createElement("div");
div.className = "container box";
console.log(div.className); // "container box"
```

Using **classList**:

```javascript
const div = document.createElement("div");

// Add single class
div.classList.add("container");

// Add multiple classes
div.classList.add("active", "highlight", "large");

// Check if has class
console.log(div.classList.contains("active")); // true

// Remove class
div.classList.remove("highlight");

// Toggle class
div.classList.toggle("active"); // Removes if present, adds if missing

// Get all classes
console.log(div.classList); // DOMTokenList ["container", "active", "large"]
```

### Setting Styles

Direct property assignment:

```javascript
const div = document.createElement("div");

// CSS properties become camelCase in JavaScript
div.style.color = "red";
div.style.backgroundColor = "blue";
div.style.fontSize = "16px";
div.style.padding = "10px";
div.style.border = "1px solid black";
```

Using **setAttribute()**:

```javascript
const div = document.createElement("div");
div.setAttribute("style", "color: red; background-color: blue; padding: 10px;");
```

## Adding Elements to the DOM

### appendChild()

Add element as **last child**:

```javascript
const container = document.getElementById("container");
const newDiv = document.createElement("div");
newDiv.textContent = "New element";

container.appendChild(newDiv);
// newDiv is now the last child of container
```

Returns the appended element:

```javascript
const parent = document.body;
const child = parent.appendChild(document.createElement("p"));
// child now references the appended element
```

### insertBefore()

Insert element **before** a reference element:

```javascript
const ul = document.querySelector("ul");
const firstLi = ul.querySelector("li");

const newLi = document.createElement("li");
newLi.textContent = "New Item";

// Insert newLi before firstLi
ul.insertBefore(newLi, firstLi);
```

Insert as first child:

```javascript
const parent = document.getElementById("container");
const newElement = document.createElement("div");

// Insert before first child (makes it first)
parent.insertBefore(newElement, parent.firstChild);
```

### prepend() and append()

Modern alternatives:

```javascript
const container = document.getElementById("container");

// Add at end
container.append(document.createElement("div")); // Like appendChild

// Add at beginning
container.prepend(document.createElement("div")); // Like insertBefore(..., firstChild)

// Can add multiple elements at once
const div1 = document.createElement("div");
const div2 = document.createElement("div");
container.append(div1, div2, "Text node");
```

## Removing Elements

### removeChild()

Remove a **child element**:

```javascript
const parent = document.getElementById("container");
const child = parent.querySelector(".item");

parent.removeChild(child);
// child is removed from DOM
```

Remove by index:

```javascript
const ul = document.querySelector("ul");
const firstLi = ul.children[0]; // Get first child
ul.removeChild(firstLi); // Remove it
```

### remove()

Remove element itself:

```javascript
const element = document.getElementById("popup");
element.remove(); // Removes from parent without needing reference to parent
```

Remove element's children:

```javascript
const container = document.getElementById("container");

// Remove all children
while (container.firstChild) {
  container.removeChild(container.firstChild);
}

// Or cleaner way
container.innerHTML = ""; // Removes all child elements
```

## Replacing Elements

### replaceChild()

Replace one element with another:

```javascript
const parent = document.getElementById("container");
const oldElement = parent.querySelector(".old");
const newElement = document.createElement("div");
newElement.textContent = "New content";

parent.replaceChild(newElement, oldElement);
// oldElement is removed, newElement takes its place
```

### replaceWith()

Modern replacement:

```javascript
const oldElement = document.getElementById("old");
const newElement = document.createElement("div");

oldElement.replaceWith(newElement);
// oldElement replaced by newElement
```

## Cloning Elements

### cloneNode()

Create a copy of an element:

```javascript
const original = document.getElementById("template");

// Shallow copy (element only, no children)
const shallow = original.cloneNode(false);

// Deep copy (element + all children)
const deep = original.cloneNode(true);

document.body.appendChild(deep);
```

Use case - using elements as templates:

```javascript
const template = document.getElementById("item-template");

// Create multiple copies
for (let i = 0; i < 5; i++) {
  const clone = template.cloneNode(true);
  clone.querySelector(".name").textContent = `Item ${i}`;
  document.body.appendChild(clone);
}
```

## Practical Examples

### Create and Add Complex Element

```javascript
function createCard(title, description) {
  const card = document.createElement("div");
  card.className = "card";

  const heading = document.createElement("h2");
  heading.textContent = title;

  const text = document.createElement("p");
  text.textContent = description;

  card.appendChild(heading);
  card.appendChild(text);

  return card;
}

const card = createCard("Hello", "This is content");
document.getElementById("container").appendChild(card);
```

### Using innerHTML for Structure

```javascript
const container = document.getElementById("container");

const html = `
  <div class="card">
    <h2>Title</h2>
    <p>Description</p>
    <button>Action</button>
  </div>
`;

container.innerHTML += html; // Add to existing content
// Or
container.insertAdjacentHTML("beforeend", html);
```

### insertAdjacentHTML() - Precise Positioning

```javascript
const element = document.getElementById("target");

// Insert before the element
element.insertAdjacentHTML("beforebegin", "<div>Before</div>");

// Insert inside, before content
element.insertAdjacentHTML("afterbegin", "<span>Inside before</span>");

// Insert inside, after content
element.insertAdjacentHTML("beforeend", "<span>Inside after</span>");

// Insert after the element
element.insertAdjacentHTML("afterend", "<div>After</div>");
```

### Dynamic List Creation

```javascript
function createList(items) {
  const ul = document.createElement("ul");

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });

  return ul;
}

const list = createList(["Apple", "Banana", "Cherry"]);
document.body.appendChild(list);
```

## Performance Considerations

### DocumentFragment - Batch Operations

Avoid multiple DOM operations:

```javascript
// ❌ Slow - reflows DOM 1000 times
const container = document.getElementById("container");
for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  container.appendChild(div); // Each adds to DOM
}

// ✓ Fast - single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  fragment.appendChild(div); // In memory
}
container.appendChild(fragment); // Single DOM update
```

### innerHTML vs createElement

```javascript
// Simple content - innerHTML is fine
element.innerHTML = "<p>Hello</p>";

// Complex dynamic structure - createElement is cleaner
const items = ["Apple", "Banana", "Cherry"];
const ul = document.createElement("ul");
items.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  ul.appendChild(li);
});
```

## Security: XSS Prevention

**textContent is safer than innerHTML**:

```javascript
// User input
const userInput = "<img src=x onerror=\"alert('hacked')\">";

// ❌ Dangerous - executes JavaScript
element.innerHTML = userInput; // XSS vulnerability!

// ✓ Safe - treats as text
element.textContent = userInput; // Displays as plain text
```

Always sanitize user input with innerHTML:

```javascript
// Using a sanitization library (DOMPurify example)
element.innerHTML = DOMPurify.sanitize(userInput);
```
