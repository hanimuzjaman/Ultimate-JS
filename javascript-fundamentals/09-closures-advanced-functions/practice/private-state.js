// PRIVATE STATE PRACTICE - CLOSURES FOR ENCAPSULATION

// Practice 1: Bank Account with Private Balance
function createBankAccount(initialBalance = 0) {
  let balance = initialBalance; // Private variable
  const transactions = []; // Private transaction history

  return {
    deposit: function (amount) {
      if (amount > 0) {
        balance += amount;
        transactions.push({ type: "deposit", amount, date: new Date() });
        console.log(`Deposited $${amount}. New balance: $${balance}`);
        return balance;
      }
      return false;
    },

    withdraw: function (amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        transactions.push({ type: "withdrawal", amount, date: new Date() });
        console.log(`Withdrew $${amount}. New balance: $${balance}`);
        return balance;
      }
      console.log("Invalid withdrawal");
      return false;
    },

    getBalance: function () {
      return balance;
    },

    getTransactionHistory: function () {
      return [...transactions]; // Return copy to prevent external modification
    },

    getTransactionCount: function () {
      return transactions.length;
    },
  };
}

// Test bank account
const account = createBankAccount(1000);
console.log("=== Bank Account (Private State) ===");
account.deposit(500);
account.withdraw(200);
account.deposit(100);
console.log("Balance:", account.getBalance());
console.log("History count:", account.getTransactionCount());

// Practice 2: User Profile with Private Data
function createUserProfile(userId, publicName) {
  // Private variables
  let email = null;
  let phone = null;
  let address = null;
  let socialSecurity = null;
  const accessLog = [];

  // Record access for privacy audit
  function logAccess(action) {
    accessLog.push({
      action,
      timestamp: new Date(),
    });
  }

  return {
    // Public methods
    getUserId: function () {
      return userId;
    },

    getName: function () {
      return publicName;
    },

    setEmail: function (newEmail) {
      email = newEmail;
      logAccess("email_updated");
    },

    getEmail: function () {
      logAccess("email_accessed");
      return email;
    },

    setPhone: function (newPhone) {
      phone = newPhone;
      logAccess("phone_updated");
    },

    getPhone: function () {
      logAccess("phone_accessed");
      return phone;
    },

    setSSN: function (ssn) {
      socialSecurity = ssn;
      logAccess("ssn_updated");
    },

    // SSN is highly private - return masked version
    getSSNMasked: function () {
      logAccess("ssn_accessed");
      return socialSecurity ? "***-**-" + socialSecurity.slice(-4) : null;
    },

    // Get access log (for admin/security)
    getAccessLog: function () {
      return [...accessLog];
    },

    // Full profile for authorized personnel only
    getFullProfile: function (authLevel) {
      if (authLevel < 3) {
        console.log("Insufficient permissions");
        return null;
      }
      logAccess("full_profile_accessed");
      return {
        userId,
        name: publicName,
        email,
        phone,
        ssn: socialSecurity,
      };
    },
  };
}

// Test user profile
const profile = createUserProfile(123, "John Doe");
console.log("\n=== User Profile (Private Data) ===");
profile.setEmail("john@example.com");
profile.setPhone("555-1234");
profile.setSSN("123-45-6789");

console.log("Email:", profile.getEmail());
console.log("SSN Masked:", profile.getSSNMasked());
console.log("Access log entries:", profile.getAccessLog().length);

// Practice 3: Shopping Cart with Private Items
function createShoppingCart() {
  const items = []; // Private item list
  let totalPrice = 0;

  return {
    addItem: function (id, name, price, quantity = 1) {
      const existingItem = items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({ id, name, price, quantity });
      }

      totalPrice += price * quantity;
      console.log(`Added ${quantity} x ${name}`);
    },

    removeItem: function (id) {
      const item = items.find((i) => i.id === id);
      if (item) {
        totalPrice -= item.price * item.quantity;
        items.splice(items.indexOf(item), 1);
        console.log("Item removed");
      }
    },

    getItemCount: function () {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    getCartSummary: function () {
      return {
        itemCount: this.getItemCount(),
        uniqueItems: items.length,
        total: totalPrice.toFixed(2),
        items: items.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price: (item.price * item.quantity).toFixed(2),
        })),
      };
    },

    checkout: function () {
      if (items.length === 0) {
        console.log("Cart is empty");
        return false;
      }

      const receipt = {
        items: [...items],
        total: totalPrice,
        timestamp: new Date(),
      };

      // Clear cart
      items.length = 0;
      totalPrice = 0;

      console.log("Checkout complete");
      return receipt;
    },
  };
}

// Test shopping cart
const cart = createShoppingCart();
console.log("\n=== Shopping Cart (Private Items) ===");
cart.addItem(1, "Laptop", 999.99, 1);
cart.addItem(2, "Mouse", 29.99, 2);
console.log(cart.getCartSummary());

// Practice 4: Configuration Manager with Private Settings
function createConfigManager(defaults = {}) {
  const config = { ...defaults }; // Private config
  const changeHistory = []; // Track changes

  return {
    set: function (key, value) {
      const oldValue = config[key];
      config[key] = value;

      changeHistory.push({
        key,
        oldValue,
        newValue: value,
        timestamp: new Date(),
      });

      console.log(`Config: ${key} = ${value}`);
    },

    get: function (key) {
      return config[key];
    },

    getAll: function () {
      return { ...config }; // Return copy
    },

    reset: function (key) {
      if (key) {
        delete config[key];
      } else {
        Object.keys(config).forEach((k) => delete config[k]);
      }
    },

    getChangeHistory: function () {
      return [...changeHistory];
    },

    rollback: function (steps = 1) {
      const historyToRollback = changeHistory.slice(-steps);

      for (const change of historyToRollback) {
        if (change.oldValue === undefined) {
          delete config[change.key];
        } else {
          config[change.key] = change.oldValue;
        }
      }

      changeHistory.splice(-steps);
      console.log(`Rolled back ${steps} changes`);
    },
  };
}

