import { Router } from "express";
import { FornecedoresController } from "../controllers/fornecedorController";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/", auth, FornecedoresController.listar);
router.post("/cadastrar", auth, FornecedoresController.cadastrar);
router.post("/excluir", auth, FornecedoresController.excluir);

export default router;
