// ============================================
// 04-this-keyword.js
// Understanding the 'this' keyword in JavaScript
// ============================================

// 1. Global Context
console.log("\n=== 1. Global Context ===");

function globalExample() {
  console.log("In function (non-strict):", this);
  // In browser: Window object
  // In Node.js: Global object
}

globalExample();

// In strict mode:
("use strict");
function globalExampleStrict() {
  console.log("In strict mode:", this); // undefined
}

globalExampleStrict();

// Reset to non-strict for rest of examples
eval("'use strict'; var dummy = null;");

// 2. Method Context (Object)
console.log("\n=== 2. Method Context ===");

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,

  // Method using 'this'
  introduce: function () {
    return `${this.firstName} ${this.lastName} is ${this.age} years old`;
  },

  // Modern method shorthand
  getName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(person.introduce()); // "John Doe is 30 years old"
console.log(person.getName()); // "John Doe"

// 3. Constructor Functions
console.log("\n=== 3. Constructor Functions ===");

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;

  this.getInfo = function () {
    return `${this.year} ${this.make} ${this.model}`;
  };

  this.drive = function () {
    return `Driving ${this.make}...`;
  };
}

const car1 = new Car("Toyota", "Camry", 2023);
const car2 = new Car("Honda", "Civic", 2022);

console.log(car1.getInfo()); // "2023 Toyota Camry"
console.log(car1.drive()); // "Driving Toyota..."
console.log(car2.getInfo()); // "2022 Honda Civic"

// 4. Class Context
console.log("\n=== 4. Class Context ===");

class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }

  getStatus() {
    return `${this.name} is in grade ${this.grade}`;
  }

  study(subject) {
    return `${this.name} is studying ${subject}`;
  }
}

const student = new Student("Alice", 10);
console.log(student.getStatus()); // "Alice is in grade 10"
console.log(student.study("Math")); // "Alice is studying Math"

// 5. Arrow Functions (Lexical 'this')
console.log("\n=== 5. Arrow Functions ===");

const user = {
  name: "Bob",

  // Regular function - has own 'this'
  regularGreet: function () {
    console.log(`Regular: Hello, I'm ${this.name}`);
  },

  // Arrow function - inherits 'this' from outer scope
  arrowGreet: () => {
    console.log(`Arrow: Hello, I'm ${user.name}`);
  },

  // Arrow inside regular function - inherits from regular function
  complexMethod: function () {
    const arrow = () => {
      return `${this.name}'s inner arrow function`;
    };
    return arrow();
  },
};

user.regularGreet(); // "Regular: Hello, I'm Bob"
user.arrowGreet(); // "Arrow: Hello, I'm Bob"
console.log(user.complexMethod()); // "Bob's inner arrow function"

// 6. call() Method
console.log("\n=== 6. call() Method ===");

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person1 = { name: "Charlie" };
const person2 = { name: "Diana" };

console.log(greet.call(person1, "Hi", "!")); // "Hi, Charlie!"
console.log(greet.call(person2, "Hello", "?")); // "Hello, Diana?"

// Borrowing methods
const person3 = { name: "Eve", age: 28 };
const animal = {
  speak: function (sound) {
    return `${this.name} says ${sound}`;
  },
};

console.log(animal.speak.call(person3, "hello")); // "Eve says hello"

// 7. apply() Method
console.log("\n=== 7. apply() Method ===");

function sum(a, b, c) {
  return this.baseValue + a + b + c;
}

const calculator = { baseValue: 100 };
const numbers = [10, 20, 30];

console.log(sum.apply(calculator, numbers)); // 160

// Finding max value in array
const numbers2 = [5, 12, 8, 1, 23, 9];
console.log("Max:", Math.max.apply(null, numbers2)); // 23
console.log("Min:", Math.min.apply(null, numbers2)); // 1

// 8. bind() Method
console.log("\n=== 8. bind() Method ===");

const book = {
  title: "JavaScript Guide",
  getDescription: function (author, year) {
    return `"${this.title}" by ${author} (${year})`;
  },
};

// Create bound function
const boundDescription = book.getDescription.bind(book, "John Smith");
console.log(boundDescription(2023)); // "JavaScript Guide" by John Smith (2023)

// Multiple bindings
const user2 = {
  name: "Frank",
  greet: function () {
    console.log(`Hello, I'm ${this.name}`);
  },
};

const boundGreet = user2.greet.bind(user2);
setTimeout(boundGreet, 100); // Still works after timeout

// 9. Losing 'this' Context (Common Mistakes)
console.log("\n=== 9. Losing Context ===");

const obj = {
  count: 0,
  increment: function () {
    return ++this.count;
  },
};

