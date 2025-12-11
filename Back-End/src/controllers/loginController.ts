import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decrypt } from "../utils/crypto";
import { LoginModel } from "../models/loginModel";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const LoginController = {
  async login(req: Request, res: Response) {
    try {
      const { usuario, senha } = req.body;

      if (!usuario || !senha) {
        return res
          .status(400)
          .json({ mensagem: "Usuário e senha são obrigatórios" });
      }

      // 🔐 Descriptografar o usuário recebido
      const usuarioDescriptografado = decrypt(usuario);

      if (!usuarioDescriptografado) {
        return res.status(400).json({ mensagem: "Usuário inválido" });
      }

      // Buscar usuário no banco
      const funcionario = await LoginModel.buscarPorUsuario(
        usuarioDescriptografado
      );

      if (!funcionario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      // Verificar senha
      const senhaCorreta = await bcrypt.compare(senha, funcionario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "Senha incorreta" });
      }

      // Criar token
      const token = jwt.sign(
        {
          cpf: funcionario.cpf,
          cargo: funcionario.cargo,
          nome: funcionario.nome,
        },
        JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.json({
        token,
        user: {
          nome: funcionario.nome,
          cargo: funcionario.cargo,
        },
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  },
};
