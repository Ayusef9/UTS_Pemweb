import type { Request, Response } from "express";
import prisma from "../lib/db.js";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    //menampilkan ke user
    res.json(events);
  } catch (error) {
    //jika error
    res.status(500).json({
      message: "Gagal mengambil data",
      error,
    });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    //jika berhasil
    const { name, categoryId, speakerId, location, dateEvent, description } =
      req.body;
    //tambahkan validasi
    if (
      !name ||
      !categoryId ||
      !speakerId ||
      !location ||
      !dateEvent ||
      !description
    ) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }
    //simpan data
    const newEvent = await prisma.event.create({
      data: {
        name,
        categoryId: Number(categoryId),
        speakerId: Number(speakerId),
        location,
        dateEvent: new Date(dateEvent),
        description,
      },
    });

    res.status(201).json({
      message: "Data event berhasil disimpan",
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat event",
      error,
    });
  }
};

export const eventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!event) {
      return res.status(404).json({
        message: "Data event tidak ditemukan",
      });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error,
    });
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, categoryId, speakerId, location, dateEvent, description } =
      req.body;
    const updateEvent = await prisma.event.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        categoryId: Number(categoryId),
        speakerId: Number(speakerId),
        location,
        dateEvent: new Date(dateEvent),
        description,
      },
    });
    res.json({
      message: "Data berhasil diupdate",
      data: updateEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update data",
      error,
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus data",
      error,
    });
  }
};
