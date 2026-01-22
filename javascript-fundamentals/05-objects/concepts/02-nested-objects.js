// ================================================
// NESTED OBJECTS - Practical Code Examples
// ================================================

// ===== 1. ACCESSING NESTED PROPERTIES =====
console.log("\n--- 1. ACCESSING NESTED PROPERTIES ---");

const person = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  contact: {
    email: "john@example.com",
    phone: {
      mobile: "+1-555-0101",
      home: "+1-555-0102",
    },
  },
};

// Access nested properties
console.log("Name:", person.name);
console.log("City:", person.address.city);
console.log("Latitude:", person.address.coordinates.lat);
console.log("Mobile:", person.contact.phone.mobile);

// ===== 2. CREATING NESTED OBJECTS =====
console.log("\n--- 2. CREATING NESTED OBJECTS ---");

// Method 1: Literal notation
const company = {
  name: "TechCorp",
  location: {
    country: "USA",
    city: "San Francisco",
    office: {
      floor: 5,
      rooms: {
        meeting: 3,
        break: 1,
        bathrooms: 2,
      },
    },
  },
  departments: {
    engineering: {
      team_size: 50,
      budget: 5000000,
    },
    marketing: {
      team_size: 20,
      budget: 1000000,
    },
  },
};

console.log("Company:", company.name);
console.log("Meeting rooms on floor 5:", company.location.office.rooms.meeting);

// Method 2: Progressive building
const user = {};
user.profile = {};
user.profile.name = "Alice";
user.profile.age = 30;
user.settings = {};
user.settings.theme = "dark";
user.settings.notifications = {};
user.settings.notifications.email = true;
user.settings.notifications.sms = false;

console.log("User profile:", user.profile);
console.log("Theme:", user.settings.theme);

// ===== 3. UPDATING NESTED PROPERTIES =====
console.log("\n--- 3. UPDATING NESTED PROPERTIES ---");

// Update existing value
const profile = {
  user: {
    name: "Bob",
    contact: {
      email: "bob@example.com",
      phone: "555-1234",
    },
  },
};

console.log("Before:", profile.user.contact.email);
profile.user.contact.email = "bob.new@example.com";
console.log("After:", profile.user.contact.email);

// Add new nested properties
profile.user.preferences = {};
profile.user.preferences.language = "en";
profile.user.preferences.timezone = "EST";

console.log("Updated profile:", profile);

// ===== 4. ADDING NESTED OBJECTS =====
console.log("\n--- 4. ADDING NESTED OBJECTS ---");

const employee = {
  name: "Charlie",
  position: "Developer",
};

// Add nested object
employee.employment = {
  startDate: "2020-01-15",
  endDate: null,
  type: "Full-time",
};

// Add another nested object
employee.salary = {
  annual: 80000,
  currency: "USD",
  benefits: {
    health: true,
    dental: true,
    retirement: {
      type: "401k",
      match: "5%",
    },
  },
};

console.log("Salary info:", employee.salary);
console.log("Retirement match:", employee.salary.benefits.retirement.match);

// ===== 5. DELETING NESTED PROPERTIES =====
console.log("\n--- 5. DELETING NESTED PROPERTIES ---");

const config = {
  app: {
    name: "MyApp",
    version: "1.0",
    debug: true,
    features: {
      auth: true,
      api: true,
      cache: true,
    },
  },
};

console.log("Before delete:", config.app.features.cache);
delete config.app.features.cache;
console.log("After delete:", config.app.features.cache); // undefined

// ===== 6. CHECKING NESTED PROPERTIES =====
console.log("\n--- 6. CHECKING NESTED PROPERTIES ---");

const obj = {
  level1: {
    level2: {
      level3: "value",
    },
  },
};

// Check if property exists
console.log("Has level1:", "level1" in obj);
console.log("Has level2:", "level2" in obj.level1);

// Using hasOwnProperty
console.log("Own property level1:", obj.hasOwnProperty("level1"));

// Optional chaining (modern JavaScript)
console.log("Value:", obj?.level1?.level2?.level3); // "value"
console.log("Missing property:", obj?.level1?.missing?.value); // undefined

// ===== 7. MERGING NESTED OBJECTS =====
console.log("\n--- 7. MERGING NESTED OBJECTS ---");

const defaults = {
  settings: {
    theme: "light",
    language: "en",
    notifications: {
      email: true,
      sms: false,
    },
  },
};

const userSettings = {
  settings: {
    theme: "dark",
    notifications: {
      email: false,
      push: true,
    },
  },
};

// Shallow merge (NOT recommended for nested)
const merged1 = { ...defaults, ...userSettings };
console.log("Shallow merge:", merged1.settings);
// Problem: notifications overwrites entire object!

// Deep merge needed - manual approach
const merged2 = {
  settings: {
    theme: userSettings.settings.theme || defaults.settings.theme,
    language: defaults.settings.language,
    notifications: {
      email:
        userSettings.settings.notifications.email ||
        defaults.settings.notifications.email,
      sms: defaults.settings.notifications.sms,
      push: userSettings.settings.notifications.push,
    },
  },
};
console.log("Deep merge:", merged2.settings);

// ===== 8. DEEP CLONING =====
console.log("\n--- 8. DEEP CLONING ---");

const original = {
  info: {
    name: "Original",
    nested: {
      value: 100,
    },
  },
};

// Shallow copy (problematic)
const shallow = { ...original };
shallow.info.nested.value = 999;
console.log(
  "Original after shallow copy modified:",
  original.info.nested.value,
); // 999 - CHANGED!

