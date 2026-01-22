// ============================================
// user-profile.js
// User Profile Management System
// Practice: Complex object operations, validation, and data manipulation
// ============================================

// 1. Basic User Profile
console.log("=== 1. Basic User Profile ===");

const profile1 = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  age: 28,

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  getInitials() {
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  },

  displayInfo() {
    return `${this.getFullName()} (${this.email}) - Age: ${this.age}`;
  },
};

console.log(profile1.getFullName()); // "John Doe"
console.log(profile1.getInitials()); // "JD"
console.log(profile1.displayInfo()); // "John Doe (john.doe@example.com) - Age: 28"

// 2. User Profile with Validation
console.log("\n=== 2. User Profile with Validation ===");

const profile2 = {
  id: 2,
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@example.com",
  age: 25,

  isValidEmail() {
    return this.email.includes("@") && this.email.includes(".");
  },

  isAdult() {
    return this.age >= 18;
  },

  isValidAge() {
    return this.age > 0 && this.age < 150;
  },

  isComplete() {
    return (
      this.firstName &&
      this.lastName &&
      this.email &&
      this.isValidEmail() &&
      this.isValidAge()
    );
  },

  validate() {
    const errors = [];

    if (!this.firstName) errors.push("First name is required");
    if (!this.lastName) errors.push("Last name is required");
    if (!this.email) errors.push("Email is required");
    if (!this.isValidEmail()) errors.push("Email format is invalid");
    if (!this.isValidAge()) errors.push("Age must be between 0 and 150");

    return {
      valid: errors.length === 0,
      errors: errors,
    };
  },
};

console.log("Is valid:", profile2.validate().valid); // true
console.log("Is adult:", profile2.isAdult()); // true

const invalidProfile = { ...profile2, age: 200 };
console.log("Invalid profile errors:", invalidProfile.validate().errors);

// 3. User Profile with Contact Information
console.log("\n=== 3. User Profile with Contacts ===");

const profile3 = {
  firstName: "Bob",
  lastName: "Johnson",
  contacts: {
    email: "bob@example.com",
    phone: "555-1234",
    website: "bob.example.com",
    socialMedia: {
      twitter: "@bobjohnson",
      linkedin: "bob-johnson-123",
      github: "bobjohnson",
    },
  },

  getContactMethod(type) {
    return this.contacts[type] ?? "Not provided";
  },

  getSocialHandle(platform) {
    return this.contacts.socialMedia?.[platform] ?? "Not found";
  },

  getContactEmail() {
    return this.contacts.email;
  },

  updateContact(type, value) {
    this.contacts[type] = value;
    return this;
  },

  displayContacts() {
    console.log(`\nContacts for ${this.firstName}:`);
    console.log(`  Email: ${this.contacts.email}`);
    console.log(`  Phone: ${this.contacts.phone}`);
    console.log(`  Website: ${this.contacts.website}`);
    console.log(`  Twitter: ${this.contacts.socialMedia.twitter}`);
  },
};

console.log("Email:", profile3.getContactEmail());
console.log("GitHub:", profile3.getSocialHandle("github"));
profile3.updateContact("phone", "555-5678").displayContacts();

// 4. User Profile with Preferences
console.log("\n=== 4. User Profile with Preferences ===");

const profile4 = {
  firstName: "Alice",
  lastName: "Williams",
  preferences: {
    theme: "dark",
    language: "en",
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    privacy: {
      profilePublic: false,
      showEmail: false,
      showActivity: false,
    },
  },

  setPreference(key, value) {
    this.preferences[key] = value;
    return this;
  },

  setNestedPreference(category, key, value) {
    if (this.preferences[category]) {
      this.preferences[category][key] = value;
    }
    return this;
  },

  getPreference(key) {
    return this.preferences[key] ?? null;
  },

  getNotificationSettings() {
    return this.preferences.notifications;
  },

  toggleNotification(type) {
    if (this.preferences.notifications[type] !== undefined) {
      this.preferences.notifications[type] =
        !this.preferences.notifications[type];
    }
    return this;
  },

  displayPreferences() {
    console.log("\nUser Preferences:");
    console.log(`  Theme: ${this.preferences.theme}`);
    console.log(`  Language: ${this.preferences.language}`);
    console.log(
      `  Email notifications: ${this.preferences.notifications.email}`,
    );
    console.log(`  Push notifications: ${this.preferences.notifications.push}`);
    console.log(`  Profile public: ${this.preferences.privacy.profilePublic}`);
  },
};

