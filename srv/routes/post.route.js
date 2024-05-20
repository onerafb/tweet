import express from "express";
import {
  createPost,
  deletePost,
  getFeedPosts,
  getPost,
  likeUnlikePost,
  replyToPost,
  getUserPosts
} from "../controllers/post.controller.js";
import protectRoute from "../middleware/protect.route.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.delete("/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);
router.get("/", protectRoute, getFeedPosts);

export default router;