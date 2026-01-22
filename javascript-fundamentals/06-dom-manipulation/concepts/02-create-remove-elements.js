// ============================================
// 02-create-remove-elements.js
// Creating, Modifying, and Removing Elements
// ============================================

console.log("=== 1. Creating Elements ===");

// Create basic elements
const div = document.createElement("div");
const p = document.createElement("p");
const button = document.createElement("button");

console.log("Div created:", div.tagName); // "DIV"
console.log("Paragraph created:", p.tagName); // "P"

// 2. Adding Content
console.log("\n=== 2. Adding Content ===");

// Using textContent (plain text)
const heading = document.createElement("h1");
heading.textContent = "Welcome to the Page";
console.log("Heading text:", heading.textContent);

// Using innerHTML (HTML content)
const container = document.createElement("div");
container.innerHTML = "<p>This is <strong>bold</strong> text</p>";
console.log("Container HTML:", container.innerHTML);

// Difference between textContent and innerHTML
const demo = document.createElement("div");
demo.textContent = "<p>Text</p>"; // Treats as plain text
console.log("textContent result:", demo.innerHTML); // Shows escaped HTML

const demo2 = document.createElement("div");
demo2.innerHTML = "<p>HTML</p>"; // Parses as HTML
console.log("innerHTML result:", demo2.innerHTML); // Shows parsed HTML

// 3. Setting Attributes
console.log("\n=== 3. Setting Attributes ===");

// Using setAttribute()
const img = document.createElement("img");
img.setAttribute("src", "photo.jpg");
img.setAttribute("alt", "A photo");
img.setAttribute("width", "300");

console.log("Image src:", img.getAttribute("src"));
console.log("Image alt:", img.getAttribute("alt"));

// Direct property assignment
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter your name";
input.value = "John Doe";

console.log("Input type:", input.type);
console.log("Input value:", input.value);

// Data attributes
const card = document.createElement("div");
card.setAttribute("data-id", "123");
card.setAttribute("data-category", "featured");

console.log("Data id:", card.getAttribute("data-id"));
console.log("Data category:", card.getAttribute("data-category"));

// 4. Managing Classes
console.log("\n=== 4. Managing Classes ===");

// Using className (replaces all classes)
const box = document.createElement("div");
box.className = "container large";
console.log("Classes:", box.className);

// Using classList (add/remove individual classes)
const panel = document.createElement("div");

// Add classes
panel.classList.add("panel");
panel.classList.add("primary");
console.log("After adding classes:", panel.className);

// Add multiple classes at once
panel.classList.add("active", "highlighted", "shadow");
console.log("After adding multiple:", panel.className);

// Check if has class
console.log("Has primary:", panel.classList.contains("primary"));
console.log("Has danger:", panel.classList.contains("danger"));

// Remove class
panel.classList.remove("highlighted");
console.log("After removing highlighted:", panel.className);

// Toggle class
panel.classList.toggle("active");
console.log("After toggling active:", panel.className);

// Toggle add/remove
panel.classList.toggle("active"); // Adds back if removed
console.log("After toggling again:", panel.className);

// 5. Setting Styles
console.log("\n=== 5. Setting Styles ===");

// Direct style property assignment
const styled = document.createElement("div");
styled.style.color = "blue";
styled.style.backgroundColor = "lightgray";
styled.style.padding = "10px";
styled.style.fontSize = "16px";
styled.style.borderRadius = "5px";

console.log("Color:", styled.style.color);
console.log("Padding:", styled.style.padding);

// Multiple styles
const box2 = document.createElement("div");
const styles = {
  width: "200px",
  height: "200px",
  backgroundColor: "navy",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

Object.assign(box2.style, styles);
console.log("Complex styled element created");

// Using setAttribute for style
const box3 = document.createElement("div");
box3.setAttribute("style", "color: red; font-size: 20px; margin: 20px;");
console.log("Style attribute:", box3.getAttribute("style"));

// 6. Creating Complex Elements
console.log("\n=== 6. Creating Complex Elements ===");

function createButton(text, className = "", onClick = null) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = className;
  btn.type = "button";

  if (onClick) {
    btn.addEventListener("click", onClick);
  }

  return btn;
}

