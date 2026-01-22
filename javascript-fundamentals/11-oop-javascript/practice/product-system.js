// PRODUCT SYSTEM PRACTICE

// Practice 1: Product Class with Properties
class Product {
  constructor(id, name, price, stock = 0) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.createdAt = new Date();
  }

  isAvailable() {
    return this.stock > 0;
  }

  getPrice() {
    return this.price;
  }

  updatePrice(newPrice) {
    if (newPrice > 0) {
      this.price = newPrice;
      console.log(`Price updated to $${newPrice}`);
      return true;
    }
    return false;
  }

  updateStock(quantity) {
    this.stock += quantity;
    console.log(`Stock updated to ${this.stock}`);
  }

  getInfo() {
    return `${this.name}: $${this.price} (Stock: ${this.stock})`;
  }
}

// Practice 2: Digital Product with License Key
class DigitalProduct extends Product {
  constructor(id, name, price, downloadUrl, licenseCount = 1) {
    super(id, name, price, 999); // Unlimited stock
    this.downloadUrl = downloadUrl;
    this.licenseCount = licenseCount;
    this.licensedUsers = [];
  }

  issueLicense(userId) {
    if (this.licensedUsers.length >= this.licenseCount) {
      console.log("License limit reached");
      return null;
    }

    const license = {
      userId,
      key: "LICENSE_" + Math.random().toString(36).substr(2, 9),
      issuedAt: new Date(),
    };

    this.licensedUsers.push(license);
    return license;
  }

  validateLicense(userId) {
    return this.licensedUsers.some((lic) => lic.userId === userId);
  }

  getInfo() {
    return `${super.getInfo()} - Digital Product - Licenses: ${this.licensedUsers.length}/${this.licenseCount}`;
  }
}

// Test Digital Product
const softwareLicense = new DigitalProduct(
  101,
  "Software License",
  99.99,
  "https://example.com/download",
  5,
);
console.log(softwareLicense.issueLicense("user1"));
console.log(softwareLicense.getInfo());

// Practice 3: Physical Product with Weight and Shipping
class PhysicalProduct extends Product {
  constructor(id, name, price, stock, weight, dimensions = {}) {
    super(id, name, price, stock);
    this.weight = weight; // kg
    this.dimensions = {
      length: dimensions.length || 0,
      width: dimensions.width || 0,
      height: dimensions.height || 0,
    };
  }

  calculateShippingCost(distance = 100) {
    const baseRate = 5;
    const weightRate = this.weight * 0.5;
    const distanceRate = distance * 0.01;
    return baseRate + weightRate + distanceRate;
  }

  getVolume() {
    return (
      this.dimensions.length * this.dimensions.width * this.dimensions.height
    );
  }

  getInfo() {
    const shipping = this.calculateShippingCost();
    return `${super.getInfo()} - Weight: ${this.weight}kg - Shipping: $${shipping.toFixed(2)}`;
  }
}

// Test Physical Product
const book = new PhysicalProduct(201, "Programming Book", 49.99, 50, 0.8, {
  length: 24,
  width: 16,
  height: 2,
});
console.log(book.calculateShippingCost(500));
console.log(book.getInfo());

// Practice 4: Subscription Product
class SubscriptionProduct extends Product {
  constructor(id, name, price, billingPeriod = "monthly") {
    super(id, name, price, 999); // Unlimited subscriptions
    this.billingPeriod = billingPeriod; // monthly, yearly, weekly
    this.subscribers = new Map();
    this.features = [];
  }

  addFeature(feature) {
    this.features.push(feature);
  }

  subscribe(userId) {
    const subscription = {
      userId,
      startDate: new Date(),
      active: true,
      renewalDate: this.getNextRenewalDate(),
    };

    this.subscribers.set(userId, subscription);
    console.log(`User ${userId} subscribed to ${this.name}`);
    return subscription;
  }

