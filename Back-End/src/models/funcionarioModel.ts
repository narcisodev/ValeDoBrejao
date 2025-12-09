import { db } from "../config/database";
import { Funcionario } from "../controllers/funcionarioController";

export async function cadastrarFuncionario(data: Funcionario) {
  const sql = `
    INSERT INTO funcionarios
    (nome, cpf, telefone, cargo, salario, data_admissao, login, senha)
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

export async function atualizarFuncionario(cpf: string, data: Funcionario) {
  const sql = `
    UPDATE funcionarios
    SET nome=?, telefone=?, cargo=?, salario=?, data_admissao=?, login=?, senha=?
    WHERE cpf=?
  `;
  const values = [
    data.nome,
    data.telefone,
    data.cargo,
    data.salario,
    data.admissao,
    data.usuario,
    data.senha,
    cpf,
  ];
  await db.execute(sql, values);
}

export async function deletarFuncionario(cpf: string) {
  await db.execute("DELETE FROM funcionarios WHERE cpf=?", [cpf]);
}

export async function listarFuncionarios() {
  const [rows] = await db.execute(
    `SELECT nome, cpf, telefone, cargo, salario, data_admissao AS admissao, login AS usuario
     FROM funcionarios`
  );
  return rows;
}
export { Funcionario };
