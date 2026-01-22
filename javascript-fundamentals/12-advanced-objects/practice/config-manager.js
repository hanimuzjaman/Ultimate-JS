/**
 * Module 12: Advanced Objects
 * Practice: Configuration Manager
 */

// ============================================
// CONFIG MANAGER WITH OPTIONAL CHAINING
// ============================================

class ConfigManager {
  constructor(config = {}) {
    this.config = Object.freeze(Object.seal(config));
  }

  get(path, defaultValue = null) {
    const keys = path.split(".");
    let value = this.config;

    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) return defaultValue;
    }
    return value;
  }

  // Create new config with changes
  set(path, value) {
    const keys = path.split(".");
    const last = keys.pop();
    let obj = { ...this.config };
    let current = obj;

    for (const key of keys) {
      current[key] = { ...current[key] };
      current = current[key];
    }
    current[last] = value;

    return new ConfigManager(obj);
  }
}

// Usage
const config = new ConfigManager({
  app: {
    name: "MyApp",
    version: "1.0",
  },
  database: {
    host: "localhost",
    port: 5432,
  },
});

console.log("App name:", config.get("app.name"));
console.log("Missing DB:", config.get("database.password", "none"));

// ============================================
// SAFE API RESPONSE HANDLER
// ============================================

function handleAPIResponse(response) {
  const status = response?.data?.status ?? "unknown";
  const message = response?.data?.message ?? "No message";
  const errors = response?.errors ?? [];

  return { status, message, errors };
}

console.log("\nAPI response handling:");
console.log(handleAPIResponse({ data: { status: "ok" } }));
console.log(handleAPIResponse(null));
