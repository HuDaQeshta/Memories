import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Post.js";

// // @route    GET api/posts
// // @desc     Get all posts
// // @access   Public
const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        tags: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Post.countDocuments({ ...keyword });
  const posts = await Post.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @route    POST api/posts/
// @desc     Create a post
// @access   Private
const createPost = asyncHandler(async (req, res) => {
  const body = req.body;
  const user = req.user._id;
  const userInfo = await User.findById(user).select("-password");
  if (user) {
    const post = new Post({
      userId: user,
      creator: userInfo.name,
      title: body.title,
      message: body.message,
      tags: body.tags,
      selectedFile: body.selectedFile,
    });
    const createdPost = await post.save();
    res.status(201).send(createdPost);
  }
});

// @route    GET api/posts/:id
// @desc     Get post by post ID
// @access   Private
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.id,
  });
  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post Not Found!");
  }
});

// @route    PUT api/posts/:id
// @desc     Update a post
// @access   Private
const updatePost = asyncHandler(async (req, res) => {
  const { title, message, selectedFile, tags } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title ? title : post.title;
    post.message = message ? message : post.message;
    post.selectedFile = selectedFile ? selectedFile : post.selectedFile;
    post.tags = tags ? tags : post.tags;

    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post Not Found.");
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post by post ID
// @access   Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.remove();
    res.json({ message: "Post has been removed!" });
  } else {
    res.status(404);
    throw new Error("Post Not Found!");
  }
});

// @route    PUT api/posts/:id/like
// @desc     Like a post
// @access   Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(post.userId);
  if (post) {
    if (
      post.likes.filter(
        (like) => like.userId.toString() === req.user._id.toString()
      ).length === 0
    ) {
      post.likes.unshift({ userId: req.user._id });
      if (user._id.toString() !== req.user._id.toString()) {
        user.notifications.unshift({
          userId: req.user._id,
          userName: req.user.name,
          postId: post._id,
          notification: "like",
        });
      }
      await user.save();
      const updatedPost = await post.save();
      res.status(201).json(updatedPost);
    } else {
      res.status(201).json("Post is already liked!");
    }
  } else {
    res.status(404);
    throw new Error("Post Not Found.");
  }
});

// @route    PUT api/posts/:id/dislike
// @desc     Dislike a post
// @access   Private
const dislikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  let updatedLikes = [];
  if (post) {
    if (
      post.likes.filter(
        (like) => like.userId.toString() === req.user._id.toString()
      ).length !== 0
    ) {
      updatedLikes = post.likes.filter(
        (like) => like.userId.toString() !== req.user._id.toString()
      );
      post.likes = updatedLikes;
      const updatedPost = await post.save();
      res.status(201).json(updatedPost);
    } else {
      res.status(201).json("Post is not Yet been liked");
    }
  } else {
    res.status(404);
    throw new Error("Post Not Found.");
  }
});

// // @route    GET api/posts/:userId
// // @desc     Get user's posts by user ID
// // @access   Public
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ userId: req.params.userId });
  if (posts.length !== 0) {
    res.json(posts);
  } else {
    res.status(404);
    throw new Error("User Not Found, or This User Has No Posts Yet.");
  }
});

// // @route    GET api/posts/:id/likeslist
// // @desc     Get post Likes List
// // @access   Public
const getPostLikes = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  let likesList = [];
  if (post) {
    if (post.likes.length !== 0) {
      for (let i = 0; i < post.likes.length; i++) {
        const user = await User.findById(post.likes[i].userId).select(
          "-password -email"
        );
        likesList.push(user);
      }
    }
    res.json(likesList);
  } else {
    res.status(404);
    throw new Error("Post Not Found.");
  }
});

export {
  getPosts,
  createPost,
  updatePost,
  getPostById,
  deletePost,
  likePost,
  dislikePost,
  getUserPosts,
  getPostLikes,
};
