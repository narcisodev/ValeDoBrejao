import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as FuncModel from "../models/funcionarioModel";
import {
  validarCPF,
  validarData,
  validarSalario,
} from "../utils/funcionarioValidacoes";
import CryptoJS from "crypto-js";

const SALT_ROUNDS = 10;

const SECRET_KEY = process.env.CRYPTO_SECRET;

if (!SECRET_KEY) {
  throw new Error("CRYPTO_SECRET não está definido nas variáveis de ambiente.");
}

export interface Funcionario {
  nome: string;
  cpf: string;
  telefone: string;
  cargo: string;
  salario: number;
  admissao: string; // YYYY-MM-DD
  usuario: string;
  senha: string;
}

export const cadastrarFuncionario = async (req: Request, res: Response) => {
  try {
    const { nome, cpf, telefone, cargo, salario, admissao, usuario, senha } =
      req.body;

    if (!nome || !cpf || !cargo || !usuario || !senha)
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });

    if (!validarCPF(cpf))
      return res.status(400).json({ error: "CPF inválido" });
    if (!validarData(admissao))
      return res.status(400).json({ error: "Data inválida" });
    if (!validarSalario(Number(salario)))
      return res.status(400).json({ error: "Salário inválido" });

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

    await FuncModel.cadastrarFuncionario({
      nome,
      cpf,
      telefone,
      cargo,
      salario,
      admissao,
      usuario,
      senha: senhaHash,
    });

    res.status(201).json({ message: "Funcionário cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar funcionário" });
  }
};

export const listarFuncionarios = async (_req: Request, res: Response) => {
  try {
    const funcionarios = await FuncModel.listarFuncionarios();
    res.json(funcionarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar funcionários" });
  }
};

export const excluirFuncionario = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID não enviado" });

    const bytes = CryptoJS.AES.decrypt(id, SECRET_KEY);
    const cpf = bytes.toString(CryptoJS.enc.Utf8);
    console.log("ID RECEBIDO:", id);
    console.log("DESCRIPTOGRAFADO:", cpf);

    if (!validarCPF(cpf))
      return res.status(400).json({ error: "CPF inválido" });

    await FuncModel.deletarFuncionario(cpf);

    res.json({ message: "Funcionário excluído com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir funcionário" });
  }
};