console.log(obj.increment()); // 1
console.log(obj.increment()); // 2

// Problem: Losing context
const incrementFn = obj.increment;
try {
  console.log(incrementFn()); // Error: can't read property of undefined
} catch (e) {
  console.log("Error occurred: context lost");
}

// Solutions:
const obj2 = {
  count: 0,
  increment: function () {
    return ++this.count;
  },
};

// Solution 1: bind()
const boundIncrement = obj2.increment.bind(obj2);
console.log(boundIncrement()); // 1

// Solution 2: Arrow function wrapper
const obj3 = {
  count: 0,
  increment: function () {
    return ++this.count;
  },
};
const incrementWrapper = () => obj3.increment();
console.log(incrementWrapper()); // 1

// 10. Array Methods and 'this'
console.log("\n=== 10. Array Methods ===");

const team = {
  name: "DevTeam",
  members: ["Alice", "Bob", "Charlie"],

  // Problem: forEach with regular function
  listMembersWrong: function () {
    this.members.forEach(function (member) {
      // 'this' refers to global/undefined, not team
      // console.log(`${this.name}: ${member}`);
    });
  },

  // Solution: Arrow function
  listMembersRight: function () {
    this.members.forEach((member) => {
      console.log(`${this.name}: ${member}`);
    });
  },

  // Solution: bind()
  listMembersBindSolution: function () {
    this.members.forEach(function (member) {
      console.log(`${this.name}: ${member}`);
    }, this); // Pass 'this' as second argument
  },
};

team.listMembersRight();
// "DevTeam: Alice"
// "DevTeam: Bob"
// "DevTeam: Charlie"

// 11. Event Handlers
console.log("\n=== 11. Event Handlers ===");

class Button {
  constructor(label) {
    this.label = label;
    this.clickCount = 0;
  }

  // Regular method - 'this' gets lost in event handler
  handleClick() {
    this.clickCount++;
    console.log(`${this.label} clicked ${this.clickCount} times`);
  }

  // Bound version for use with addEventListener
  getBoundHandler() {
    return this.handleClick.bind(this);
  }

  // Or use arrow function in constructor
  setupArrow() {
    return () => {
      this.clickCount++;
      console.log(`${this.label} clicked ${this.clickCount} times`);
    };
  }
}

const button1 = new Button("Submit");
const handler = button1.getBoundHandler();
// Simulate click
handler(); // "Submit clicked 1 times"
handler(); // "Submit clicked 2 times"

// 12. this with Nested Objects
console.log("\n=== 12. Nested Objects ===");

const company = {
  name: "TechCorp",
  department: {
    name: "Engineering",
    getFullPath: function () {
      return `${this.name} (parent: ${company.name})`;
    },
  },
};

console.log(company.department.getFullPath()); // "Engineering (parent: TechCorp)"
// 'this' refers to the immediate parent object (department)

// 13. Chaining Methods
console.log("\n=== 13. Method Chaining ===");

class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(n) {
    this.value += n;
    return this; // Return 'this' for chaining
  }

  subtract(n) {
    this.value -= n;
    return this;
  }

  multiply(n) {
    this.value *= n;
    return this;
  }

  divide(n) {
    if (n !== 0) this.value /= n;
    return this;
  }

  getResult() {
    return this.value;
  }
}

const calc = new Calculator(10);
const result = calc.add(5).multiply(2).subtract(10).divide(2).getResult();
console.log(result); // 10

// 14. this in Callbacks
console.log("\n=== 14. Callbacks ===");

class DataProcessor {
  constructor(name) {
    this.name = name;
  }

  processData(data, callback) {
    // Problem: callback might lose 'this'
    data.forEach((item) => {
      callback(item);
    });
  }

  printWithContext(item) {
    console.log(`${this.name}: ${item}`);
  }
}

const processor = new DataProcessor("Processor1");

// Using arrow function to preserve 'this'
processor.processData([1, 2, 3], (item) => {
  processor.printWithContext(item);
});

// Or bind the method
processor.processData([4, 5, 6], processor.printWithContext.bind(processor));

// 15. Understanding 'this' in Different Contexts
console.log("\n=== 15. Context Summary ===");

function contextAnalyzer() {
  console.log("this is:", typeof this === "object" ? "an object" : typeof this);
}

const testObj = { contextAnalyzer };

contextAnalyzer(); // function call - this is global
testObj.contextAnalyzer(); // method call - this is testObj
new contextAnalyzer(); // constructor - this is new instance

// With explicit context
contextAnalyzer.call({ custom: true }); // this is the object
contextAnalyzer.apply({ custom: true }); // this is the object

console.log("\n=== Exercises Completed ===");
