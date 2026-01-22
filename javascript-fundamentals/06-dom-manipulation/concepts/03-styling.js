// ================================================
// DOM STYLING - Practical Code Examples
// ================================================

// ===== 1. INLINE STYLES - BASIC =====
console.log("\n--- 1. INLINE STYLES ---");

// In HTML context (this would run in browser):
// <div id="box">Hello</div>

// Get element (mock for console logging)
const boxElement = {
  style: {},
};

// Set individual styles (note: camelCase for CSS properties)
boxElement.style.backgroundColor = "blue";
boxElement.style.color = "white";
boxElement.style.padding = "20px";
boxElement.style.fontSize = "16px";

console.log("Style object:", boxElement.style);

// ===== 2. CSS PROPERTIES AND CAMELCASE =====
console.log("\n--- 2. CAMELCASE CONVERSION ---");

// CSS property names are converted to camelCase:
const styleExamples = {
  "background-color": "backgroundColor",
  "border-radius": "borderRadius",
  "font-size": "fontSize",
  "text-align": "textAlign",
  "margin-top": "marginTop",
  "padding-left": "paddingLeft",
  "z-index": "zIndex",
};

console.log("CSS to camelCase mapping:");
for (const [css, camel] of Object.entries(styleExamples)) {
  console.log(`  ${css} → ${camel}`);
}

// ===== 3. SETTING STYLES WITH STYLE OBJECT =====
console.log("\n--- 3. SETTING MULTIPLE STYLES ---");

function applyStyles(element, styles) {
  for (const [property, value] of Object.entries(styles)) {
    element.style[property] = value;
  }
}

// Mock element
const card = { style: {} };

applyStyles(card, {
  backgroundColor: "#f0f0f0",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  fontFamily: "Arial, sans-serif",
});

console.log("Card styles applied:", card.style);

// ===== 4. CSSTEXT - SET MULTIPLE STYLES AT ONCE =====
console.log("\n--- 4. CSSTEXT PROPERTY ---");

const button = { style: {} };

