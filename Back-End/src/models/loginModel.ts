import { db } from "../config/database";
import { RowDataPacket } from "mysql2";

interface UsuarioRow extends RowDataPacket {
  cpf: string;
  nome: string;
  cargo: string;
  senha: string;
  login: string;
}

export const LoginModel = {
  async buscarPorUsuario(usuario: string) {
    const [rows] = await db.execute<UsuarioRow[]>(
      "SELECT cpf, nome, cargo, senha, login FROM funcionarios WHERE login = ? LIMIT 1",
      [usuario]
    );

    return rows.length > 0 ? rows[0] : null;
  },
};
