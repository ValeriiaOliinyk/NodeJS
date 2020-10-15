const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    avatarURL: String,
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    verificationToken: String,
    token: String,
  },
  { versionKey: false }
);

class User {
  constructor() {
    this.db = mongoose.model("User", userSchema);
  }

  getUsers = async (query) => {
    const { sub: subscription } = query;
    if (subscription) {
      return await this.db.find({ subscription });
    }
    return null;
  };

  createUser = async (userData) => {
    return await this.db.create(userData);
  };

  findUserByEmail = async (query) => {
    return await this.db.findOne(query);
  };

  updateUser = async (userId, userData) => {
    return await this.db.findByIdAndUpdate(userId, userData, {
      new: true,
    });
  };

  findUserById = async (userId) => {
    return await this.db.findById(userId);
  };
}

module.exports = new User();
