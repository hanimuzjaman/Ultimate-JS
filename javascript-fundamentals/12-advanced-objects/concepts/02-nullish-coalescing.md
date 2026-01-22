# Nullish Coalescing

## Overview

Nullish coalescing (`??`) provides a default value only if left side is null or undefined.

## Syntax

```javascript
value ?? defaultValue;
```

## Key Differences

- `??` checks for null/undefined only
- `||` treats all falsy values as missing (0, '', false)

## Examples

```javascript
0 ?? "default"; // returns 0
0 || "default"; // returns 'default'

"" ?? "default"; // returns ''
"" || "default"; // returns 'default'

null ?? "default"; // returns 'default'
null || "default"; // returns 'default'
```

## Use Cases

- API responses with 0 or empty string values
- Configuration defaults
- Function parameter defaults
- Avoiding unnecessary fallbacks

## Chaining

```javascript
value ?? value2 ?? value3 ?? "default";
```

## With Optional Chaining

```javascript
user?.age ?? 18;
```
