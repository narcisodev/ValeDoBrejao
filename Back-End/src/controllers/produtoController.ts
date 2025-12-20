import { Request, Response } from "express";
import { ProdutoModel } from "../models/produtoModel";

export const ProdutoController = {
  async listar(req: Request, res: Response) {
    try {
      const produtos = await ProdutoModel.listar();
      res.json(produtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao listar produtos" });
    }
  },

  async cadastrar(req: Request, res: Response) {
    try {
      const { descricao, codigo, estoque, preco } = req.body;
      if (!descricao || !codigo)
        return res
          .status(400)
          .json({ mensagem: "Descrição e código obrigatórios" });

      await ProdutoModel.cadastrar({ descricao, codigo, estoque, preco });
      res.status(201).json({ mensagem: "Produto cadastrado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao cadastrar produto" });
    }
  },

  async editar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { descricao, codigo, estoque, preco } = req.body;

      await ProdutoModel.editar(Number(id), {
        descricao,
        codigo,
        estoque,
        preco,
      });
      res.json({ mensagem: "Produto atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao atualizar produto" });
    }
  },

  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ mensagem: "ID obrigatório" });

      await ProdutoModel.excluir(Number(id));
      res.json({ mensagem: "Produto excluído com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao excluir produto" });
    }
  },
};
