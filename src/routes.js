import { Router } from "express";
import CategoryController from "./controller/Category.js";
import authorization from "./middleware/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const routes = new Router();

routes.get("/", (req, res) => {
  res.send({ API: "Monitoria WebDev Resilia - 2023 by @ellemariadev" });
});

// authentication token route
routes.get("/auth", (req, res) => {
  const payload = {
    name: "Admin",
    scopes: ["admin:create", "admin:update", "admin:delete"],
  };

  const token = jwt.sign(payload, process.env.TOKEN_KEY);
  res.send({ TOKEN: token });
});

// categories routes
routes.post(
  "/category",
  authorization("admin:create"),
  CategoryController.create,
);
routes.get("/categories", CategoryController.getAll);
routes.get("/category/:id", CategoryController.getById);
routes.put(
  "/category/:id",
  authorization("admin:update"),
  CategoryController.alter,
);
routes.delete(
  "/category/:id",
  authorization("admin:delete"),
  CategoryController.remove,
);

export default routes;
