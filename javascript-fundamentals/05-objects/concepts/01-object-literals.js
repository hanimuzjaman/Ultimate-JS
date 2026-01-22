/* ===================================================================
   OBJECTS - COMPREHENSIVE CODE EXAMPLES
   Topic: Object Literals, Properties, Methods, Destructuring
=================================================================== */

// ===================================================================
// SECTION 1: CREATING OBJECTS
// ===================================================================

console.log("=== CREATING OBJECTS ===");

// Object literal
const person = {
  name: "John",
  age: 30,
  email: "john@example.com",
  country: "USA",
};

console.log(person);

// Empty object
const empty = {};

// Mixed data types
const mixed = {
  string: "hello",
  number: 42,
  boolean: true,
  null: null,
  undefined: undefined,
  array: [1, 2, 3],
  object: { nested: "value" },
};

console.log(mixed);

// ===================================================================
// SECTION 2: ACCESSING PROPERTIES
// ===================================================================

console.log("\n=== ACCESSING PROPERTIES ===");

// Dot notation
console.log(person.name); // "John"
console.log(person.age); // 30

// Bracket notation
console.log(person["name"]); // "John"
console.log(person["email"]); // "john@example.com"

// Variable as key
const key = "country";
console.log(person[key]); // "USA"

// Non-existent property returns undefined
console.log(person.phone); // undefined

// ===================================================================
// SECTION 3: MODIFYING PROPERTIES
// ===================================================================

console.log("\n=== MODIFYING PROPERTIES ===");

// Create new object for modifications
let user = { name: "Alice", age: 25 };

// Update property
user.age = 26;
console.log(user.age); // 26

// Add new property
user.city = "New York";
console.log(user); // { name: "Alice", age: 26, city: "New York" }

// Add property with bracket notation
user["phone"] = "555-1234";
console.log(user.phone); // "555-1234"

// Delete property
delete user.phone;
console.log(user); // phone removed

// ===================================================================
// SECTION 4: METHODS
// ===================================================================

console.log("\n=== METHODS ===");

// Method using function keyword
const calculator = {
  value: 0,
  add: function (num) {
    this.value += num;
    return this.value;
  },
  subtract: function (num) {
    this.value -= num;
    return this.value;
  },
};

console.log(calculator.add(5)); // 5
console.log(calculator.add(3)); // 8
console.log(calculator.subtract(2)); // 6

// Shorthand method syntax
const student = {
  name: "Bob",
  grades: [85, 90, 78, 92],

  getAverage() {
    const sum = this.grades.reduce((a, b) => a + b, 0);
    return (sum / this.grades.length).toFixed(2);
  },

  getGrade(index) {
    return this.grades[index];
  },
};

console.log(student.getAverage()); // "86.25"
console.log(student.getGrade(0)); // 85

// ===================================================================
// SECTION 5: THIS KEYWORD
// ===================================================================

console.log("\n=== THIS KEYWORD ===");

const person2 = {
  firstName: "John",
  lastName: "Doe",

  // this refers to the person object
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  // Accessing other methods
  displayInfo() {
    return `Name: ${this.getFullName()}`;
  },
};

console.log(person2.getFullName()); // "John Doe"
console.log(person2.displayInfo()); // "Name: John Doe"

// ===================================================================
// SECTION 6: NESTED OBJECTS
// ===================================================================

console.log("\n=== NESTED OBJECTS ===");

const employee = {
  name: "Sarah",
  position: "Manager",

  // Nested object
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
    zipCode: "10001",
  },

  // Another nested object
  contact: {
    email: "sarah@example.com",
    phone: "555-9876",
    social: {
      twitter: "@sarah",
      linkedin: "linkedin.com/in/sarah",
    },
  },
};

// Access nested properties
console.log(employee.address.city); // "New York"
console.log(employee.contact.email); // "sarah@example.com"
console.log(employee.contact.social.twitter); // "@sarah"

// Modify nested properties
employee.address.city = "Boston";
console.log(employee.address.city); // "Boston"

// ===================================================================
// SECTION 7: OBJECT DESTRUCTURING
// ===================================================================

console.log("\n=== DESTRUCTURING ===");

const user2 = {
  name: "Charlie",
  age: 35,
  email: "charlie@example.com",
  country: "UK",
};

// Basic destructuring
const { name, age } = user2;
console.log(name); // "Charlie"
console.log(age); // 35

