const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");

// menentukan lokasi pengunggahan
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// controllers
const TestController = require("../controllers/TestController");
const PhotosController = require("../controllers/PhotosController");

route.get("/", TestController.testInitial);
// photos
route.post(
  "/photo/upload/single",
  multer({ storage: diskStorage }).single("photo"),
  PhotosController.uploadPhoto
);
route.post(
  "/photo/upload/multiple",
  multer({ storage: diskStorage }).array("photos", 2),
  PhotosController.uploadPhotos
);
route.delete("/photo/delete/:id", PhotosController.deletePhoto);

module.exports = route;
