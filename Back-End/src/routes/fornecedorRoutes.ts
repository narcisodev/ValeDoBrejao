import { Router } from "express";
import { FornecedoresController } from "../controllers/fornecedorController";

const router = Router();

router.get("/", FornecedoresController.listar);
router.get("/buscar", FornecedoresController.buscar);
router.post("/cadastrar", FornecedoresController.cadastrar);
router.post("/excluir", FornecedoresController.excluir);

export default router;
