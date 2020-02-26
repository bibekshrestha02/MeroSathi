const Express = require("express");
const HomeController = require("./../controller/HomeContoller");
const Router = Express.Router();
const { getAllData } = HomeController;
Router.route("/").get(getAllData);
module.exports = Router;
