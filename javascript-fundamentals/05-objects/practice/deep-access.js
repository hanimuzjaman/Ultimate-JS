// ============================================
// deep-access.js
// Safely Accessing Nested Properties
// Practice: Deep object access, optional chaining, and null coalescing
// ============================================

// 1. Basic Deep Access
console.log("=== 1. Basic Deep Access ===");

const user1 = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
    coordinates: {
      latitude: 40.7128,
      longitude: -74.006,
    },
  },
};

// Direct access
console.log("City:", user1.address.city); // "New York"
console.log("Latitude:", user1.address.coordinates.latitude); // 40.7128

// 2. Problem: Accessing Missing Properties
console.log("\n=== 2. Unsafe Deep Access ===");

const user2 = {
  name: "Jane",
  address: {
    city: "Boston",
  },
};

try {
  // This will throw an error or return undefined
  console.log(user2.address.coordinates.latitude); // TypeError: coordinates is undefined
} catch (error) {
  console.log("Error:", error.message);
}

// 3. Solution: Checking Each Level
console.log("\n=== 3. Safe Access with Checks ===");

function getSafeCity(user) {
  if (user && user.address && user.address.city) {
    return user.address.city;
  }
  return "Unknown";
}

function getSafeCoordinates(user) {
  if (
    user &&
    user.address &&
    user.address.coordinates &&
    user.address.coordinates.latitude
  ) {
    return user.address.coordinates.latitude;
  }
  return null;
}

console.log("City:", getSafeCity(user2)); // "Boston"
console.log("Latitude:", getSafeCoordinates(user2)); // null
console.log("Latitude:", getSafeCoordinates(user1)); // 40.7128

// 4. Optional Chaining (?.)
console.log("\n=== 4. Optional Chaining ===");

const user3 = {
  name: "Bob",
  profile: {
    bio: "Software developer",
  },
};

const user4 = {
  name: "Alice",
};

// Optional chaining stops if property is null/undefined
console.log("User 3 bio:", user3.profile?.bio); // "Software developer"
console.log("User 4 bio:", user4.profile?.bio); // undefined

console.log("User 3 avatar:", user3.profile?.avatar?.url); // undefined (no error)
console.log("User 4 address:", user4.address?.city); // undefined (no error)

// 5. Optional Chaining with Methods
console.log("\n=== 5. Optional Chaining with Methods ===");

const company1 = {
  name: "TechCorp",
  employees: {
    getCount: function () {
      return 150;
    },
  },
};

const company2 = {
  name: "StartupCorp",
};

// Call method only if it exists
console.log("Company 1 count:", company1.employees?.getCount?.()); // 150
console.log("Company 2 count:", company2.employees?.getCount?.()); // undefined

// 6. Optional Chaining with Array Access
console.log("\n=== 6. Optional Chaining with Arrays ===");

const data1 = {
  results: [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ],
};

const data2 = {
  results: null,
};

const data3 = {};

console.log("First item:", data1.results?.[0]?.name); // "Item 1"
console.log("First item (null results):", data2.results?.[0]?.name); // undefined
console.log("First item (no results):", data3.results?.[0]?.name); // undefined

// 7. Nullish Coalescing Operator (??)
console.log("\n=== 7. Nullish Coalescing ===");

const settings1 = {
  theme: "dark",
  notifications: false,
  timeout: 0,
};

const settings2 = {
  theme: null,
  notifications: undefined,
};

// ?? only defaults when value is null or undefined
// Not when value is 0, false, "", etc.
console.log("Theme (1):", settings1.theme ?? "light"); // "dark"
console.log("Theme (2):", settings2.theme ?? "light"); // "light"
console.log("Notifications (1):", settings1.notifications ?? true); // false (not undefined/null)
console.log("Timeout:", settings1.timeout ?? 30); // 0 (not undefined/null)

// 8. Combining Optional Chaining and Nullish Coalescing
console.log("\n=== 8. Combining ?. and ?? ===");

const profile1 = {
  user: {
    name: "John",
    preferences: {
      language: "en",
    },
  },
};

const profile2 = {
  user: null,
};

const profile3 = {
  user: {
    preferences: null,
  },
};

const getLanguage = (profile) => {
  return profile?.user?.preferences?.language ?? "en";
};

console.log("Language 1:", getLanguage(profile1)); // "en"
console.log("Language 2:", getLanguage(profile2)); // "en"
console.log("Language 3:", getLanguage(profile3)); // "en"

// 9. Recursive Deep Get Function
console.log("\n=== 9. Deep Get Function ===");

function deepGet(obj, path, defaultValue = undefined) {
  // Handle dot notation: "user.address.city"
  const keys = path.split(".");
  let result = obj;

  for (let key of keys) {
    if (result == null) return defaultValue; // null or undefined
    result = result[key];
  }

  return result ?? defaultValue;
}

const product = {
  name: "Laptop",
  store: {
    location: {
      city: "San Francisco",
      zipcode: "94105",
    },
    inventory: {
      stock: 5,
    },
  },
};

