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

interface Produto {
  id: number;
  descricao: string;
  codigo: string;
  estoque: number;
  preco: number;
}

export default function Produtos() {
  const [filtroCampo, setFiltroCampo] = useState<string>("descricao");
  const [filtroValor, setFiltroValor] = useState<string>("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState<string>("");

  const navigate = useNavigate();
  useAtalhosGlobais();

  const buscarProdutos = async () => {
    try {
      setErro("");
      const { data } = await api.get<Produto[]>("/produtos");
      setProdutos(data);
    } catch (error) {
      console.error(error);
      setErro("Erro ao buscar produtos");
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  const handleExcluir = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir este produto?")) return;

    try {
      await api.post("/produtos/excluir", { id });
      await buscarProdutos();
    } catch (error) {
      console.error(error);
      setErro("Erro ao excluir produto");
    }
  };

  const produtosFiltrados = produtos.filter((p) => {
    const valor = filtroValor.toLowerCase();
    if (!valor) return true;
    if (filtroCampo === "descricao")
      return p.descricao.toLowerCase().includes(valor);
    if (filtroCampo === "codigo") return p.codigo.toLowerCase().includes(valor);
    if (filtroCampo === "baixoEstoque") return p.estoque < 5;
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
              { label: "Descrição", value: "descricao" },
              { label: "Código", value: "codigo" },
              { label: "Baixo estoque", value: "baixoEstoque" },
            ]}
            value={filtroCampo}
            onChange={(value) => setFiltroCampo(String(value))}
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
            <h1>Produtos</h1>
            <Button
              type="button"
              onClick={() => navigate("/produtos/cadastro")}
            >
              Adicionar
            </Button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Código</th>
                  <th>Estoque</th>
                  <th>Preço (R$)</th>
                  <th>Editar</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map((p) => (
                  <tr key={p.id}>
                    <td>{p.descricao}</td>
                    <td>{p.codigo}</td>
                    <td>{p.estoque}</td>
                    <td>{p.preco.toFixed(2)}</td>
                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() => navigate(`/produtos/editar/${p.id}`)}
                      >
                        <img src={Editar} alt="Editar" />
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() => handleExcluir(p.id)}
                      >
                        <img src={Lixo} alt="Excluir" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {erro && <p className={styles.errorMessage}>{erro}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
