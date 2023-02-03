const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const uploadController = require("./controllers/uploadContrroller");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

//DB connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () =>
  console.log("DB is connected successfully")
);

//routes & middlewares
// those two middlewares make req.body accessible, otherwise it would be undefined!!!
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("public/images"));
app.use("/auth", authController);
app.use("/product", productController);
app.use("/upload", uploadController);

// setup frontend  to deploy
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
