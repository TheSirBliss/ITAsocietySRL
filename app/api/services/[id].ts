// api/services/[id].ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

export default async function (req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) return res.status(400).json({ ok: false, message: "id required" });

  try {
    const mdPath = path.join(process.cwd(), "content", "services", `${id}.md`);
    const md = await readFile(mdPath, "utf8");
    // optionally parse frontmatter or convert to HTML server-side here
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ ok: true, data: { id, markdown: md } });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "not found" });
  }
}