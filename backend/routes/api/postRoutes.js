import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  updatePost,
  getPostById,
  deletePost,
  likePost,
  dislikePost,
  getUserPosts,
  getPostLikes,
} from "../../controllers/posts.js";
import { protect } from "../../middleware/auth.js";
router.get("/:userId/postslist", getUserPosts);
router.route("/").get(getPosts).post(protect, createPost);
router
  .route("/:id")
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);
router.route("/:id/like").put(protect, likePost);
router.route("/:id/dislike").put(protect, dislikePost);
router.get("/:id/likeslist", getPostLikes);
export default router;
