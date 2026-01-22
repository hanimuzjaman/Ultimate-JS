# Debugging with DevTools

## What is DevTools?

Browser DevTools (Developer Tools) allow you to inspect and debug JavaScript code. Most modern browsers have built-in DevTools.

## Opening DevTools

- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Safari**: Enable in Preferences > Advanced, then `Cmd+Option+I`

## The Console Tab

The most used tool for JavaScript debugging:

```javascript
console.log("Normal message");
console.warn("Warning message");
console.error("Error message");
console.table({ name: "John", age: 30 }); // Pretty print object
console.group("Group"); // Grouped messages
console.groupEnd();
```

## Breakpoints

Set breakpoints to pause execution:

1. Go to **Sources** tab
2. Click line number to set breakpoint
3. Reload page
4. Execution pauses at breakpoint

## Stepping Through Code

Once paused at breakpoint:

- **Step Over** (F10): Execute next line
- **Step Into** (F11): Enter function call
- **Step Out** (Shift+F11): Exit current function
- **Continue** (F8): Resume execution

## Inspecting Variables

### Hover Over Variables

Hover over variable name to see its current value.

### Watch Expressions

Add expressions to watch list:

1. Go to **Watch** section
2. Add expression like `count > 10`
3. See value update as you step

### Local Variables

**Local** panel shows all variables in current scope.

## Call Stack Visualization

In **Sources** tab, the **Call Stack** shows:

- Current execution context
- All parent function calls
- Order of function invocation

## Conditional Breakpoints

Right-click line number → **Add conditional breakpoint**

```javascript
// Break only if condition is true
if (count > 100) {
  // Breakpoint here
}
```

## DOM Breakpoints

Right-click DOM element → **Break on** → Choose:

- **Subtree modifications**: Child elements change
- **Attribute modifications**: Attributes change
- **Node removal**: Element is removed

## Event Listener Breakpoints

Go to **Sources** → **Event Listener Breakpoints**

Choose which events trigger breakpoints:

- Click
- Scroll
- Submit
- etc.

## Network Tab

See all network requests:

- **Name**: File being requested
- **Status**: HTTP status code
- **Type**: File type (document, script, image, etc.)
- **Size**: Download size
- **Time**: How long it took

## Performance Profiling

Record performance:

1. Go to **Performance** tab
2. Click record button
3. Perform actions
4. Stop recording
5. Analyze timeline

Shows:

- Function call duration
- Where time is spent
- Performance bottlenecks

## Memory Profiling

Debug memory leaks:

1. Go to **Memory** tab
2. Take heap snapshot
3. Look for unexpected objects
4. Identify what's holding references

## Debugging Tips

### 1. Use descriptive console messages

```javascript
console.log("User:", user); // Better than console.log(user)
```

### 2. Use console methods

```javascript
console.log("Info");
console.warn("Warning");
console.error("Error");
console.table(array); // For arrays
```

### 3. debugger statement

```javascript
function problem() {
  debugger; // Pauses if DevTools open
  // Code here
}
```

### 4. Error stack traces

Click error in console to see stack trace showing:

- Exact error location
- All function calls leading to error
- File names and line numbers

### 5. Execution context

When paused, inspect:

- Current variable values
- Call stack
- Scope chain
- this binding

## Common Debugging Scenarios

### Scenario 1: Variable has wrong value

1. Set breakpoint before variable use
2. Step through code
3. Watch variable value change
4. Find where it's assigned incorrectly

### Scenario 2: Function not being called

1. Set breakpoint in function
2. If not hit, function not called
3. Check where it should be called
4. Add breakpoint there to verify

### Scenario 3: Scope issues

1. Set breakpoint in function
2. Check **Local** panel
3. See which variables are accessible
4. Verify scope chain

### Scenario 4: Infinite loop

1. Set breakpoint in loop
2. Step through iterations
3. Find condition that never becomes false
4. Fix loop condition

## Best Practices

1. **Use meaningful variable names**: Easier to debug
2. **Add comments**: Explains intent
3. **Use console methods appropriately**: log, warn, error
4. **Take heap snapshots**: Find memory leaks
5. **Check network tab**: Verify API calls
6. **Use debugger statement**: Pause at specific code
7. **Understand scope**: Know what's accessible
8. **Check error messages**: Often tell you the problem

## Summary

DevTools are essential for JavaScript debugging:

- Console for logging and testing
- Breakpoints for execution control
- Call stack for understanding execution order
- Variables inspection for state debugging
- Network tab for API debugging
- Performance profiling for optimization
- Memory analysis for leak detection

Mastering DevTools makes debugging much faster!
