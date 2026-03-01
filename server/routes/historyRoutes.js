import express from 'express';
import { saveHistory, getHistory, deleteHistory } from '../controllers/historyControllers.js';
import { authMiddleware } from '../utils/authMiddleware.js';

const router = express.Router();

router.post("/save", authMiddleware, saveHistory);
router.get("/all", authMiddleware, getHistory);
router.delete("/:id", authMiddleware, deleteHistory);

export default router;
