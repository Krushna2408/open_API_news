import express from "express";
import { loginUser, registerUser, updateUserRole } from "../controllers/userController.js";

const router = express.Router();

router.post("/signin", loginUser);
router.post("/signup", registerUser);
router.put("/update-role/:id", updateUserRole);

export default router;
