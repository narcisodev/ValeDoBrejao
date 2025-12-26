import { useEffect, useState } from "react";
import Input from "../../../../components/inputs/Input";
import Navbar from "../../../../components/navbar/Navbar";
import styles from "./styles.module.css";
import Button from "../../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useAtalhosGlobais } from "../../../../hooks/AtalhosGlobais";
import { api } from "../../../../services/backendAPI";
import SelectFilter from "../../../../components/filtro/Filtro";

type Fornecedor = {
  idFornecedor: number;
  nome: string;
  cnpj: string;
  telefone: string;
};

export default function CadastroProduto() {
  const navigate = useNavigate();
  useAtalhosGlobais();

  const [form, setForm] = useState({
    descricao: "",
    codigo: "",
    categoria: "",
    marca: "",
    precoCusto: 0,
    precoVenda: 0,
    quantidade: 0,
  });

  const [erros, setErros] = useState<{ [key: string]: string }>({});
  const [erroServidor, setErroServidor] = useState("");

  // 🔹 fornecedor (opcional)
  const [termoFornecedor, setTermoFornecedor] = useState("");
  const [listaFornecedores, setListaFornecedores] = useState<Fornecedor[]>([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] =
    useState<Fornecedor | null>(null);

  const formatarMoeda = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const handleChange = (field: keyof typeof form, value: string) => {
    if (field === "precoCusto" || field === "precoVenda") {
      const somenteNumeros = value.replace(/\D/g, "");
      const numero = somenteNumeros ? Number(somenteNumeros) / 100 : 0;
      setForm((prev) => ({ ...prev, [field]: numero }));
      setErros((prev) => ({ ...prev, [field]: "" }));
      return;
    }

    if (field === "quantidade") {
      const numero = Number(value.replace(/\D/g, ""));
      setForm((prev) => ({ ...prev, quantidade: numero }));
      setErros((prev) => ({ ...prev, quantidade: "" }));
      return;
    }

    if (field === "codigo") {
      setForm((prev) => ({
        ...prev,
        codigo: value.replace(/\D/g, ""),
      }));
      setErros((prev) => ({ ...prev, codigo: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [field]: value }));
    setErros((prev) => ({ ...prev, [field]: "" }));
  };

  useEffect(() => {
    if (fornecedorSelecionado) {
      setListaFornecedores([]);
      return;
    }

    if (termoFornecedor.trim().length < 2) {
      setListaFornecedores([]);
      return;
    }

    const buscar = async () => {
      try {
        const res = await api.get(
          `/fornecedores/buscar?termo=${termoFornecedor}`
        );
        setListaFornecedores(res.data);
      } catch {
        setListaFornecedores([]);
      }
    };

    buscar();
  }, [termoFornecedor, fornecedorSelecionado]);

  const validarFormulario = (): boolean => {
    const novosErros: { [key: string]: string } = {};

    if (!form.descricao) novosErros.descricao = "Descrição obrigatória";
    if (!form.codigo) novosErros.codigo = "Código de barras obrigatório";
    if (form.quantidade <= 0) novosErros.quantidade = "Quantidade inválida";
    if (form.precoVenda <= 0) novosErros.precoVenda = "Preço de venda inválido";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const salvar = async () => {
    setErroServidor("");

    if (!validarFormulario()) return;

    try {
      await api.post("/produtos/cadastrar", {
        descricao: form.descricao,
        codigo: form.codigo,
        categoria: form.categoria || null,
        marca: form.marca || null,
        precoCusto: form.precoCusto,
        precoVenda: form.precoVenda,
        quantidade: form.quantidade,
        fornecedorId: fornecedorSelecionado?.idFornecedor ?? null,
      });

      navigate("/produtos");
    } catch (error) {
      console.error(error);
      setErroServidor(
        "Erro ao cadastrar produto. Verifique os dados ou tente novamente."
      );
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="bloco">
          <div>
            <div className={styles.secao}>
              <h1>Cadastro de Produto</h1>
              <h3>Informações do Produto</h3>
              <hr />

              <div className={styles.inputs}>
                <Input
                  label="Descrição"
                  value={form.descricao}
                  onChange={(e) => handleChange("descricao", e.target.value)}
                  error={erros.descricao}
                />

                <Input
                  label="Código de Barras"
                  value={form.codigo}
                  onChange={(e) => handleChange("codigo", e.target.value)}
                  error={erros.codigo}
                />

                <SelectFilter
                  label="Categoria"
                  options={[
                    { label: "Bebidas", value: "Bebidas" },
                    { label: "Comidas", value: "Comidas" },
                    { label: "Outros", value: "Outros" },
                  ]}
                  value={form.categoria}
                  onChange={(value) =>
                    handleChange("categoria", value as string)
                  }
                  placeholder="Selecione..."
                />

                <Input
                  label="Marca"
                  value={form.marca}
                  onChange={(e) => handleChange("marca", e.target.value)}
                />
              </div>
            </div>

            <div className={styles.secao}>
              <h3>Dados Comerciais</h3>
              <hr />

              <div className={styles.inputs}>
                <Input
                  label="Preço de Custo"
                  value={formatarMoeda(form.precoCusto)}
                  onChange={(e) => handleChange("precoCusto", e.target.value)}
                />

                <Input
                  label="Preço de Venda"
                  value={formatarMoeda(form.precoVenda)}
                  onChange={(e) => handleChange("precoVenda", e.target.value)}
                  error={erros.precoVenda}
                />

                <Input
                  label="Quantidade"
                  value={String(form.quantidade)}
                  onChange={(e) => handleChange("quantidade", e.target.value)}
                  error={erros.quantidade}
                />
              </div>
            </div>

            <div className={styles.secao}>
              <h3>Fornecedor (Opcional)</h3>
              <hr />
              <div className={styles.autocomplete}>
                <Input
                  label="Buscar Fornecedor"
                  value={termoFornecedor}
                  onChange={(e) => {
                    setTermoFornecedor(e.target.value);
                    setFornecedorSelecionado(null);
                  }}
                />

                {listaFornecedores.length > 0 && (
                  <div className={styles.lista}>
                    {listaFornecedores.map((f) => (
                      <div
                        key={f.idFornecedor}
                        className={styles.itemLista}
                        onClick={() => {
                          setFornecedorSelecionado(f);
                          setTermoFornecedor(f.nome);
                          setListaFornecedores([]);
                        }}
                      >
                        {f.nome}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.inputs}>
                <Input
                  label="CNPJ"
                  value={fornecedorSelecionado?.cnpj || ""}
                  readOnly
                />

                <Input
                  label="Telefone"
                  value={fornecedorSelecionado?.telefone || ""}
                  readOnly
                />
              </div>
            </div>

            {erroServidor && (
              <p className={styles.errorMessage}>{erroServidor}</p>
            )}

            <div>
              <Button
                type="button"
                color="red"
                onClick={() => navigate("/produtos")}
              >
                Cancelar
              </Button>
            </div>

            <div>
              <Button type="button" onClick={salvar}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
