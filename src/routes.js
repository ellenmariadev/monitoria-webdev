import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  res.send({ API: "Monitoria WebDev Resilia - 2023 by @ellemariadev" });
});

export default routes;