// Destructure with rename
const { name: fullName, email: emailAddress } = user2;
console.log(fullName); // "Charlie"
console.log(emailAddress); // "charlie@example.com"

// Default values
const { name: n, phone = "No phone" } = user2;
console.log(phone); // "No phone" (not in object)

// Rest operator
const { name: n2, age: a, ...rest } = user2;
console.log(rest); // { email, country }

// Nested destructuring
const company = {
  name: "TechCorp",
  ceo: {
    name: "Jane",
    email: "jane@techcorp.com",
  },
};

const {
  ceo: { name: ceoName, email: ceoEmail },
} = company;
console.log(ceoName); // "Jane"
console.log(ceoEmail); // "jane@techcorp.com"

// ===================================================================
// SECTION 8: SPREAD OPERATOR
// ===================================================================

console.log("\n=== SPREAD OPERATOR ===");

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Merge objects
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// Copy object
const original = { name: "David", age: 40 };
const copy = { ...original };
copy.name = "Diana";
console.log(original.name); // "David" - unchanged
console.log(copy.name); // "Diana"

// Override properties
const settings = { theme: "dark", language: "en", fontSize: 14 };
const newSettings = { ...settings, theme: "light", fontSize: 16 };
console.log(newSettings); // { theme: "light", language: "en", fontSize: 16 }

// Merge with new properties
const extended = { ...obj1, x: 10, y: 20 };
console.log(extended); // { a: 1, b: 2, x: 10, y: 20 }

// ===================================================================
// SECTION 9: OBJECT METHODS
// ===================================================================

console.log("\n=== OBJECT METHODS ===");

const product = {
  name: "Laptop",
  price: 50000,
  quantity: 5,
  inStock: true,
};

// Object.keys() - Get property names
const keys = Object.keys(product);
console.log(keys); // ["name", "price", "quantity", "inStock"]

// Object.values() - Get property values
const values = Object.values(product);
console.log(values); // ["Laptop", 50000, 5, true]

// Object.entries() - Get [key, value] pairs
const entries = Object.entries(product);
console.log(entries);
// [["name", "Laptop"], ["price", 50000], ["quantity", 5], ["inStock", true]]

// Iterate using entries
for (const [key, value] of Object.entries(product)) {
  console.log(`${key}: ${value}`);
}

// Object.assign() - Copy properties
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 3, c: 4 }

// ===================================================================
// SECTION 10: CHECKING PROPERTIES
// ===================================================================

console.log("\n=== CHECKING PROPERTIES ===");

const obj = { name: "Test", age: 25 };

// hasOwnProperty() - Own properties only
console.log(obj.hasOwnProperty("name")); // true
console.log(obj.hasOwnProperty("age")); // true
console.log(obj.hasOwnProperty("email")); // false
console.log(obj.hasOwnProperty("toString")); // false (inherited)

// in operator - Includes inherited properties
console.log("name" in obj); // true
console.log("toString" in obj); // true (inherited from Object.prototype)

// ===================================================================
// SECTION 11: PRACTICAL EXAMPLES
// ===================================================================

console.log("\n=== PRACTICAL EXAMPLES ===");

// Example 1: User object with methods
const user3 = {
  id: 1,
  name: "Eve",
  email: "eve@example.com",
  role: "user",

  isAdmin() {
    return this.role === "admin";
  },

  displayInfo() {
    return `${this.name} (${this.email}) - Role: ${this.role}`;
  },
};

console.log(user3.displayInfo()); // "Eve (eve@example.com) - Role: user"
console.log(user3.isAdmin()); // false

// Example 2: Shopping cart
const cart = {
  items: [
    { name: "Item1", price: 100, quantity: 2 },
    { name: "Item2", price: 200, quantity: 1 },
    { name: "Item3", price: 50, quantity: 3 },
  ],

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  addItem(name, price, quantity = 1) {
    this.items.push({ name, price, quantity });
  },

  removeItem(name) {
    this.items = this.items.filter((item) => item.name !== name);
  },
};

console.log(cart.getTotal()); // 550
cart.addItem("Item4", 75, 2);
console.log(cart.getTotal()); // 700

// Example 3: Configuration object
const appConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  debug: false,

  setUrl(url) {
    this.apiUrl = url;
    return this; // Method chaining
  },

  setTimeout(ms) {
    this.timeout = ms;
    return this; // Method chaining
  },
};

appConfig.setUrl("https://new-api.example.com").setTimeout(10000);
console.log(appConfig);

console.log("\n✅ Object examples complete!");
