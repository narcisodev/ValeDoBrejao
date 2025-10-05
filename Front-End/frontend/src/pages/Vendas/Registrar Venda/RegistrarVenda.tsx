import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import lixo from "../../../assets/lixo.png";
import styles from "./styles.module.css";

// Interface para itens de venda
interface ItemVenda {
  idProduto: number;
  nome: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

// Interface para produtos da tabela
interface ProdutoTabela {
  id: number;
  descricao: string;
  codigo: string;
  estoque: number;
  preco: number;
}

export default function RegistrarVenda() {
  // Estados de inputs
  const [produtoInput, setProdutoInput] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [itens, setItens] = useState<ItemVenda[]>([]);

  // Produtos fictícios para tabela
  const [produtosTabela] = useState<ProdutoTabela[]>([
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

  // Adicionar produto à lista de venda
  const adicionarProduto = () => {
    const produto = produtosTabela.find(
      (p) =>
        p.codigo.toLowerCase() === produtoInput.toLowerCase() ||
        p.descricao.toLowerCase().includes(produtoInput.toLowerCase())
    );

    if (!produto) {
      alert("Produto não encontrado");
      return;
    }

    const subtotal = produto.preco * quantidade;

    setItens([
      ...itens,
      {
        idProduto: produto.id,
        nome: produto.descricao,
        quantidade,
        preco_unitario: produto.preco,
        subtotal,
      },
    ]);

    setProdutoInput("");
    setQuantidade(1);
  };

  // Remover item da venda
  const removerItem = (idProduto: number) => {
    setItens(itens.filter((i) => i.idProduto !== idProduto));
  };

  // Finalizar venda (simulação)
  const valorTotal = itens.reduce((acc, item) => acc + item.subtotal, 0);
  const finalizarVenda = () => {
    console.log("Itens da venda:", itens);
    console.log("Valor total:", valorTotal.toFixed(2));
    alert("Venda finalizada (simulação)");
    setItens([]);
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="bloco">
          <div>
            <h1>Registrar Venda</h1>
            <hr />

            {/* Inputs de adicionar produtos */}
            <div className={styles.inputs}>
              <Input
                label="Código ou Produto"
                placeholder="Digite código ou descrição..."
                value={produtoInput}
                onChange={(e) => setProdutoInput(e.target.value)}
              />
              <Input
                label="Quantidade"
                placeholder="1"
                value={quantidade.toString()}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              />
            </div>
            <div>
              <Button type="button" onClick={adicionarProduto}>
                Adicionar
              </Button>
            </div>

            {/* Tabela de produtos disponíveis */}
            <div className={styles.tableContainer}>
              <h3>Produtos disponíveis</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Código</th>
                    <th>Estoque</th>
                    <th>Preço (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {produtosTabela.map((p) => (
                    <tr key={p.id}>
                      <td>{p.descricao}</td>
                      <td>{p.codigo}</td>
                      <td>{p.estoque}</td>
                      <td>{p.preco.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tabela de itens adicionados à venda */}
            <div className={styles.tableContainer}>
              <h3>Itens da Venda</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço Unit.</th>
                    <th>Subtotal</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.length > 0 ? (
                    itens.map((item) => (
                      <tr key={item.idProduto}>
                        <td>{item.nome}</td>
                        <td>{item.quantidade}</td>
                        <td>{item.preco_unitario.toFixed(2)}</td>
                        <td>{item.subtotal.toFixed(2)}</td>
                        <td>
                          <Button
                            type="button"
                            color="red"
                            onClick={() => removerItem(item.idProduto)}
                          >
                            <img
                              src={lixo}
                              alt="Remover"
                              className={styles.remover}
                            />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        Nenhum item adicionado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Resumo da venda */}
            <div className={styles.resumo}>
              <h3>Total: R$ {valorTotal.toFixed(2)}</h3>
              <div>
                <Button type="button" onClick={finalizarVenda}>
                  Finalizar Venda
                </Button>
              </div>
              <div>
                <Button type="button" color="red" onClick={() => setItens([])}>
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
