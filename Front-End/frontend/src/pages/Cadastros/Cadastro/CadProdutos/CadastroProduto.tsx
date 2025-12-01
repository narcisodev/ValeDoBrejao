import { useState } from "react";
import SelectFilter from "../../../../components/filtro/Filtro";
import Input from "../../../../components/inputs/Input";
import Navbar from "../../../../components/navbar/Navbar";
import styles from "./styles.module.css";
import Button from "../../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useAtalhosGlobais } from "../../../../hooks/AtalhosGlobais";

export default function CadastroProduto() {
  const [categoria, setCategoria] = useState<string | number>("");
  const navigate = useNavigate();
  useAtalhosGlobais();

  return (
    <>
      <Navbar />
      <section>
        <div className="bloco">
          <div>
            <div className={styles.secao}>
              <div>
                <h1>Cadastro de Produto</h1>
              </div>

              <div>
                <h3>Informações do Produto</h3>
              </div>
              <hr />

              <div className={styles.inputs}>
                <Input label="Nome do Produto" placeholder="Digite o nome..." />
                <SelectFilter
                  label="Categoria:"
                  options={[
                    { label: "Bebidas", value: "bebidas" },
                    { label: "Comidas", value: "comidas" },
                    { label: "Outros", value: "outros" },
                  ]}
                  value={categoria}
                  onChange={setCategoria}
                  placeholder="Selecione..."
                />
                <Input label="Marca" placeholder="Digite a marca..." />
              </div>
            </div>

            <div className={styles.secao}>
              <div>
                <h3>Detalhes Comerciais</h3>
              </div>
              <hr />
              <div className={styles.inputs}>
                <Input label="Preço de Custo" placeholder="R$ 0,00" />
                <Input label="Preço de Venda" placeholder="R$ 0,00" />
                <Input label="Quantidade em Estoque" placeholder="0" />
              </div>
            </div>

            <div className={styles.secao}>
              <div>
                <h3>Fornecedor</h3>
              </div>
              <hr />
              <div className={styles.inputs}>
                <Input
                  label="Nome do Fornecedor"
                  placeholder="Digite o nome..."
                />
                <Input label="CNPJ" placeholder="__.___.___/____-__" />
                <Input label="Contato" placeholder="(__) _____-____" />
              </div>
            </div>

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
              <Button type="button" onClick={() => navigate("/produtos")}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
