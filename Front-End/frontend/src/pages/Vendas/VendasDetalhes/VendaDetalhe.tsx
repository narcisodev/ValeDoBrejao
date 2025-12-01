import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Button from "../../../components/buttons/Button";
import styles from "./styles.module.css";
import { useAtalhosGlobais } from "../../../hooks/AtalhosGlobais";

interface ItemVenda {
  idProduto: number;
  nome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export default function VendaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  useAtalhosGlobais();

  const venda = {
    id,
    funcionario: "João Silva",
    data: "2025-10-05",
    horario: "14:32",
    valorTotal: 250.75,
    status: "Finalizada",
    itens: [
      {
        idProduto: 1,
        nome: "Cerveja Artesanal",
        quantidade: 3,
        precoUnitario: 25.0,
        subtotal: 75.0,
      },
      {
        idProduto: 2,
        nome: "Espetinho de Frango",
        quantidade: 5,
        precoUnitario: 20.0,
        subtotal: 100.0,
      },
      {
        idProduto: 3,
        nome: "Refrigerante Lata",
        quantidade: 5,
        precoUnitario: 15.15,
        subtotal: 75.75,
      },
    ] as ItemVenda[],
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="bloco">
          <div>
            <h1>Detalhes da Venda #{venda.id}</h1>

            <div className={styles.infoVenda}>
              <p>
                <strong>Funcionário:</strong> {venda.funcionario}
              </p>
              <p>
                <strong>Data:</strong>{" "}
                {new Date(venda.data).toLocaleDateString()}
              </p>
              <p>
                <strong>Horário:</strong> {venda.horario}
              </p>
              <p>
                <strong>Status:</strong> {venda.status}
              </p>
              <p>
                <strong>Valor Total:</strong> R$ {venda.valorTotal.toFixed(2)}
              </p>
            </div>

            <h2>Itens da Venda</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço Unitário</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {venda.itens.map((item) => (
                  <tr key={item.idProduto}>
                    <td>{item.nome}</td>
                    <td>{item.quantidade}</td>
                    <td>R$ {item.precoUnitario.toFixed(2)}</td>
                    <td>R$ {item.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <Button
                type="button"
                onClick={() => navigate("/vendas/historico")}
              >
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