// Test config manager
const config = createConfigManager({ theme: "light", lang: "en" });
console.log("\n=== Config Manager ===");
config.set("theme", "dark");
config.set("fontSize", 14);
console.log("Current config:", config.getAll());
console.log("Change count:", config.getChangeHistory().length);

// Practice 5: Authentication with Private Credentials
function createAuthenticator() {
  const users = new Map(); // Private user database

  return {
    register: function (username, password) {
      if (users.has(username)) {
        console.log("User already exists");
        return false;
      }

      // Hash password (simplified)
      const hashedPassword = Buffer.from(password).toString("base64");
      users.set(username, {
        password: hashedPassword,
        createdAt: new Date(),
      });

      console.log(`User ${username} registered`);
      return true;
    },

    authenticate: function (username, password) {
      const user = users.get(username);
      if (!user) {
        console.log("User not found");
        return false;
      }

      const hashedInput = Buffer.from(password).toString("base64");
      if (user.password === hashedInput) {
        console.log("Authentication successful");
        return true;
      }

      console.log("Authentication failed");
      return false;
    },

    changePassword: function (username, oldPassword, newPassword) {
      if (!this.authenticate(username, oldPassword)) {
        return false;
      }

      const hashedNewPassword = Buffer.from(newPassword).toString("base64");
      users.get(username).password = hashedNewPassword;
      console.log("Password changed");
      return true;
    },

    userExists: function (username) {
      return users.has(username);
    },
  };
}

// Test authenticator
const auth = createAuthenticator();
console.log("\n=== Authentication (Private Credentials) ===");
auth.register("alice", "secret123");
auth.authenticate("alice", "secret123"); // true
auth.authenticate("alice", "wrong"); // false

// Practice 6: Event Emitter with Private Listeners
function createEventEmitter() {
  const listeners = new Map(); // Private listeners

  return {
    on: function (event, callback) {
      if (!listeners.has(event)) {
        listeners.set(event, []);
      }
      listeners.get(event).push(callback);
      console.log(`Listener added for ${event}`);
    },

    off: function (event, callback) {
      if (listeners.has(event)) {
        const callbacks = listeners.get(event);
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
          callbacks.splice(index, 1);
          console.log(`Listener removed for ${event}`);
        }
      }
    },

    emit: function (event, data) {
      if (listeners.has(event)) {
        listeners.get(event).forEach((callback) => {
          callback(data);
        });
      }
    },

    getListenerCount: function (event) {
      return listeners.get(event)?.length || 0;
    },

    removeAllListeners: function (event) {
      if (event) {
        listeners.delete(event);
      } else {
        listeners.clear();
      }
    },
  };
}

// Test event emitter
const emitter = createEventEmitter();
console.log("\n=== Event Emitter (Private Listeners) ===");
emitter.on("click", (data) => console.log("Click handler:", data));
emitter.on("click", (data) => console.log("Second handler:", data));
emitter.emit("click", { x: 10, y: 20 });
console.log("Listeners:", emitter.getListenerCount("click"));

// Practice 7: Data Store with Private Validation
function createDataStore() {
  let data = null; // Private data
  const validators = []; // Private validators
  let version = 0; // Private version

  return {
    setValidator: function (validator) {
      validators.push(validator);
    },

    setData: function (newData) {
      // Run all validators
      for (const validator of validators) {
        if (!validator(newData)) {
          console.log("Validation failed");
          return false;
        }
      }

      data = newData;
      version++;
      console.log(`Data updated (version: ${version})`);
      return true;
    },

    getData: function () {
      return { ...data }; // Return copy
    },

    getVersion: function () {
      return version;
    },

    hasData: function () {
      return data !== null;
    },

    clear: function () {
      data = null;
      version = 0;
    },
  };
}

// Test data store
const store = createDataStore();
console.log("\n=== Data Store (Private Validation) ===");
store.setValidator((data) => data.id && data.id > 0);
store.setData({ id: 1, name: "Item" });
console.log("Data version:", store.getVersion());
console.log("Data:", store.getData());

// Practice 8: Queue with Private Elements
function createQueue() {
  const elements = []; // Private queue

  return {
    enqueue: function (element) {
      elements.push(element);
      console.log(`Added to queue: ${element}`);
    },

    dequeue: function () {
      if (elements.length === 0) return null;
      return elements.shift();
    },

    peek: function () {
      return elements.length > 0 ? elements[0] : null;
    },

    size: function () {
      return elements.length;
    },

    isEmpty: function () {
      return elements.length === 0;
    },

    clear: function () {
      elements.length = 0;
    },

    toArray: function () {
      return [...elements];
    },
  };
}

// Test queue
const queue = createQueue();
console.log("\n=== Queue (Private Elements) ===");
queue.enqueue("task1");
queue.enqueue("task2");
queue.enqueue("task3");
console.log("Size:", queue.size());
console.log("Dequeued:", queue.dequeue());

// Export functions
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createBankAccount,
    createUserProfile,
    createShoppingCart,
    createConfigManager,
    createAuthenticator,
    createEventEmitter,
    createDataStore,
    createQueue,
  };
}
