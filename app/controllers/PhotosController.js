const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

const getAllPhoto = async (req, res) => {
  const data = await prisma.photos.findMany();
  if (data.length === 0) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Photos are empty",
    });
  }
  return res.status(200).json({
    status: 200,
    success: true,
    message: "Photos retrieved successfully",
    data,
  });
};

const getSinglePhoto = async (req, res) => {
  const { id } = req.params;
  const data = await prisma.photos.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (data === null) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Image not found",
    });
  }
  if (data) {
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Image retrieved successfully",
      data,
    });
  }
};

const uploadPhoto = async (req, res) => {
  if (req.file) {
    await prisma.photos.create({
      data: {
        name: req.file.originalname,
        path: req.file.path,
      },
    });
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Upload success",
      data: req.file,
    });
  }
  return res.status(404).json({
    status: 404,
    success: false,
    message: "No file",
  });
};

const uploadPhotos = async (req, res) => {
  if (req.files) {
    await prisma.photos.createMany({
      data: req.files.map((file) => {
        return {
          name: file.originalname,
          path: file.path,
        };
      }),
    });
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Upload success",
      data: req.files,
    });
  }
  return res.status(404).json({
    status: 404,
    success: false,
    message: "no file",
  });
};

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const photo = await prisma.photos.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (photo === null) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Image not found",
    });
  }
  if (photo) {
    fs.unlink(photo.path, async function () {
      await prisma.photos.delete({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Delete successfully",
      });
    });
  }
};

module.exports = {
  getAllPhoto,
  getSinglePhoto,
  uploadPhoto,
  uploadPhotos,
  deletePhoto,
};
