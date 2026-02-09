import { DataTypes } from "sequelize";
import db from "../config/db.js";

const News = db.define("news", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    source: { type: DataTypes.STRING, defaultValue: "manual" },
    category: { type: DataTypes.STRING, allowNull: false },
    tags: { type: DataTypes.STRING },
    author_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "draft" },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { timestamps: false });

export default News;
