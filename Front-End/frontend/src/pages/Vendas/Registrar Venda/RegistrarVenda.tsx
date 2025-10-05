import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import lixo from "../../../assets/lixo.png";
import styles from "./styles.module.css";
import Modal from "../../../components/modal/Modal";
import SelectFilter from "../../../components/filtro/Filtro";

interface ItemVenda {
  idProduto: number;
  nome: string;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

interface ProdutoTabela {
  id: number;
  descricao: string;
  marca: string;
  categoria: string;
  codigo: string;
  estoque: number;
  preco: number;
}

interface FormaPagamento {
  id: number;
  forma: string;
  valor: number;
}

export default function RegistrarVenda() {
  const [produtoInput, setProdutoInput] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [itens, setItens] = useState<ItemVenda[]>([]);
  const [desconto, setDesconto] = useState(0); // desconto em %
  const [popupAberto, setPopupAberto] = useState(false);
  const [popupFiltro, setPopupFiltro] = useState<string | number>("descricao");
  const [popupBusca, setPopupBusca] = useState("");

  //pagamentos
  const [popupPagamentoAberto, setPopupPagamentoAberto] = useState(false);
  const [formasPagamentoSelecionadas, setFormasPagamentoSelecionadas] =
    useState<FormaPagamento[]>([]);
  const formasPagamentoDisponiveis = [
    "Dinheiro",
    "Cartão Débito",
    "Cartão Crédito",
    "Pix",
  ];

  const [produtosTabela] = useState<ProdutoTabela[]>([
    {
      id: 1,
      descricao: "Notebook Gamer",
      codigo: "NB001",
      marca: "Dell",
      categoria: "Informática",
      estoque: 5,
      preco: 4500.0,
    },
    {
      id: 2,
      descricao: "Mouse Sem Fio",
      codigo: "MSF002",
      marca: "Logitech",
      categoria: "Periféricos",
      estoque: 50,
      preco: 120.5,
    },
    {
      id: 3,
      descricao: "Teclado Mecânico",
      codigo: "TLM003",
      marca: "Corsair",
      categoria: "Periféricos",
      estoque: 2,
      preco: 300.0,
    },
  ]);

  const adicionarProduto = (produto?: ProdutoTabela) => {
    let p = produto;
    if (!p) {
      p = produtosTabela.find(
        (prod) =>
          prod.codigo.toLowerCase() === produtoInput.toLowerCase() ||
          prod.descricao.toLowerCase().includes(produtoInput.toLowerCase())
      );
    }

    if (!p) return alert("Produto não encontrado");

    setItens([
      ...itens,
      {
        idProduto: p.id,
        nome: p.descricao,
        quantidade,
        preco_unitario: p.preco,
        subtotal: p.preco * quantidade,
      },
    ]);

    setProdutoInput("");
    setQuantidade(1);
  };

  const removerItem = (idProduto: number) =>
    setItens(itens.filter((i) => i.idProduto !== idProduto));

  const valorTotal = itens.reduce((acc, item) => acc + item.subtotal, 0);
  const valorComDesconto = valorTotal * ((100 - desconto) / 100);

  const finalizarVenda = () => {
    if (itens.length === 0) {
      alert("Adicione pelo menos um item antes de finalizar a venda.");
      return;
    }
    setPopupPagamentoAberto(true);
  };

  const adicionarNovaForma = (forma: string) => {
    const novaForma: FormaPagamento = {
      id:
        formasPagamentoSelecionadas.length > 0
          ? formasPagamentoSelecionadas[formasPagamentoSelecionadas.length - 1]
              .id + 1
          : 1,
      forma,
      valor: 0,
    };
    setFormasPagamentoSelecionadas([...formasPagamentoSelecionadas, novaForma]);
  };
  const atualizarValorForma = (id: number, valor: number) => {
    setFormasPagamentoSelecionadas((prev) =>
      prev.map((f) => (f.id === id ? { ...f, valor } : f))
    );
  };
  const removerForma = (id: number) => {
    setFormasPagamentoSelecionadas((prev) => prev.filter((f) => f.id !== id));
  };
  const totalSelecionado = () => {
    return formasPagamentoSelecionadas.reduce((acc, f) => acc + f.valor, 0);
  };
  return (
    <>
      <Navbar />
      <section>
        <div className={`bloco ${styles.customBloco}`}>
          <h1>Registrar Venda</h1>
          <hr />

          {/* Inputs principais */}
          <div className={styles.inputs}>
            <Input
              label="Código ou Produto"
              placeholder="Digite código ou descrição..."
              value={produtoInput}
              onChange={(e) => setProdutoInput(e.target.value)}
            />
            <Input
              label="Quantidade"
              placeholder="Digite a quantidade..."
              value={quantidade.toString()}
              onChange={(e) => setQuantidade(Number(e.target.value))}
            />
            <Input
              label="Desconto (%)"
              placeholder="Digite o desconto..."
              value={quantidade.toString()}
              onChange={(e) => setQuantidade(Number(e.target.value))}
            />
          </div>
          <div className={styles.buttonsRow}>
            <div>
              <Button type="button" onClick={() => setPopupAberto(true)}>
                Pesquisar Produto
              </Button>
            </div>
            <div>
              <Button type="button" onClick={() => adicionarProduto()}>
                Adicionar
              </Button>
            </div>
          </div>
          {/* Tabela de itens da venda */}
          <h3>Itens da Venda</h3>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Qtd</th>
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
            <h3>Total: R$ {valorComDesconto.toFixed(2)}</h3>
          </div>
          <div className={styles.buttonsRow}>
            <div>
              <Button type="button" color="red" onClick={() => setItens([])}>
                Cancelar
              </Button>
            </div>
            <div>
              <Button type="button" onClick={finalizarVenda}>
                Finalizar Venda
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pop-up de pesquisa de produtos */}
      {popupAberto && (
        <Modal onClose={() => setPopupAberto(false)} title="Pesquisar Produtos">
          <div>
            <SelectFilter
              label="Filtrar por:"
              options={[
                { label: "Marca", value: "marca" },
                { label: "Descrição", value: "descricao" },
                { label: "Categoria", value: "categoria" },
              ]}
              value={popupFiltro}
              onChange={setPopupFiltro}
              placeholder="Selecione..."
            />
            <Input
              label="Buscar"
              placeholder="Digite sua pesquisa..."
              value={popupBusca}
              onChange={(e) => setPopupBusca(e.target.value)}
            />
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Código</th>
                  <th>Marca</th>
                  <th>Categoria</th>
                  <th>Estoque</th>
                  <th>Preço (R$)</th>
                  <th>Adicionar</th>
                </tr>
              </thead>
              <tbody>
                {produtosTabela
                  .filter((p) => {
                    if (!popupBusca) return true;
                    if (popupFiltro === "marca")
                      return p.marca
                        .toLowerCase()
                        .includes(popupBusca.toLowerCase());
                    if (popupFiltro === "descricao")
                      return p.descricao
                        .toLowerCase()
                        .includes(popupBusca.toLowerCase());
                    if (popupFiltro === "categoria")
                      return p.categoria
                        .toLowerCase()
                        .includes(popupBusca.toLowerCase());
                    return true;
                  })
                  .map((p) => (
                    <tr key={p.id}>
                      <td>{p.descricao}</td>
                      <td>{p.codigo}</td>
                      <td>{p.marca}</td>
                      <td>{p.categoria}</td>
                      <td>{p.estoque}</td>
                      <td>{p.preco.toFixed(2)}</td>
                      <td>
                        <Button
                          type="button"
                          onClick={() => {
                            adicionarProduto(p);
                            setPopupAberto(false);
                            setPopupBusca("");
                            setPopupFiltro("descricao");
                          }}
                        >
                          +
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}

      {popupPagamentoAberto && (
        <Modal
          onClose={() => setPopupPagamentoAberto(false)}
          title="Escolher Forma(s) de Pagamento"
        >
          <div className={styles.pagamentoContainer}>
            {formasPagamentoDisponiveis.map((forma) => (
              <div key={forma} className={styles.pagamentoLinha}>
                <label className={styles.formaLabel}></label>
                <Button type="button" onClick={() => adicionarNovaForma(forma)}>
                  {forma}
                </Button>
              </div>
            ))}
          </div>
          <h4>Resumo do Pagamento</h4>
          <div className={styles.tabelaPagamento}>
            <table>
              <thead>
                <tr>
                  <th>Forma</th>
                  <th>Valor</th>
                  <th>Remover</th>
                </tr>
              </thead>
              <tbody>
                {formasPagamentoSelecionadas.length > 0 ? (
                  formasPagamentoSelecionadas.map((f) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const restante =
                      valorComDesconto - (totalSelecionado() - f.valor);
                    return (
                      <tr key={f.id}>
                        <td>{f.forma}</td>
                        <td>
                          <Input
                            label=""
                            value={f.valor.toString()}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              let valor = Number(
                                e.target.value.replace(",", ".")
                              );
                              if (isNaN(valor)) valor = 0;

                              atualizarValorForma(
                                f.id,
                                Math.min(
                                  valor,
                                  valorComDesconto -
                                    (totalSelecionado() - f.valor)
                                )
                              );
                            }}
                            placeholder="Digite o valor"
                          />
                        </td>
                        <td>
                          <Button
                            type="button"
                            color="red"
                            onClick={() => removerForma(f.id)}
                          >
                            Remover
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      Nenhuma forma adicionada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className={styles.totais}>
              <h4>Total selecionado: R$ {totalSelecionado().toFixed(2)}</h4>
              <h4>
                Total restante: R${" "}
                {Math.max(valorComDesconto - totalSelecionado(), 0).toFixed(2)}
              </h4>
            </div>

            {valorComDesconto - totalSelecionado() <= 0 && (
              <div className={styles.confirmacaoPagamentoTotal}>
                Total completo! Pode confirmar.
              </div>
            )}
          </div>

          <div className={styles.buttonsRow}>
            <div>
              {" "}
              <Button
                type="button"
                color="red"
                onClick={() => setPopupPagamentoAberto(false)}
              >
                Cancelar
              </Button>
            </div>
            <div>
              <Button
                type="button"
                onClick={() => {
                  if (totalSelecionado() !== valorComDesconto) {
                    return alert(
                      "O total das formas deve ser igual ao total da venda."
                    );
                  }
                  alert("Venda finalizada!");
                  setItens([]);
                  setDesconto(0);
                  setFormasPagamentoSelecionadas([]);
                  setPopupPagamentoAberto(false);
                }}
              >
                Confirmar Pagamento
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
