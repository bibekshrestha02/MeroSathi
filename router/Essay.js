const Express = require("express");
const EssayController = require("./../controller/EssayController");
const AuthController = require("./../controller/AuthController");
const Router = Express.Router();

const { getAllData, getById, createData, update, deleteData } = EssayController;
const { varification, checkRole } = AuthController;

Router.route("/").get(getAllData);

Router.route("/:id").get(getById);
Router.route("/create").post(varification, checkRole("admin"), createData);
Router.route("/update/:id").patch(varification, checkRole("admin"), update);
Router.route("/delete/:id").delete(
  varification,
  checkRole("admin"),
  deleteData
);

module.exports = Router;
