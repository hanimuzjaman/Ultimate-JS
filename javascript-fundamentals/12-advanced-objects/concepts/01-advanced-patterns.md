# Advanced Object Patterns & Modern JavaScript Features

## Optional Chaining (?.)

Safely access nested properties without checking each level:

```javascript
const user = {
  name: "John",
  address: {
    street: "123 Main St",
  },
};

// Old way - check each level
if (user && user.address && user.address.street) {
  console.log(user.address.street);
}

// ✓ New way - optional chaining
console.log(user?.address?.street); // "123 Main St"

// Doesn't error if null/undefined
const street = user?.address?.nonexistent?.street; // undefined (no error)
```

With method calls:

```javascript
const obj = {
  method() {
    return "result";
  },
};

obj.method?.(); // Calls if method exists
const obj2 = null;
obj2?.method?.(); // undefined (no error)
```

With array access:

```javascript
const arr = [1, 2, 3];
arr?.[0]; // 1
arr?.[99]; // undefined
const noArray = null;
noArray?.[0]; // undefined (no error)
```

## Nullish Coalescing (??)

Use default value only if null or undefined (not 0, false, ""):

```javascript
const count = 0;
const value = count ?? 100;
console.log(value); // 0 (not 100!)

const name = null;
const displayName = name ?? "Guest";
console.log(displayName); // "Guest"

// vs ||
const count2 = 0;
const value2 = count2 || 100;
console.log(value2); // 100 (treats 0 as falsy)
```

## Object.freeze() and Object.seal()

### Object.freeze()

Prevent any modifications:

```javascript
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

Object.freeze(config);

config.apiUrl = "https://new.example.com"; // No effect
config.newProperty = "value"; // No effect
delete config.timeout; // No effect

console.log(config); // Unchanged
```

### Object.seal()

Allow modification of existing properties, not addition/deletion:

```javascript
const obj = { name: "John", age: 30 };

Object.seal(obj);

obj.name = "Jane"; // Allowed
obj.city = "NYC"; // Not allowed
delete obj.age; // Not allowed
```

## Object.defineProperty()

Control how properties behave:

```javascript
const person = {};

Object.defineProperty(person, "age", {
  value: 25,
  writable: false, // Can't change value
  configurable: false, // Can't delete or reconfigure
  enumerable: true, // Shows in for...in loop
});

person.age = 30; // No effect
console.log(person.age); // 25

delete person.age; // Error in strict mode
```

## Getters and Setters (Deeper)

```javascript
const user = {
  _firstName: "John",
  _lastName: "Doe",

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  },

  set fullName(name) {
    const [first, last] = name.split(" ");
    this._firstName = first;
    this._lastName = last;
  },
};

console.log(user.fullName); // "John Doe"
user.fullName = "Jane Smith";
console.log(user._firstName); // "Jane"
```

## Proxy

Intercept and customize object operations:

```javascript
const handler = {
  get(target, property) {
    console.log(`Getting ${property}`);
    return target[property];
  },

  set(target, property, value) {
    console.log(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },

  has(target, property) {
    console.log(`Checking if has ${property}`);
    return property in target;
  },
};

const obj = { name: "John" };
const proxy = new Proxy(obj, handler);

proxy.name; // "Getting name" -> "John"
proxy.age = 30; // "Setting age to 30"
"name" in proxy; // "Checking if has name"
```

## Reflect API

Perform meta-operations on objects:

```javascript
const obj = { name: "John", age: 30 };

// Instead of object[key]
Reflect.get(obj, "name"); // 'John'

// Instead of object[key] = value
Reflect.set(obj, "city", "NYC");

// Instead of delete object[key]
Reflect.deleteProperty(obj, "age");

// Instead of 'key' in object
Reflect.has(obj, "name"); // true

// Get all keys
Reflect.ownKeys(obj); // ['name', 'city']
```

## Symbols

Unique identifiers that can be used as object keys:

```javascript
const privateKey = Symbol("private");

const obj = {
  publicProp: "public",
  [privateKey]: "private", // Use symbol as key
};

console.log(obj.publicProp); // "public"
console.log(obj[privateKey]); // "private"

// Not enumerable by default
for (let key in obj) {
  console.log(key); // Only "publicProp"
}

// Symbol properties are hidden
Object.keys(obj); // ['publicProp']
Object.getOwnPropertySymbols(obj); // [Symbol(private)]
```

## WeakMap

Map that holds weak references (garbage collection friendly):

```javascript
const weakMap = new WeakMap();

let obj = { name: "John" };
weakMap.set(obj, "metadata");

console.log(weakMap.get(obj)); // "metadata"

// When object is garbage collected, weakMap entry is removed
obj = null; // Object can be garbage collected
```

Use case - attaching private data:

```javascript
const privateData = new WeakMap();

class User {
  constructor(name) {
    this.name = name;
    privateData.set(this, { password: "***" });
  }

  getPrivate() {
    return privateData.get(this);
  }
}

const user = new User("John");
console.log(user.getPrivate()); // { password: '***' }
```

## Array.from()

Convert array-like objects to arrays:

```javascript
// NodeList from querySelectorAll
const divs = document.querySelectorAll("div");
const divArray = Array.from(divs);

// String to array
Array.from("Hello"); // ['H', 'e', 'l', 'l', 'o']

// With mapping function
const numbers = Array.from({ length: 5 }, (_, i) => i + 1);
// [1, 2, 3, 4, 5]
```

## for...of vs for...in

```javascript
const obj = { a: 1, b: 2, c: 3 };
const arr = ["x", "y", "z"];

// for...in - keys (properties)
for (let key in obj) {
  console.log(key); // 'a', 'b', 'c'
}

for (let index in arr) {
  console.log(index); // 0, 1, 2 (strings!)
}

// for...of - values (iterables)
for (let value of arr) {
  console.log(value); // 'x', 'y', 'z'
}

// for...of works with strings
for (let char of "hello") {
  console.log(char); // 'h', 'e', 'l', 'l', 'o'
}
```

## Spread Operator with Objects

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const obj3 = { a: 99 }; // Override

// Merge objects
const merged = { ...obj1, ...obj2, ...obj3 };
// { a: 99, b: 2, c: 3 }

// Shallow copy
const copy = { ...obj1 };

// Add/override properties
const updated = { ...obj1, d: 4, a: 100 };
// { a: 100, b: 2, d: 4 }
```

## Object Methods

```javascript
const obj = { name: "John", age: 30 };

// Get all keys
Object.keys(obj); // ['name', 'age']

// Get all values
Object.values(obj); // ['John', 30]

// Get key-value pairs
Object.entries(obj); // [['name', 'John'], ['age', 30]]

// Iterate over entries
Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// Assign properties
Object.assign(obj, { city: "NYC" });
// obj is { name: 'John', age: 30, city: 'NYC' }

// Create object with specific prototype
const proto = { greeting: "Hello" };
const newObj = Object.create(proto);
newObj.greeting; // "Hello"
```

## Destructuring Improvements

```javascript
// Nested destructuring
const user = {
  name: "John",
  address: {
    street: "123 Main",
    city: "NYC",
  },
};

const {
  address: { city },
} = user;
console.log(city); // 'NYC'

// Rename during destructuring
const { name: fullName, age: years = 0 } = user;

// Rest properties
const { name, ...rest } = user;
// name = 'John'
// rest = { address: {...} }

// Computed property names
const propName = "age";
const { [propName]: value } = user; // Gets user.age
```
