const Essay = require("./../Modal/essayModal");
const catchAsync = require("./../utils/catchErrAsync");
const AppErr = require("./../utils/appErr");
// geting all data
exports.getAllData = catchAsync(async (req, res) => {
  let data = await Essay.find();
  res.status(200).json(data);
});
// get data by id

exports.getById = catchAsync(async (req, res) => {
  let id = req.params.id;
  let idData = await Essay.findById(id);
  let related = await Essay.find({ _id: { $ne: id } });
  if (!idData || !related) {
    return next(new AppErr("Invalid Id", 404));
  }
  res.status(200).json({
    idData,
    related,
  });
});
// create data
exports.createData = catchAsync(async (req, res) => {
  const data = {
    Title: req.body.Title,
    Head: req.body.Head,
    Body: req.body.Body,
    Conclusion: req.body.Conclusion,
  };

  await Essay.create(data);
  res.json({
    status: "Added to database",
  });
});
// updata data
exports.update = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = {
    Title: req.body.Title,
    Head: req.body.Head,
    Body: req.body.Body,
    Conclusion: req.body.Conclusion,
  };
  const result = await Essay.findByIdAndUpdate({ _id: id }, updateData);
  if (!result) {
    return next(new AppErr("Something went Wrong", 400));
  }
  res.json({ status: "Updated" });
});
// delete data
exports.deleteData = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await Essay.findByIdAndDelete({ _id: id });
  if (!result) {
    return next(new AppErr("Something went Wrong", 400));
  }
  res.send("deleted");
});
