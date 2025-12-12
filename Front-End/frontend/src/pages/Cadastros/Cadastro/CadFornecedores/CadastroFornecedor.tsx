import { useState } from "react";
import Input from "../../../../components/inputs/Input";
import Navbar from "../../../../components/navbar/Navbar";
import styles from "./styles.module.css";
import Button from "../../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useAtalhosGlobais } from "../../../../hooks/AtalhosGlobais";
import { api } from "../../../../services/backendAPI";
import type { AxiosError } from "axios";

export default function CadastroFornecedor() {
  const navigate = useNavigate();
  useAtalhosGlobais();

  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    telefone: "",
    email: "",
    endereco: "",
  });

  const [erros, setErros] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErros((prev) => ({ ...prev, [field]: "" }));
  };

  const validarFormulario = (): boolean => {
    const novosErros: { [key: string]: string } = {};

    if (!form.nome) novosErros.nome = "Nome obrigatório";
    if (!form.cnpj) novosErros.cnpj = "CNPJ obrigatório";
    if (!form.telefone) novosErros.telefone = "Telefone obrigatório";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSalvar = async () => {
    if (!validarFormulario()) return;

    try {
      await api.post("/fornecedores/cadastrar", form);
      navigate("/fornecedores");
    } catch (error) {
      const axiosError = error as AxiosError<{ mensagem: string }>;
      setErros((prev) => ({
        ...prev,
        geral:
          axiosError.response?.data?.mensagem || "Erro ao cadastrar fornecedor",
      }));
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="bloco">
          <div className={styles.secao}>
            <h1>Cadastro de Fornecedor</h1>

            <h3>Informações do Fornecedor</h3>
            <hr />
            <div className={styles.inputs}>
              <Input
                label="Nome do Fornecedor"
                placeholder="Digite o nome..."
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                error={erros.nome}
              />
              <Input
                label="CNPJ"
                placeholder="__.___.___/____-__"
                mask="99.999.999/9999-99"
                value={form.cnpj}
                onChange={(e) => handleChange("cnpj", e.target.value)}
                error={erros.cnpj}
              />
            </div>

            <h3>Informações de Contato</h3>
            <hr />
            <div className={styles.inputs}>
              <Input
                label="Telefone"
                placeholder="(__) _____-____"
                mask="(99) 99999-9999"
                value={form.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                error={erros.telefone}
              />
              <Input
                label="Email"
                placeholder="Digite o Email..."
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <Input
                label="Endereço"
                placeholder="Digite o endereço..."
                value={form.endereco}
                onChange={(e) => handleChange("endereco", e.target.value)}
              />
            </div>

            {erros.geral && <p className={styles.error}>{erros.geral}</p>}

            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <Button
                type="button"
                color="red"
                onClick={() => navigate("/fornecedores")}
              >
                Cancelar
              </Button>
              <Button type="button" onClick={handleSalvar}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
