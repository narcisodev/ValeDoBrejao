import { db } from "../config/database";
import { RowDataPacket, OkPacket } from "mysql2";

export interface ProdutoRow extends RowDataPacket {
  idProduto: number;
  descricao: string;
  categoria: string | null;
  marca: string | null;
  preco_venda: number;
  codigo_barras: string | null;
  estoque_atual: number;
  ativo: number;
}

export const ProdutosModel = {
  async listar(): Promise<ProdutoRow[]> {
    const [rows] = await db.execute<ProdutoRow[]>(
      `
      SELECT 
        idProduto,
        descricao,
        categoria,
        marca,
        preco_venda,
        codigo_barras,
        estoque_atual,
        ativo
      FROM produtos
      `
    );
    return rows;
  },

  async buscar(termo: string): Promise<ProdutoRow[]> {
    const like = `%${termo}%`;
    const [rows] = await db.execute<ProdutoRow[]>(
      `
      SELECT 
        idProduto,
        descricao,
        categoria,
        marca,
        preco_venda,
        codigo_barras,
        estoque_atual,
        ativo
      FROM produtos
      WHERE 
        descricao LIKE ?
        OR codigo_barras LIKE ?
      `,
      [like, like]
    );
    return rows;
  },

  async cadastrar(produto: Omit<ProdutoRow, "idProduto">): Promise<OkPacket> {
    const {
      descricao,
      categoria,
      marca,
      preco_venda,
      codigo_barras,
      estoque_atual,
      ativo,
    } = produto;

    const [result] = await db.execute<OkPacket>(
      `
      INSERT INTO produtos
      (descricao, categoria, marca, preco_venda, codigo_barras, estoque_atual, ativo)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        descricao,
        categoria,
        marca,
        preco_venda,
        codigo_barras,
        estoque_atual,
        ativo,
      ]
    );

    return result;
  },

  async vincularFornecedor(idProduto: number, idFornecedor: number) {
    await db.execute(
      `
    INSERT INTO produto_fornecedor (idProduto, idFornecedor)
    VALUES (?, ?)
    `,
      [idProduto, idFornecedor]
    );
  },

  async excluir(id: number): Promise<OkPacket> {
    const [result] = await db.execute<OkPacket>(
      "DELETE FROM produtos WHERE idProduto = ?",
      [id]
    );
    return result;
  },
};
