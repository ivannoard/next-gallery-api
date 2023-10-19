const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");

// menentukan lokasi pengunggahan
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

// controllers
const TestController = require("../controllers/TestController");
const PhotosController = require("../controllers/PhotosController");
const BlogController = require("../controllers/BlogController");
const GalleryController = require("../controllers/GalleryController");

route.get("/", TestController.testInitial);
// blog
route.get("/blog/get-all", BlogController.getBlogs);
route.get("/blog/get/:id", BlogController.getBlog);
route.post("/blog/add", BlogController.createBlog);
route.put("/blog/update/:id", BlogController.updateBlogById);
route.delete("/blog/delete/:id", BlogController.deleteBlogById);

// gallery
route.get("/gallery/get-all", GalleryController.getGalleries);
route.get("/gallery/get/:id", GalleryController.getGallery);
route.post("/gallery/add", GalleryController.createGallery);
route.put("/gallery/update/:id", GalleryController.updateGalleryById);
route.delete("/gallery/delete/:id", GalleryController.deleteGalleryById);

// photos
route.get("/photo/get-all", PhotosController.getAllPhoto);
route.get("/photo/get/:id", PhotosController.getSinglePhoto);
route.post(
  "/photo/upload/single",
  multer({ storage: diskStorage }).single("photo"),
  PhotosController.uploadPhoto
);
route.post(
  "/photo/upload/multiple",
  multer({ storage: diskStorage }).array("photo", 2),
  PhotosController.uploadPhotos
);
route.delete("/photo/delete/:id", PhotosController.deletePhoto);

module.exports = route;
