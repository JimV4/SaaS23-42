const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username exists! This user is already in the database!"],
      required: [true, "Please provide a username!"],
    },
    creditsAmount: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
