// PROTOTYPE INSPECTION PRACTICE

// Practice 1: Inspect Object Prototype Chain
function inspectPrototypeChain(obj) {
  console.log("=== Prototype Chain Inspection ===");
  let current = obj;
  let level = 0;

  while (current !== null) {
    console.log(`Level ${level}: ${current.constructor.name}`);
    console.log("  Properties:", Object.getOwnPropertyNames(current));
    current = Object.getPrototypeOf(current);
    level++;
  }
}

const arr = [1, 2, 3];
inspectPrototypeChain(arr);

// Practice 2: View Object's Own Properties
function getOwnProperties(obj) {
  return Object.getOwnPropertyNames(obj).reduce((acc, prop) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    acc[prop] = {
      value: typeof obj[prop],
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
    };
    return acc;
  }, {});
}

const user = { name: "John", age: 30 };
console.log("\n=== Own Properties ===");
console.log(getOwnProperties(user));

// Practice 3: Detect Inherited Properties
function isInheritedProperty(obj, prop) {
  return prop in obj && !obj.hasOwnProperty(prop);
}

function getInheritedProperties(obj) {
  const inherited = [];
  for (let prop in obj) {
    if (isInheritedProperty(obj, prop)) {
      inherited.push(prop);
    }
  }
  return inherited;
}

const person = { name: "Alice" };
Person.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

function Person(name) {
  this.name = name;
}

const alice = new Person("Alice");
console.log("\n=== Inherited Properties ===");
console.log("Inherited:", getInheritedProperties(alice));
console.log("Own:", Object.getOwnPropertyNames(alice));

// Practice 4: Inspect Constructor
function inspectConstructor(obj) {
  console.log("\n=== Constructor Inspection ===");
  console.log("Constructor name:", obj.constructor.name);
  console.log(
    "Constructor properties:",
    Object.getOwnPropertyNames(obj.constructor),
  );
  console.log("Constructor prototype:", obj.constructor.prototype);
  console.log("Instance of check:", obj instanceof obj.constructor);
}

inspectConstructor(new String("hello"));

// Practice 5: Compare Prototypes
function comparePrototypes(obj1, obj2) {
  const proto1 = Object.getPrototypeOf(obj1);
  const proto2 = Object.getPrototypeOf(obj2);

  return {
    samePrototype: proto1 === proto2,
    proto1Constructor: proto1?.constructor.name,
    proto2Constructor: proto2?.constructor.name,
    proto1Props: Object.getOwnPropertyNames(proto1 || {}),
    proto2Props: Object.getOwnPropertyNames(proto2 || {}),
  };
}

console.log("\n=== Prototype Comparison ===");
console.log(comparePrototypes([], {}));

// Practice 6: Walk Through Entire Prototype Chain
function getFullPrototypeChain(obj) {
  const chain = [];
  let current = Object.getPrototypeOf(obj);

  while (current !== null) {
    chain.push({
      constructor: current.constructor.name,
      properties: Object.getOwnPropertyNames(current),
    });
    current = Object.getPrototypeOf(current);
  }

  return chain;
}

console.log("\n=== Full Prototype Chain ===");
console.log(getFullPrototypeChain(new Date()));

// Practice 7: Find All Methods in Prototype Chain
function getAllMethods(obj) {
  const methods = [];
  let current = obj;

  while (current !== null) {
    Object.getOwnPropertyNames(current).forEach((prop) => {
      if (typeof current[prop] === "function" && !methods.includes(prop)) {
        methods.push(prop);
      }
    });
    current = Object.getPrototypeOf(current);
  }

  return methods;
}

const myString = "hello";
console.log("\n=== All Methods on String ===");
console.log(getAllMethods(myString).slice(0, 10), "...");

// Practice 8: Check Property Descriptor
function getPropertyDescriptor(obj, prop) {
  let current = obj;

  while (current !== null) {
    const descriptor = Object.getOwnPropertyDescriptor(current, prop);
    if (descriptor) {
      return {
        foundIn: current.constructor.name,
        descriptor,
      };
    }
    current = Object.getPrototypeOf(current);
  }

  return null;
}

const testObj = { x: 10 };
console.log("\n=== Property Descriptor ===");
console.log(getPropertyDescriptor(testObj, "toString"));

// Practice 9: Inspect Class Syntax
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }

  static info() {
    return "This is an Animal";
  }
}

