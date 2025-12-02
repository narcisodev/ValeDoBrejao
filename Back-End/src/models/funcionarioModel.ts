import { db } from "../config/database";

export interface Funcionario {
  nome: string;
  cpf: string;
  telefone: string;
  cargo: string;
  salario: number;
  admissao: string;
  usuario: string;
  senha: string;
}

export async function inserirFuncionario(data: Funcionario): Promise<void> {
  const sql = `
    INSERT INTO funcionarios
    (nome, cpf, telefone, cargo, salario, admissao, usuario, senha)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.nome,
    data.cpf,
    data.telefone,
    data.cargo,
    data.salario,
    data.admissao,
    data.usuario,
    data.senha,
  ];

  await db.execute(sql, values);
}
