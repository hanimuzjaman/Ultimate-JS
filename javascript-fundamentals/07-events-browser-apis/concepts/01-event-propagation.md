# EVENT PROPAGATION

## Overview

Event propagation describes how events travel through the DOM tree. There are three phases: **capturing**, **bubbling**, and **at target**. Understanding propagation is crucial for proper event handling.

## Event Phases

### Phase 1: Capturing Phase

- Event travels **DOWN** from document to target
- Rarely used (requires `{ capture: true }`)
- Useful for intercepting events before handlers see them

### Phase 2: At Target

- Event reaches the target element
- Handlers on the target execute

### Phase 3: Bubbling Phase

- Event travels **UP** from target back to document
- Most common phase for event handling
- Can be stopped with `stopPropagation()`

## Event Bubbling

When an event occurs on an element, it first runs the handlers on that element, then on its parents, then all the way up to the document root.

```javascript
// HTML Structure:
// <div id="outer">
//   <div id="middle">
//     <button id="inner">Click me</button>
//   </div>
// </div>

// When button is clicked:
inner.addEventListener("click", () => console.log("1. inner"));
middle.addEventListener("click", () => console.log("2. middle"));
outer.addEventListener("click", () => console.log("3. outer"));
document.addEventListener("click", () => console.log("4. document"));

// Output: 1. inner → 2. middle → 3. outer → 4. document
```

## Stopping Propagation

### stopPropagation()

Prevents the event from bubbling up to parent elements, but doesn't prevent other handlers on the same element.

```javascript
inner.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("Inner handler runs");
});

outer.addEventListener("click", () => {
  console.log("Outer handler doesn't run");
});
```

### stopImmediatePropagation()

Prevents other handlers from being called on the same element (and prevents bubbling).

```javascript
element.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  console.log("Handler 1");
});

element.addEventListener("click", () => {
  console.log("Handler 2 won't run");
});
```

## Event Bubbling Rules

### Events That Bubble

Most events bubble:

- click, dblclick, mouseover, mouseout
- mouseenter, mouseleave
- keydown, keyup, keypress
- input, change
- focus, blur (no)
- scroll (no)

### Events That Don't Bubble

Some important events don't bubble:

- focus, blur
- scroll
- resize
- abort, load, unload
- media events (play, pause, etc.)
- mouseenter, mouseleave

Check the `bubbles` property:

```javascript
const event = new Event("click");
console.log(event.bubbles); // true

const focusEvent = new Event("focus");
console.log(focusEvent.bubbles); // false
```

## Target vs CurrentTarget

### event.target

The element that triggered the event (doesn't change during propagation).

### event.currentTarget

The element with the event listener (the handler's context).

```javascript
outer.addEventListener("click", (event) => {
  console.log(event.target); // The actual clicked element
  console.log(event.currentTarget); // outer (the listener owner)
  console.log(this); // outer (same as currentTarget)
});
```

## Event Capturing (Advanced)

To listen during the capturing phase, use `{ capture: true }`:

```javascript
outer.addEventListener(
  "click",
  () => {
    console.log("outer capture");
  },
  { capture: true },
); // Capturing phase

outer.addEventListener("click", () => {
  console.log("outer bubble");
}); // Bubbling phase (default)

// If click occurs on inner:
// Output: outer capture → outer bubble
```

## Practical Pattern: Event Delegation

Instead of adding listeners to each child, add one listener to the parent and check the target:

```javascript
// Bad: Adding to each item
items.forEach((item) => {
  item.addEventListener("click", handleItemClick);
});

// Good: Event delegation
list.addEventListener("click", (event) => {
  if (event.target.matches(".item")) {
    handleItemClick(event);
  }
});
```

Benefits:

- Fewer listeners = better performance
- Handles dynamically added items
- Easier to manage and remove listeners

## Using closest() for Delegation

The `closest()` method finds the nearest ancestor matching a selector:

```javascript
list.addEventListener("click", (event) => {
  const item = event.target.closest(".list-item");
  if (item) {
    console.log("Item clicked:", item.textContent);
  }
});
```

## Prevent Default

`preventDefault()` stops the browser's default action for an event:

```javascript
// Prevent link navigation
link.addEventListener("click", (event) => {
  event.preventDefault();
  // Handle click yourself
});

// Prevent form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Validate and submit with fetch
});

// Prevent checkbox toggle
checkbox.addEventListener("click", (event) => {
  event.preventDefault();
  // Handle toggle manually
});
```

## Common Patterns

### Modal with Overlay Click-to-Close

```javascript
overlay.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", (e) => {
  e.stopPropagation(); // Don't close when clicking modal
});
```

### Button Inside Clickable Row

```javascript
row.addEventListener("click", () => {
  selectRow();
});

deleteBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  deleteRow();
});
```

### Nested Dropdowns

```javascript
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.close();
  }
});

dropdown.addEventListener("click", (e) => {
  e.stopPropagation(); // Keep dropdown open
});
```

## Performance Considerations

Event bubbling can have performance implications with nested listeners. Event delegation improves performance:

```javascript
// Many listeners (slower)
items.forEach((item) => {
  item.addEventListener("click", handler);
}); // 1000 listeners for 1000 items

// Single delegated listener (faster)
container.addEventListener("click", (e) => {
  if (e.target.matches(".item")) {
    handler(e);
  }
}); // 1 listener for 1000 items
```

## Summary Table

| Feature                        | Details                                 |
| ------------------------------ | --------------------------------------- |
| **Bubbling**                   | Event goes UP from target to document   |
| **Capturing**                  | Event goes DOWN from document to target |
| **stopPropagation()**          | Stop event from bubbling to parents     |
| **stopImmediatePropagation()** | Stop propagation + other handlers       |
| **preventDefault()**           | Stop browser default action             |
| **target**                     | Element that triggered event            |
| **currentTarget**              | Element with listener                   |
| **Delegation**                 | One listener on parent, check e.target  |
| **closest()**                  | Find nearest matching ancestor          |

## Best Practices

✓ Use event delegation for dynamic content
✓ Stop propagation only when necessary
✓ Use preventDefault() to stop default actions
✓ Check event.target with closest() for delegation
✓ Remove listeners when components unmount
✓ Consider passive listeners for scroll/touch events

✗ Don't stop propagation unnecessarily
✗ Don't add listeners to many individual elements
✗ Don't assume event will bubble (check spec)
✗ Don't forget to remove listeners
