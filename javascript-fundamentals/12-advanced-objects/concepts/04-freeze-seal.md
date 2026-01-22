# Freeze and Seal

## Overview

`Object.freeze()` and `Object.seal()` provide immutability control.

## Freeze vs Seal

### Freeze

- Prevents all modifications
- Cannot add properties
- Cannot delete properties
- Cannot modify existing properties

### Seal

- Prevents adding/deleting properties
- CAN modify existing properties
- Faster than freeze
- Better for fixed structures

## Syntax

```javascript
const frozen = Object.freeze({ x: 1 });
const sealed = Object.seal({ x: 1 });
```

## Checking State

```javascript
Object.isFrozen(obj);
Object.isSealed(obj);
Object.isExtensible(obj);
```

## Use Cases

- Constants
- Configuration objects
- Preventing accidental modifications
- API response protection

## Deep Freeze

```javascript
function deepFreeze(obj) {
  Object.freeze(obj);
  Object.values(obj).forEach((v) => {
    if (typeof v === "object") deepFreeze(v);
  });
  return obj;
}
```

## Performance

- Sealed objects faster than frozen
- Freeze disables optimizations
- Use cautiously in hot paths
