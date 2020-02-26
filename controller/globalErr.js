const AppErr = require("./../utils/appErr");
// cast error
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}`;
  return new AppErr(message, 400);
};
// email
const handleEmailError = err => {
  const message = `Email Already Exist`;
  return new AppErr(message, 500);
};
//password
const handlePasswordError = err => {
  const message = Object.values(err.errors).map(e => e.message);
  // console.log(array.map(e => e.message));
  return new AppErr(message, 400);
};

const ErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    stack: err.stack,
    message: err.message,
  });
};
const ErrProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // checking the Node_Env
  if (process.env.NOD_ENV === "development") {
    ErrDev(err, res);
  } else if (process.env.NOD_ENV === "production") {
    let error = { ...err };
    // checking the type of Error
    // if error  is casrError
    if (error.name === "CastError") error = handleCastErrorDB(error);
    // identifing the unique email
    if (error.name === "MongoError") error = handleEmailError(error);
    // checking the password
    if (error.name === "ValidationError") error = handlePasswordError(error);
    // Send Back Error
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
    // ErrProd(error, res);
  }
};
