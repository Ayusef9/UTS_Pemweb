import type { Request, Response } from "express";
import prisma from "../lib/db.js";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error,
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Nama category wajib diisi",
      });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      message: "Category berhasil disimpan",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat category",
      error,
    });
  }
};

export const categoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },

      data: {
        name,
      },
    });

    res.json({
      message: "Category berhasil diupdate",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update data",
      error,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Category berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus data",
      error,
    });
  }
};
