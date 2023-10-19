const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getGalleries = async (req, res) => {};

const getGallery = async (req, res) => {};

const createGallery = async (req, res) => {};

const updateGalleryById = async (req, res) => {};

const deleteGalleryById = async (req, res) => {};

module.exports = {
  getGalleries,
  getGallery,
  createGallery,
  updateGalleryById,
  deleteGalleryById,
};
