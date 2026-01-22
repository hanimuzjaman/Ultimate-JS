export {};

/* ===================================================================
   TYPESCRIPT - COMPREHENSIVE CODE EXAMPLES
   Topic: TypeScript Introduction, Types, Interfaces, and Generics

   TypeScript is a superset of JavaScript.
   - Adds static typing
   - Errors caught at compile time (not runtime)
   - Compiles to plain JavaScript
=================================================================== */

// ===================================================================
// PART 1: BASIC TYPES
// ===================================================================

console.log("=== BASIC TYPES ===");

// -------------------------
// Primitive Types
// -------------------------

// number → integers & floating point numbers
const age: number = 25;

// string → textual data
const userName: string = "Alice";

// boolean → true / false
const isActive: boolean = true;

// null → intentional absence of value
const nothing: null = null;

// undefined → value not assigned
const notDefined: undefined = undefined;

// -------------------------
// any type (AVOID)
// -------------------------

// 'any' disables type checking (acts like JavaScript)
let anyValue: any = "could be anything";
anyValue = 42;
anyValue = true;

// -------------------------
// Union Types
// -------------------------

// Variable can hold more than one type
let userStatusValue: string | number;
userStatusValue = "active";
userStatusValue = 1;

// -------------------------
// Literal Types
// -------------------------

// Restricts value to exact strings
let direction: "left" | "right" | "up" | "down";
direction = "left";

// -------------------------
// Arrays
// -------------------------

// Array of numbers
const numbers: number[] = [1, 2, 3];

// Generic array syntax
const strings: Array<string> = ["a", "b", "c"];

// Mixed array using union
const mixed: (string | number)[] = [1, "two", 3];

// -------------------------
// Tuples
// -------------------------

// Fixed length & fixed types
const tuple: [string, number] = ["hello", 42];

// Tuple with 3 values
const coordinates: [number, number, number] = [10, 20, 30];

// ===================================================================
// PART 2: FUNCTIONS WITH TYPES
// ===================================================================

console.log("\n=== TYPED FUNCTIONS ===");

// Function parameters & return type
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 3)); // 8

// Optional parameter using ?
function greet(name: string, greeting?: string): string {
  const message = greeting || "Hello";
  return `${message}, ${name}!`;
}

console.log(greet("Bob"));
console.log(greet("Bob", "Hi"));

// Default parameter
function calculateDiscount(price: number, percentage: number = 10): number {
  return price * (1 - percentage / 100);
}

// Rest parameters
function sum(...values: number[]): number {
  return values.reduce((acc, num) => acc + num, 0);
}

// Arrow function with type inference
const multiply = (a: number, b: number): number => a * b;

// Void return type (no return value)
function logMessage(message: string): void {
  console.log(message);
}

// Function type alias
type MathOperation = (a: number, b: number) => number;

const divide: MathOperation = (a, b) => a / b;

// ===================================================================
// PART 3: INTERFACES
// ===================================================================

console.log("\n=== INTERFACES ===");

// Interface defines object structure
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

// Object must match interface shape
const user: User = {
  id: 1,
  name: "Charlie",
  email: "charlie@example.com",
};

// Interface with methods
interface Logger {
  log(message: string): void;
  error(message: string): void;
}

// Implementing an interface
const consoleLogger: Logger = {
  log(message) {
    console.log("[LOG]", message);
  },
  error(message) {
    console.log("[ERROR]", message);
  },
};

// Interface inheritance
interface Admin extends User {
  role: "admin" | "moderator";
  permissions: string[];
}

// ===================================================================
// PART 4: CLASSES WITH TYPES
// ===================================================================

console.log("\n=== CLASSES WITH TYPES ===");

// Class with private state
class Calculator {
  private results: number[] = [];

  add(a: number, b: number): number {
    const result = a + b;
    this.results.push(result);
    return result;
  }

  multiply(a: number, b: number): number {
    const result = a * b;
    this.results.push(result);
    return result;
  }

  // Returns copy to protect internal state
  getHistory(): number[] {
    return [...this.results];
  }
}

// Class with constructor & methods
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hi, I'm ${this.name}`;
  }
}

// Access modifiers example
class BankAccount {
  private balance = 0; // private → class only
  public accountNumber: string; // public → default

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber;
  }

  deposit(amount: number): void {
    if (amount > 0) this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

// ===================================================================
// PART 5: GENERICS
// ===================================================================

console.log("\n=== GENERICS ===");

// Generic function
function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

// Generic class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

// Generic constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ===================================================================
// PART 6: ENUMS
// ===================================================================

console.log("\n=== ENUMS ===");

// String enum
enum UserStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
}

// Numeric enum
enum MoveDirection {
  Up = 1,
  Down,
  Left,
  Right,
}

// ===================================================================
// PART 7: TYPE ALIASES vs INTERFACES
// ===================================================================

console.log("\n=== TYPE ALIASES vs INTERFACES ===");

// Type alias
type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

// Intersection type
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type TimestampedProduct = Product & Timestamped;

// ===================================================================
// PART 8: UTILITY TYPES
// ===================================================================

console.log("\n=== UTILITY TYPES ===");

// Partial → all properties optional
type PartialUser = Partial<User>;

// Required → all properties required
type RequiredUser = Required<User>;

// Record → key-value mapping
type UserRole = "admin" | "user" | "guest";
type RolePermissions = Record<UserRole, string[]>;

// Pick → select properties
type UserPreview = Pick<User, "id" | "name">;

// Omit → remove properties
type UserPublic = Omit<User, "email">;

// ===================================================================
// KEY TAKEAWAYS
// ===================================================================
/*
1. TypeScript catches errors before runtime
2. Prefer strict typing over 'any'
3. Interfaces define contracts
4. Generics make reusable, type-safe code
5. Enums improve readability
6. Utility types reduce boilerplate
7. Always use module scope (export {})
*/
