import express from "express";
import cors from "cors";
import routes from "./routes.js";
import { PORT } from "./config/database.js";
import swaggerUi from "swagger-ui-express";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("../swagger.json");

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/swagger", (req, res) => {
  return res.sendFile(process.cwd() + "/swagger.json");
});
app.get("/docs", (req, res) => {
  return res.sendFile(process.cwd() + "/index.html");
});
app.use(cors());
app.use(routes);
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
