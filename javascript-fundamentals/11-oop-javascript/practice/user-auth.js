// USER AUTHENTICATION SYSTEM PRACTICE

// Practice 1: Basic User Class with Authentication
class User {
  constructor(username, password) {
    this.username = username;
    this.password = this.hashPassword(password);
    this.isAuthenticated = false;
  }

  hashPassword(password) {
    // Simple hash simulation (use bcrypt in production)
    return Buffer.from(password).toString("base64");
  }

  verifyPassword(inputPassword) {
    return this.hashPassword(inputPassword) === this.password;
  }

  authenticate(password) {
    if (this.verifyPassword(password)) {
      this.isAuthenticated = true;
      console.log(`✓ User ${this.username} authenticated`);
      return true;
    }
    console.log(`✗ Authentication failed for ${this.username}`);
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    console.log(`User ${this.username} logged out`);
  }
}

// Test basic authentication
const user1 = new User("john", "password123");
user1.authenticate("password123"); // true
user1.authenticate("wrongpassword"); // false
user1.logout();

// Practice 2: Session Management
class SessionManager {
  constructor(expirationMinutes = 30) {
    this.sessions = new Map();
    this.expirationMs = expirationMinutes * 60 * 1000;
  }

  createSession(userId) {
    const sessionId = this.generateSessionId();
    const expiresAt = Date.now() + this.expirationMs;

    this.sessions.set(sessionId, {
      userId,
      createdAt: Date.now(),
      expiresAt,
      lastActivity: Date.now(),
    });

    console.log(`Session created for user ${userId}: ${sessionId}`);
    return sessionId;
  }

  validateSession(sessionId) {
    const session = this.sessions.get(sessionId);

    if (!session) {
      console.log("Session not found");
      return false;
    }

    if (Date.now() > session.expiresAt) {
      this.sessions.delete(sessionId);
      console.log("Session expired");
      return false;
    }

    session.lastActivity = Date.now();
    return true;
  }

  getSession(sessionId) {
    if (this.validateSession(sessionId)) {
      return this.sessions.get(sessionId);
    }
    return null;
  }

  endSession(sessionId) {
    this.sessions.delete(sessionId);
    console.log("Session ended");
  }

  generateSessionId() {
    return "session_" + Math.random().toString(36).substr(2, 9);
  }
}

const sessionManager = new SessionManager(30);
const sid1 = sessionManager.createSession("user123");
console.log("Session valid:", sessionManager.validateSession(sid1));

// Practice 3: Role-Based Access Control
class Role {
  constructor(name, permissions = []) {
    this.name = name;
    this.permissions = permissions;
  }

  hasPermission(permission) {
    return this.permissions.includes(permission);
  }

  addPermission(permission) {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    }
  }
}

class UserWithRole extends User {
  constructor(username, password, role = null) {
    super(username, password);
    this.role = role;
  }

  setRole(role) {
    this.role = role;
    console.log(`Role set for ${this.username}: ${role.name}`);
  }

  hasPermission(permission) {
    return this.role && this.role.hasPermission(permission);
  }

  canAccess(resource) {
    if (!this.isAuthenticated) {
      console.log("User not authenticated");
      return false;
    }

    return this.hasPermission(`access:${resource}`);
  }
}

// Create roles
const adminRole = new Role("admin", [
  "access:admin",
  "access:users",
  "access:settings",
  "delete:users",
]);
const userRole = new Role("user", ["access:profile", "access:dashboard"]);

// Test role-based access
const admin = new UserWithRole("admin", "adminpass", adminRole);
admin.authenticate("adminpass");
console.log("Admin can access users:", admin.canAccess("users"));
console.log("Admin can delete users:", admin.hasPermission("delete:users"));

// Practice 4: Password Strength Validation
class PasswordValidator {
  static validate(password) {
    const checks = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    };

    const strength = Object.values(checks).filter(Boolean).length;

    return {
      isValid: checks.minLength && strength >= 3,
      strength, // 0-5
      checks,
      score: strength,
    };
  }

  static getStrengthLabel(score) {
    const labels = [
      "Very Weak",
      "Weak",
      "Fair",
      "Good",
      "Strong",
      "Very Strong",
    ];
    return labels[score] || "Unknown";
  }
}

// Test password validation
const pwd = "MyPass123!";
const validation = PasswordValidator.validate(pwd);
console.log("\n=== Password Validation ===");
console.log(
  `Password strength: ${PasswordValidator.getStrengthLabel(validation.score)}`,
);
console.log("Valid:", validation.isValid);

// Practice 5: Two-Factor Authentication
class TwoFactorAuth {
  constructor() {
    this.codes = new Map();
  }

  generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  sendCode(userId) {
    const code = this.generateCode();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    this.codes.set(userId, { code, expiresAt, attempts: 0 });
    console.log(`2FA code sent to ${userId}: ${code}`);
    return code;
  }

  verifyCode(userId, code) {
    const record = this.codes.get(userId);

    if (!record) {
      console.log("No code found for user");
      return false;
    }

    if (Date.now() > record.expiresAt) {
      this.codes.delete(userId);
      console.log("Code expired");
      return false;
    }

    record.attempts++;
    if (record.attempts > 3) {
      this.codes.delete(userId);
      console.log("Too many attempts");
      return false;
    }

    if (record.code === code) {
      this.codes.delete(userId);
      console.log("2FA verified");
      return true;
    }

    console.log("Invalid code");
    return false;
  }
}

