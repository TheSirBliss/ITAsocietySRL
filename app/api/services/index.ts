// api/services/index.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

const servicesMeta = [
  { id: "images", titleKey: "services.images.title", shortKey: "services.images.short", image: "/images/services/images.jpg" },
  { id: "gif", titleKey: "services.gif.title", shortKey: "services.gif.short", image: "/images/services/gif.gif" },
  { id: "vr-ar", titleKey: "services.vrar.title", shortKey: "services.vrar.short", image: "/images/services/vrar.jpg" },
  // ... keep in sync with src/data/services.ts
];

export default function (req: VercelRequest, res: VercelResponse) {
  // simple caching header
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
  res.status(200).json({ ok: true, data: servicesMeta });
}