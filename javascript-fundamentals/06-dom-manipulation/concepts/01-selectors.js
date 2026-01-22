// ============================================
// 01-selectors.js
// DOM Selection Methods - Examples
// ============================================

// Note: These examples assume a browser environment with HTML
// Run in browser console or Node.js with jsdom

console.log("=== 1. getElementById() ===");

// HTML: <div id="header">Header Section</div>

// Get element by ID
const header = document.getElementById("header");
console.log("Found element:", header?.id);
console.log("Text content:", header?.textContent);

// Returns null if not found
const notFound = document.getElementById("nonexistent");
console.log("Not found returns:", notFound); // null

// 2. getElementsByClassName()
console.log("\n=== 2. getElementsByClassName() ===");

// HTML: <p class="paragraph">Para 1</p>
//       <p class="paragraph">Para 2</p>
//       <div class="paragraph">Div 1</div>

const paragraphs = document.getElementsByClassName("paragraph");
console.log("Found elements:", paragraphs?.length);

// Live collection - updates with DOM changes
console.log("Is live:", paragraphs instanceof HTMLCollection);

// Access by index
if (paragraphs?.length > 0) {
  console.log("First element text:", paragraphs[0]?.textContent);
}

// Loop through
for (let elem of paragraphs || []) {
  console.log("Element:", elem.tagName);
}

// 3. getElementsByTagName()
console.log("\n=== 3. getElementsByTagName() ===");

// HTML: <p>Paragraph 1</p>
//       <p>Paragraph 2</p>
//       <div>Division</div>

const allParagraphs = document.getElementsByTagName("p");
console.log("Found paragraphs:", allParagraphs?.length);

// Get all elements with wildcard
const allElements = document.getElementsByTagName("*");
console.log("Total elements in document:", allElements?.length);

// Multiple tags - not directly supported
// Must use querySelectorAll instead:
const headings = document.querySelectorAll("h1, h2, h3");
console.log("Heading count:", headings?.length);

// 4. querySelector() - Single Element
console.log("\n=== 4. querySelector() ===");

// HTML: <section id="main" class="container">
//         <div class="card">Card 1</div>
//         <div class="card active">Card 2</div>
//       </section>

// By ID
const main = document.querySelector("#main");
console.log("By ID:", main?.id);

// By class
const card = document.querySelector(".card");
console.log("By class (first):", card?.className);

// By tag
const section = document.querySelector("section");
console.log("By tag:", section?.tagName);

// By combination
const activeCard = document.querySelector(".card.active");
console.log("By combination:", activeCard?.className);

// By attribute
const linkWithTarget = document.querySelector('a[target="_blank"]');
console.log("By attribute:", linkWithTarget?.target);

// By pseudo-selector
const firstItem = document.querySelector("li:first-child");
console.log("First item exists:", !!firstItem);

// Nested selector
const mainCard = document.querySelector("#main .card");
console.log("Nested selector:", mainCard?.tagName);

// Returns null if not found
const missing = document.querySelector(".nonexistent");
console.log("Missing returns null:", missing === null);

// 5. querySelectorAll() - Multiple Elements
console.log("\n=== 5. querySelectorAll() ===");

// HTML: <div class="box">Box 1</div>
//       <div class="box">Box 2</div>
//       <div class="box">Box 3</div>

const boxes = document.querySelectorAll(".box");
console.log("Found boxes:", boxes?.length);

// Returns NodeList (not HTMLCollection)
console.log("Is NodeList:", boxes instanceof NodeList);

// Convert to array for modern methods
const boxArray = Array.from(boxes);
console.log("As array:", boxArray?.length);

// Use forEach on NodeList
boxes.forEach((box, index) => {
  console.log(`Box ${index + 1}:`, box.textContent);
});

// Complex selector
const inputs = document.querySelectorAll('form input[type="text"]');
console.log("Form text inputs:", inputs?.length);

// Pseudo-selectors
const evenItems = document.querySelectorAll("li:nth-child(even)");
console.log("Even list items:", evenItems?.length);

// Multiple selectors (OR)
const headingsAll = document.querySelectorAll("h1, h2, h3, h4");
console.log("All heading levels:", headingsAll?.length);

// 6. Scoped Selection
console.log("\n=== 6. Scoped Selection ===");

// HTML: <nav>
//         <a href="#home">Home</a>
//         <a href="#about">About</a>
//       </nav>
//       <main>
//         <a href="#page1">Page 1</a>
//       </main>

const nav = document.querySelector("nav");
const mainContent = document.querySelector("main");

// Find elements within specific container
const navLinks = nav?.querySelectorAll("a");
console.log("Nav links:", navLinks?.length);

const mainLinks = mainContent?.querySelectorAll("a");
console.log("Main links:", mainLinks?.length);

// 7. Data Attributes
console.log("\n=== 7. Selecting Data Attributes ===");

// HTML: <div data-id="123">Item 1</div>
//       <div data-id="456">Item 2</div>
//       <div data-type="featured" data-id="789">Item 3</div>

// Select by data attribute existence
const dataItems = document.querySelectorAll("[data-id]");
console.log("Items with data-id:", dataItems?.length);

// Select by data attribute value
const item123 = document.querySelector('[data-id="123"]');
console.log("Item 123:", item123?.textContent);

