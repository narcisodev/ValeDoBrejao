import { useState } from "react";
import SelectFilter from "../../../components/filtro/Filtro";
import Navbar from "../../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/inputs/Input";
import styles from "./styles.module.css";
import Info from "../../../assets/info.png";

interface Venda {
  id: number;
  funcionario: string;
  data: string;
  valorTotal: number;
  status: "Finalizada" | "Cancelada" | "Em andamento";
}

export default function HistoricoVenda() {
  const [filtro, setFiltro] = useState<string | number>("");
  const navigate = useNavigate();

  const [vendas] = useState<Venda[]>([
    {
      id: 101,
      funcionario: "João Silva",
      data: "2025-10-05",
      valorTotal: 250.75,
      status: "Finalizada",
    },
    {
      id: 102,
      funcionario: "Maria Souza",
      data: "2025-10-04",
      valorTotal: 150.0,
      status: "Cancelada",
    },
    {
      id: 103,
      funcionario: "Carlos Pereira",
      data: "2025-10-03",
      valorTotal: 420.9,
      status: "Em andamento",
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
              { label: "Funcionário", value: "funcionario" },
              { label: "Data", value: "data" },
              { label: "Status", value: "status" },
            ]}
            value={filtro}
            onChange={setFiltro}
            placeholder="Selecione..."
          />
          <Input label="Filtro" placeholder="Buscar..." />
        </div>

        <div className={`bloco ${styles.customBloco}`}>
          <div className={styles.Header}>
            <h1>Histórico de Vendas</h1>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID da Venda</th>
                  <th>Funcionário</th>
                  <th>Data</th>
                  <th>Valor Total</th>
                  <th>Status</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {vendas.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.funcionario}</td>
                    <td>{new Date(v.data).toLocaleDateString()}</td>
                    <td>R$ {v.valorTotal.toFixed(2)}</td>
                    <td
                      className={
                        v.status === "Finalizada"
                          ? styles.statusFinalizada
                          : v.status === "Cancelada"
                          ? styles.statusCancelada
                          : styles.statusAndamento
                      }
                    >
                      {v.status}
                    </td>
                    <td>
                      <button
                        className={styles.iconButton}
                        onClick={() =>
                          navigate(`/vendas/historico/buscar/${v.id}`)
                        }
                      >
                        <img src={Info} alt="Detalhes" />
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
