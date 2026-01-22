/**
 * Module 12: Advanced Objects
 * Practice: Safe Access Patterns
 */

// ============================================
// EXERCISE 1: NESTED OBJECT ACCESS
// ============================================

const user = {
  profile: {
    name: "John",
    contact: {
      email: "john@example.com",
    },
  },
};

// Safe access with optional chaining
const email = user?.profile?.contact?.email;
console.log("Email:", email);

// Access non-existent property
const phone = user?.profile?.contact?.phone;
console.log("Phone:", phone ?? "Not provided");

// ============================================
// EXERCISE 2: ARRAY OPTIONAL CHAINING
// ============================================

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

console.log("\nArray access:");
console.log("Item 0 name:", items[0]?.name);
console.log("Item 5 name:", items[5]?.name);

// ============================================
// EXERCISE 3: FUNCTION CALLS
// ============================================

const obj = {
  method: () => "Called",
};

const nullObj = null;

console.log("\nFunction calls:");
console.log("obj.method():", obj.method?.());
console.log("nullObj.method():", nullObj?.method?.()); // undefined

// ============================================
// EXERCISE 4: COMBINED WITH NULLISH COALESCING
// ============================================

const settings = {
  theme: null,
  nested: {
    fontSize: 0,
  },
};

console.log("\nCombined operators:");
console.log("Theme:", settings.theme ?? "light");
console.log("Font size:", settings.nested?.fontSize ?? 16); // 0
console.log("Color:", settings.nested?.color ?? "black");
