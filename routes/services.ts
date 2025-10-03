import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET all services
router.get("/", async (_req, res) => {
  const services = await prisma.service.findMany();
  res.json(services);
});

// GET one service
router.get("/:id", async (req, res) => {
  const service = await prisma.service.findUnique({
    where: { id: Number(req.params.id) }
  });
  res.json(service);
});

// POST new service
router.post("/", async (req, res) => {
  const { title, subtitle, content, category, imageUrl } = req.body;
  const newService = await prisma.service.create({
    data: { title, subtitle, content, category, imageUrl }
  });
  res.json(newService);
});

export default router;