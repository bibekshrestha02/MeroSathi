const dotenv = require("dotenv");
const express = require("express");
const app = require("./app");
const mongoose = require("mongoose");
const path = require("path");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 9000;

const mongoDB = process.env.Mongo_Db.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch(e => {
    console.log("Internal Server Error", e);
  });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
