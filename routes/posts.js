import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/", verifyToken, getFeedPosts); //we are throwing all the posts at user (to keep it simple. No complex algo for curated posts. YET.)
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */

router.patch("/:id/like", verifyToken, likePost);

export default router;
