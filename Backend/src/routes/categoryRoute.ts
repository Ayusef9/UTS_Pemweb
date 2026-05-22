import express from "express";

import {
  getAllCategories,
  createCategory,
  categoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/:id", categoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;
