import express from "express";
import protectRoute from "../middleware/protect.route.js";
import {
  signUp,
  signIn,
  signout,
  followUnFollowUser,
  updateUser,
  getUserProfile,
  getSuggestedUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/logout", signout);

router.post("/follow/:id", protectRoute, followUnFollowUser);
router.put("/update/:id", protectRoute, updateUser);
router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);

export default router;
