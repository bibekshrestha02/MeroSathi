const Essay = require("./../Modal/essayModal");
const Blog = require("./../Modal/blogModal");
const Article = require("./../Modal/articleModal");
const catchAsync = require("./../utils/catchErrAsync");
exports.getAllData = catchAsync(async (req, res) => {
  let dataEssay = await Essay.find({}).limit(4);
  let dataArticle = await Article.find({}).limit(4);
  let dataBlog = await Blog.find({}).limit(4);
  res.status(200).json({ dataBlog, dataEssay, dataArticle });
});
