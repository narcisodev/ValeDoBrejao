import Navbar from "../../../../components/navbar/Navbar";
import SelectFilter from "../../../../components/filtro/Filtro";
import styles from "./styles.module.css";
import { useState } from "react";
import Input from "../../../../components/inputs/Input";
import Lixo from "../../../../assets/lixo.png";
import Editar from "../../../../assets/editar.png";
import Button from "../../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useAtalhosGlobais } from "../../../../hooks/AtalhosGlobais";

interface Produto {
  id: number;
  descricao: string;
  codigo: string;
  estoque: number;
  preco: number;
}

export default function Produtos() {
  const [filtro, setFiltro] = useState<string | number>("");
  const navigate = useNavigate();
  useAtalhosGlobais();

  // Dados fictícios
  const [produtos] = useState<Produto[]>([
    {
      id: 1,
      descricao: "Notebook Gamer",
      codigo: "NB001",
      estoque: 5,
      preco: 4500.0,
    },
    {
      id: 2,
      descricao: "Mouse Sem Fio",
      codigo: "MSF002",
      estoque: 50,
      preco: 120.5,
    },
    {
      id: 3,
      descricao: "Teclado Mecânico",
      codigo: "TLM003",
      estoque: 2,
      preco: 300.0,
    },
  ]);

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
            value={filtro}
            onChange={setFiltro}
            placeholder="Selecione..."
          />
          <Input label="Filtro" placeholder="Buscar..." />
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
                {produtos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.descricao}</td>
                    <td>{p.codigo}</td>
                    <td>{p.estoque}</td>
                    <td>{p.preco.toFixed(2)}</td>
                    <td>
                      <button className={styles.iconButton}>
                        <img src={Editar} alt="Editar" />
                      </button>
                    </td>
                    <td>
                      <button className={styles.iconButton}>
                        <img src={Lixo} alt="Excluir" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
