// ES MODULES - CODE EXAMPLES

// Example 1: Named Exports and Imports
// File: utils/math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

export const PI = 3.14159;
export const E = 2.71828;

// Example 2: Default Export
// File: utils/calculator.js
class Calculator {
  constructor(precision = 2) {
    this.precision = precision;
  }

  round(value) {
    return (
      Math.round(value * Math.pow(10, this.precision)) /
      Math.pow(10, this.precision)
    );
  }

  calculate(a, b, operation) {
    let result;

    switch (operation) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        if (b === 0) throw new Error("Cannot divide by zero");
        result = a / b;
        break;
      default:
        throw new Error("Unknown operation");
    }

    return this.round(result);
  }
}

export { Calculator };

// Example 3: Mixed Default and Named Exports
// File: utils/stringUtils.js
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toUpperCase(str) {
  return str.toUpperCase();
}

export function toLowerCase(str) {
  return str.toLowerCase();
}

export function reverse(str) {
  return str.split("").reverse().join("");
}

class StringFormatter {
  constructor(str) {
    this.str = str;
  }

  format() {
    return this.str.trim().toLowerCase();
  }

  reverse() {
    return this.str.split("").reverse().join("");
  }

  isPalindrome() {
    const clean = this.str.toLowerCase().replace(/\s/g, "");
    return clean === clean.split("").reverse().join("");
  }

  wordCount() {
    return this.str.trim().split(/\s+/).length;
  }
}

export { StringFormatter };

// Example 4: Re-export/Barrel Export
// File: index.js (barrel file)
export { add, subtract, multiply, divide, PI, E } from "./utils/math.js";
export {
  capitalize,
  toUpperCase,
  toLowerCase,
  reverse,
} from "./utils/stringUtils.js";
export { default as Calculator } from "./utils/calculator.js";
export { default as StringFormatter } from "./utils/stringUtils.js";

// Example 5: Import All as Namespace
// File: main.js (consumer)
// import * as math from "./utils/math.js";
//
// console.log(math.add(5, 3));        // 8
// console.log(math.multiply(4, 3));   // 12
// console.log(math.PI);               // 3.14159

// Example 6: Selective Import with Aliasing
// File: main.js
// import { add as sum, subtract as diff, PI as PI_CONSTANT } from "./utils/math.js";
//
// console.log(sum(10, 5));            // 15
// console.log(diff(10, 5));           // 5
// console.log(PI_CONSTANT);           // 3.14159

// Example 7: Import Default and Named Together
// File: main.js
// import Calculator, { add, subtract } from "./index.js";
//
// const calc = new Calculator();
// const result1 = add(10, 5);
// const result2 = calc.calculate(10, 5, "+");

// Example 8: Dynamic Imports
// File: featureLoader.js
export async function loadFeature(featureName) {
  try {
    const feature = await import(`./features/${featureName}.js`);
    return feature.default;
  } catch (error) {
    console.error(`Failed to load feature: ${featureName}`, error);
    return null;
  }
}

export function preloadFeatures(features) {
  return Promise.all(
    features.map((feature) => import(`./features/${feature}.js`)),
  );
}

// Example 9: Conditional Imports
// File: platformUtils.js
let utils;

export async function getPlatformUtils() {
  if (!utils) {
    if (typeof window !== "undefined") {
      // Browser environment
      utils = await import("./browser/utils.js");
    } else {
      // Node.js environment
      utils = await import("./node/utils.js");
    }
  }
  return utils;
}

// Example 10: Module Metadata
// File: moduleInfo.js
export const MODULE_VERSION = "1.0.0";
export const MODULE_NAME = "StringUtils";
export const MODULE_AUTHOR = "John Doe";

export function getModuleInfo() {
  return {
    name: MODULE_NAME,
    version: MODULE_VERSION,
    author: MODULE_AUTHOR,
  };
}

// Example 11: Side Effects on Import
// File: analytics.js
// This file has side effects - it runs code when imported
let analyticsInitialized = false;

export function initializeAnalytics(trackingId) {
  if (!analyticsInitialized) {
    console.log(`Analytics initialized with ID: ${trackingId}`);
    analyticsInitialized = true;
  }
}

export function trackEvent(eventName, eventData) {
  if (analyticsInitialized) {
    console.log(`Event tracked: ${eventName}`, eventData);
  }
}