const btn1 = createButton("Click me", "btn btn-primary");
console.log("Button created:", btn1.textContent, btn1.className);

// Create card element
function createCard(title, content) {
  const card = document.createElement("div");
  card.className = "card";

  const heading = document.createElement("h2");
  heading.textContent = title;

  const body = document.createElement("div");
  body.className = "card-body";
  body.textContent = content;

  const footer = document.createElement("div");
  footer.className = "card-footer";
  const btn = createButton("Learn More", "btn btn-secondary");
  footer.appendChild(btn);

  card.appendChild(heading);
  card.appendChild(body);
  card.appendChild(footer);

  return card;
}

const createdCard = createCard(
  "JavaScript Basics",
  "Learn the fundamentals of JavaScript programming",
);
console.log("Card created with structure");

// 7. Appending Elements to DOM
console.log("\n=== 7. Appending Elements ===");

// Note: These would add to actual DOM in browser
// Simulating here for demonstration

const parent = document.createElement("div");
parent.id = "container";

// appendChild - adds as last child
const child1 = document.createElement("p");
child1.textContent = "Child 1";
parent.appendChild(child1);

const child2 = document.createElement("p");
child2.textContent = "Child 2";
parent.appendChild(child2);

console.log("Children added:", parent.children.length);

// append() - modern method (can add multiple and text)
const child3 = document.createElement("p");
child3.textContent = "Child 3";

const child4 = document.createElement("p");
child4.textContent = "Child 4";

parent.append(child3, child4, " Some text node");
console.log("After append:", parent.children.length);

// 8. Inserting Before Specific Element
console.log("\n=== 8. Insert Before ===");

const list = document.createElement("ul");

const item1 = document.createElement("li");
item1.textContent = "Item 1";
list.appendChild(item1);

const item3 = document.createElement("li");
item3.textContent = "Item 3";
list.appendChild(item3);

// Insert item2 before item3
const item2 = document.createElement("li");
item2.textContent = "Item 2";
list.insertBefore(item2, item3);

console.log(
  "List items:",
  Array.from(list.children).map((li) => li.textContent),
);

// prepend() - modern alternative
const list2 = document.createElement("ul");
const items = ["A", "B", "C"];

items.forEach((text) => {
  const li = document.createElement("li");
  li.textContent = text;
  list2.appendChild(li);
});

const firstItem = document.createElement("li");
firstItem.textContent = "0";
list2.prepend(firstItem); // Adds as first child

console.log(
  "List 2 items:",
  Array.from(list2.children).map((li) => li.textContent),
);

// 9. Removing Elements
console.log("\n=== 9. Removing Elements ===");

const parent2 = document.createElement("div");

const toRemove = document.createElement("p");
toRemove.textContent = "This will be removed";
toRemove.id = "temp";
parent2.appendChild(toRemove);

console.log("Before removal:", parent2.children.length);

// Remove using removeChild
parent2.removeChild(toRemove);
console.log("After removeChild:", parent2.children.length);

// Remove using remove() method
const parent3 = document.createElement("div");
const temp = document.createElement("span");
temp.textContent = "Temporary";
parent3.appendChild(temp);

temp.remove(); // Element removes itself
console.log("After remove():", parent3.children.length);

// Remove all children
const container2 = document.createElement("div");
for (let i = 0; i < 5; i++) {
  container2.appendChild(document.createElement("span"));
}

console.log("Before clearing:", container2.children.length);

// Method 1: Clear innerHTML
container2.innerHTML = "";
console.log("After innerHTML clear:", container2.children.length);

// Method 2: Remove children one by one
while (container2.firstChild) {
  container2.removeChild(container2.firstChild);
}

// 10. Replacing Elements
console.log("\n=== 10. Replacing Elements ===");

const parent4 = document.createElement("div");

const oldElement = document.createElement("p");
oldElement.textContent = "Old content";
oldElement.className = "old";
parent4.appendChild(oldElement);

const newElement = document.createElement("p");
newElement.textContent = "New content";
newElement.className = "new";

