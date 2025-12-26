import { Request, Response } from "express";
import { FornecedoresModel } from "../models/fornecedorModel";
import { decrypt } from "../utils/crypto";

export const FornecedoresController = {
  // 🔹 LISTAR TODOS
  async listar(req: Request, res: Response) {
    try {
      const fornecedores = await FornecedoresModel.listar();
      res.json(fornecedores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao listar fornecedores" });
    }
  },

  // 🔎 BUSCAR POR TERMO
  async buscar(req: Request, res: Response) {
    try {
      const { termo } = req.query;

      if (!termo || String(termo).trim().length < 2) {
        return res.json([]);
      }

      const fornecedores = await FornecedoresModel.buscar(String(termo));
      res.json(fornecedores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao buscar fornecedores" });
    }
  },

  async cadastrar(req: Request, res: Response) {
    try {
      const { nome, cnpj, telefone, email, endereco } = req.body;

      if (!nome || !cnpj) {
        return res
          .status(400)
          .json({ mensagem: "Nome e CNPJ são obrigatórios" });
      }

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

      if (!id) {
        return res
          .status(400)
          .json({ mensagem: "ID do fornecedor é obrigatório" });
      }

      const idDescriptografado = Number(decrypt(id));

      if (isNaN(idDescriptografado)) {
        return res.status(400).json({ mensagem: "ID inválido" });
      }

      await FornecedoresModel.excluir(idDescriptografado);

      res.json({ mensagem: "Fornecedor excluído com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao excluir fornecedor" });
    }
  },
};