// Select by multiple attributes
const featuredItem = document.querySelector('[data-type="featured"][data-id]');
console.log("Featured item:", featuredItem?.textContent);

// 8. Attribute Value Matching
console.log("\n=== 8. Attribute Matching ===");

// HTML: <a href="https://example.com">External</a>
//       <a href="/about">Internal</a>
//       <a href="page.pdf">PDF</a>

// Starts with ^=
const httpsLinks = document.querySelectorAll('a[href^="https"]');
console.log("HTTPS links:", httpsLinks?.length);

// Ends with $=
const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
console.log("PDF links:", pdfLinks?.length);

// Contains *=
const externalLinks = document.querySelectorAll('a[href*="example"]');
console.log('Links containing "example":', externalLinks?.length);

// 9. Pseudo-class Selectors
console.log("\n=== 9. Pseudo-class Selectors ===");

// HTML: <ul>
//         <li>Item 1</li>
//         <li class="active">Item 2</li>
//         <li>Item 3</li>
//       </ul>

// First child
const firstLi = document.querySelector("li:first-child");
console.log("First list item:", firstLi?.textContent);

// Last child
const lastLi = document.querySelector("li:last-child");
console.log("Last list item:", lastLi?.textContent);

// Nth child
const secondLi = document.querySelector("li:nth-child(2)");
console.log("Second list item:", secondLi?.textContent);

// Not selector
const inactiveLis = document.querySelectorAll("li:not(.active)");
console.log("Inactive items:", inactiveLis?.length);

// 10. Performance Optimization
console.log("\n=== 10. Selection Performance ===");

// Best: getElementById (optimized)
const byId = document.getElementById("main");
console.log("getElementById:", !!byId);

// Faster: getElementsByClassName (optimized)
const byClass = document.getElementsByClassName("item");
console.log("getElementsByClassName:", byClass?.length);

// Good: querySelector with ID
const qById = document.querySelector("#main");
console.log("querySelector #ID:", !!qById);

// Cache frequently used selectors
const container = document.querySelector(".container");
const containerItems = container?.querySelectorAll(".item");
console.log("Cached items:", containerItems?.length);

// 11. Checking Existence
console.log("\n=== 11. Checking If Element Exists ===");

const element = document.getElementById("main");

// Method 1: if statement
if (element) {
  console.log("Element exists (if check)");
} else {
  console.log("Element not found");
}

// Method 2: optional chaining
element?.classList.add("active");
console.log("Used optional chaining");

// Method 3: ternary
const className = element?.className ?? "not-found";
console.log("Class name:", className);

// Method 4: boolean conversion
const exists = !!document.getElementById("nonexistent");
console.log("Nonexistent element:", exists);

// 12. Multiple Selection Patterns
console.log("\n=== 12. Multiple Selection Patterns ===");

// Select multiple types at once
const buttons = document.querySelectorAll("button");
const links = document.querySelectorAll("a");
const allInputs = document.querySelectorAll("input");

console.log("Buttons:", buttons?.length);
console.log("Links:", links?.length);
console.log("Inputs:", allInputs?.length);

// Combine with attribute filtering
const formInputs = document.querySelectorAll(
  "form input, form textarea, form select",
);
console.log("Form fields:", formInputs?.length);

// 13. Dynamic Class Selection
console.log("\n=== 13. Class Selection Patterns ===");

// HTML: <div class="box primary">Box 1</div>
//       <div class="box secondary">Box 2</div>

// By single class
const allBoxes = document.querySelectorAll(".box");
console.log("All boxes:", allBoxes?.length);

// By multiple classes (AND)
const primaryBoxes = document.querySelectorAll(".box.primary");
console.log("Primary boxes:", primaryBoxes?.length);

// By one of multiple classes (OR)
const boxOrCard = document.querySelectorAll(".box, .card");
console.log("Boxes or cards:", boxOrCard?.length);

// 14. Combining Selection Methods
console.log("\n=== 14. Selection Method Combinations ===");

// Get container first, then search within it
const container2 = document.getElementById("sidebar");
const items = container2?.getElementsByClassName("item");
console.log("Items in sidebar:", items?.length);

// Or use scoped querySelector
const items2 = container2?.querySelectorAll(".item");
console.log("Items via querySelector:", items2?.length);

// Get all tables, then get rows within each
const tables = document.querySelectorAll("table");
tables.forEach((table) => {
  const rows = table.querySelectorAll("tr");
  console.log(`Table has ${rows.length} rows`);
});

// 15. Practical Examples
console.log("\n=== 15. Practical Examples ===");

// Get all form inputs (except hidden)
const visibleInputs = document.querySelectorAll('input:not([type="hidden"])');
console.log("Visible inputs:", visibleInputs?.length);

// Get all unchecked checkboxes
const unchecked = document.querySelectorAll(
  'input[type="checkbox"]:not(:checked)',
);
console.log("Unchecked boxes:", unchecked?.length);

// Get disabled form elements
const disabledElements = document.querySelectorAll(
  "input:disabled, button:disabled, select:disabled",
);
console.log("Disabled elements:", disabledElements?.length);

// Get all elements with specific data attribute
const analytics = document.querySelectorAll("[data-analytics]");
console.log("Analytics tracked elements:", analytics?.length);

// Get all external links
const external = document.querySelectorAll('a[href^="http"]');
console.log("External links:", external?.length);

console.log("\n=== Selection Examples Completed ===");
