import express from "express";
import {
  createShortUrl,
  getMyUrls,
  deleteUrl,
} from "../controllers/urlController.js";
import protect from "../middlewares/auth.js";
import checkUrlLimit from "../middlewares/checkUrlLimit.js";

const router = express.Router();

router.post("/", protect, checkUrlLimit, createShortUrl);
router.get("/", protect, getMyUrls);
router.delete("/:id", protect, deleteUrl);

export default router;
