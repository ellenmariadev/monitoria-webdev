import express from "express";
import cors from "cors";

const app = express();

const PORT = 5050;

app.use(express.json());
app.use(cors());
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
