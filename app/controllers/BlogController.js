const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getBlogs = async (req, res) => {
  const data = await prisma.blog.findMany({
    include: {
      permission: {
        select: {
          name: true,
        },
      },
      tag: {
        select: {
          name: true,
        },
      },
      thumbnails: {
        select: {
          id: true,
          name: true,
          path: true,
        },
      },
      comments: {
        select: {
          id: true,
          name: true,
          comment: true,
          createdAt: true,
        },
      },
    },
  });
  data[0].permission = data[0].permission.map((item) => item.name);
  data[0].tag = data[0].tag.map((item) => item.name);
  if (data.length !== 0) {
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Post retrieved successfully",
      data,
    });
  }
  return res.status(404).json({
    status: 404,
    success: false,
    message: "Posts are empty",
  });
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  const data = await prisma.blog.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      permission: {
        select: {
          name: true,
        },
      },
      tag: {
        select: {
          name: true,
        },
      },
      thumbnails: {
        select: {
          id: true,
          name: true,
          path: true,
        },
      },
      comments: {
        select: {
          id: true,
          name: true,
          comment: true,
          createdAt: true,
        },
      },
    },
  });
  data.permission = data.permission.map((item) => item.name);
  data.tag = data.tag.map((item) => item.name);
  if (data !== null) {
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Post retrieved successfully",
      data,
    });
  }
  return res.status(404).json({
    status: 404,
    success: false,
    message: "Post not found",
  });
};

const createBlog = async (req, res) => {
  const data = await prisma.blog.create({
    data: {
      title: "test",
      isShow: false,
      content: "Lorem ipsum dolor sit amet.",
      tag: {
        createMany: {
          data: [{ name: "test tag 1" }, { name: "test tag 2" }],
        },
      },
      permission: {
        createMany: {
          data: [
            {
              name: "test user 0",
              comment: "lorem ipsum dolor sit amet.",
            },
            {
              name: "test user 1",
              comment: "lorem ipsum dolor sit amet.",
            },
          ],
        },
      },
      comments: {
        createMany: {
          data: [{ name: "comments 0" }, { name: "comments 1" }],
        },
      },
      thumbnails: {
        createMany: {
          data: [
            {
              name: "poto-propil.jpg",
              path: "D:\\belajar\\Backend\\next-gallery-api\\public\\uploads\\poto-propil-1697773512736.jpg",
            },
          ],
        },
      },
    },
  });
  return res.status(200).json({
    status: 200,
    success: true,
    message: "Create post successfully",
    data,
  });
};

const updateBlogById = async (req, res) => {
  const { id } = req.params;
};

const softDeleteBlogById = async (req, res) => {
  const { id } = req.params;
};

const deleteBlogById = async (req, res) => {
  const { id } = req.params;
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlogById,
  softDeleteBlogById,
  deleteBlogById,
};
