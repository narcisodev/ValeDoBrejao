import Input from "../../../../components/inputs/Input";
import Navbar from "../../../../components/navbar/Navbar";
import styles from "./styles.module.css";
import Button from "../../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";

export default function CadastroFornecedor() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section>
        <div className="bloco">
          <div>
            <div className={styles.secao}>
              <div>
                <h1>Cadastro de Fornecedor</h1>
              </div>
              <div>
                <h3>Informações do Fornecedor</h3>
              </div>
              <hr />
              <div className={styles.inputs}>
                <Input
                  label="Nome do Fornecedor"
                  placeholder="Digite o nome..."
                />
                <Input label="CNPJ" placeholder="__.___.___/____-__" />
              </div>
              <div className={styles.secao}>
                <h3>Informações de Contato</h3>
                <hr />
                <div className={styles.inputs}>
                  <Input label="Telefone" placeholder="(__) _____-____" />
                  <Input label="Email" placeholder="Digite o Email..." />
                  <Input label="Endereço" placeholder="Digite o endereço..." />
                </div>
              </div>
              <div>
                <Button
                  type="button"
                  color="red"
                  onClick={() => navigate("/fornecedores")}
                >
                  Cancelar
                </Button>
              </div>
              <div>
                <Button type="button" onClick={() => navigate("/fornecedores")}>
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
