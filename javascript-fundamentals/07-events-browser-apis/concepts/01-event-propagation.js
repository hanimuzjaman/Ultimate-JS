// ================================================
// EVENT PROPAGATION - Practical Code Examples
// ================================================

// ===== 1. EVENT BUBBLING BASICS =====
console.log("\n--- 1. EVENT BUBBLING ---");

// Event bubbling: event travels UP from target to ancestors
// HTML structure:
// <div id="outer">
//   <div id="middle">
//     <button id="inner">Click me</button>
//   </div>
// </div>

function setupBubbling() {
  // Mock structure
  const events = [];

  // These would all fire when button is clicked:
  // inner.addEventListener("click", () => events.push("inner"));
  // middle.addEventListener("click", () => events.push("middle"));
  // outer.addEventListener("click", () => events.push("outer"));
  // document.addEventListener("click", () => events.push("document"));

  // Order: inner → middle → outer → document

  console.log("Event bubbling order:");
  console.log("1. innermost element");
  console.log("2. parent elements");
  console.log("3. ancestor elements");
  console.log("4. document root");
}

setupBubbling();

// ===== 2. STOPPING PROPAGATION =====
console.log("\n--- 2. STOP PROPAGATION ---");

function handleInnerClick(event) {
  console.log("Inner clicked");
  // Stop event from bubbling to parents
  event.stopPropagation();
}

function handleMiddleClick(event) {
  console.log("Middle clicked");
  // If inner called stopPropagation, this won't fire
}

// Usage:
// inner.addEventListener("click", handleInnerClick);
// middle.addEventListener("click", handleMiddleClick);

console.log("stopPropagation() prevents parent handlers");

// ===== 3. STOP IMMEDIATE PROPAGATION =====
console.log("\n--- 3. STOP IMMEDIATE PROPAGATION ---");

// Different from stopPropagation - prevents other handlers on SAME element

function handler1(event) {
  console.log("Handler 1");
  event.stopImmediatePropagation();
}

function handler2(event) {
  console.log("Handler 2 won't fire");
}

// Usage:
// element.addEventListener("click", handler1);
// element.addEventListener("click", handler2); // Won't fire if handler1 stops

console.log("stopImmediatePropagation() prevents other handlers");

// ===== 4. EVENT CAPTURING =====
console.log("\n--- 4. EVENT CAPTURING ---");

// Opposite of bubbling: event travels DOWN from document to target
// Not common, but available

function setupCapturing() {
  // const options = { capture: true };
  // outer.addEventListener("click", () => console.log("outer"), options);
  // middle.addEventListener("click", () => console.log("middle"), options);
  // inner.addEventListener("click", () => console.log("inner"), options);

  // With capture: outer → middle → inner
  // Without capture (bubbling): inner → middle → outer

  console.log("Capture phase (rare) vs Bubble phase (common)");
  console.log("Use { capture: true } as third argument");
}

setupCapturing();

// ===== 5. EVENT PHASES =====
console.log("\n--- 5. EVENT PHASES ---");

// 1. Capture phase (1) - top to bottom
// 2. Target phase (2) - at the target
// 3. Bubble phase (3) - bottom to top

function phaseAnalyzer(event) {
  console.log("Event phase:", event.eventPhase);
  // 1 = CAPTURING_PHASE
  // 2 = AT_TARGET
  // 3 = BUBBLING_PHASE
}

console.log("Three phases: CAPTURING → AT_TARGET → BUBBLING");

// ===== 6. PRACTICAL: NESTED DROPDOWNS =====
console.log("\n--- 6. NESTED DROPDOWNS ---");

// Dropdown menu that closes when clicking outside
// But stays open when clicking items inside

function setupDropdown() {
  // const dropdown = document.getElementById("dropdown");
  // const menuItems = dropdown.querySelectorAll("a");

  // Close on document click
  // document.addEventListener("click", (e) => {
  //   if (!dropdown.contains(e.target)) {
  //     dropdown.classList.remove("open");
  //   }
  // });

  // Don't close when clicking items
  // menuItems.forEach(item => {
  //   item.addEventListener("click", (e) => {
  //     e.stopPropagation(); // Prevent document click handler
  //     dropdown.classList.remove("open");
  //   });
  // });

  console.log("Dropdown setup with propagation control");
}

setupDropdown();

// ===== 7. PRACTICAL: MODAL WITH OVERLAY =====
console.log("\n--- 7. MODAL WITH OVERLAY ---");

function setupModal() {
  // const overlay = document.getElementById("overlay");
  // const modal = document.getElementById("modal");
  // const closeBtn = document.querySelector(".close-btn");

  // Close when clicking overlay
  // overlay.addEventListener("click", () => {
  //   modal.style.display = "none";
  // });

  // Don't close when clicking modal itself
  // modal.addEventListener("click", (e) => {
  //   e.stopPropagation();
  // });

  // Close button
  // closeBtn.addEventListener("click", () => {
  //   modal.style.display = "none";
  // });

  console.log("Modal/overlay propagation handling");
}

