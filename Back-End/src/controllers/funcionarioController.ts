import { Request, Response } from "express";
import { inserirFuncionario } from "../models/funcionarioModel";

export async function criarFuncionario(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const data = req.body;

    await inserirFuncionario(data);

    res.status(201).json({ message: "Funcionário criado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar funcionário" });
  }
}
