import { db } from "../config/database";
import { RowDataPacket, OkPacket } from "mysql2";

export interface FornecedorRow extends RowDataPacket {
  idFornecedor: number;
  nome: string;
  cnpj: string;
  telefone?: string;
  email?: string;
  endereco?: string;
}

export const FornecedoresModel = {
  async listar(): Promise<FornecedorRow[]> {
    const [rows] = await db.execute<FornecedorRow[]>(
      "SELECT idFornecedor, nome, cnpj, telefone, email, endereco FROM fornecedores"
    );
    return rows;
  },

  async buscarPorId(id: number): Promise<FornecedorRow | null> {
    const [rows] = await db.execute<FornecedorRow[]>(
      "SELECT idFornecedor, nome, cnpj, telefone, email, endereco FROM fornecedores WHERE idFornecedor = ? LIMIT 1",
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  },

  async cadastrar(
    fornecedor: Omit<FornecedorRow, "idFornecedor">
  ): Promise<OkPacket> {
    const { nome, cnpj, telefone, email, endereco } = fornecedor;
    const [result] = await db.execute<OkPacket>(
      "INSERT INTO fornecedores (nome, cnpj, telefone, email, endereco) VALUES (?, ?, ?, ?, ?)",
      [nome, cnpj, telefone, email, endereco]
    );
    return result;
  },

  async excluir(id: number): Promise<OkPacket> {
    const [result] = await db.execute<OkPacket>(
      "DELETE FROM fornecedores WHERE idFornecedor = ?",
      [id]
    );
    return result;
  },
};
