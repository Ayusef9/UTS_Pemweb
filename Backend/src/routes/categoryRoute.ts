import express from "express";

import {
    getAllCategories,
    createCategory,
    categoryById,
    updateCategory,
    deleteCategory
}
from "../controllers/categoryController.js";

const router = express.Router();

//GET ALL
router.get("/", getAllCategories);
//CREATE
router.post("/", createCategory);
//GET BY ID
router.get("/:id", categoryById);
//UPDATE
router.put("/:id", updateCategory);
//DELETE
router.delete("/:id", deleteCategory);
export default router;