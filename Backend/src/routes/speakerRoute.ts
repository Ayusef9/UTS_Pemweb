import express from "express";

import {

    getAllSpeakers,
    createSpeaker,
    speakerById,
    updateSpeaker,
    deleteSpeaker

}
from "../controllers/speakerController.js";

const router = express.Router();

//GET ALL
router.get("/", getAllSpeakers);

//CREATE
router.post("/", createSpeaker);

//GET BY ID
router.get("/:id", speakerById);

//UPDATE
router.put("/:id", updateSpeaker);

//DELETE
router.delete("/:id", deleteSpeaker);

export default router;