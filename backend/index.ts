import express from "express";
import cors from "cors";
import servicesRouter from "../routes/services";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/services", servicesRouter);

app.listen(4000, () => {
  console.log("🚀 Backend running on http://localhost:4000");
});