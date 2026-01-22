# TYPESCRIPT INTRO

## What is TypeScript?

TypeScript is a superset of JavaScript that adds static type checking, interfaces, and advanced tooling. It compiles to JavaScript.

**Key Benefits:**

- Type safety
- Early error detection
- Better IDE support
- Self-documenting code
- Refactoring confidence

## Installation

```bash
# Install TypeScript globally
npm install -g typescript

# Install locally in project
npm install --save-dev typescript

# Initialize tsconfig.json
npx tsc --init

# Compile TypeScript
tsc
tsc --watch
```

## Basic Types

### Primitive Types

```typescript
// String
let name: string = "John";
const message: string = "Hello";

// Number
let age: number = 30;
const PI: number = 3.14159;

// Boolean
let isActive: boolean = true;
const hasError: boolean = false;

// Any (avoid if possible)
let something: any = "can be anything";
something = 42;
something = true;

// Null and Undefined
let nullable: string | null = null;
let optional: string | undefined = undefined;
```

### Union Types

```typescript
// Multiple types
let value: string | number;
value = "text"; // OK
value = 42; // OK
// value = true; // Error

// Type narrowing
function processValue(val: string | number) {
  if (typeof val === "string") {
    console.log(val.toUpperCase());
  } else {
    console.log(val * 2);
  }
}
```

### Literal Types

```typescript
// Specific values only
let direction: "up" | "down" | "left" | "right";
direction = "up"; // OK
// direction = "diagonal"; // Error

// With numbers
let status: 200 | 404 | 500;
status = 200; // OK
```

## Objects and Interfaces

### Basic Object Types

```typescript
// Type annotation
let user: { name: string; age: number } = {
  name: "John",
  age: 30,
};

// Optional properties
let config: { host?: string; port?: number } = {};

// Read-only properties
let point: { readonly x: number; readonly y: number } = { x: 10, y: 20 };
// point.x = 5; // Error
```

### Interfaces

```typescript
// Define object structure
interface User {
  name: string;
  age: number;
  email?: string; // Optional
  readonly id: number; // Read-only
}

const user: User = {
  name: "John",
  age: 30,
  id: 1,
};

// Extending interfaces
interface Admin extends User {
  role: "admin" | "user";
  permissions: string[];
}

const admin: Admin = {
  name: "Admin",
  age: 35,
  id: 2,
  role: "admin",
  permissions: ["read", "write"],
};
```

### Function Types

```typescript
// Parameter and return types
function add(a: number, b: number): number {
  return a + b;
}

// Optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}`;
}

// Default parameters
function createMessage(name: string, age: number = 18): string {
  return `${name} is ${age}`;
}

// Function type
type MathOperation = (a: number, b: number) => number;
const multiply: MathOperation = (a, b) => a * b;
```

## Classes in TypeScript

```typescript
class Person {
  // Properties with types
  name: string;
  age: number;
  private email: string; // Only accessible within class
  protected ssn: string; // Accessible in subclasses
  readonly id: number; // Cannot be modified

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.id = Math.random();
  }

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }

  private validateEmail(email: string): boolean {
    return email.includes("@");
  }

  get emailAddress(): string {
    return this.email;
  }

  set emailAddress(value: string) {
    if (this.validateEmail(value)) {
      this.email = value;
    }
  }
}

// Inheritance
class Employee extends Person {
  department: string;

  constructor(name: string, age: number, department: string) {
    super(name, age);
    this.department = department;
  }

  getInfo(): string {
    return `${this.greet()} and I work in ${this.department}`;
  }
}
```

## Generics

```typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("hello"));
console.log(identity<number>(42));

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

class Box<T> implements Container<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const stringBox = new Box<string>("hello");
const numberBox = new Box<number>(42);
```

## Advanced Types

### Types vs Interfaces

```typescript
// Type: Can be anything
type ID = string | number;
type Callback = (data: any) => void;

// Interface: Only objects
interface User {
  name: string;
}

// Union types
type Status = "success" | "error" | "pending";

// Intersection types
type Admin = User & { role: "admin" };
```

### Enums

```typescript
// Numeric enum
enum Direction {
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4,
}

// String enum
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
}

function move(direction: Direction) {
  console.log(`Moving ${direction}`);
}
```

### Utility Types

```typescript
// Partial: Make all properties optional
interface User {
  name: string;
  email: string;
}

type PartialUser = Partial<User>;

// Required: Make all properties required
type RequiredUser = Required<PartialUser>;

// Readonly: Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick: Select specific properties
type UserPreview = Pick<User, "name">;

// Record: Create object with specific keys
type UserRoles = Record<"admin" | "user" | "guest", User>;

// Omit: Exclude properties
type UserWithoutEmail = Omit<User, "email">;
```

## Practical Example: API Types

```typescript
// Define data structures
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

interface ApiResponse<T> {
  status: "success" | "error";
  data?: T;
  error?: string;
}

// API functions with types
async function fetchPost(id: number): Promise<ApiResponse<Post>> {
  try {
    const response = await fetch(`/api/posts/${id}`);

    if (!response.ok) {
      return {
        status: "error",
        error: `HTTP ${response.status}`,
      };
    }

    const data: Post = await response.json();
    return {
      status: "success",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function createPost(
  post: Omit<Post, "id" | "createdAt">,
): Promise<ApiResponse<Post>> {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  const data: Post = await response.json();
  return { status: "success", data };
}
```

## Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Development Setup

```bash
# Initialize project
npm init -y

# Install dependencies
npm install axios react

# Install TypeScript and tools
npm install --save-dev typescript @types/node @types/react

# Initialize TypeScript
npx tsc --init

# Create src directory
mkdir src
touch src/index.ts

# Run TypeScript compiler
tsc
tsc --watch

# Execute compiled JavaScript
node dist/index.js
```

## Best Practices

✓ Use `strict: true` in tsconfig.json
✓ Avoid `any` type - use generics instead
✓ Define interfaces for objects
✓ Use union types for multiple types
✓ Leverage utility types
✓ Add type definitions for dependencies
✓ Use meaningful variable names
✓ Document complex types with comments

✗ Don't use `any` everywhere
✗ Don't ignore type errors
✗ Don't over-engineer with types
✗ Don't leave implicit `any` types
✗ Don't skip installing @types packages

## Key Concepts Summary

| Concept    | Purpose                  |
| ---------- | ------------------------ |
| Types      | Define variable types    |
| Interfaces | Define object shapes     |
| Generics   | Reusable type parameters |
| Unions     | Multiple allowed types   |
| Classes    | Object-oriented patterns |
| Enums      | Named constant values    |
| Utilities  | Built-in type helpers    |

TypeScript provides safety and clarity without significant runtime overhead—code compiles to clean JavaScript.
