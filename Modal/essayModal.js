const mongoose = require("mongoose");

const EssaySchema = new mongoose.Schema({
  Title: {
    type: String,
    required: [true, "Essay must have Title"],
    unique: [true, " Tittle already exist"],
  },
  Head: {
    type: String,
    required: [true, "Essay must have Heading"],
  },
  Body: {
    type: String,
    required: true,
  },
  Conclusion: {
    type: String,
    required: true,
  },
  "Written By": {
    type: String,
    default: "Admin",
    required: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Essay = mongoose.model("Essay", EssaySchema);

module.exports = Essay;
