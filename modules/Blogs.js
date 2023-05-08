const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogsSchema = new Schema(
  {
    title: String,
    body: String,
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model("Blogs", blogsSchema);

module.exports = Blogs;