// Method 1: Set cssText (faster for many styles)
button.style.cssText = `
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

console.log("Button cssText:", button.style.cssText);

// Method 2: Using individual properties (more flexible)
const button2 = { style: {} };
button2.style.backgroundColor = "green";
button2.style.color = "white";
button2.style.padding = "10px 20px";

// ===== 5. GETTING COMPUTED STYLES =====
console.log("\n--- 5. COMPUTED STYLES (Browser only) ---");

// This is browser-only functionality
// In a real browser environment:
// const element = document.getElementById("myDiv");
// const styles = window.getComputedStyle(element);
// console.log("Computed background:", styles.backgroundColor);
// console.log("Computed padding:", styles.padding);

// Note: getComputedStyle returns ACTUAL computed values,
// not just what you set with .style

// ===== 6. DISPLAY PROPERTY - SHOW/HIDE =====
console.log("\n--- 6. DISPLAY PROPERTY ---");

const hiddenElement = { style: {}, className: "" };

// Hide element
hiddenElement.style.display = "none";
console.log("Hidden:", hiddenElement.style.display); // "none"

// Show element
hiddenElement.style.display = "block";
console.log("Shown:", hiddenElement.style.display); // "block"

// Different display values:
const displayValues = {
  none: "Hide completely (removed from layout)",
  block: "Full width block",
  inline: "Inline with other elements",
  "inline-block": "Inline but respect width/height",
  flex: "Flexible box layout",
  grid: "Grid layout",
  table: "Table layout",
};

console.log("Display values:", displayValues);

// ===== 7. VISIBILITY VS DISPLAY =====
console.log("\n--- 7. VISIBILITY VS DISPLAY ---");

const element1 = { style: {} };
const element2 = { style: {} };

// display: none - removes from layout
element1.style.display = "none"; // Takes no space

// visibility: hidden - keeps space
element2.style.visibility = "hidden"; // Still takes space

// visibility: visible - show (default)
element2.style.visibility = "visible";

console.log("display: none vs visibility: hidden");
console.log("display removes from layout flow");
console.log("visibility hides but keeps space");

// ===== 8. OPACITY - TRANSPARENCY =====
console.log("\n--- 8. OPACITY ---");

const fadeElement = { style: {} };

// Opacity values: 0 (transparent) to 1 (opaque)
fadeElement.style.opacity = "1"; // Fully visible
console.log("Opacity 1 (visible):", fadeElement.style.opacity);

fadeElement.style.opacity = "0.5"; // 50% transparent
console.log("Opacity 0.5 (semi-transparent):", fadeElement.style.opacity);

fadeElement.style.opacity = "0"; // Invisible (but takes space)
console.log("Opacity 0 (invisible):", fadeElement.style.opacity);

// Useful for fade effects
function fadeOut(element, duration = 1000) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = "0";
}

// ===== 9. POSITIONING =====
console.log("\n--- 9. POSITIONING ---");

const positioned = { style: {} };

// Position types:
const positionTypes = {
  static: "Default - normal flow (can't use top/left)",
  relative: "Positioned relative to its normal position",
  absolute: "Positioned relative to nearest positioned parent",
  fixed: "Positioned relative to viewport",
  sticky: "Toggles between relative and fixed",
};

// Set position
positioned.style.position = "absolute";
positioned.style.top = "20px";
positioned.style.left = "30px";

console.log("Positioning examples:");
for (const [type, desc] of Object.entries(positionTypes)) {
  console.log(`  ${type}: ${desc}`);
}

// ===== 10. MARGINS AND PADDING =====
console.log("\n--- 10. MARGINS AND PADDING ---");

const box = { style: {} };

// Set margins
box.style.marginTop = "10px";
box.style.marginRight = "15px";
box.style.marginBottom = "10px";
box.style.marginLeft = "15px";

// Or shorthand via cssText
box.style.cssText = "margin: 10px 15px"; // top/bottom left/right

// Set padding
box.style.paddingTop = "20px";
box.style.paddingLeft = "20px";

console.log("Box margins and padding set");

// ===== 11. BACKGROUND STYLES =====
console.log("\n--- 11. BACKGROUND STYLES ---");

const background = { style: {} };

// Background color
background.style.backgroundColor = "#3498db"; // blue

// Background image
background.style.backgroundImage = "url('image.jpg')";
background.style.backgroundSize = "cover";
background.style.backgroundPosition = "center";
background.style.backgroundRepeat = "no-repeat";

// Can combine
background.style.cssText = `
  background-color: #3498db;
  background-image: url('image.jpg');
  background-size: cover;
  background-position: center;
`;

console.log("Background styles set");

// ===== 12. BORDER STYLES =====
console.log("\n--- 12. BORDER STYLES ---");

const bordered = { style: {} };

// Set border
bordered.style.border = "2px solid #333";
bordered.style.borderRadius = "8px";

// Individual borders
bordered.style.borderTop = "2px solid red";
bordered.style.borderRight = "2px solid green";
bordered.style.borderBottom = "2px solid blue";
bordered.style.borderLeft = "2px solid yellow";

// Border radius
bordered.style.borderTopLeftRadius = "10px";
bordered.style.borderTopRightRadius = "5px";

console.log("Border styles applied");

// ===== 13. TEXT STYLING =====
console.log("\n--- 13. TEXT STYLING ---");

const text = { style: {} };

// Font properties
text.style.fontFamily = "Arial, sans-serif";
text.style.fontSize = "16px";
text.style.fontWeight = "bold"; // or "700"
text.style.fontStyle = "italic";
text.style.lineHeight = "1.6";

// Text color and alignment
text.style.color = "#333";
text.style.textAlign = "center"; // or "left", "right", "justify"

// Text decoration
text.style.textDecoration = "underline";
text.style.textTransform = "uppercase"; // or "lowercase", "capitalize"

console.log("Text styles applied");

// ===== 14. SHADOW EFFECTS =====
console.log("\n--- 14. SHADOW EFFECTS ---");

const shadow = { style: {} };

// Box shadow
shadow.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
// syntax: offsetX offsetY blurRadius spreadRadius color

// Multiple shadows
shadow.style.boxShadow = `
  0 4px 6px rgba(0, 0, 0, 0.1),
  0 2px 4px rgba(0, 0, 0, 0.05)
