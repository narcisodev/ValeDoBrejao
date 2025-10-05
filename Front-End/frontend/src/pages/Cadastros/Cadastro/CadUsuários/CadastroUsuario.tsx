import { useState } from "react";
import SelectFilter from "../../../../components/filtro/Filtro";
import Input from "../../../../components/inputs/Input";
import Navbar from "../../../../components/navbar/Navbar";
import styles from "./styles.module.css";
import Button from "../../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";

export default function CadastroUsuario() {
  const [cargo, setCargo] = useState<string | number>("");
  const navigate = useNavigate();

  return (
    <>
      <Navbar></Navbar>
      <section>
        <div className="bloco">
          <div>
            <div className={styles.secao}>
              <div>
                <h1>Cadastro de Usuário</h1>
              </div>
              <div>
                <h3>Informações Pessoais</h3>
              </div>
              <hr />
              <div className={styles.inputs}>
                <Input label="Nome" placeholder="Digite seu nome..." />
                <Input label="CPF" placeholder="___.___.___-__" />
                <Input label="Telefone" placeholder="(__) _____-____" />
              </div>
            </div>
            <div className={styles.secao}>
              <div>
                <h3>Dados Profissionais</h3>
              </div>
              <hr />
              <div className={styles.inputs}>
                <SelectFilter
                  label="Cargo:"
                  options={[
                    { label: "Funcionário", value: "funcionario" },
                    { label: "Administrador", value: "adm" },
                  ]}
                  value={cargo}
                  onChange={setCargo}
                  placeholder="Selecione..."
                />
                <Input label="Salário" placeholder="R$ 0,00" />
                <Input label="Data de Admissão" placeholder="__/__/____" />
              </div>
            </div>
            <div className={styles.secao}>
              <div>
                <h3>Acesso ao Sistema</h3>
              </div>
              <hr />
              <div className={styles.inputs}>
                <Input label="Usuário" placeholder="Digite seu usuário..." />
                <Input label="Senha" placeholder="Digite sua senha..." />
                <Input
                  label="Confirmar senha"
                  placeholder="Repita sua senha..."
                />
              </div>
            </div>
            <div>
              <Button
                type="button"
                onClick={() => navigate("/usuarios")}
                color="red"
              >
                Cancelar
              </Button>
            </div>
            <div>
              <Button type="button" onClick={() => navigate("/usuarios")}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
