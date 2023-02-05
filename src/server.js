import express from "express";
import cors from "cors";
import { PORT } from "./config/database";

const app = express();

app.use(express.json());
app.use(cors());
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
