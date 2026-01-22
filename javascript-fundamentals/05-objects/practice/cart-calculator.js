// ============================================
// cart-calculator.js
// Shopping Cart with Object Methods
// Practice: Working with objects, arrays, and 'this' keyword
// ============================================

// 1. Basic Shopping Cart
console.log("=== 1. Basic Shopping Cart ===");

const cart1 = {
  items: [],

  addItem(product, price, quantity = 1) {
    this.items.push({ product, price, quantity });
    console.log(`Added ${quantity} x ${product} at $${price}`);
    return this;
  },

  removeItem(product) {
    this.items = this.items.filter((item) => item.product !== product);
    console.log(`Removed ${product}`);
    return this;
  },

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  displayCart() {
    console.log("\nCart Contents:");
    this.items.forEach((item) => {
      console.log(
        `  ${item.product}: $${item.price} x ${item.quantity} = $${item.price * item.quantity}`,
      );
    });
    console.log(`Total: $${this.getTotal()}\n`);
  },
};

cart1.addItem("Apple", 1.5, 3);
cart1.addItem("Banana", 0.75, 2);
cart1.addItem("Orange", 2.0, 1);
cart1.displayCart();

// 2. Cart with Discount System
console.log("=== 2. Cart with Discounts ===");

const cart2 = {
  items: [],
  discountPercent: 0,

  addItem(product, price, quantity = 1) {
    const existing = this.items.find((item) => item.product === product);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, price, quantity });
    }
    return this;
  },

  getSubtotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  applyDiscount(percent) {
    this.discountPercent = Math.min(percent, 100);
    console.log(`Applied ${this.discountPercent}% discount`);
    return this;
  },

  getDiscountAmount() {
    return this.getSubtotal() * (this.discountPercent / 100);
  },

  getTotal() {
    return this.getSubtotal() - this.getDiscountAmount();
  },

  getSummary() {
    return {
      subtotal: this.getSubtotal(),
      discount: this.getDiscountAmount(),
      total: this.getTotal(),
      itemCount: this.items.reduce((sum, item) => sum + item.quantity, 0),
    };
  },

  displaySummary() {
    const summary = this.getSummary();
    console.log(`Items: ${summary.itemCount}`);
    console.log(`Subtotal: $${summary.subtotal.toFixed(2)}`);
    console.log(`Discount: -$${summary.discount.toFixed(2)}`);
    console.log(`Total: $${summary.total.toFixed(2)}\n`);
  },
};

cart2
  .addItem("Laptop", 999.99)
  .addItem("Mouse", 29.99, 2)
  .addItem("Keyboard", 79.99)
  .applyDiscount(10)
  .displaySummary();

// 3. Cart with Tax Calculation
console.log("=== 3. Cart with Tax ===");

const cart3 = {
  items: [],
  taxRate: 0.08, // 8% tax

  addItem(product, price, quantity = 1) {
    this.items.push({ product, price, quantity });
    return this;
  },

  removeItemByIndex(index) {
    if (index >= 0 && index < this.items.length) {
      const removed = this.items.splice(index, 1)[0];
      console.log(`Removed: ${removed.product}`);
    }
    return this;
  },

  getSubtotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  getTax() {
    return this.getSubtotal() * this.taxRate;
  },

  getTotal() {
    return this.getSubtotal() + this.getTax();
  },

  setTaxRate(rate) {
    this.taxRate = rate;
    return this;
  },

  print() {
    console.log("\n--- Receipt ---");
    this.items.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      console.log(
        `${index + 1}. ${item.product}: $${item.price} x ${item.quantity} = $${lineTotal.toFixed(2)}`,
      );
    });
    console.log(`Subtotal: $${this.getSubtotal().toFixed(2)}`);
    console.log(
      `Tax (${(this.taxRate * 100).toFixed(0)}%): $${this.getTax().toFixed(2)}`,
    );
    console.log(`TOTAL: $${this.getTotal().toFixed(2)}\n`);
  },
};

cart3
  .addItem("Shirt", 29.99, 2)
  .addItem("Jeans", 59.99)
  .addItem("Socks", 9.99, 3)
  .print();

// 4. Cart with Coupon Codes
console.log("=== 4. Cart with Coupons ===");

const cart4 = {
  items: [],
  couponCode: null,
  coupons: {
    SAVE10: 0.1,
    SAVE20: 0.2,
    FIRSTBUY: 0.15,
    SUMMER50: 0.5,
  },

  addItem(product, price, quantity = 1) {
    this.items.push({ product, price, quantity });
    return this;
  },

  applyCoupon(code) {
    if (code in this.coupons) {
      this.couponCode = code;
      console.log(`Coupon ${code} applied!`);
    } else {
      console.log(`Invalid coupon: ${code}`);
      this.couponCode = null;
    }
    return this;
  },

  getSubtotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  getDiscount() {
    if (!this.couponCode) return 0;
    return this.getSubtotal() * this.coupons[this.couponCode];
  },

  getTotal() {
    return this.getSubtotal() - this.getDiscount();
  },

  clear() {
    this.items = [];
    this.couponCode = null;
    return this;
  },

  checkout() {
    if (this.items.length === 0) {
      console.log("Cart is empty!");
      return this;
    }

    console.log("\n--- Checkout ---");
    const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    console.log(`Items: ${itemCount}`);
    console.log(`Subtotal: $${this.getSubtotal().toFixed(2)}`);
    if (this.couponCode) {
      console.log(
        `Coupon (${this.couponCode}): -$${this.getDiscount().toFixed(2)}`,
      );
    }
    console.log(`TOTAL: $${this.getTotal().toFixed(2)}`);
    console.log("Payment successful!\n");

    return this.clear();
  },
};