function inspectClass(ClassDef) {
  console.log("\n=== Class Inspection ===");
  console.log("Name:", ClassDef.name);
  console.log(
    "Static methods:",
    Object.getOwnPropertyNames(ClassDef).filter(
      (prop) => typeof ClassDef[prop] === "function",
    ),
  );
  console.log(
    "Instance methods:",
    Object.getOwnPropertyNames(ClassDef.prototype).filter(
      (prop) => prop !== "constructor",
    ),
  );
  console.log(
    "Constructor params:",
    ClassDef.toString().match(/constructor\((.*?)\)/)?.[1],
  );
}

inspectClass(Animal);

// Practice 10: Create Prototype Visualizer
function visualizePrototypeChain(obj) {
  let current = obj;
  let visualization = obj.constructor.name;
  let depth = 0;

  while (Object.getPrototypeOf(current) !== null && depth < 10) {
    current = Object.getPrototypeOf(current);
    visualization += ` → ${current.constructor.name}`;
    depth++;
  }

  return visualization;
}

console.log("\n=== Prototype Chain Visualization ===");
console.log("Date:", visualizePrototypeChain(new Date()));
console.log("Array:", visualizePrototypeChain([]));
console.log("String:", visualizePrototypeChain("hello"));

// Practice 11: Detect Property Access Method
function howIsPropertyAccessed(obj, prop) {
  const own = obj.hasOwnProperty(prop);
  const inherited = prop in obj && !own;
  const accessor =
    Object.getOwnPropertyDescriptor(obj, prop)?.get !== undefined;

  return {
    isOwn: own,
    isInherited: inherited,
    isAccessor: accessor,
    type: own ? "own" : inherited ? "inherited" : "not found",
  };
}

console.log("\n=== Property Access Method ===");
console.log(howIsPropertyAccessed([], "length"));
console.log(howIsPropertyAccessed([], "map"));
console.log(howIsPropertyAccessed({ x: 1 }, "x"));

// Practice 12: Show Property Getters/Setters
function findGettersSetters(obj) {
  const gettersSetters = [];

  let current = obj;
  while (current !== null) {
    Object.getOwnPropertyNames(current).forEach((prop) => {
      const descriptor = Object.getOwnPropertyDescriptor(current, prop);
      if (descriptor?.get || descriptor?.set) {
        gettersSetters.push({
          prop,
          hasGetter: !!descriptor.get,
          hasSetter: !!descriptor.set,
          from: current.constructor.name,
        });
      }
    });
    current = Object.getPrototypeOf(current);
  }

  return gettersSetters;
}

const obj = {};
Object.defineProperty(obj, "x", {
  get() {
    return this._x || 0;
  },
  set(val) {
    this._x = val;
  },
});

console.log("\n=== Getters/Setters ===");
console.log(findGettersSetters(obj));

// Practice 13: Inspect Symbols on Object
function findSymbolProperties(obj) {
  return Object.getOwnPropertySymbols(obj).map((sym) => ({
    symbol: String(sym),
    value: obj[sym],
  }));
}

const mySymbol = Symbol("test");
const symObj = { [mySymbol]: "symbol value" };

console.log("\n=== Symbol Properties ===");
console.log(findSymbolProperties(symObj));

// Practice 14: Type Detection Deep Dive
function deepTypeCheck(value) {
  const type = typeof value;
  const objType = Object.prototype.toString.call(value);
  const constructor = value?.constructor?.name;
  const isInstance = (proto) => value instanceof proto;

  return {
    typeof: type,
    objectType: objType,
    constructor,
    isArray: Array.isArray(value),
    isNull: value === null,
    isUndefined: value === undefined,
    isPrimitive: value !== Object(value),
  };
}

console.log("\n=== Deep Type Check ===");
console.log("String:", deepTypeCheck("hello"));
console.log("Array:", deepTypeCheck([1, 2, 3]));
console.log("null:", deepTypeCheck(null));

// Practice 15: Prototype-based Inheritance Visualization
function showInheritanceHierarchy(classA, classB) {
  const isChild = classB.prototype instanceof classA;
  const proto = Object.getPrototypeOf(classB.prototype);

  return {
    parentClass: classA.name,
    childClass: classB.name,
    isChild,
    parentProto: proto?.constructor?.name,
    inheritanceChain: visualizePrototypeChain(new classB()),
  };
}

class Vehicle {}
class Car extends Vehicle {}

console.log("\n=== Inheritance Hierarchy ===");
console.log(showInheritanceHierarchy(Vehicle, Car));
