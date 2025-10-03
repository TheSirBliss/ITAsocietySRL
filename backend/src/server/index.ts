import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import servicesRouter from "../routes/services";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/services", servicesRouter(prisma));

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });
  try {
    const saved = await prisma.contactMessage.create({
      data: { name, email, message },
    });
    return res.status(201).json({ ok: true, id: saved.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});