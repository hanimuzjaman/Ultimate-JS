# Getters and Setters

## Overview

Getters and setters allow property access with custom logic.

## Basic Syntax

```javascript
class User {
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
}
```

## Use Cases

- Validation
- Computed properties
- Encapsulation
- Side effects on property change

## Best Practices

- Use `_` prefix for backing fields
- Validate in setters
- Keep logic simple
- Avoid heavy computations in getters
- Document side effects

## Benefits

- Cleaner property access
- Validation at assignment
- Computed values
- Backwards compatibility