// Deep copy using JSON (works for simple objects)
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.info.nested.value = 500;
console.log("Original after deep copy modified:", original.info.nested.value); // 999 - unchanged

// Manual deep clone function
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map((item) => deepClone(item));

  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

// ===== 9. ITERATING NESTED OBJECTS =====
console.log("\n--- 9. ITERATING NESTED OBJECTS ---");

const data = {
  name: "Dataset",
  metrics: {
    users: 1000,
    revenue: 50000,
    performance: {
      speed: "fast",
      uptime: 99.9,
    },
  },
};

// Get all keys (shallow)
console.log("Top-level keys:", Object.keys(data));

// Recursive iteration
function printNested(obj, prefix = "") {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && value !== null) {
        printNested(value, fullKey);
      } else {
        console.log(`${fullKey}: ${value}`);
      }
    }
  }
}

console.log("All nested keys:");
printNested(data);

// ===== 10. TRANSFORMING NESTED OBJECTS =====
console.log("\n--- 10. TRANSFORMING NESTED OBJECTS ---");

const unstructured = {
  user_id: 1,
  user_name: "John",
  user_email: "john@example.com",
  address_street: "123 Main",
  address_city: "NYC",
  address_country: "USA",
};

// Transform into nested structure
const structured = {
  user: {
    id: unstructured.user_id,
    name: unstructured.user_name,
    email: unstructured.user_email,
  },
  address: {
    street: unstructured.address_street,
    city: unstructured.address_city,
    country: unstructured.address_country,
  },
};

console.log("Structured:", structured);
console.log("City:", structured.address.city);

// ===== 11. NESTED ARRAYS IN OBJECTS =====
console.log("\n--- 11. NESTED ARRAYS IN OBJECTS ---");

const project = {
  name: "Website Redesign",
  team: [
    { name: "Alice", role: "Designer" },
    { name: "Bob", role: "Developer" },
    { name: "Charlie", role: "Manager" },
  ],
  tasks: {
    planning: ["Define goals", "Create timeline"],
    design: ["Mockups", "Prototype", "Feedback"],
    development: ["Setup", "Build features", "Test"],
  },
};

console.log("First team member:", project.team[0].name);
console.log("Design tasks:", project.tasks.design);
console.log("Second design task:", project.tasks.design[1]);

// ===== 12. ACCESSING WITH COMPUTED KEYS =====
console.log("\n--- 12. COMPUTED PROPERTY ACCESS ---");

const catalog = {
  products: {
    laptop: { price: 999, stock: 5 },
    mouse: { price: 25, stock: 50 },
    keyboard: { price: 75, stock: 30 },
  },
};

const productName = "laptop";
console.log("Price of", productName + ":", catalog.products[productName].price);

// Useful for dynamic access
function getProductPrice(name) {
  return catalog.products[name]?.price || "Product not found";
}

console.log("Mouse price:", getProductPrice("mouse"));
console.log("Monitor price:", getProductPrice("monitor"));

// ===== 13. NESTED OBJECTS WITH METHODS =====
console.log("\n--- 13. NESTED OBJECTS WITH METHODS ---");

const calculator = {
  name: "Calculator",
  state: {
    current: 0,
    previous: 0,
    operation: null,
  },
  methods: {
    add: function (a, b) {
      return a + b;
    },
    multiply: function (a, b) {
      return a * b;
    },
  },
  calculate: function (a, b, op) {
    if (op === "add") {
      return this.methods.add(a, b);
    } else if (op === "multiply") {
      return this.methods.multiply(a, b);
    }
  },
};

console.log("5 + 3 =", calculator.calculate(5, 3, "add"));
console.log("5 × 3 =", calculator.calculate(5, 3, "multiply"));

// ===== 14. PRACTICAL: USER PROFILE WITH NESTED DATA =====
console.log("\n--- 14. PRACTICAL: USER PROFILE ---");

const userProfile = {
  id: 1,
  personal: {
    firstName: "John",
    lastName: "Doe",
    dob: "1990-05-15",
  },
  contact: {
    email: "john.doe@example.com",
    phone: {
      mobile: "+1-555-0101",
      work: "+1-555-0102",
    },
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
  },
  social: {
    twitter: "@johndoe",
    linkedin: "john-doe",
    github: "johndoe",
  },
  preferences: {
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    privacy: {
      profilePublic: false,
      showEmail: false,
    },
  },
};

console.log(
  "Full name:",
  userProfile.personal.firstName + " " + userProfile.personal.lastName,
);
console.log("City:", userProfile.contact.address.city);
console.log(
  "Notifications enabled:",
  Object.values(userProfile.preferences.notifications).some((v) => v),
);

// ===== 15. PRACTICAL: EXTRACTING NESTED DATA =====
console.log("\n--- 15. EXTRACTING NESTED DATA ---");

// Get all email notifications settings
function getNotificationSettings(profile) {
  return {
    email: profile.preferences.notifications.email,
    contactEmail: profile.contact.email,
  };
}

console.log("Notification settings:", getNotificationSettings(userProfile));

// Update nested value safely
function updateNestedValue(obj, path, value) {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
}

updateNestedValue(userProfile, "contact.phone.fax", "+1-555-0103");
console.log("Added fax:", userProfile.contact.phone.fax);

console.log("\n=== Nested Objects Summary ===");
console.log("Use dot notation for access");
console.log("Build progressively for flexibility");
console.log("Use optional chaining for safety");
console.log("Deep clone for independent copies");
console.log("Watch out for shallow merge limitations");
