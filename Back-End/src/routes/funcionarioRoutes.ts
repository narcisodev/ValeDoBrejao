import { Router } from "express";
import {
  cadastrarFuncionario,
  excluirFuncionario,
  listarFuncionarios,
} from "../controllers/funcionarioController";

const router = Router();

router.post("/cadastrar", cadastrarFuncionario);
router.post("/excluir", excluirFuncionario);
router.get("/", listarFuncionarios);

export default router;
