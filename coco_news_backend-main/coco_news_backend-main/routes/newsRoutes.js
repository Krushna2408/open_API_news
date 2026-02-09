import express from "express";
import { getDraftNews, addNews, publishNews, deleteNews, getPublishedNews } from "../controllers/newsController.js";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/drafts", authenticateUser, authorizeAdmin, getDraftNews); 
router.get("/published", getPublishedNews);
router.post("/add", authenticateUser, addNews);
router.post("/publish", authenticateUser, authorizeAdmin, publishNews);
router.delete("/:newsId", authenticateUser, authorizeAdmin, deleteNews);

export default router;
