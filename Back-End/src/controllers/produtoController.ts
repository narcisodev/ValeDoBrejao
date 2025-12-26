import { Request, Response } from "express";
import { ProdutosModel } from "../models/produtoModel";

export const ProdutoController = {
  async listar(req: Request, res: Response) {
    try {
      const produtos = await ProdutosModel.listar();
      res.json(produtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao listar produtos" });
    }
  },

  async cadastrar(req: Request, res: Response) {
    try {
      const {
        descricao,
        codigo,
        categoria,
        marca,
        precoVenda,
        precoCusto,
        quantidade,
        fornecedorId,
      } = req.body;

      if (!descricao || !codigo) {
        return res
          .status(400)
          .json({ mensagem: "Descrição e código obrigatórios" });
      }

      const result = await ProdutosModel.cadastrar({
        descricao,
        categoria: categoria || null,
        marca: marca || null,
        preco_venda: Number(precoVenda),
        preco_custo: precoCusto ? Number(precoCusto) : null,
        unidade_medida: "un",
        estoque_atual: Number(quantidade),
        estoque_minimo: 0,
        ativo: 1,
        codigo_barras: codigo,
      });

      if (fornecedorId) {
        await ProdutosModel.vincularFornecedor(
          result.insertId,
          Number(fornecedorId)
        );
      }

      res.status(201).json({ mensagem: "Produto cadastrado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao cadastrar produto" });
    }
  },

  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ mensagem: "ID obrigatório" });
      }

      await ProdutosModel.excluir(Number(id));
      res.json({ mensagem: "Produto excluído com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao excluir produto" });
    }
  },
};
