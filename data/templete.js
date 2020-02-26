const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Module importing
const essay = require(`${__dirname}/../Modal/essayModal.js`);
const article = require(`${__dirname}/../Modal/articleModal.js`);
const blog = require(`${__dirname}/../Modal/blogModal.js`);

// data reading from file
let essayData = JSON.parse(fs.readFileSync(`${__dirname}/essay.json`, "utf-8"));
let blogData = JSON.parse(fs.readFileSync(`${__dirname}/Blog.json`, "utf-8"));
let articleData = JSON.parse(
  fs.readFileSync(`${__dirname}/Article.json`, "utf-8")
);
// config
dotenv.config({ path: "./../config.env" });

//connection to db
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
  });

// essay upload
const essayUpload = async () => {
  try {
    await essay.create(essayData);
    console.log("Data sucessfully Inserted");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

//blog upload

const blogUpload = async () => {
  try {
    await blog.create(blogData);
    console.log("Data inserted into data base");
    process.exit();
  } catch (error) {
    console.log("error");
    process.exit();
  }
};

// article
const articleUpload = async () => {
  try {
    await article.create(articleData);
    console.log("Data inserted into data base");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] === "---essay") {
  essayUpload();
} else if (process.argv[2] === "---article") {
  articleUpload();
} else if (process.argv[2] === "---blog") {
  blogUpload();
}