  unsubscribe(userId) {
    const subscription = this.subscribers.get(userId);
    if (subscription) {
      subscription.active = false;
      console.log(`User ${userId} unsubscribed`);
      return true;
    }
    return false;
  }

  getNextRenewalDate() {
    const date = new Date();
    switch (this.billingPeriod) {
      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;
      case "yearly":
        date.setFullYear(date.getFullYear() + 1);
        break;
      case "weekly":
        date.setDate(date.getDate() + 7);
        break;
    }
    return date;
  }

  isActiveSubscriber(userId) {
    const subscription = this.subscribers.get(userId);
    return subscription?.active && new Date() < subscription.renewalDate;
  }

  getInfo() {
    return `${super.getInfo()} - Subscription (${this.billingPeriod}) - Features: ${this.features.length}`;
  }
}

// Test Subscription Product
const premium = new SubscriptionProduct(
  301,
  "Premium Membership",
  9.99,
  "monthly",
);
premium.addFeature("Ad-free");
premium.addFeature("Priority support");
premium.subscribe("user1");
console.log(premium.isActiveSubscriber("user1"));

// Practice 5: Bundle Product with Multiple Items
class BundleProduct extends Product {
  constructor(id, name, bundleItems = [], discountPercent = 10) {
    const totalPrice = bundleItems.reduce((sum, item) => sum + item.price, 0);
    const bundlePrice = totalPrice * (1 - discountPercent / 100);
    super(id, name, bundlePrice, 100);

    this.bundleItems = bundleItems;
    this.discountPercent = discountPercent;
    this.originalPrice = totalPrice;
  }

  calculateSavings() {
    return this.originalPrice - this.price;
  }

  getInfo() {
    const savings = this.calculateSavings().toFixed(2);
    return `${this.name}: $${this.price.toFixed(2)} (Save $${savings} - ${this.discountPercent}% off)`;
  }

  getBundleDetails() {
    return {
      name: this.name,
      price: this.price,
      originalPrice: this.originalPrice,
      savings: this.calculateSavings(),
      items: this.bundleItems.map((item) => `${item.name} ($${item.price})`),
    };
  }
}

// Test Bundle Product
const products = [
  new Product(1, "Product A", 20),
  new Product(2, "Product B", 30),
  new Product(3, "Product C", 25),
];

const bundle = new BundleProduct(401, "Starter Bundle", products, 15);
console.log(bundle.getBundleDetails());

// Practice 6: Product Inventory Manager
class InventoryManager {
  constructor() {
    this.products = new Map();
  }

  addProduct(product) {
    this.products.set(product.id, product);
    console.log(`Product added: ${product.name}`);
  }

  getProduct(productId) {
    return this.products.get(productId);
  }

  updateStock(productId, quantity) {
    const product = this.getProduct(productId);
    if (product) {
      product.updateStock(quantity);
      return true;
    }
    return false;
  }

  getLowStockProducts(threshold = 10) {
    return Array.from(this.products.values()).filter(
      (p) => p.stock < threshold,
    );
  }

  getOutOfStockProducts() {
    return Array.from(this.products.values()).filter((p) => !p.isAvailable());
  }

  getTotalInventoryValue() {
    return Array.from(this.products.values()).reduce(
      (sum, p) => sum + p.price * p.stock,
      0,
    );
  }
}

