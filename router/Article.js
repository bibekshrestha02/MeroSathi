const Express = require("express");
const ArticleController = require("./../controller/ArticleController");
const AuthController = require("./../controller/AuthController");
const Router = Express.Router();
const {
  getAllData,
  getById,
  createData,
  update,
  deleteData,
} = ArticleController;
const { varification, checkRole } = AuthController;
// get all data
Router.route("/").get(getAllData);
// get data by id
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
