import Navbar from "../../../components/navbar/Navbar";
import SelectFilter from "../../../components/filtro/Filtro";
import styles from "./styles.module.css";
import { useState } from "react";
import Input from "../../../components/inputs/Input";

interface MovimentacaoEstoque {
  id: number;
  produto: string;
  tipo: "Entrada" | "Saída" | "Ajuste";
  quantidade: number;
  estoqueAntes: number;
  estoqueDepois: number;
  observacao: string;
  data: string;
}

export default function MovimentacoesEstoque() {
  const [filtro, setFiltro] = useState<string | number>("");

  const [movimentacoes] = useState<MovimentacaoEstoque[]>([
    {
      id: 1,
      produto: "Notebook Gamer",
      tipo: "Entrada",
      quantidade: 10,
      estoqueAntes: 5,
      estoqueDepois: 15,
      observacao: "Compra NF123",
      data: "2025-10-06 10:00",
    },
    {
      id: 2,
      produto: "Mouse Sem Fio",
      tipo: "Saída",
      quantidade: 3,
      estoqueAntes: 50,
      estoqueDepois: 47,
      observacao: "Venda #1001",
      data: "2025-10-06 12:30",
    },
    {
      id: 3,
      produto: "Teclado Mecânico",
      tipo: "Ajuste",
      quantidade: -1,
      estoqueAntes: 2,
      estoqueDepois: 1,
      observacao: "Inventário",
      data: "2025-10-06 15:00",
    },
  ]);

  return (
    <>
      <Navbar />
      <section>
        {/* Filtro */}
        <div className="bloco">
          <SelectFilter
            label="Filtrar por:"
            options={[
              { label: "Produto", value: "produto" },
              { label: "Tipo", value: "tipo" },
            ]}
            value={filtro}
            onChange={setFiltro}
            placeholder="Selecione..."
          />
          <Input label="Buscar" placeholder="Digite aqui..." />
        </div>

        {/* Tabela de Movimentações */}
        <div className={`bloco ${styles.customBloco}`}>
          <div className={styles.Header}>
            <h1>Movimentações de Estoque</h1>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>Estoque Antes</th>
                  <th>Estoque Depois</th>
                  <th>Observação</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {movimentacoes.map((m) => (
                  <tr key={m.id}>
                    <td>{m.produto}</td>
                    <td>{m.tipo}</td>
                    <td>{m.quantidade}</td>
                    <td>{m.estoqueAntes}</td>
                    <td>{m.estoqueDepois}</td>
                    <td>{m.observacao}</td>
                    <td>{m.data}</td>
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
