import Navbar from "../../../../components/navbar/Navbar";
import SelectFilter from "../../../../components/filtro/Filtro";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import Input from "../../../../components/inputs/Input";
import Lixo from "../../../../assets/lixo.png";
import Editar from "../../../../assets/editar.png";
import Button from "../../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useAtalhosGlobais } from "../../../../hooks/AtalhosGlobais";
import { api } from "../../../../services/backendAPI";
import { encrypt } from "../../../../utils/crypto";

interface Usuario {
  nome: string;
  cpf: string;
  telefone: string;
  cargo: string;
  usuario: string;
}

export default function Usuarios() {
  const [filtroCampo, setFiltroCampo] = useState<string | number>("nome");
  const [filtroValor, setFiltroValor] = useState<string>("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [erro, setErro] = useState<string>("");
  const navigate = useNavigate();
  useAtalhosGlobais();

  const buscarUsuarios = async () => {
    try {
      setErro("");
      const { data } = await api.get<Usuario[]>("/funcionarios");
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setErro("Erro ao buscar usuários");
    }
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const excluirUsuario = async (cpf: string) => {
    if (!window.confirm("Deseja realmente excluir este usuário?")) return;

    try {
      setErro("");

      const cpfCriptografado = encrypt(cpf);

      await api.post("/funcionarios/excluir", { id: cpfCriptografado });

      setUsuarios((prev) => prev.filter((u) => u.cpf !== cpf));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setErro("Erro ao excluir usuário");
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    if (!filtroValor) return true;
    const valor = filtroValor.toLowerCase();
    if (filtroCampo === "nome") return u.nome.toLowerCase().includes(valor);
    if (filtroCampo === "cpf") return u.cpf.includes(valor);
    return true;
  });

  return (
    <>
      <Navbar />
      <section>
        <div className="bloco">
          <SelectFilter
            label="Filtrar por:"
            options={[
              { label: "Nome", value: "nome" },
              { label: "CPF", value: "cpf" },
            ]}
            value={filtroCampo}
            onChange={setFiltroCampo}
            placeholder="Selecione..."
          />
          <Input
            label="Filtro"
            placeholder="Buscar..."
            value={filtroValor}
            onChange={(e) => setFiltroValor(e.target.value)}
          />
        </div>

        <div className={`bloco ${styles.customBloco}`}>
          <div className={styles.Header}>
            <h1>Usuários</h1>
            <Button
              type="button"
              onClick={() => navigate("/usuarios/cadastro")}
            >
              Adicionar
            </Button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Usuário</th>
                  <th>Cargo</th>
                  <th>Editar</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((u) => (
                  <tr key={u.cpf}>
                    <td>{u.nome}</td>
                    <td>{u.cpf}</td>
                    <td>{u.telefone}</td>
                    <td>{u.usuario}</td>
                    <td>{u.cargo}</td>
                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() => navigate(`/usuarios/editar/${u.cpf}`)}
                      >
                        <img src={Editar} alt="Editar" />
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() => excluirUsuario(u.cpf)}
                      >
                        <img src={Lixo} alt="Excluir" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {erro && <div className={styles.errorMessage}>{erro}</div>}
          </div>
        </div>
      </section>
    </>
  );
}