const twoFactor = new TwoFactorAuth();
const code = twoFactor.sendCode("user123");
console.log("\n=== Two-Factor Auth ===");
console.log("Verified:", twoFactor.verifyCode("user123", code));

// Practice 6: Authentication with Email Verification
class EmailVerification {
  constructor() {
    this.tokens = new Map();
  }

  generateToken(email) {
    const token = Math.random().toString(36).substr(2, 9);
    this.tokens.set(email, {
      token,
      verified: false,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    console.log(`Verification email sent to ${email}`);
    return token;
  }

  verify(email, token) {
    const record = this.tokens.get(email);

    if (!record) {
      return false;
    }

    if (Date.now() > record.expiresAt) {
      this.tokens.delete(email);
      return false;
    }

    if (record.token === token) {
      record.verified = true;
      console.log(`Email ${email} verified`);
      return true;
    }

    return false;
  }

  isVerified(email) {
    const record = this.tokens.get(email);
    return record?.verified || false;
  }
}

const emailVerifier = new EmailVerification();
const verificationToken = emailVerifier.generateToken("john@example.com");
console.log("\n=== Email Verification ===");
console.log(
  "Verified:",
  emailVerifier.verify("john@example.com", verificationToken),
);

// Practice 7: Password Reset Flow
class PasswordReset {
  constructor() {
    this.resetTokens = new Map();
  }

  requestReset(userId, email) {
    const token = "reset_" + Math.random().toString(36).substr(2, 9);
    this.resetTokens.set(token, {
      userId,
      email,
      expiresAt: Date.now() + 1 * 60 * 60 * 1000, // 1 hour
      used: false,
    });
    console.log(`Password reset link sent to ${email}`);
    return token;
  }

  validateToken(token) {
    const record = this.resetTokens.get(token);

    if (!record) return null;
    if (Date.now() > record.expiresAt) return null;
    if (record.used) return null;

    return record.userId;
  }

  resetPassword(token, newPassword) {
    const userId = this.validateToken(token);
    if (!userId) {
      console.log("Invalid reset token");
      return false;
    }

    this.resetTokens.get(token).used = true;
    console.log(`Password reset for user ${userId}`);
    return true;
  }
}

const passwordReset = new PasswordReset();
const resetToken = passwordReset.requestReset("user123", "user@example.com");
console.log("\n=== Password Reset ===");
console.log(
  "Reset valid:",
  passwordReset.resetPassword(resetToken, "newPassword123"),
);

// Practice 8: Login Rate Limiting
class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    this.attempts = new Map();
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isLimited(userId) {
    const now = Date.now();
    if (!this.attempts.has(userId)) {
      this.attempts.set(userId, []);
    }

    const userAttempts = this.attempts.get(userId);
    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(
      (time) => now - time < this.windowMs,
    );
    this.attempts.set(userId, recentAttempts);

    return recentAttempts.length >= this.maxAttempts;
  }

  recordAttempt(userId) {
    if (!this.attempts.has(userId)) {
      this.attempts.set(userId, []);
    }
    this.attempts.get(userId).push(Date.now());
  }

  reset(userId) {
    this.attempts.delete(userId);
  }

  getAttemptCount(userId) {
    return this.attempts.get(userId)?.length || 0;
  }
}

const limiter = new RateLimiter(3, 60000); // 3 attempts per minute
console.log("\n=== Rate Limiting ===");
limiter.recordAttempt("user123");
limiter.recordAttempt("user123");
console.log("Limited:", limiter.isLimited("user123")); // false
limiter.recordAttempt("user123");
console.log("Limited:", limiter.isLimited("user123")); // true

// Practice 9: Complete Authentication System
class AuthenticationSystem {
  constructor() {
    this.users = new Map();
    this.sessions = new SessionManager();
    this.rateLimiter = new RateLimiter(5, 15 * 60 * 1000);
  }

  register(username, password, email) {
    if (this.users.has(username)) {
      console.log("User already exists");
      return false;
    }

    const validation = PasswordValidator.validate(password);
    if (!validation.isValid) {
      console.log("Password not strong enough");
      return false;
    }

    const user = new UserWithRole(username, password, userRole);
    user.email = email;
    user.emailVerified = false;

    this.users.set(username, user);
    console.log(`User ${username} registered`);
    return true;
  }

  login(username, password) {
    if (this.rateLimiter.isLimited(username)) {
      console.log("Too many login attempts. Please try again later.");
      return null;
    }

    const user = this.users.get(username);
    if (!user || !user.authenticate(password)) {
      this.rateLimiter.recordAttempt(username);
      console.log("Invalid credentials");
      return null;
    }

    this.rateLimiter.reset(username);
    const sessionId = this.sessions.createSession(username);
    return sessionId;
  }

  logout(sessionId) {
    this.sessions.endSession(sessionId);
  }

  validateSession(sessionId) {
    return this.sessions.validateSession(sessionId);
  }
}

// Test complete system
console.log("\n=== Complete Auth System ===");
const authSystem = new AuthenticationSystem();
authSystem.register("johndoe", "MyPassword123!", "john@example.com");
const sid2 = authSystem.login("johndoe", "MyPassword123!");
console.log("Session valid:", authSystem.validateSession(sid2));
