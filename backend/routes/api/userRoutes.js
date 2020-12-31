import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  followUser,
  unfollowUser,
  getUserLists,
  deleteAccount,
  updateUserById,
} from "../../controllers/users.js";
import { protect } from "../../middleware/auth.js";

router.route("/").post(registerUser).delete(protect, deleteAccount);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").get(getUserById).put(updateUserById);
router.get("/:id/lists", getUserLists);
router.route("/:id/follow").post(protect, followUser);
router.route("/:id/unfollow").delete(protect, unfollowUser);
export default router;
