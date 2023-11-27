import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body; //represents the data sent in the body of a POST, PUT, or PATCH request
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save(); //make sure we save that in the mongoDB

    const post = await post.find(); //to return the updated post list to the frontend
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */

export const getFeedPosts = async (req, res) => {
  try {
    const post = await post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId); //if the userId exists, that person has liked the post

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true); //post.likes is a map!
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes }, //list of likes that we modified
      { new: true }
    );

    res.status(200).json(updatedPost); //update the frontend
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
