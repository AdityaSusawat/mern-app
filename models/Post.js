import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      //the user who posted the post
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map, //better than storing the liker Ids in a string array ; much more efficient when large amount of likers
      of: Boolean,
    },
    comments: {
      types: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