`;

// Text shadow
text.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.3)";

console.log("Shadow effects applied");

// ===== 15. TRANSITIONS AND ANIMATIONS =====
console.log("\n--- 15. TRANSITIONS ---");

const animated = { style: {} };

// Set transition
animated.style.transition = "background-color 0.3s ease-in-out";

// Or with multiple properties
animated.style.transition = `
  background-color 0.3s ease,
  transform 0.3s ease,
  opacity 0.3s ease
`;

// Trigger change (in real browser, this would animate)
animated.style.backgroundColor = "blue"; // Will transition

console.log("Transition set");

// ===== 16. CLASS-BASED STYLING (Better approach) =====
console.log("\n--- 16. CLASSLIST API ---");

// This is better than inline styles!
const element = {
  className: "",
  classList: {
    add: function (name) {
      console.log(`Add class: ${name}`);
    },
    remove: function (name) {
      console.log(`Remove class: ${name}`);
    },
    toggle: function (name) {
      console.log(`Toggle class: ${name}`);
    },
    contains: function (name) {
      console.log(`Check class: ${name}`);
      return false;
    },
  },
};

// Add class
element.classList.add("active");

// Remove class
element.classList.remove("disabled");

// Toggle class
element.classList.toggle("hidden");

// Check if has class
const hasActive = element.classList.contains("active");

console.log("Using classList is better than inline styles");

// ===== 17. BATCH STYLING - PERFORMANCE =====
console.log("\n--- 17. BATCH STYLING ---");

const batchElement = { style: {} };

// Bad: Multiple repaints
// batchElement.style.width = "100px";
// batchElement.style.height = "100px";
// batchElement.style.backgroundColor = "blue";

// Good: Single cssText assignment
batchElement.style.cssText = `
  width: 100px;
  height: 100px;
  background-color: blue;
`;

console.log("Batch styling is more performant");

// ===== 18. DYNAMIC STYLING FUNCTION =====
console.log("\n--- 18. STYLING FUNCTION ---");

function setStyles(element, styleObj) {
  // Convert object to CSS string
  const cssString = Object.entries(styleObj)
    .map(([key, value]) => {
      // Convert camelCase back to kebab-case
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join("; ");

  element.style.cssText = cssString;
}

// Use it
const styledBox = { style: {} };
setStyles(styledBox, {
  backgroundColor: "green",
  padding: "20px",
  borderRadius: "5px",
  color: "white",
  textAlign: "center",
});

console.log("Styling function applied");

// ===== 19. PRACTICAL: THEME SWITCHER =====
console.log("\n--- 19. THEME SWITCHER ---");

const themeStyles = {
  light: {
    backgroundColor: "#ffffff",
    color: "#333333",
    borderColor: "#cccccc",
  },
  dark: {
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    borderColor: "#444444",
  },
};

function applyTheme(element, theme) {
  const styles = themeStyles[theme];
  Object.assign(element.style, styles);
}

const themeElement = { style: {} };
applyTheme(themeElement, "dark");
console.log("Dark theme applied");

// ===== 20. PRACTICAL: RESPONSIVE SIZING =====
console.log("\n--- 20. RESPONSIVE SIZING ---");

function setResponsiveSizes(element) {
  // This would be better done with CSS media queries,
  // but can be done with JavaScript too

  function updateSize() {
    const width = window.innerWidth;

    // Mock width check
    if (width < 600) {
      element.style.fontSize = "14px";
      element.style.padding = "10px";
    } else if (width < 1024) {
      element.style.fontSize = "16px";
      element.style.padding = "15px";
    } else {
      element.style.fontSize = "18px";
      element.style.padding = "20px";
    }
  }

  // updateSize();
  // window.addEventListener("resize", updateSize);

  console.log("Responsive sizing function created");
}

console.log("\n=== DOM Styling Summary ===");
console.log("Use style property for direct styling");
console.log("Remember camelCase for CSS properties");
console.log("Use cssText for multiple style changes");
console.log("classList API is better than className");
console.log("Prefer CSS classes over inline styles");
console.log("Batch style changes for performance");
console.log("Use CSS for animations, JS for triggers");
