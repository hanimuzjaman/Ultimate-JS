/**
 * Module 7: Events & Browser APIs
 * Concepts: Event Delegation
 *
 * Comprehensive examples of event delegation patterns and usage
 */

// ============================================
// 1. BASIC EVENT DELEGATION
// ============================================
console.log("=== Basic Event Delegation ===\n");

// Instead of attaching listeners to each child, attach to parent
// Example HTML structure:
// <ul id="list">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>

// Without delegation (problematic for dynamic items)
/*
const items = document.querySelectorAll('li');
items.forEach(item => {
  item.addEventListener('click', () => {
    console.log('Clicked:', item.textContent);
  });
});
*/

// With delegation (better for dynamic items)
/*
const list = document.getElementById('list');
list.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log('Clicked:', event.target.textContent);
  }
});
*/

console.log("Event delegation attaches handler to parent element");
console.log("Handles clicks on current AND future child elements");

// ============================================
// 2. EVENT TARGET VS EVENT CURRENTTARGET
// ============================================
console.log("\n=== event.target vs event.currentTarget ===\n");

// event.target = element that triggered the event
// event.currentTarget = element that has the listener

/*
const parent = document.getElementById('parent');
parent.addEventListener('click', (event) => {
  console.log('Target:', event.target); // The clicked element
  console.log('CurrentTarget:', event.currentTarget); // parent
});
*/

console.log("target: The element that triggered the event");
console.log("currentTarget: The element with the listener");

// ============================================
// 3. EVENT MATCHING WITH CLOSEST()
// ============================================
console.log("\n=== Matching with closest() ===\n");

// closest() finds nearest ancestor matching selector

/*
const container = document.getElementById('container');
container.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (button) {
    console.log('Button clicked:', button.id);
  }
});
*/

console.log("closest() finds nearest matching ancestor");
console.log("More flexible than checking tagName");

// ============================================
// 4. DELEGATING TO MULTIPLE ELEMENT TYPES
// ============================================
console.log("\n=== Multiple Element Types ===\n");

/*
const form = document.getElementById('myForm');
form.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  const link = event.target.closest('a');

  if (button) {
    console.log('Button:', button.id);
  } else if (link) {
    console.log('Link:', link.href);
  }
});
*/

console.log("Can handle multiple element types in one listener");

// ============================================
// 5. EVENT.MATCHES() FOR CHECKING
// ============================================
console.log("\n=== Using matches() ===\n");

/*
const list = document.getElementById('list');
list.addEventListener('click', (event) => {
  if (event.target.matches('li')) {
    console.log('List item:', event.target.textContent);
  }
});
*/

console.log("matches() checks if element matches selector");
console.log("Returns true/false for quick filtering");

// ============================================
// 6. PRACTICAL: DELEGATING BUTTON CLICKS
// ============================================
console.log("\n=== Delegating Button Clicks ===\n");

/*
// HTML:
<div id="toolbar">
  <button data-action="save">Save</button>
  <button data-action="delete">Delete</button>
  <button data-action="edit">Edit</button>
</div>

const toolbar = document.getElementById('toolbar');
toolbar.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (button) {
    const action = button.dataset.action;
    console.log('Action:', action);

    switch(action) {
      case 'save':
        console.log('Saving...');
        break;
      case 'delete':
        console.log('Deleting...');
        break;
      case 'edit':
        console.log('Editing...');
        break;
    }
  }
});
*/

console.log("Practical example: toolbar with delegated buttons");

// ============================================
// 7. PRACTICAL: DELEGATING TO LINKS
// ============================================
console.log("\n=== Delegating Link Clicks ===\n");

/*
const nav = document.getElementById('nav');
nav.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link) {
    event.preventDefault();
    console.log('Navigation to:', link.href);
    // Custom navigation logic here
  }
});
*/

console.log("Can intercept link clicks in delegated handler");

// ============================================
// 8. ADDING DYNAMIC ELEMENTS
// ============================================
console.log("\n=== With Dynamic Elements ===\n");

/*
const list = document.getElementById('list');

// Add listener once to parent
list.addEventListener('click', (event) => {
  if (event.target.matches('li')) {
    console.log('Clicked:', event.target.textContent);
  }
});

// New items automatically handled
function addItem(text) {
  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
  // No need to add listener! Delegation handles it.
}

addItem('Dynamic Item 1');
addItem('Dynamic Item 2');
*/

console.log("Dynamic elements automatically use delegated listener");
console.log("No need to re-attach handlers");

// ============================================
// 9. STOPPING PROPAGATION
// ============================================
console.log("\n=== Controlling Propagation ===\n");

/*
const parent = document.getElementById('parent');
const child = document.getElementById('child');

// Child listener
child.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevent bubble to parent
  console.log('Child clicked');
});

// Parent listener
parent.addEventListener('click', () => {
  console.log('Parent clicked');
});

// Click on child: only "Child clicked" logs
*/

console.log("stopPropagation() prevents bubbling");

// ============================================
// 10. PERFORMANCE BENEFITS
// ============================================
console.log("\n=== Performance Benefits ===\n");

// Without delegation: 1000 listeners
/*
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('li');
  item.addEventListener('click', handleClick); // 1000 listeners!
  list.appendChild(item);
}
*/

// With delegation: 1 listener
/*
const list = document.getElementById('list');
list.addEventListener('click', (event) => {
  if (event.target.matches('li')) {
    handleClick(event);
  }
}); // Only 1 listener!

for (let i = 0; i < 1000; i++) {
  const item = document.createElement('li');
  list.appendChild(item); // No listener attached
}
*/

console.log("1 delegated listener = better memory efficiency");
console.log("vs. 1000 individual listeners");

// ============================================
// 11. EXAMPLE: TODO APP DELEGATION
// ============================================
console.log("\n=== TODO App Example ===\n");

/*
const todoList = document.getElementById('todos');

// Single delegated listener handles:
// - Delete buttons
// - Complete checkboxes
// - Edit buttons
// - All new items added dynamically

todoList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  const todoItem = button.closest('li');

  switch(action) {
    case 'delete':
      console.log('Delete:', todoItem.textContent);
      break;
    case 'edit':
      console.log('Edit:', todoItem.textContent);
      break;
    case 'complete':
      console.log('Complete:', todoItem.textContent);
      break;
  }
});
*/

console.log("Single listener handles multiple actions");

// ============================================
// 12. REMOVING DELEGATED LISTENERS
// ============================================
console.log("\n=== Removing Delegated Listeners ===\n");

/*
const container = document.getElementById('container');

const handleClick = (event) => {
  if (event.target.matches('button')) {
    console.log('Button clicked');
  }
};

// Add listener
container.addEventListener('click', handleClick);

// Remove listener (need reference to handler)
container.removeEventListener('click', handleClick);
*/

console.log("Must keep reference to handler to remove");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== EVENT DELEGATION SUMMARY ===\n");
console.log("✓ Attach listener to parent element");
console.log("✓ Use event.target or closest() to identify child");
console.log("✓ Handles current AND future child elements");
console.log("✓ Better performance (fewer listeners)");
console.log("✓ Cleaner code for dynamic content");
console.log("✓ Perfect for lists, menus, toolbars");
