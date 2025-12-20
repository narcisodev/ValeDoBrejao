import { Router } from "express";
import { ProdutoController } from "../controllers/produtoController";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/", auth, ProdutoController.listar);
router.post("/cadastrar", auth, ProdutoController.cadastrar);
router.put("/editar/:id", auth, ProdutoController.editar);
router.post("/excluir", auth, ProdutoController.excluir);

export default router;
