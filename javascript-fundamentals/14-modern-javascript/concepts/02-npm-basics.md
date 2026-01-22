# NPM BASICS

## What is NPM?

NPM (Node Package Manager) is the default package manager for JavaScript and Node.js. It manages project dependencies, scripts, and versions.

**Core Functions:**

- Package management
- Dependency tracking
- Version management
- Script automation
- Publishing packages

## package.json

The package.json file is the manifest for a Node.js project.

```json
{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "description": "An awesome application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack"
  },
  "keywords": ["javascript", "nodejs"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "webpack": "^5.0.0"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```

## Semantic Versioning (SemVer)

Version format: MAJOR.MINOR.PATCH

```
1.2.3
│ │ └─ Patch: Bug fixes (1.2.3 → 1.2.4)
│ └───── Minor: New features (1.2.3 → 1.3.0)
└─────── Major: Breaking changes (1.2.3 → 2.0.0)
```

## Version Specifiers

```json
{
  "dependencies": {
    "exact": "1.2.3", // Exact version
    "caret": "^1.2.3", // >=1.2.3 <2.0.0
    "tilde": "~1.2.3", // >=1.2.3 <1.3.0
    "greater": ">1.2.0", // Any version > 1.2.0
    "range": "1.2.0 - 1.5.0", // Between versions
    "wildcard": "1.2.*", // 1.2.0 to 1.2.999
    "latest": "latest" // Latest version
  }
}
```

## Common NPM Commands

```bash
# Initialize new project
npm init

# Initialize with defaults
npm init -y

# Install all dependencies
npm install

# Install specific package
npm install express

# Install as dev dependency
npm install --save-dev jest

# Install specific version
npm install express@4.17.1

# Update packages
npm update

# Remove package
npm uninstall express

# List installed packages
npm list
npm list --depth=0

# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit
npm audit fix

# Run script
npm run start
npm run test
```

## Project Setup

```bash
# Create new project
mkdir my-project && cd my-project
npm init -y

# Install common dependencies
npm install express cors dotenv
npm install --save-dev nodemon eslint prettier

# Create directories
mkdir src public config
mkdir __tests__

# Create initial files
touch src/index.js
```

## Package.json Scripts

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write .",
    "build": "webpack",
    "deploy": "npm run lint && npm run test && npm run build"
  }
}
```

## Running Scripts

```bash
# Run script
npm run dev

# Shorthand for certain scripts
npm start          # runs "start" script
npm test           # runs "test" script
npm stop           # runs "stop" script

# Pass arguments to scripts
npm run build -- --production
npm run test -- --coverage
```

## Dependencies vs DevDependencies

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "eslint": "^8.0.0",
    "prettier": "^2.8.0",
    "nodemon": "^3.0.1"
  }
}
```

**Dependencies:**

- Required for production
- Installed by default
- `npm install`

**DevDependencies:**

- Only for development
- Not included in production builds
- `npm install --save-dev`

## NPM Registry

```bash
# Search packages
npm search express
npm search database

# View package info
npm info express
npm info express@4.17.1

# Open package homepage
npm home express

# View on registry
npm repo express
```

## lock Files

```bash
# package-lock.json
# Records exact installed versions
# Ensures consistency across installs
# Always commit to version control

# package.json
# Specifies version ranges
# Can be updated with npm update
# More flexible than lock file
```

## Global Packages

```bash
# Install globally
npm install -g nodemon
npm install -g webpack-cli

# List global packages
npm list -g --depth=0

# Remove global package
npm uninstall -g nodemon

# Use local packages instead (recommended)
npx jest
npx webpack
```

## Practical Example

```bash
# Create project
npm init -y

# Install dependencies
npm install express cors dotenv

# Install dev dependencies
npm install --save-dev nodemon eslint jest

# Configure package.json
# Edit scripts section

# Create .env file
touch .env
echo "PORT=3000" >> .env

# Create src/index.js
mkdir src

# Run application
npm run dev

# Run tests
npm test

# Deploy
npm run build && npm start
```

## Best Practices

✓ Use package-lock.json for production
✓ Specify node/npm versions in engines
✓ Keep dependencies updated
✓ Use exact versions for critical dependencies
✓ Separate dev and production dependencies
✓ Use .npmignore for published packages
✓ Use meaningful script names
✓ Document dependencies in README
✓ Audit security regularly

✗ Don't install unnecessary packages
✗ Don't use "latest" for versions
✗ Don't ignore security warnings
✗ Don't commit node_modules
✗ Don't use too permissive version ranges
✗ Don't install global packages for projects
✗ Don't ignore package-lock.json
