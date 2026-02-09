import db from "../config/db.js";

// Add a bookmark
export const addBookmark = async (req, res) => {
  try {
    const { news_id } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    const userId = req.user.userID;
    if (!userId || !news_id) {
      return res.status(400).json({ message: "User ID and News ID are required." });
    }

    const existingBookmark = await db.query(
      "SELECT * FROM bookmarks WHERE user_id = $1 AND news_id = $2",
      [userId, news_id]
    );

    if (existingBookmark.rows.length > 0) {
      return res.status(400).json({ message: "News is already bookmarked!" });
    }

    await db.query(
      "INSERT INTO bookmarks (user_id, news_id) VALUES ($1, $2)",
      [userId, news_id]
    );

    res.status(201).json({ message: "News bookmarked successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Fetch all bookmarks for a user
export const getBookmarks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    const userId = req.user.userID;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const query = `
      SELECT news.* 
      FROM bookmarks 
      JOIN news ON bookmarks.news_id = news.id 
      WHERE bookmarks.user_id = $1
    `;

    const bookmarks = await db.query(query, [userId]);
    res.json(bookmarks.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Remove a bookmark
export const removeBookmark = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    const userId = req.user.userID;
    const { newsId } = req.params;
    if (!userId || !newsId) {
      return res.status(400).json({ message: "User ID and News ID are required." });
    }

    await db.query(
      "DELETE FROM bookmarks WHERE user_id = $1 AND news_id = $2",
      [userId, newsId]
    );

    res.json({ message: "Bookmark removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
