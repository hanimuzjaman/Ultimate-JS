# Nested Objects and Properties

## Accessing Nested Properties

### Dot Notation

```javascript
const user = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "NYC",
    country: "USA",
  },
};

console.log(user.address.city); // "NYC"
console.log(user.address.country); // "USA"
```

### Bracket Notation

```javascript
const user = {
  name: "Alice",
  "contact-info": {
    email: "alice@example.com",
  },
};

console.log(user["contact-info"].email); // Works with hyphens
```

### Optional Chaining (?.)

```javascript
const user = { name: "Bob" };

// Without optional chaining (error!)
// console.log(user.address.city); // TypeError!

// With optional chaining (safe)
console.log(user.address?.city); // undefined (no error)
console.log(user?.name); // "Bob"
```

## Creating Nested Objects

### Direct Assignment

```javascript
const company = {
  name: "TechCorp",
  departments: {
    engineering: {
      employees: ["Alice", "Bob"],
      budget: 500000,
    },
    marketing: {
      employees: ["Charlie"],
      budget: 200000,
    },
  },
};

console.log(company.departments.engineering.employees); // ['Alice', 'Bob']
```

### Nested Object Creation

```javascript
const data = {};
data.user = {};
data.user.profile = {};
data.user.profile.name = "Alice";

console.log(data.user.profile.name); // "Alice"
```

## Updating Nested Objects

### Immutable Updates (Recommended)

```javascript
const user = {
  name: "Alice",
  address: { city: "NYC", zip: "10001" },
};

// Update nested city
const updated = {
  ...user,
  address: {
    ...user.address,
    city: "Boston",
  },
};

console.log(user.address.city); // "NYC" (unchanged)
console.log(updated.address.city); // "Boston"
```

### Mutating Nested Objects (Avoid)

```javascript
const user = { address: { city: "NYC" } };

// Mutates original object
user.address.city = "Boston";

console.log(user.address.city); // "Boston" (changed!)
```

## Deep Cloning

### Shallow Copy (Nested Objects Still Shared)

```javascript
const original = {
  name: "Alice",
  address: { city: "NYC" },
};

const shallow = { ...original };

shallow.address.city = "Boston";
console.log(original.address.city); // "Boston" (affected!)
```

### Deep Clone

```javascript
const original = {
  name: "Alice",
  address: { city: "NYC" },
};

// Using JSON (works for most cases)
const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.address.city = "Boston";
console.log(original.address.city); // "NYC" (unaffected)
```

### Recursive Deep Clone

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((item) => deepClone(item));

  const cloned = {};
  for (const key in obj) {
    cloned[key] = deepClone(obj[key]);
  }
  return cloned;
}

const original = { a: { b: { c: 1 } } };
const copy = deepClone(original);
copy.a.b.c = 999;
console.log(original.a.b.c); // 1 (unchanged)
```

## Traversing Nested Objects

### Recursive Traversal

```javascript
function traverse(obj, callback) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      traverse(obj[key], callback);
    } else {
      callback(key, obj[key]);
    }
  }
}

const data = { a: 1, b: { c: 2, d: { e: 3 } } };

traverse(data, (key, value) => {
  console.log(`${key}: ${value}`);
});
// a: 1
// c: 2
// e: 3
```

### Get All Keys

```javascript
function getAllKeys(obj) {
  const keys = [];
  for (const key in obj) {
    keys.push(key);
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const nestedKeys = getAllKeys(obj[key]);
      keys.push(...nestedKeys);
    }
  }
  return keys;
}
```

## Common Patterns

### Default Values for Nested Properties

```javascript
function getNestedValue(obj, path, defaultValue) {
  const keys = path.split(".");
  let value = obj;

  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) return defaultValue;
  }

  return value;
}

const user = { profile: { name: "Alice" } };
console.log(getNestedValue(user, "profile.name")); // "Alice"
console.log(getNestedValue(user, "profile.age", "Unknown")); // "Unknown"
```

### Update Nested Value Immutably

```javascript
function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  const lastKey = keys.pop();

  let current = { ...obj };
  let target = current;

  for (const key of keys) {
    target[key] = { ...target[key] };
    target = target[key];
  }

  target[lastKey] = value;
  return current;
}

const user = { profile: { name: "Alice", age: 25 } };
const updated = setNestedValue(user, "profile.age", 26);
console.log(user.profile.age); // 25
console.log(updated.profile.age); // 26
```

## Performance Considerations

### Avoiding Deep Nesting

```javascript
// ❌ Avoid deep nesting
const data = { a: { b: { c: { d: { e: 1 } } } } };
console.log(data.a.b.c.d.e); // Hard to read, inefficient

// ✓ Flatten structure
const flatData = { a_b_c_d_e: 1 };
console.log(flatData["a_b_c_d_e"]);
```

### Using Array of Objects

```javascript
// ❌ Nested object structure
const company = {
  depts: {
    engineering: { budget: 500000 },
    marketing: { budget: 200000 },
  },
};

// ✓ Array structure
const departments = [
  { name: "engineering", budget: 500000 },
  { name: "marketing", budget: 200000 },
];
```

## Summary

- Use **optional chaining** (?.) to safely access nested properties
- Prefer **immutable updates** using spread operator
- Be aware of **shallow copy limitations** for nested objects
- Use **JSON.parse(JSON.stringify())** for simple deep clones
- Create **recursive functions** for complex nested object operations
- Avoid **excessive nesting** for better code readability
- Consider **flattening** overly nested structures
