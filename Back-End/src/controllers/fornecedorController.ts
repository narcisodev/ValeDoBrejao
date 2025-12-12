// src/controllers/fornecedorController.ts
import { Request, Response } from "express";
import { FornecedoresModel } from "../models/fornecedorModel";

export const FornecedoresController = {
  async listar(req: Request, res: Response) {
    try {
      const fornecedores = await FornecedoresModel.listar();
      res.json(fornecedores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao listar fornecedores" });
    }
  },

  async cadastrar(req: Request, res: Response) {
    try {
      const { nome, cnpj, telefone, email, endereco } = req.body;
      if (!nome || !cnpj)
        return res
          .status(400)
          .json({ mensagem: "Nome e CNPJ são obrigatórios" });

      await FornecedoresModel.cadastrar({
        nome,
        cnpj,
        telefone,
        email,
        endereco,
      });
      res.status(201).json({ mensagem: "Fornecedor cadastrado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao cadastrar fornecedor" });
    }
  },

  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id)
        return res
          .status(400)
          .json({ mensagem: "ID do fornecedor é obrigatório" });

      await FornecedoresModel.excluir(Number(id));
      res.json({ mensagem: "Fornecedor excluído com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao excluir fornecedor" });
    }
  },
};