// Replace using replaceChild
parent4.replaceChild(newElement, oldElement);
console.log("Content after replace:", parent4.innerHTML);

// Modern replaceWith()
const oldElem = document.createElement("span");
const newElem = document.createElement("strong");
newElem.textContent = "Replaced";

oldElem.replaceWith(newElem);

// 11. Cloning Elements
console.log("\n=== 11. Cloning Elements ===");

// Create original
const original = document.createElement("div");
original.className = "original";
original.textContent = "Original";

const child = document.createElement("span");
child.textContent = "Child element";
original.appendChild(child);

// Shallow clone (no children)
const shallow = original.cloneNode(false);
console.log("Shallow clone children:", shallow.children.length);
console.log("Shallow clone text:", shallow.textContent); // Empty

// Deep clone (with all descendants)
const deep = original.cloneNode(true);
console.log("Deep clone children:", deep.children.length);
console.log("Deep clone text:", deep.textContent); // Contains child text

// Use for templates
const template = document.createElement("div");
template.className = "list-item";

const templateName = document.createElement("h3");
templateName.className = "item-name";
template.appendChild(templateName);

const templateDesc = document.createElement("p");
templateDesc.className = "item-desc";
template.appendChild(templateDesc);

// Create multiple from template
const container3 = document.createElement("div");

const items2 = [
  { name: "Apple", desc: "A fruit" },
  { name: "Book", desc: "Something to read" },
  { name: "Car", desc: "A vehicle" },
];

items2.forEach((item) => {
  const clone = template.cloneNode(true);
  clone.querySelector(".item-name").textContent = item.name;
  clone.querySelector(".item-desc").textContent = item.desc;
  container3.appendChild(clone);
});

console.log("Template clones created:", container3.children.length);

// 12. Building HTML from Objects
console.log("\n=== 12. Build from Data ===");

function buildTable(data) {
  const table = document.createElement("table");
  table.border = "1";

  // Header
  const header = document.createElement("tr");
  Object.keys(data[0]).forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key;
    header.appendChild(th);
  });
  table.appendChild(header);

  // Rows
  data.forEach((row) => {
    const tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  return table;
}

const tableData = [
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "Boston" },
  { name: "Bob", age: 35, city: "Chicago" },
];

const table = buildTable(tableData);
console.log("Table with", table.children.length, "rows");

// 13. Performance - DocumentFragment
console.log("\n=== 13. Document Fragment ===");

// Create many elements efficiently
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const item = document.createElement("div");
  item.textContent = `Item ${i}`;
  fragment.appendChild(item);
}

// Add all at once to DOM
const parent5 = document.createElement("div");
parent5.appendChild(fragment);

console.log("Items added via fragment:", parent5.children.length);

// 14. insertAdjacentHTML
console.log("\n=== 14. insertAdjacentHTML ===");

const target = document.createElement("div");
target.id = "target";
target.textContent = "Target element";

// Insert before element
target.insertAdjacentHTML("beforebegin", "<div>Before element</div>");

// Insert inside, before content
target.insertAdjacentHTML("afterbegin", "<div>After begin</div>");

// Insert inside, after content
target.insertAdjacentHTML("beforeend", "<div>Before end</div>");

// Insert after element
target.insertAdjacentHTML("afterend", "<div>After element</div>");

// 15. Practical Example - Todo List
console.log("\n=== 15. Todo List Example ===");

function createTodoApp() {
  const app = document.createElement("div");
  app.className = "todo-app";

  const title = document.createElement("h1");
  title.textContent = "My Todos";
  app.appendChild(title);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add a new todo...";
  app.appendChild(input);

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add";
  app.appendChild(addBtn);

  const list = document.createElement("ul");
  list.className = "todo-list";

  // Sample todos
  const todos = ["Learn JavaScript", "Build projects", "Master DOM"];

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo;
    li.className = "todo-item";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.className = "remove-btn";

    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  app.appendChild(list);
  return app;
}

const todoApp = createTodoApp();
console.log("Todo app created with structure");

console.log("\n=== All Examples Completed ===");
