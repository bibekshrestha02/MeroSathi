const express = require("express");
const Essay = require("./router/Essay");
const Aboutus = require("./router/About");
const Article = require("./router/Article");
const Home = require("./router/Home");
const Blog = require("./router/Blog");
const User = require("./router/User");
const bodyParser = require("body-parser");
const AppErr = require("./utils/appErr");
const Compression = require("compression");

const GlobalAppError = require("./controller/globalErr");
const app = express();
app.use(bodyParser.json());
app.use(Compression());
app.use("/Home", Home);
app.use("/Article", Article);
app.use("/Essay", Essay);
app.use("/Blog", Blog);
app.use("/AboutUs", Aboutus);
app.use("/user", User);
app.all("*", (req, res, next) => {
  const err = new Error();
  (err.status = "true"), (err.statusCode = 404);
  next(new AppErr("page not found", 400));
});

app.use(GlobalAppError);
module.exports = app;