import Input from "../../../../components/inputs/Input";
import Navbar from "../../../../components/navbar/Navbar";
import styles from "./styles.module.css";

export default function CadastroUsuario() {
  return (
    <>
      <Navbar></Navbar>
      <section>
        <div className="bloco">
          <div className={styles.secao}>
            <div>
              <h1>Cadastro de Usuário</h1>
            </div>
            <h2>Informações Pessoais</h2>
            <div>
              <Input label="Nome" placeholder="Digite seu nome..." />
              <Input label="CPF" placeholder="___.___.___-__" />
              <Input label="Telefone" placeholder="(__) _____-____" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