cart4
  .addItem("Coffee", 5.99, 2)
  .addItem("Tea", 4.99)
  .applyCoupon("SAVE10")
  .checkout();

// 5. Advanced Cart with Categories
console.log("=== 5. Cart with Categories ===");

const cart5 = {
  items: [],

  addItem(product, price, quantity = 1, category = "General") {
    this.items.push({ product, price, quantity, category });
    return this;
  },

  removeItem(product) {
    const index = this.items.findIndex((item) => item.product === product);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    return this;
  },

  updateQuantity(product, newQuantity) {
    const item = this.items.find((item) => item.product === product);
    if (item) {
      item.quantity = newQuantity;
    }
    return this;
  },

  getItemsByCategory(category) {
    return this.items.filter((item) => item.category === category);
  },

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  getTotalByCategory(category) {
    return this.getItemsByCategory(category).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  getStats() {
    return {
      totalItems: this.items.length,
      totalQuantity: this.items.reduce((sum, item) => sum + item.quantity, 0),
      total: this.getTotal(),
      categories: [...new Set(this.items.map((item) => item.category))],
    };
  },

  printByCategory() {
    const stats = this.getStats();
    console.log("\n--- Shopping Cart by Category ---");

    stats.categories.forEach((category) => {
      console.log(`\n${category.toUpperCase()}:`);
      this.getItemsByCategory(category).forEach((item) => {
        console.log(
          `  ${item.product}: $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`,
        );
      });
      console.log(
        `  Subtotal: $${this.getTotalByCategory(category).toFixed(2)}`,
      );
    });

    console.log(`\nGRAND TOTAL: $${stats.total.toFixed(2)}\n`);
  },
};

cart5
  .addItem("Apples", 3.99, 3, "Produce")
  .addItem("Carrots", 2.49, 2, "Produce")
  .addItem("Milk", 4.99, 1, "Dairy")
  .addItem("Cheese", 6.99, 1, "Dairy")
  .addItem("Bread", 3.49, 2, "Bakery")
  .printByCategory();

// 6. Cart with Inventory Check
console.log("=== 6. Cart with Inventory ===");

const inventory = {
  Laptop: 5,
  Mouse: 20,
  Keyboard: 10,
  Monitor: 3,
};

const cart6 = {
  items: [],

  canAddItem(product, quantity = 1) {
    const stock = inventory[product] || 0;
    return stock >= quantity;
  },

  addItem(product, price, quantity = 1) {
    if (this.canAddItem(product, quantity)) {
      this.items.push({ product, price, quantity });
      inventory[product] -= quantity;
      console.log(`✓ Added ${quantity} x ${product}`);
    } else {
      console.log(`✗ Insufficient stock for ${product}`);
    }
    return this;
  },

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  displayInventory() {
    console.log("\nInventory Status:");
    Object.entries(inventory).forEach(([product, quantity]) => {
      console.log(`  ${product}: ${quantity} remaining`);
    });
  },

  getOrderSummary() {
    console.log("\nOrder Summary:");
    this.items.forEach((item, i) => {
      console.log(
        `${i + 1}. ${item.product} x ${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`,
      );
    });
    console.log(`Total: $${this.getTotal().toFixed(2)}\n`);
  },
};

cart6
  .addItem("Laptop", 999.99, 2)
  .addItem("Mouse", 29.99, 5)
  .addItem("Monitor", 299.99, 4)
  .addItem("Keyboard", 79.99, 2);

cart6.displayInventory();
cart6.getOrderSummary();

// 7. Empty Cart and Reset
console.log("=== 7. Cart Management ===");

const cart7 = {
  items: [],
  transactionHistory: [],

  addItem(product, price, quantity = 1) {
    this.items.push({ product, price, quantity });
    return this;
  },

  getItemCount() {
    return this.items.length;
  },

  getQuantityCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  isEmpty() {
    return this.items.length === 0;
  },

  checkout() {
    if (this.isEmpty()) {
      console.log("Cannot checkout: cart is empty");
      return this;
    }

    const transaction = {
      date: new Date(),
      items: [...this.items],
      total: this.getTotal(),
    };

    this.transactionHistory.push(transaction);
    console.log(`Processed transaction for $${this.getTotal().toFixed(2)}`);
    this.items = [];
    return this;
  },

  getPurchaseHistory() {
    return this.transactionHistory.map((t, i) => ({
      id: i + 1,
      total: t.total,
      date: t.date.toLocaleDateString(),
    }));
  },
};

cart7
  .addItem("Product A", 50)
  .addItem("Product B", 75)
  .addItem("Product C", 25)
  .checkout();

console.log(`Cart is empty: ${cart7.isEmpty()}`);

cart7.addItem("Product D", 100).checkout();

console.log("Purchase History:", cart7.getPurchaseHistory());

console.log("\n=== All Exercises Completed ===");
