const express = require("express");
const morgan = require("morgan");
const route = require("./routes/route.js");
const mongoose = require("mongoose");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", true); 
mongoose
  .connect("mongodb+srv://sumitkm:sumitkm@cluster0.p0bq4z6.mongodb.net/group71Database")
  .then(() => console.log("MongoDb is connected 💯 ✅"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(3000, function () {
  console.log("Express app running on port " + 3000);
});