// Practice 7: Shopping Cart
class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  getSubtotal() {
    return this.product.price * this.quantity;
  }

  updateQuantity(quantity) {
    if (quantity > 0 && quantity <= this.product.stock) {
      this.quantity = quantity;
      return true;
    }
    return false;
  }

  getInfo() {
    return `${this.product.name} x${this.quantity} = $${this.getSubtotal().toFixed(2)}`;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
    this.discountCode = null;
    this.discountPercent = 0;
  }

  addItem(product, quantity = 1) {
    if (!product.isAvailable() || quantity > product.stock) {
      console.log("Item not available");
      return false;
    }

    const existingItem = this.items.find((i) => i.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new CartItem(product, quantity));
    }

    console.log(`Added ${product.name} to cart`);
    return true;
  }

  removeItem(productId) {
    this.items = this.items.filter((i) => i.product.id !== productId);
  }

  applyDiscount(code, percent) {
    this.discountCode = code;
    this.discountPercent = percent;
    console.log(`Discount applied: ${percent}% off`);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  getDiscount() {
    return (this.getSubtotal() * this.discountPercent) / 100;
  }

  getTotal() {
    return this.getSubtotal() - this.getDiscount();
  }

  checkout() {
    const total = this.getTotal();
    console.log("\n=== Checkout ===");
    this.items.forEach((item) => console.log(item.getInfo()));
    console.log(`Subtotal: $${this.getSubtotal().toFixed(2)}`);
    if (this.discountPercent > 0) {
      console.log(
        `Discount (${this.discountPercent}%): -$${this.getDiscount().toFixed(2)}`,
      );
    }
    console.log(`Total: $${total.toFixed(2)}`);
    return total;
  }

  clear() {
    this.items = [];
  }
}

// Test Shopping Cart
const cart = new ShoppingCart();
const laptop = new Product(501, "Laptop", 999.99, 5);
const mouse = new Product(502, "Mouse", 29.99, 50);

cart.addItem(laptop, 1);
cart.addItem(mouse, 2);
cart.applyDiscount("SAVE20", 20);
cart.checkout();

// Practice 8: Order and Order Manager
class Order {
  constructor(orderId, cartItems, total) {
    this.orderId = orderId;
    this.items = cartItems;
    this.total = total;
    this.status = "pending";
    this.createdAt = new Date();
    this.shippedAt = null;
    this.deliveredAt = null;
  }

  ship() {
    this.status = "shipped";
    this.shippedAt = new Date();
    console.log(`Order ${this.orderId} shipped`);
  }

  deliver() {
    this.status = "delivered";
    this.deliveredAt = new Date();
    console.log(`Order ${this.orderId} delivered`);
  }

  cancel() {
    this.status = "cancelled";
    console.log(`Order ${this.orderId} cancelled`);
  }

  getOrderSummary() {
    return {
      orderId: this.orderId,
      status: this.status,
      total: this.total,
      itemCount: this.items.length,
      createdAt: this.createdAt,
    };
  }
}

class OrderManager {
  constructor() {
    this.orders = new Map();
    this.orderCounter = 1000;
  }

  createOrder(cartItems, total) {
    const orderId = ++this.orderCounter;
    const order = new Order(orderId, cartItems, total);
    this.orders.set(orderId, order);
    console.log(`Order ${orderId} created`);
    return order;
  }

  getOrder(orderId) {
    return this.orders.get(orderId);
  }

  getUserOrders(userId) {
    return Array.from(this.orders.values());
  }

  getTotalRevenue() {
    return Array.from(this.orders.values()).reduce(
      (sum, order) => sum + order.total,
      0,
    );
  }
}

// Test Orders
const orderManager = new OrderManager();
const order = orderManager.createOrder(cart.items, cart.getTotal());
order.ship();
order.deliver();
console.log(order.getOrderSummary());

// Practice 9: Product Catalog/Database
class ProductCatalog {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  search(query) {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  filterByPriceRange(min, max) {
    return this.products.filter((p) => p.price >= min && p.price <= max);
  }

  filterByCategory(category) {
    return this.products.filter((p) => p.category === category);
  }

  getTopProducts(limit = 5) {
    return this.products.slice(0, limit);
  }

  getSortedByPrice(ascending = true) {
    return [...this.products].sort((a, b) =>
      ascending ? a.price - b.price : b.price - a.price,
    );
  }
}

// Export classes
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Product,
    DigitalProduct,
    PhysicalProduct,
    SubscriptionProduct,
    BundleProduct,
    InventoryManager,
    CartItem,
    ShoppingCart,
    Order,
    OrderManager,
    ProductCatalog,
  };
}
