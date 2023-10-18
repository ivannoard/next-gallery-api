const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();
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
      message: "upload success",
      data: req.file,
    });
  }
  return res.status(404).json({
    status: 404,
    success: false,
    message: "no file",
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
      message: "upload success",
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
  fs.unlink(photo.path, async function () {
    await prisma.photos.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Delete Successfully",
    });
  });
};

module.exports = {
  uploadPhoto,
  uploadPhotos,
  deletePhoto,
};
