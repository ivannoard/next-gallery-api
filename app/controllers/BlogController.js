const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getBlogs = async (req, res) => {};

const getBlog = async (req, res) => {};

const createBlog = async (req, res) => {};

const updateBlogById = async (req, res) => {};

const deleteBlogById = async (req, res) => {};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlogById,
  deleteBlogById,
};