// Example 12: Module Pattern with Closures
// File: userStore.js
let users = [];
let userId = 0;

export function addUser(name, email) {
  const user = {
    id: ++userId,
    name,
    email,
    createdAt: new Date(),
  };

  users.push(user);
  return user;
}

export function getUser(id) {
  return users.find((user) => user.id === id);
}

export function getAllUsers() {
  return [...users]; // Return copy to prevent external modification
}

export function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
}

export function getUserCount() {
  return users.length;
}

// Example 13: Working with File-based Modules
// File: config.js
export const API_BASE_URL = process.env.API_URL || "http://localhost:3000";
export const API_TIMEOUT = 5000;
export const MAX_RETRIES = 3;

export const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

export function getConfig() {
  return {
    api: {
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      maxRetries: MAX_RETRIES,
    },
    logging: {
      level: LOG_LEVELS.INFO,
    },
  };
}

// Example 14: Namespace Organization
// File: services/index.js
export { default as UserService } from "./userService.js";
export { default as AuthService } from "./authService.js";
export { default as DataService } from "./dataService.js";

// Consumer usage:
// import { UserService, AuthService } from "./services/index.js";

// Example 15: Tree Shaking Friendly Exports
// File: lodash-like.js
export const array = {
  flatten: (arr) => arr.flat(),
  chunk: (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },
  shuffle: (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  },
};

export const string = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  reverse: (str) => str.split("").reverse().join(""),
  repeat: (str, count) => str.repeat(count),
};

// Good for tree shaking:
// import { array } from "./lodash-like.js";
// Bundler can tree-shake unused exports

// Example 16: Module Singleton Pattern
// File: database.js
let instance = null;

class Database {
  constructor() {
    if (instance) {
      return instance;
    }

    this.connected = false;
    instance = this;
  }

  connect() {
    this.connected = true;
    console.log("Database connected");
  }

  query(sql) {
    if (!this.connected) {
      throw new Error("Database not connected");
    }
    console.log(`Executing: ${sql}`);
    return [];
  }

  disconnect() {
    this.connected = false;
    console.log("Database disconnected");
  }
}

export { Database };

// Example 17: Module with Async Initialization
// File: config.js
let config = null;

export async function initializeConfig() {
  if (!config) {
    // Simulate async config loading
    await new Promise((resolve) => setTimeout(resolve, 100));

    config = {
      appName: "MyApp",
      version: "1.0.0",
      features: ["auth", "api", "storage"],
    };
  }

  return config;
}

export function getConfig() {
  if (!config) {
    throw new Error("Config not initialized. Call initializeConfig() first.");
  }
  return config;
}

// Usage:
// await initializeConfig();
// const config = getConfig();

// Example 18: Plugin System with Modules
// File: plugins/index.js
const plugins = new Map();

export function registerPlugin(name, plugin) {
  plugins.set(name, plugin);
  console.log(`Plugin registered: ${name}`);
}

export function getPlugin(name) {
  return plugins.get(name);
}

export async function loadPlugins(pluginNames) {
  for (const name of pluginNames) {
    const plugin = await import(`./plugins/${name}.js`);
    registerPlugin(name, plugin.default);
  }
}

export function getLoadedPlugins() {
  return Array.from(plugins.keys());
}

// Example 19: Error Handling in Modules
// File: apiClient.js
export class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "APIError";
  }
}

export async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new APIError(`API Error: ${response.statusText}`, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError("Network error", 0);
  }
}

// Example 20: Module Version Management
// File: semver.js
export class Version {
  constructor(major = 0, minor = 0, patch = 0) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  toString() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  isGreaterThan(other) {
    if (this.major !== other.major) return this.major > other.major;
    if (this.minor !== other.minor) return this.minor > other.minor;
    return this.patch > other.patch;
  }

  isCompatibleWith(other) {
    return this.major === other.major;
  }
}

export const CURRENT_VERSION = new Version(1, 2, 3);

export function checkCompatibility(requiredVersion) {
  return CURRENT_VERSION.isCompatibleWith(requiredVersion);
}

// Note: These are code examples of ES6 module patterns.
// In a real application, these would be separate files.
// Modern bundlers (webpack, rollup, vite) handle module resolution.
