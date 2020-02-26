const { promisify } = require("util");
const User = require("../Modal/userModal");
const jwt = require("jsonwebtoken");
const email = require("./../utils/email");
const catchAsync = require("./../utils/catchErrAsync");
const AppErr = require("./../utils/appErr");
// Jwt Token Acess
const tokenAcess = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// singUp
exports.signUp = catchAsync(async (req, res, next) => {
  const { fname, lname, email, password, passwordConform, role } = req.body;

  // checking the email and Password
  const user = await User.create({
    fname,
    lname,
    email,
    password,
    passwordConform,
    role,
  });

  const token = tokenAcess(user._id);
  res.status(201).json({
    login: true,
    token,
    fname,
    lname,
  });
});
// logIn
exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email & password is correct
  const userData = await User.findOne(
    { email },
    { password: 1, fname: 1, lname: 1, email: 1, role: 1 }
  );

  if (!userData) {
    return next(new AppErr(404));
  }

  if (!(await userData.correctPassword(password, userData.password))) {
    return next(new AppErr("invlid password", 404));
  }
  // if everything ok , send JWT to client
  const token = tokenAcess(userData._id);
  const { fname, lname, role } = userData;
  res.status(200).json({
    login: true,
    token,
    fname,
    lname,
    role,
  });
});
// Verification
exports.varification = async (req, res, next) => {
  try {
    let token;
    // getting token check if it exit
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw "Please login to access";
    }

    // varification token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // check if user exist

    const userExits = await User.findById(decode.id);
    if (!userExits) {
      throw 'user doesn"t exits';
    }
    res.user = userExits;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};
// checking Role
exports.checkRole = (...role) => {
  try {
    return (req, res, next) => {
      if (!role.includes(res.user.role)) {
        throw "You are not allowed to access";
      }
      next();
    };
  } catch (error) {
    res.status(200).send("not allowd to acess");
  }
};
// forgetting password
exports.forgotPassword = async (req, res, next) => {
  try {
    // get user email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw "invalid Email";
    }
    // generate random reset token
    const resetToken = await user.passwordToken();
    console.log(resetToken);
    // user.save({ validateBeforeSave: false });
    // send it to user's email
    const resetUrl = `${req.protocol}://${req.get(
      "Host"
    )}/user/ResetPassword/${resetToken}`;
    const message = `forgot your password? please submit your patch new password and conform password to url:${resetUrl}. \n if not please ignore your password`;
    // await user.save({ validateBeforeSave: false });
    // console.log(message);
    // console.log(resetToken);

    await email({
      email: user.email,
      subject: "forget password",
      message,
    });

    res.status(200).json({
      result: "sucess",
      message: "email send",
    });
  } catch (error) {
    // User.passwordResetToken = undefined;
    // User.passwordTokenExpiredAt = undefined;
    res.status(400).send(error);
    console.log(error);
    // await user.save({ validateBeforeSave: false });
  }
};