setupModal();

// ===== 8. PRACTICAL: LIST ITEM DELETION =====
console.log("\n--- 8. LIST ITEM DELETION ---");

function setupList() {
  // const list = document.getElementById("list");
  //
  // list.addEventListener("click", (e) => {
  //   // Check if delete button was clicked
  //   if (e.target.classList.contains("delete-btn")) {
  //     e.stopPropagation(); // Don't trigger item click
  //     const item = e.target.closest("li");
  //     item.remove();
  //   }
  //
  //   // Check if item itself was clicked
  //   if (e.target.tagName === "LI") {
  //     console.log("Item selected:", e.target.textContent);
  //   }
  // });

  console.log("List item handling with event delegation");
}

setupList();

// ===== 9. PRACTICAL: TABBED INTERFACE =====
console.log("\n--- 9. TABBED INTERFACE ---");

function setupTabs() {
  // const tabContainer = document.getElementById("tabs");
  // const panels = document.querySelectorAll(".panel");
  //
  // tabContainer.addEventListener("click", (e) => {
  //   if (e.target.classList.contains("tab")) {
  //     e.preventDefault();
  //
  //     // Hide all panels
  //     panels.forEach(p => p.style.display = "none");
  //
  //     // Show selected panel
  //     const tabId = e.target.getAttribute("data-tab");
  //     document.getElementById(tabId).style.display = "block";
  //
  //     // Update tab styling
  //     tabContainer.querySelectorAll(".tab").forEach(t =>
  //       t.classList.remove("active")
  //     );
  //     e.target.classList.add("active");
  //   }
  // });

  console.log("Tabbed interface with event delegation");
}

setupTabs();

// ===== 10. PREVENT BUBBLING FOR SPECIFIC ACTIONS =====
console.log("\n--- 10. PREVENT BUBBLING FOR ACTIONS ---");

function setupActionButtons() {
  // Each action button stops propagation
  // so parent row click doesn't interfere

  // const row = document.querySelector("tr");
  // const editBtn = row.querySelector(".edit");
  // const deleteBtn = row.querySelector(".delete");
  //
  // row.addEventListener("click", () => {
  //   console.log("Row selected");
  // });
  //
  // editBtn.addEventListener("click", (e) => {
  //   e.stopPropagation();
  //   console.log("Edit action");
  // });
  //
  // deleteBtn.addEventListener("click", (e) => {
  //   e.stopPropagation();
  //   console.log("Delete action");
  // });

  console.log("Action buttons prevent parent click handler");
}

setupActionButtons();

// ===== 11. DELEGATED CLICK WITH FILTER =====
console.log("\n--- 11. DELEGATED CLICK WITH FILTER ---");

function delegatedClickFilter() {
  // const container = document.getElementById("container");
  //
  // container.addEventListener("click", (e) => {
  //   // Multiple selector checking
  //   if (e.target.closest(".button")) {
  //     e.preventDefault();
  //     console.log("Button clicked");
  //   } else if (e.target.closest(".link")) {
  //     e.preventDefault();
  //     console.log("Link clicked");
  //   } else if (e.target.closest(".checkbox")) {
  //     console.log("Checkbox checked/unchecked");
  //   }
  // });

  console.log("Delegated click with multiple element types");
}

delegatedClickFilter();

// ===== 12. CHAINING STOPS =====
console.log("\n--- 12. CHAINING STOPS ---");

function chainingStops() {
  // const inner = document.getElementById("inner");
  // const middle = document.getElementById("middle");
  // const outer = document.getElementById("outer");
  //
  // inner.addEventListener("click", (e) => {
  //   console.log("Inner: stopping propagation");
  //   e.stopPropagation();
  // });
  //
  // middle.addEventListener("click", (e) => {
  //   console.log("Middle: this won't fire");
  // });
  //
  // outer.addEventListener("click", (e) => {
  //   console.log("Outer: this won't fire");
  // });

  console.log("Stopping propagation prevents all parent handlers");
}

chainingStops();

// ===== 13. PREVENT DEFAULT WITH PROPAGATION =====
console.log("\n--- 13. PREVENT DEFAULT + STOP PROPAGATION ---");

function preventAndStop() {
  // const form = document.querySelector("form");
  // const button = form.querySelector("button");
  //
  // button.addEventListener("click", (e) => {
  //   e.preventDefault(); // Don't submit form
  //   e.stopPropagation(); // Don't trigger parent handlers
  //
  //   // Custom validation and submission
  //   console.log("Custom submit handler");
  // });

  console.log("Often need both preventDefault and stopPropagation");
}

preventAndStop();

// ===== 14. USING CAPTURE PHASE =====
console.log("\n--- 14. CAPTURE PHASE USAGE ---");

