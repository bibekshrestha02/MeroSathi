const Express = require("express");

const Router = Express.Router();

Router.route("/").get((req, res) => {
  res.status(200).send("Hellow from About");
});

module.exports = Router;
