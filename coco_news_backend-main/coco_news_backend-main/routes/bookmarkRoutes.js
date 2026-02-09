import express from "express";
import { addBookmark, getBookmarks, removeBookmark } from "../controllers/bookmarkController.js";
import {authenticateUser}  from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/bookmarks", authenticateUser, addBookmark);
router.get("/bookmarks", authenticateUser, getBookmarks);
router.delete("/bookmarks/:newsId", authenticateUser, removeBookmark);

export default router; // ✅ Use `export default`
