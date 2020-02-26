const Blog = require("./../Modal/blogModal");
const catchAsync = require("./../utils/catchErrAsync");
const AppErr = require("./../utils/appErr");
// getting all data
exports.getAllData = catchAsync(async (req, res) => {
  let data = await Blog.find();
  res.status(200).json(data);
});
// get data by id
exports.getById = catchAsync(async (req, res) => {
  let id = req.params.id;
  let idData = await Blog.findById(id);
  let related = await Blog.find({ _id: { $ne: id } });
  if (!idData || !related) {
    return next(new AppErr("Invalid Id", 404));
  }
  res.status(200).json({
    idData,
    related,
  });
});

exports.createData = catchAsync(async (req, res) => {
  const data = {
    Heading: req.body.Heading,
    subTitle: req.body.subTitle,
    Body: req.body.Body,
  };
  const result = await Blog.create(data);
  res.json({ status: "sucess" });
});

exports.update = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = {
    Heading: req.body.Heading,
    subTitle: req.body.subTitle,
    Body: req.body.Body,
  };
  const result = await Blog.findByIdAndUpdate({ _id: id }, updateData);
  if (!result) {
    return next(new AppErr("Something went Wrong", 400));
  }
  res.json({ status: "Updated" });
});

exports.deleteData = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await Blog.findByIdAndDelete({ _id: id });
  if (!result) {
    return next(new AppErr("Something went Wrong", 400));
  }
  res.send("deleted");
});
