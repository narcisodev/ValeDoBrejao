import Navbar from "../../../components/navbar/Navbar";
import SelectFilter from "../../../components/filtro/Filtro";
import Input from "../../../components/inputs/Input";
import styles from "./styles.module.css";
import { useState } from "react";

interface MovimentoCaixa {
  id: number;
  tipo: "entrada" | "saida";
  descricao: string;
  formasPagamento: { forma: string; valor: number }[];
  data: string;
}

export default function FluxoDeCaixa() {
  const [filtro, setFiltro] = useState<string | number>("");
  const [busca, setBusca] = useState("");

  const [movimentos] = useState<MovimentoCaixa[]>([
    {
      id: 1,
      tipo: "entrada",
      descricao: "Venda #1023",
      formasPagamento: [
        { forma: "PIX", valor: 120 },
        { forma: "Dinheiro", valor: 30 },
      ],
      data: "2025-11-28",
    },
    {
      id: 2,
      tipo: "entrada",
      descricao: "Venda #1024",
      formasPagamento: [{ forma: "Crédito", valor: 200 }],
      data: "2025-11-28",
    },
    {
      id: 3,
      tipo: "saida",
      descricao: "Pagamento de Fornecedor",
      formasPagamento: [{ forma: "PIX", valor: 150 }],
      data: "2025-11-28",
    },
    {
      id: 4,
      tipo: "saida",
      descricao: "Compra Embalagens",
      formasPagamento: [
        { forma: "Débito", valor: 40 },
        { forma: "Dinheiro", valor: 10 },
      ],
      data: "2025-11-27",
    },
  ]);

  const movimentosFiltrados = movimentos.filter((m) =>
    m.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  const totalEntradas = movimentosFiltrados
    .filter((m) => m.tipo === "entrada")
    .reduce(
      (acc, m) =>
        acc + m.formasPagamento.reduce((soma, fp) => soma + fp.valor, 0),
      0
    );

  const totalSaidas = movimentosFiltrados
    .filter((m) => m.tipo === "saida")
    .reduce(
      (acc, m) =>
        acc + m.formasPagamento.reduce((soma, fp) => soma + fp.valor, 0),
      0
    );

  const saldo = totalEntradas - totalSaidas;

  return (
    <>
      <Navbar />

      <section>
        <div className="bloco">
          <SelectFilter
            label="Filtrar por:"
            options={[
              { label: "Tudo", value: "" },
              { label: "Entradas", value: "entrada" },
              { label: "Saídas", value: "saida" },
              { label: "PIX", value: "PIX" },
              { label: "Dinheiro", value: "Dinheiro" },
              { label: "Crédito", value: "Crédito" },
            ]}
            value={filtro}
            onChange={setFiltro}
            placeholder="Selecione..."
          />

          <Input
            label="Filtro"
            placeholder="Buscar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className={`bloco ${styles.customBloco}`}>
          <div className={styles.Header}>
            <h1>Fluxo de Caixa</h1>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Forma(s) de Pagamento</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {movimentosFiltrados.map((m) => {
                  const totalMovimento = m.formasPagamento.reduce(
                    (acc, fp) => acc + fp.valor,
                    0
                  );

                  return (
                    <tr key={m.id}>
                      <td>{m.descricao}</td>
                      <td>{m.data}</td>

                      <td
                        style={{
                          color: m.tipo === "entrada" ? "green" : "red",
                        }}
                      >
                        {m.tipo.toUpperCase()}
                      </td>

                      <td>
                        {m.formasPagamento.map((fp, index) => (
                          <div key={index}>
                            {fp.forma}: R$ {fp.valor.toFixed(2)}
                          </div>
                        ))}
                      </td>

                      <td>
                        <strong>R$ {totalMovimento.toFixed(2)}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.totais}>
            <p>
              <strong>Total de Entradas:</strong> R$ {totalEntradas.toFixed(2)}
            </p>
            <p>
              <strong>Total de Saídas:</strong> R$ {totalSaidas.toFixed(2)}
            </p>
            <p>
              <strong>Saldo Final:</strong>{" "}
              <span style={{ color: saldo >= 0 ? "green" : "red" }}>
                R$ {saldo.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
