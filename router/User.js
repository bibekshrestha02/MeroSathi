const Express = require("express");
const AuthController = require("./../controller/AuthController");
const Router = Express.Router();
const { signUp, logIn, forgotPassword } = AuthController;
Router.post("/signUp", signUp);
Router.post("/logIn", logIn);
Router.post("/forgotPassword", forgotPassword);
Router.patch("/ResetPassword/:token", forgotPassword);

module.exports = Router;
