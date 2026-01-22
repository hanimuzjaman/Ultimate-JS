# Events & Browser APIs: Event Delegation

## What is Event Delegation?

Event delegation is a technique where you attach a single event listener to a parent element instead of attaching listeners to multiple child elements. The parent listens for events from its children through the event propagation (bubbling) mechanism.

## Why Use Event Delegation?

### Performance Benefits

- **Fewer listeners**: One listener instead of hundreds or thousands
- **Faster DOM updates**: No need to add/remove listeners when elements change
- **Lower memory usage**: Fewer event listener objects in memory
- **Better scalability**: Same code works for dynamic content added later

### Code Benefits

- **Cleaner code**: Single handler instead of multiple handlers
- **Dynamic content support**: Automatically works with elements added later
- **Centralized logic**: All handlers in one place

## How Event Delegation Works

When an event occurs on an element:

1. Event is triggered on the target element
2. Event propagates up to parent elements (bubbling)
3. Parent listener can check if event came from specific child
4. Handler processes the event accordingly

## Event.target vs event.currentTarget

```javascript
// event.target = element that triggered the event
// event.currentTarget = element with the listener

parent.addEventListener("click", (event) => {
  console.log("target:", event.target); // The clicked element
  console.log("currentTarget:", event.currentTarget); // parent
});
```

## Using closest() Method

The `closest()` method finds the nearest ancestor element matching a selector:

```javascript
element.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) {
    console.log("Button clicked");
  }
});
```

## Using matches() Method

The `matches()` method checks if an element matches a CSS selector:

```javascript
element.addEventListener("click", (event) => {
  if (event.target.matches("button.primary")) {
    console.log("Primary button clicked");
  }
});
```

## Practical Examples

### Example 1: Button Delegation

```javascript
const toolbar = document.getElementById("toolbar");

toolbar.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) {
    const action = button.dataset.action;
    console.log("Action:", action);
  }
});
```

### Example 2: List Item Delegation

```javascript
const list = document.getElementById("list");

list.addEventListener("click", (event) => {
  if (event.target.matches("li")) {
    console.log("Item:", event.target.textContent);
  }
});
```

### Example 3: Form Input Delegation

```javascript
const form = document.getElementById("form");

form.addEventListener("change", (event) => {
  const input = event.target.closest("input");
  if (input) {
    console.log("Changed:", input.name, input.value);
  }
});
```

## Advantages Over Direct Attachment

### Without Delegation

```javascript
// Problem: Need to attach listener to EACH item
const items = document.querySelectorAll("li");
items.forEach((item) => {
  item.addEventListener("click", handleClick);
  // If new item added dynamically, need to attach listener!
});
```

### With Delegation

```javascript
// Solution: Attach to parent once
const list = document.querySelector("ul");
list.addEventListener("click", (event) => {
  if (event.target.matches("li")) {
    handleClick(event);
  }
  // New items added later automatically work!
});
```

## Event Propagation Control

Use `stopPropagation()` and `stopImmediatePropagation()` when needed:

```javascript
element.addEventListener("click", (event) => {
  event.stopPropagation(); // Stop bubbling
  event.stopImmediatePropagation(); // Stop all other handlers
});
```

## Common Patterns

### Single Type Pattern

```javascript
parent.addEventListener("click", (event) => {
  if (event.target.matches(".button")) {
    // Handle button click
  }
});
```

### Multiple Types Pattern

```javascript
container.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  const link = event.target.closest("a");

  if (button) {
    // Handle button
  } else if (link) {
    // Handle link
  }
});
```

### Action-Based Pattern

```javascript
parent.addEventListener("click", (event) => {
  const action = event.target.dataset.action;

  switch (action) {
    case "save":
      // Save logic
      break;
    case "delete":
      // Delete logic
      break;
  }
});
```

## Best Practices

1. **Choose appropriate parent**: Delegate to nearest common parent
2. **Use closest() for flexibility**: Works with nested structures
3. **Check event.target carefully**: Ensure you're checking right element
4. **Use data attributes**: For categorizing elements (data-action)
5. **Keep handlers performant**: Don't do heavy work in delegation handlers
6. **Document the structure**: Make HTML structure clear for delegation

## When NOT to Use Delegation

- Few static elements (just attach directly)
- Heavy computation in handler (performance may suffer)
- Different handlers for different elements
- Non-bubbling events (focus, blur, scroll, etc.)

## Browser Support

Event delegation with `closest()` and `matches()` is supported in all modern browsers. For older browser support, use polyfills or fallback implementations.

## Summary

Event delegation is a powerful technique that:

- Reduces memory usage
- Simplifies DOM manipulation
- Handles dynamic content automatically
- Improves performance for large lists
- Centralizes event handling logic
