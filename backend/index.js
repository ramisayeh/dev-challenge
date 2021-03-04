const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./controllers/routes.js");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

mongoose
  .connect(
    "mongodb+srv://rami:root123456789@cluster0.dygyw.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("data base is connected haaaah");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err.message);
  });

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
