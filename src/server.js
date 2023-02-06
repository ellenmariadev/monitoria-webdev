import express from "express";
import cors from "cors";
import routes from "./routes.js";
import { PORT } from "./config/database.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
