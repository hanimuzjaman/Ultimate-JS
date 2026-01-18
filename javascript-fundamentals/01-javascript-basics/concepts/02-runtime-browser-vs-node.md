# JavaScript Runtime: Browser vs Node.js

JavaScript code requires a **runtime environment** to execute. A runtime provides the **engine, APIs, and event loop** needed to run JavaScript programs. The two most common JavaScript runtimes are **Browser Runtime** and **Node.js Runtime**.

---

## What is a JavaScript Runtime?

A JavaScript runtime consists of:

- **JavaScript Engine** (executes JS code)
- **Web or System APIs** (extra capabilities beyond core JS)
- **Event Loop** (handles asynchronous operations)

---

## Browser JavaScript Runtime

The browser runtime is designed to run JavaScript for **web pages**.

### Components

- **JavaScript Engine** (e.g., V8, SpiderMonkey)
- **Web APIs**
  - DOM API
  - BOM (Browser Object Model)
  - Fetch API
  - setTimeout / setInterval
- **Event Loop & Callback Queue**

### Capabilities

- Manipulates **HTML & CSS** via DOM
- Handles **user interactions** (clicks, keyboard events)
- Performs **network requests**
- Controls browser behavior (alerts, navigation)

### Limitations

- No direct access to:
  - File system
  - Operating system resources
- Strict security sandbox

### Example (Browser)

```js
document.querySelector("button").addEventListener("click", () => {
  alert("Button clicked!");
});
```
