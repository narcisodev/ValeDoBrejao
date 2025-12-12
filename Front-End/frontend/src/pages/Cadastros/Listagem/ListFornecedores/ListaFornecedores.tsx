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
import type { AxiosError } from "axios";

interface Fornecedor {
  idFornecedor: number;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: string;
}

export default function Fornecedores() {
  const [filtroCampo, setFiltroCampo] = useState<string>("fornecedor");
  const [filtroValor, setFiltroValor] = useState<string>("");
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [erro, setErro] = useState<string>("");
  const [loadingExcluir, setLoadingExcluir] = useState<number | null>(null);

  const navigate = useNavigate();
  useAtalhosGlobais();

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

  const excluirFornecedor = async (idFornecedor: number) => {
    try {
      setLoadingExcluir(idFornecedor);
      const idCriptografado = encrypt(String(idFornecedor));
      await api.post("/fornecedores/excluir", { id: idCriptografado });
      await buscarFornecedores();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        setErro("Não foi possível excluir o fornecedor");
      } else if (axiosError.request) {
        setErro("Erro de conexão. Tente novamente.");
      } else {
        setErro("Ocorreu um erro inesperado.");
      }

      console.error("Erro ao excluir fornecedor:", error);
    } finally {
      setLoadingExcluir(null);
    }
  };

  const handleExcluir = (id: number, nome: string) => {
    console.log("handleExcluir chamado", id, nome);
    if (
      window.confirm(`Tem certeza que deseja excluir o fornecedor "${nome}"?`)
    ) {
      excluirFornecedor(id);
    }
  };

  const fornecedoresFiltrados = fornecedores.filter((f) => {
    if (!filtroValor) return true;
    const valor = filtroValor.toLowerCase();
    if (filtroCampo === "fornecedor")
      return f.nome.toLowerCase().includes(valor);
    if (filtroCampo === "cnpj") return f.cnpj.includes(valor);
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
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>Endereço</th>
                  <th>Editar</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {fornecedoresFiltrados.map((f) => (
                  <tr key={f.idFornecedor}>
                    <td>{f.nome}</td>
                    <td>{f.cnpj}</td>
                    <td>{f.telefone}</td>
                    <td>{f.email}</td>
                    <td>{f.endereco}</td>

                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() =>
                          navigate(`/fornecedores/editar/${f.idFornecedor}`)
                        }
                      >
                        <img src={Editar} alt="Editar" />
                      </button>
                    </td>

                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() => handleExcluir(f.idFornecedor, f.nome)}
                        disabled={loadingExcluir === f.idFornecedor}
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
