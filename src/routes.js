import { Router } from "express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const routes = new Router();

routes.get("/", (req, res) => {
  res.send({ API: "Monitoria WebDev Resilia - 2023 by @ellemariadev" });
});

routes.get("/auth", (req, res) => {
  const payload = {
    name: "Admin",
    scopes: ["admin:create", "admin:update", "admin:delete"],
  };

  const token = jwt.sign(payload, process.env.TOKEN_KEY);
  res.send({ TOKEN: token });
});

export default routes;
