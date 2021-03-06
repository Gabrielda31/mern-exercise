const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: "No photo"
  },
  author: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = Post = mongoose.model("Post", postSchema);