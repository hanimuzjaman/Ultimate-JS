# Optional Chaining

## Overview

Optional chaining (`?.`) safely accesses nested object properties without errors.

## Basic Syntax

```javascript
obj?.prop;
obj?.[index];
obj?.method();
```

## Key Points

- Returns `undefined` if left side is null/undefined
- Short-circuits evaluation
- Prevents "Cannot read property of undefined" errors
- Works with arrays and methods

## Use Cases

- API response handling
- DOM element access
- Config object navigation
- Safe null/undefined checks

## Best Practices

- Use `?.` for optional properties
- Combine with `??` for defaults
- Avoid overuse in simple objects
- Consider deep nesting alternatives
