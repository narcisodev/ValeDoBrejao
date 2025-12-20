import { db } from "../config/database";
import { RowDataPacket, OkPacket } from "mysql2";

export interface ProdutoRow extends RowDataPacket {
  idProduto: number;
  nome: string;
  categoria?: string;
  marca?: string;
  preco_venda: number;
  preco_custo?: number;
  unidade_medida: "un" | "ml" | "l" | "kg" | "g";
  estoque_atual: number;
  estoque_minimo: number;
  ativo: boolean;
}

export const ProdutoModel = {
  async listar(): Promise<ProdutoRow[]> {
    const [rows] = await db.execute<ProdutoRow[]>(
      `SELECT idProduto, nome, categoria, marca, preco_venda, preco_custo, unidade_medida, estoque_atual, estoque_minimo, ativo
       FROM produtos`
    );
    return rows;
  },

  async cadastrar(produto: Omit<ProdutoRow, "idProduto">): Promise<OkPacket> {
    const {
      nome,
      categoria,
      marca,
      preco_venda,
      preco_custo,
      unidade_medida,
      estoque_atual,
      estoque_minimo,
      ativo,
    } = produto;

    const [result] = await db.execute<OkPacket>(
      `INSERT INTO produtos
        (nome, categoria, marca, preco_venda, preco_custo, unidade_medida, estoque_atual, estoque_minimo, ativo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        categoria,
        marca,
        preco_venda,
        preco_custo,
        unidade_medida,
        estoque_atual,
        estoque_minimo,
        ativo,
      ]
    );

    return result;
  },

  async editar(
    id: number,
    produto: Partial<Omit<ProdutoRow, "idProduto">>
  ): Promise<OkPacket> {
    const {
      nome,
      categoria,
      marca,
      preco_venda,
      preco_custo,
      unidade_medida,
      estoque_atual,
      estoque_minimo,
      ativo,
    } = produto;

    const [result] = await db.execute<OkPacket>(
      `UPDATE produtos SET
        nome = ?, 
        categoria = ?, 
        marca = ?, 
        preco_venda = ?, 
        preco_custo = ?, 
        unidade_medida = ?, 
        estoque_atual = ?, 
        estoque_minimo = ?, 
        ativo = ?
       WHERE idProduto = ?`,
      [
        nome,
        categoria,
        marca,
        preco_venda,
        preco_custo,
        unidade_medida,
        estoque_atual,
        estoque_minimo,
        ativo,
        id,
      ]
    );

    return result;
  },

  async excluir(id: number): Promise<OkPacket> {
    const [result] = await db.execute<OkPacket>(
      "DELETE FROM produtos WHERE idProduto = ?",
      [id]
    );
    return result;
  },
  async buscarPorId(id: number): Promise<ProdutoRow | null> {
    const [rows] = await db.execute<ProdutoRow[]>(
      `SELECT idProduto, nome, categoria, marca, preco_venda, preco_custo, unidade_medida, estoque_atual, estoque_minimo, ativo
       FROM produtos WHERE idProduto = ? LIMIT 1`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  },
};
