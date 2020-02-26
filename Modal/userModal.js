const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Must have a first Name"],
  },
  lname: {
    type: String,
    required: [true, "Must have a first Name"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please Provide validate Email"],
    lowercase: true,
    required: [true, "Must have a to enter Email"],
    unique: [true, "Email already exist"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "You Must Enter your Password"],
    minlength: [8, "Password should be at least 8 character"],
    select: false,
  },
  passwordConform: {
    type: String,
    required: [true, "You Must Enter your Password"],
    validate: {
      validator: function(e) {
        return e === this.password;
      },
      message: "Password doesn't match",
    },
  },
  passwordUpdataAt: Date,
  passwordResetToken: String,
  passwordTokenExpiredAt: Date,
});

userSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConform = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  currentPassord,
  correctPassword
) {
  const result = await bcrypt.compare(currentPassord, correctPassword);
  return result;
};

userSchema.methods.passwordToken = async function() {
  const token = await crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordTokenExpiredAt = Date.now + 10 * 60 * 1000;
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
