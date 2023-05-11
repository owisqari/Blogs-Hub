const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    userBlogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blogs",
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "tag",
      },
    ],
    userAccount: {
      type: Schema.Types.ObjectId,
      ref: "BankAccount",
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
