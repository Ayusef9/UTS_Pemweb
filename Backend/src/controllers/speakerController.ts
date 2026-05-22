import type { Request, Response } from "express";
import prisma from "../lib/db.js";

export const getAllSpeakers = async (req: Request, res: Response) => {
  try {
    const speakers = await prisma.speaker.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(speakers);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error,
    });
  }
};

export const createSpeaker = async (req: Request, res: Response) => {
  try {
    const { name, role, image } = req.body;

    const newSpeaker = await prisma.speaker.create({
      data: {
        name,
        role,
        image,
      },
    });

    res.status(201).json({
      message: "Speaker berhasil disimpan",
      data: newSpeaker,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat speaker",
      error,
    });
  }
};

export const speakerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const speaker = await prisma.speaker.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(speaker);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error,
    });
  }
};

export const updateSpeaker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, role, image } = req.body;

    const speaker = await prisma.speaker.update({
      where: {
        id: Number(id),
      },

      data: {
        name,
        role,
        image,
      },
    });

    res.json({
      message: "Speaker berhasil diupdate",
      data: speaker,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update data",
      error,
    });
  }
};

export const deleteSpeaker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.speaker.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Speaker berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus data",
      error,
    });
  }
};
