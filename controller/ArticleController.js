const Article = require("./../Modal/articleModal");
const catchAsync = require("./../utils/catchErrAsync");
const AppErr = require("./../utils/appErr");
// getting all data
exports.getAllData = catchAsync(async (req, res, next) => {
  let data = await Article.find();
  res.status(200).json(data);
});
// get data by id
exports.getById = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  let idData = await Article.findById(id);

  let related = await Article.find({ _id: { $ne: id } });
  if (!idData || !related) {
    return next(new AppErr("Invalid Id", 404));
  }
  res.status(200).json({
    idData,
    related,
  });
});
// create data
exports.createData = catchAsync(async (req, res, next) => {
  let data = {
    Title: req.body.Title,
    Head: req.body.Head,
    Body: req.body.Body,
  };
  const result = await Article.create(data);
  res.json({ status: "sucess" });
});
// update created data by id
exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updateData = {
    Title: req.body.Title,
    Head: req.body.Head,
    Body: req.body.Body,
  };
  const result = await Article.findByIdAndUpdate({ _id: id }, updateData);
  if (!result) {
    return next(new AppErr("Something went Wrong", 400));
  }
  res.json({ status: "Updated", result });
});
// delete data by id
exports.deleteData = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await Article.findByIdAndDelete({ _id: id });
  if (!result) {
    return next(new AppErr("Something went Wrong", 400));
  }
  res.send("deleted");
});
