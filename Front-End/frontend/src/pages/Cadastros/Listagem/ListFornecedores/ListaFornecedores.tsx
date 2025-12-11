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

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  contato: string;
}

export default function Fornecedores() {
  const [filtroCampo, setFiltroCampo] = useState<string>("fornecedor");
  const [filtroValor, setFiltroValor] = useState<string>("");

  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [erro, setErro] = useState<string>("");

  const navigate = useNavigate();
  useAtalhosGlobais();

  // 🔍 Buscar fornecedores da API
  const buscarFornecedores = async () => {
    try {
      setErro("");
      const { data } = await api.get<Fornecedor[]>("/fornecedores");
      setFornecedores(data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
      setErro("Erro ao buscar fornecedores");
    }
  };

  useEffect(() => {
    buscarFornecedores();
  }, []);

  // ❌ Excluir fornecedor com criptografia (como no módulo de usuários)
  async function excluirFornecedor(cnpj: string) {
    try {
      const cnpjCriptografado = encrypt(cnpj);

      await api.post("/fornecedores/excluir", { id: cnpjCriptografado });

      // Atualiza a lista após excluir
      buscarFornecedores();
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      setErro("Erro ao excluir fornecedor");
    }
  }

  // 🔎 Filtro
  const fornecedoresFiltrados = fornecedores.filter((f) => {
    if (!filtroValor) return true;

    const valor = filtroValor.toLowerCase();

    if (filtroCampo === "fornecedor") {
      return f.nome.toLowerCase().includes(valor);
    }

    if (filtroCampo === "cnpj") {
      return f.cnpj.includes(valor);
    }

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
              { label: "Fornecedor", value: "fornecedor" },
              { label: "CNPJ", value: "cnpj" },
            ]}
            value={filtroCampo}
            onChange={(v) => setFiltroCampo(String(v))}
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
            <h1>Fornecedores</h1>
            <Button
              type="button"
              onClick={() => navigate("/fornecedores/cadastro")}
            >
              Adicionar
            </Button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fornecedor</th>
                  <th>CNPJ</th>
                  <th>Contato</th>
                  <th>Editar</th>
                  <th>Excluir</th>
                </tr>
              </thead>

              <tbody>
                {fornecedoresFiltrados.map((f) => (
                  <tr key={f.id}>
                    <td>{f.nome}</td>
                    <td>{f.cnpj}</td>
                    <td>{f.contato}</td>

                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() =>
                          navigate(`/fornecedores/editar/${f.cnpj}`)
                        }
                      >
                        <img src={Editar} alt="Editar" />
                      </button>
                    </td>

                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() => excluirFornecedor(f.cnpj)}
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
