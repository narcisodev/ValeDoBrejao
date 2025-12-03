import { Request, Response } from "express";
import { inserirFuncionario, Funcionario } from "../models/funcionarioModel";
import bcrypt from "bcrypt";
import {
  validarCPF,
  validarData,
  validarSalario,
} from "../utils/funcionarioValidacoes";

const SALT_ROUNDS = 10;

export async function cadastrarFuncionario(req: Request, res: Response) {
  try {
    const { nome, cpf, telefone, cargo, salario, admissao, usuario, senha } =
      req.body;

    const erros: { [key: string]: string } = {};

    if (!nome) erros.nome = "Nome é obrigatório";
    if (!cpf) erros.cpf = "CPF é obrigatório";
    else if (!validarCPF(cpf)) erros.cpf = "CPF inválido";

    if (!cargo) erros.cargo = "Cargo é obrigatório";
    if (!usuario) erros.usuario = "Usuário é obrigatório";
    if (!senha) erros.senha = "Senha é obrigatória";

    if (!salario || !validarSalario(Number(salario)))
      erros.salario = "Salário inválido";
    if (!admissao || !validarData(admissao))
      erros.admissao = "Data de admissão inválida";

    if (Object.keys(erros).length > 0) return res.status(400).json({ erros });

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

    const funcionario: Funcionario = {
      nome,
      cpf,
      telefone,
      cargo,
      salario: Number(salario),
      admissao,
      usuario,
      senha: senhaHash,
    };

    await inserirFuncionario(funcionario);

    return res
      .status(201)
      .json({ message: "Funcionário cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao cadastrar funcionário" });
  }
}