profile4
  .toggleNotification("push")
  .setNestedPreference("privacy", "profilePublic", true)
  .displayPreferences();

// 5. User Profile with Activity History
console.log("\n=== 5. User Profile with Activity ===");

const profile5 = {
  firstName: "Charlie",
  lastLogin: null,
  activityLog: [],

  login() {
    this.lastLogin = new Date();
    this.activityLog.push({
      action: "login",
      timestamp: new Date(),
    });
    console.log(`${this.firstName} logged in`);
    return this;
  },

  logout() {
    this.activityLog.push({
      action: "logout",
      timestamp: new Date(),
    });
    console.log(`${this.firstName} logged out`);
    return this;
  },

  recordAction(action, details = {}) {
    this.activityLog.push({
      action,
      details,
      timestamp: new Date(),
    });
    return this;
  },

  getRecentActivity(count = 5) {
    return this.activityLog.slice(-count).reverse();
  },

  getActivityCount() {
    return this.activityLog.length;
  },

  getActivityByType(action) {
    return this.activityLog.filter((log) => log.action === action);
  },

  displayActivity() {
    console.log(`\n${this.firstName}'s Recent Activity:`);
    this.getRecentActivity(3).forEach((log) => {
      console.log(`  ${log.action} - ${log.timestamp.toLocaleTimeString()}`);
    });
  },
};

profile5
  .login()
  .recordAction("profile_update", { field: "email" })
  .recordAction("profile_view")
  .logout()
  .displayActivity();

console.log(`Total activities: ${profile5.getActivityCount()}`);

// 6. User Profile with Badges/Achievements
console.log("\n=== 6. User Profile with Achievements ===");

const profile6 = {
  firstName: "Diana",
  joinDate: new Date("2020-01-15"),
  badges: [],
  achievements: {
    posts: 0,
    comments: 0,
    follows: 0,
  },

  addBadge(badge) {
    if (!this.badges.includes(badge)) {
      this.badges.push(badge);
      console.log(`Badge earned: ${badge}`);
    }
    return this;
  },

  recordPost() {
    this.achievements.posts++;
    if (this.achievements.posts === 1) this.addBadge("First Post");
    if (this.achievements.posts === 10) this.addBadge("Blogger");
    if (this.achievements.posts === 100) this.addBadge("Power Blogger");
    return this;
  },

  recordComment() {
    this.achievements.comments++;
    if (this.achievements.comments === 10) this.addBadge("Active Commenter");
    return this;
  },

  recordFollow() {
    this.achievements.follows++;
    return this;
  },

  getLevel() {
    const total = this.achievements.posts + this.achievements.comments;
    if (total >= 50) return "Expert";
    if (total >= 25) return "Advanced";
    if (total >= 10) return "Intermediate";
    return "Beginner";
  },

  getStats() {
    return {
      level: this.getLevel(),
      posts: this.achievements.posts,
      comments: this.achievements.comments,
      followers: this.achievements.follows,
      badges: this.badges.length,
      memberSince: this.joinDate.getFullYear(),
    };
  },

  displayStats() {
    const stats = this.getStats();
    console.log(`\n${this.firstName}'s Profile:`);
    console.log(`  Level: ${stats.level}`);
    console.log(`  Posts: ${stats.posts}`);
    console.log(`  Comments: ${stats.comments}`);
    console.log(`  Followers: ${stats.followers}`);
    console.log(`  Badges: ${stats.badges}`);
    console.log(`  Member since: ${stats.memberSince}`);
  },
};

// Simulate activities
for (let i = 0; i < 12; i++) {
  profile6.recordPost();
}
for (let i = 0; i < 5; i++) {
  profile6.recordComment();
}

profile6.displayStats();
console.log("Badges:", profile6.badges);

