const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  Heading: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  Body: {
    type: Array,
  },
});

const blog = mongoose.model("Blog", blogSchema);

module.exports = blog;
