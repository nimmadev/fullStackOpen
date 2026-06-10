const commentRouter = require("express").Router({ mergeParams: true });
const Blog = require("../models/blog");
const Comment = require("../models/comments");

commentRouter.post("/", async (request, response) => {
  const blogId = request.params.id;
  const { comment } = request.body;
  const blog = await Blog.findById(blogId);
  console.log(blog);
  const saveComm = new Comment({ comment });
  saveComm.blog = blog._id;
  const result = await saveComm.save();
  blog.comments = blog.comments.concat(result._id);
  await blog.save();
  response.json(saveComm);
});

module.exports = commentRouter;
