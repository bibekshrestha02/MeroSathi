const Express = require("express");
const BlogController = require("./../controller/BlogController");
const AuthController = require("./../controller/AuthController");
const Router = Express.Router();

const { getAllData, getById, createData, update, deleteData } = BlogController;
const { varification, checkRole } = AuthController;

Router.route("/").get(getAllData);

Router.route("/:id").get(getById);
///// user Varifacation and Role checker//////
// create data
Router.route("/create").post(varification, checkRole("admin"), createData);
// update data
Router.route("/update/:id").patch(varification, checkRole("admin"), update);
// delelte data
Router.route("/delete/:id").delete(
  varification,
  checkRole("admin"),
  deleteData
);

module.exports = Router;
