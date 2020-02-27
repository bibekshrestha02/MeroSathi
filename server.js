const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const mongoDB = process.env.Mongo_Db.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch(e => {
    console.log("Internal Server Error", e);
  });

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
