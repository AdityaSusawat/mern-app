import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend, //we will define all 3 in the "./controllers/users.js"
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */

router.patch("/:id/:friendId", verifyToken, addRemoveFriend); //this is an update function so we want to use patch instead

export default router;
