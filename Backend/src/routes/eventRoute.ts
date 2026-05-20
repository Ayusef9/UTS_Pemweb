import express from "express";

import {
  getAllEvents,
  createEvent,
  eventById,
  updateById,
  deleteById
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", createEvent);
router.get("/:id", eventById);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

export default router;