console.log("City:", deepGet(product, "store.location.city")); // "San Francisco"
console.log("Zip:", deepGet(product, "store.location.zipcode")); // "94105"
console.log("Stock:", deepGet(product, "store.inventory.stock")); // 5
console.log("Missing:", deepGet(product, "store.manager.name")); // undefined
console.log(
  "Missing with default:",
  deepGet(product, "store.manager.name", "N/A"),
); // "N/A"

// 10. Array Deep Access
console.log("\n=== 10. Array Deep Access ===");

const users = [
  {
    id: 1,
    name: "Alice",
    posts: [
      { title: "First Post", likes: 10 },
      { title: "Second Post", likes: 25 },
    ],
  },
  {
    id: 2,
    name: "Bob",
    posts: null,
  },
  {
    id: 3,
    name: "Charlie",
  },
];

// Access with optional chaining
console.log("User 1, Post 1 title:", users[0]?.posts?.[0]?.title); // "First Post"
console.log("User 2, Post 1 title:", users[1]?.posts?.[0]?.title); // undefined
console.log("User 3, Post 1 title:", users[2]?.posts?.[0]?.title); // undefined

// Access with array methods
console.log("\nFirst post titles:");
users.forEach((user) => {
  const title = user.posts?.[0]?.title ?? "(No posts)";
  console.log(`  ${user.name}: ${title}`);
});

// 11. Filtering Deep Properties
console.log("\n=== 11. Filter by Deep Property ===");

const employees = [
  {
    name: "Emma",
    department: {
      name: "Engineering",
      budget: 50000,
    },
  },
  {
    name: "Frank",
    department: null,
  },
  {
    name: "Grace",
    department: {
      name: "Sales",
      budget: 30000,
    },
  },
  {
    name: "Henry",
    department: {
      name: "Engineering",
      budget: 45000,
    },
  },
];

// Find engineering department employees
const engineeringEmployees = employees.filter(
  (emp) => emp.department?.name === "Engineering",
);

console.log(
  "Engineering employees:",
  engineeringEmployees.map((e) => e.name),
);

// Get total budget for assigned departments
const totalBudget = employees.reduce(
  (sum, emp) => sum + (emp.department?.budget ?? 0),
  0,
);

console.log("Total budget:", totalBudget);

// 12. Deep Update (Immutable)
console.log("\n=== 12. Deep Update ===");

const config = {
  server: {
    host: "localhost",
    port: 3000,
    ssl: {
      enabled: false,
    },
  },
};

// Create new object with deep update (immutable)
const updatedConfig = {
  ...config,
  server: {
    ...config.server,
    ssl: {
      ...config.server.ssl,
      enabled: true,
    },
  },
};

console.log("Original SSL enabled:", config.server.ssl.enabled); // false
console.log("Updated SSL enabled:", updatedConfig.server.ssl.enabled); // true

// 13. Mapping Deep Properties
console.log("\n=== 13. Map Deep Properties ===");

const orders = [
  {
    id: 1,
    customer: {
      name: "John",
      email: "john@example.com",
    },
    items: [{ product: "Laptop", price: 999 }],
  },
  {
    id: 2,
    customer: {
      name: "Jane",
      email: "jane@example.com",
    },
    items: [
      { product: "Mouse", price: 25 },
      { product: "Keyboard", price: 75 },
    ],
  },
];

// Extract customer emails
const emails = orders.map((order) => order.customer.email);
console.log("Emails:", emails);

// Get total value per order
const orderTotals = orders.map((order) => ({
  id: order.id,
  customer: order.customer?.name,
  total: order.items?.reduce((sum, item) => sum + (item.price ?? 0), 0) ?? 0,
}));

console.log("Order totals:", orderTotals);

// 14. Safe Default Objects
console.log("\n=== 14. Safe Default Objects ===");

function getUser(id, defaultUser = {}) {
  // Simulate database lookup
  const found = null;
  return found ?? defaultUser;
}

const user = getUser(999, {
  name: "Guest",
  role: "visitor",
  profile: {},
});

console.log("User name:", user.name); // "Guest"
console.log("User role:", user.role ?? "unknown"); // "visitor"

// 15. Chaining Safe Operations
console.log("\n=== 15. Safe Operation Chain ===");

const apiResponse = {
  status: "success",
  data: {
    users: [
      { id: 1, active: true, permissions: ["read", "write"] },
      { id: 2, active: false, permissions: null },
    ],
  },
};

// Get all active user IDs safely
const activeUsers =
  apiResponse?.data?.users?.filter((u) => u.active)?.map((u) => u.id) ?? [];

console.log("Active user IDs:", activeUsers);

// Get permissions for first active user
const firstUserPermissions =
  apiResponse?.data?.users?.find((u) => u.active)?.permissions ?? [];

console.log("First active user permissions:", firstUserPermissions);

console.log("\n=== All Exercises Completed ===");