function capturePhaseUsage() {
  // Capture phase: intercept before target gets it
  // Useful for:
  // - Logging all clicks before they're handled
  // - Global keyboard shortcuts
  // - Preventing certain actions globally

  // const document = window.document;
  //
  // document.addEventListener("click", (e) => {
  //   console.log("Global click intercepted:", e.target);
  //   // Can decide whether to prevent propagation
  // }, { capture: true }); // capture phase

  console.log("Capture phase executes before bubble phase");
}

capturePhaseUsage();

// ===== 15. EVENT DELEGATION PERFORMANCE =====
console.log("\n--- 15. DELEGATION PERFORMANCE ---");

function performanceComparison() {
  // Bad: 1000 listeners
  // const items = document.querySelectorAll(".item");
  // items.forEach(item => {
  //   item.addEventListener("click", handleClick);
  // });

  // Good: 1 listener with delegation
  // const list = document.getElementById("list");
  // list.addEventListener("click", (e) => {
  //   if (e.target.classList.contains("item")) {
  //     handleClick.call(e.target, e);
  //   }
  // });

  console.log("Delegation: 1 listener vs 1000 listeners");
  console.log("Much better performance, easier to manage");
}

performanceComparison();

// ===== 16. CURRENT TARGET VS TARGET =====
console.log("\n--- 16. CURRENTTARGET VS TARGET ---");

function targetAnalysis() {
  // const outer = document.getElementById("outer");
  //
  // outer.addEventListener("click", (e) => {
  //   console.log("event.target:", e.target);
  //   // The element that actually triggered the event
  //
  //   console.log("event.currentTarget:", e.currentTarget);
  //   // The element with the listener (outer)
  // });

  // If you click inner button:
  // - event.target = inner button
  // - event.currentTarget = outer div

  console.log("target: element triggering event");
  console.log("currentTarget: element with listener");
}

targetAnalysis();

// ===== 17. CLOSEST() METHOD =====
console.log("\n--- 17. CLOSEST() METHOD ---");

function closestMethod() {
  // const listItem = document.getElementById("item-5");
  //
  // listItem.addEventListener("click", (e) => {
  //   // Find nearest ancestor that's a row
  //   const row = e.target.closest("tr");
  //   if (row) {
  //     console.log("Row found:", row);
  //   }
  //
  //   // Includes the element itself
  //   const button = e.target.closest("button");
  //   if (button) {
  //     console.log("Button found:", button);
  //   }
  // });

  console.log("closest(): find nearest matching ancestor");
  console.log("Includes the element itself");
}

closestMethod();

// ===== 18. EVENT BINDING BEST PRACTICES =====
console.log("\n--- 18. BEST PRACTICES ---");

console.log("✓ Use event delegation for dynamic content");
console.log("✓ Use stopPropagation when needed");
console.log("✓ Use preventDefault for forms/links");
console.log("✓ Check event.target with closest()");
console.log("✓ Remove listeners when not needed");
console.log("✗ Avoid adding listeners to many individual elements");
console.log("✗ Don't prevent bubbling unnecessarily");

// ===== 19. PRACTICAL: SEARCH WITH BOTH PHASES =====
console.log("\n--- 19. CAPTURE + BUBBLE ---");

function twoPhaseSearch() {
  // const input = document.querySelector("input");
  //
  // Capture phase - intercept early
  // input.addEventListener("keydown", (e) => {
  //   if (e.key === "Escape") {
  //     e.preventDefault(); // Stop before handler runs
  //   }
  // }, { capture: true });

  // Bubble phase - handle normally
  // input.addEventListener("input", (e) => {
  //   performSearch(e.target.value);
  // });

  console.log("Use both phases for complete control");
}

twoPhaseSearch();

// ===== 20. DEBUGGING PROPAGATION =====
console.log("\n--- 20. DEBUGGING PROPAGATION ---");

function debugPropagation(event) {
  console.log("=== Event Debug Info ===");
  console.log("Type:", event.type);
  console.log("Target:", event.target);
  console.log("CurrentTarget:", event.currentTarget);
  console.log(
    "Phase:",
    event.eventPhase === 1
      ? "CAPTURING"
      : event.eventPhase === 2
        ? "AT_TARGET"
        : "BUBBLING",
  );
  console.log("Bubbles:", event.bubbles);
  console.log("Cancelable:", event.cancelable);
}

console.log("Use this function to debug event flow");

console.log("\n=== Event Propagation Summary ===");
console.log("Bubbling: target → parent → document");
console.log("Capturing: document → parent → target (rare)");
console.log("stopPropagation() - stops bubbling");
console.log("stopImmediatePropagation() - stops other handlers");
console.log("preventDefault() - stops default behavior");
console.log("Event delegation - one listener for many elements");
console.log("target vs currentTarget - know the difference");
