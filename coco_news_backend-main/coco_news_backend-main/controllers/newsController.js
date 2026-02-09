import client from "../config/db.js";
import Joi from "joi";

// News Schema Validation
const newsSchema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().required(),
    source: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.string().allow("").optional(),
});

// Add News (Only for Authors/Admins)
export const addNews = async (req, res) => {
    if (req.user.role !== "author" && req.user.role !== "admin") {
        return res.status(403).json({ error: "Only authors and admins can add news" });
    }

    const { error } = newsSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { title, content, source, category, tags } = req.body;

    try {
        const query = `
            INSERT INTO news (title, content, source, category, tags, author_id, status, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, 'draft', NOW()) RETURNING id`;
        
        const result = await client.query(query, [title, content, source, category, tags || "", req.user.userID]);

        res.status(201).json({ message: "News added in draft mode", newsId: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

// Get All Draft News (Only for Authors/Admins)
export const getDraftNews = async (req, res) => {
    if (!req.user || (req.user.role !== "author" && req.user.role !== "admin")) {
        return res.status(403).json({ error: "Access denied" });
    }

    try {
        const result = await client.query("SELECT * FROM news WHERE status = 'draft'");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

// Publish News (Only for Admins)
export const publishNews = async (req, res) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can publish news" });
    }

    const { newsId } = req.body;
    if (!newsId) return res.status(400).json({ error: "News ID is required" });

    try {
        const result = await client.query("UPDATE news SET status = 'published', published_at = NOW() WHERE id = $1 RETURNING id", [newsId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "News not found or already published" });
        }

        res.status(200).json({ message: "News published successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

// Get All Published News
export const getPublishedNews = async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM news WHERE status = 'published' ORDER BY published_at DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete News (Only for Admins)
export const deleteNews = async (req, res) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can delete news" });
    }

    const { newsId } = req.params;
    if (!newsId) return res.status(400).json({ error: "News ID is required" });

    try {
        const result = await client.query("DELETE FROM news WHERE id = $1 RETURNING id", [newsId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "News not found" });
        }

        res.status(200).json({ message: "News deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};
