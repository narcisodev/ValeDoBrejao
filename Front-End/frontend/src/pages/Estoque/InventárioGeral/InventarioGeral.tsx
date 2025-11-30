import Navbar from "../../../components/navbar/Navbar";
import SelectFilter from "../../../components/filtro/Filtro";
import styles from "./styles.module.css";
import { useState } from "react";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";

interface ProdutoInventario {
  id: number;
  descricao: string;
  codigo: string;
  estoqueAtual: number;
  contagemFisica: number;
}

export default function InventarioGeral() {
  const [filtro, setFiltro] = useState<string | number>("");

  // Dados fictícios
  const [produtos, setProdutos] = useState<ProdutoInventario[]>([
    {
      id: 1,
      descricao: "Notebook Gamer",
      codigo: "NB001",
      estoqueAtual: 5,
      contagemFisica: 5,
    },
    {
      id: 2,
      descricao: "Mouse Sem Fio",
      codigo: "MSF002",
      estoqueAtual: 50,
      contagemFisica: 0,
    },
    {
      id: 3,
      descricao: "Teclado Mecânico",
      codigo: "TLM003",
      estoqueAtual: 2,
      contagemFisica: 0,
    },
  ]);

  // Função para atualizar a contagem física
  const handleContagemChange = (id: number, valor: number) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, contagemFisica: valor } : p))
    );
  };

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
            <h1>Inventário Geral</h1>
            <Button type="button" onClick={() => console.log("Gerar ajustes")}>
              Aplicar Ajustes
            </Button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Código</th>
                  <th>Estoque Atual</th>
                  <th>Contagem Física</th>
                  <th>Diferença</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => {
                  const diferenca = p.contagemFisica - p.estoqueAtual;
                  return (
                    <tr key={p.id}>
                      <td>{p.descricao}</td>
                      <td>{p.codigo}</td>
                      <td>{p.estoqueAtual}</td>
                      <td>
                        <Input
                          label=""
                          type="number"
                          value={p.contagemFisica.toString()} // converte para string
                          onChange={
                            (e) =>
                              handleContagemChange(p.id, Number(e.target.value)) // converte para number na função
                          }
                        />
                      </td>
                      <td style={{ color: diferenca === 0 ? "green" : "red" }}>
                        {diferenca}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
