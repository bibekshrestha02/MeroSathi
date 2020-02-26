const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    unique: [true, "Title should be unique"],
  },
  Head: {
    type: String,
    required: true,
  },
  Body: {
    type: String,
    required: true,
  },
});

const article = mongoose.model("Article", articleSchema);

module.exports = article;