// 7. User Profile with Following System
console.log("\n=== 7. User Profile with Following ===");

const profile7 = {
  firstName: "Eve",
  following: [],
  followers: [],

  follow(user) {
    if (!this.following.includes(user)) {
      this.following.push(user);
      if (user.followers) user.followers.push(this.firstName);
    }
    return this;
  },

  unfollow(user) {
    this.following = this.following.filter((f) => f !== user);
    return this;
  },

  isFollowing(userName) {
    return this.following.includes(userName);
  },

  getFollowerCount() {
    return this.followers.length;
  },

  getFollowingCount() {
    return this.following.length;
  },

  displayNetwork() {
    console.log(`\n${this.firstName}'s Network:`);
    console.log(`  Followers: ${this.getFollowerCount()}`);
    console.log(`  Following: ${this.getFollowingCount()}`);
  },
};

profile7.follow("Alice").follow("Bob").follow("Charlie").displayNetwork();

// 8. User Profile with Settings Update
console.log("\n=== 8. User Profile Settings ===");

const profile8 = {
  firstName: "Frank",
  email: "frank@example.com",
  profile: {
    bio: "Developer",
    avatar: null,
    coverImage: null,
  },

  updateEmail(newEmail) {
    if (newEmail.includes("@")) {
      this.email = newEmail;
      console.log(`Email updated to ${newEmail}`);
    }
    return this;
  },

  updateBio(bio) {
    this.profile.bio = bio;
    return this;
  },

  updateAvatar(url) {
    this.profile.avatar = url;
    return this;
  },

  getProfileCompletion() {
    let completed = 0;
    let total = 3;

    if (this.email) completed++;
    if (this.profile.bio) completed++;
    if (this.profile.avatar) completed++;

    return Math.round((completed / total) * 100);
  },

  displayProfile() {
    console.log(`\n${this.firstName}'s Profile:`);
    console.log(`  Email: ${this.email}`);
    console.log(`  Bio: ${this.profile.bio}`);
    console.log(`  Avatar: ${this.profile.avatar || "(not set)"}`);
    console.log(`  Completion: ${this.getProfileCompletion()}%`);
  },
};

profile8
  .updateEmail("frank.new@example.com")
  .updateBio("Full Stack Developer")
  .updateAvatar("https://example.com/avatar.jpg")
  .displayProfile();

// 9. User Profile Object Factory
console.log("\n=== 9. User Factory Function ===");

function createUser(firstName, lastName, email) {
  return {
    firstName,
    lastName,
    email,
    createdAt: new Date(),
    isActive: true,

    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },

    deactivate() {
      this.isActive = false;
      return this;
    },

    activate() {
      this.isActive = true;
      return this;
    },

    getStatus() {
      return this.isActive ? "Active" : "Inactive";
    },
  };
}

const user = createUser("Grace", "Hall", "grace@example.com");
console.log(`${user.getFullName()} - ${user.getStatus()}`);
user.deactivate();
console.log(`Status after deactivate: ${user.getStatus()}`);

// 10. User Profile with Comparison
console.log("\n=== 10. Profile Comparison ===");

const profile10a = {
  firstName: "Henry",
  email: "henry@example.com",
  score: 85,
  badges: ["Blogger", "Active Commenter"],
};

const profile10b = {
  firstName: "Iris",
  email: "iris@example.com",
  score: 92,
  badges: ["Power Blogger", "Active Commenter", "Expert"],
};

function compareProfiles(p1, p2) {
  console.log("\nProfile Comparison:");
  console.log(`${p1.firstName} vs ${p2.firstName}`);

  if (p1.score > p2.score) {
    console.log(
      `${p1.firstName} has higher score (${p1.score} vs ${p2.score})`,
    );
  } else if (p2.score > p1.score) {
    console.log(
      `${p2.firstName} has higher score (${p2.score} vs ${p1.score})`,
    );
  } else {
    console.log("Scores are equal");
  }

  const commonBadges = p1.badges.filter((b) => p2.badges.includes(b));
  console.log(`Common badges: ${commonBadges.length}`);
}

compareProfiles(profile10a, profile10b);

console.log("\n=== All Exercises Completed ===");
