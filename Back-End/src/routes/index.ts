import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({ message: "API do Vale do Brejão funcionando!" });
});

export default routes;
