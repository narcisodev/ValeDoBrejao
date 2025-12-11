import { useState } from "react";
import SelectFilter from "../../../../components/filtro/Filtro";
import Input from "../../../../components/inputs/Input";
import Navbar from "../../../../components/navbar/Navbar";
import styles from "./styles.module.css";
import Button from "../../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useAtalhosGlobais } from "../../../../hooks/AtalhosGlobais";
import { api } from "../../../../services/backendAPI";
import { validarCPF, validarData, validarSalario } from "./validacoes";

export default function CadastroUsuario() {
  const [cargo, setCargo] = useState<string>("");

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    salario: 0,
    admissao: "",
    usuario: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erros, setErros] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  useAtalhosGlobais();

  const formatarMoeda = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const handleChange = (field: keyof typeof form, value: string) => {
    if (field === "salario") {
      const somenteNumeros = value.replace(/\D/g, "");
      const numero = somenteNumeros === "" ? 0 : Number(somenteNumeros) / 100;

      setForm((prev) => ({ ...prev, salario: numero }));
      setErros((prev) => ({ ...prev, salario: "" }));
      return;
    }
    setForm((prev) => ({ ...prev, [field]: value }));
    setErros((prev) => ({ ...prev, [field]: "" }));
  };

  const validarFormulario = (): boolean => {
    const novosErros: { [key: string]: string } = {};

    if (!form.nome) novosErros.nome = "Nome obrigatório";
    if (!form.cpf) novosErros.cpf = "CPF obrigatório";
    else if (!validarCPF(form.cpf)) novosErros.cpf = "CPF inválido";

    if (!form.telefone) novosErros.telefone = "Telefone obrigatório";

    if (!cargo) novosErros.cargo = "Selecione o cargo";

    if (!form.salario) novosErros.salario = "Salário obrigatório";
    else if (!validarSalario(String(form.salario)))
      novosErros.salario = "Salário inválido";

    if (!form.admissao) novosErros.admissao = "Data obrigatória";
    else if (!validarData(form.admissao))
      novosErros.admissao = "Data inválida ou futura";

    if (!form.usuario) novosErros.usuario = "Usuário obrigatório";

    if (!form.senha) novosErros.senha = "Senha obrigatória";
    if (!form.confirmarSenha) novosErros.confirmarSenha = "Confirme a senha";
    if (form.senha !== form.confirmarSenha)
      novosErros.confirmarSenha = "As senhas não conferem";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const salvar = async () => {
    if (!validarFormulario()) return;

    try {
      const [dia, mes, ano] = form.admissao.split("/");

      await api.post("/funcionarios/cadastrar", {
        nome: form.nome,
        cpf: form.cpf,
        telefone: form.telefone,
        cargo,
        salario: form.salario,
        admissao: `${ano}-${mes}-${dia}`,
        usuario: form.usuario,
        senha: form.senha,
      });

      navigate("/usuarios");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar funcionário");
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="bloco">
          <div>
            <div className={styles.secao}>
              <h1>Cadastro de Usuário</h1>
              <h3>Informações Pessoais</h3>
              <hr />
              <div className={styles.inputs}>
                <Input
                  label="Nome"
                  placeholder="Digite seu nome..."
                  value={form.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  error={erros.nome}
                />
                <Input
                  label="CPF"
                  placeholder="___.___.___-__"
                  mask="999.999.999-99"
                  value={form.cpf}
                  onChange={(e) => handleChange("cpf", e.target.value)}
                  error={erros.cpf}
                />
                <Input
                  label="Telefone"
                  placeholder="(__) _____-____"
                  mask="(99) 99999-9999"
                  value={form.telefone}
                  onChange={(e) => handleChange("telefone", e.target.value)}
                  error={erros.telefone}
                />
              </div>
            </div>

            <div className={styles.secao}>
              <h3>Dados Profissionais</h3>
              <hr />
              <div className={styles.inputs}>
                <SelectFilter
                  label="Cargo:"
                  options={[
                    { label: "Funcionário", value: "Funcionario" },
                    { label: "Administrador", value: "Administrador" },
                  ]}
                  value={cargo}
                  onChange={(value) => setCargo(value as string)}
                  placeholder="Selecione..."
                  error={erros.cargo}
                />

                <Input
                  label="Salário"
                  placeholder="R$ 0,00"
                  value={formatarMoeda(form.salario)}
                  onChange={(e) => handleChange("salario", e.target.value)}
                  error={erros.salario}
                />

                <Input
                  label="Data de Admissão"
                  placeholder="__/__/____"
                  mask="99/99/9999"
                  value={form.admissao}
                  onChange={(e) => handleChange("admissao", e.target.value)}
                  error={erros.admissao}
                />
              </div>
            </div>

            <div className={styles.secao}>
              <h3>Acesso ao Sistema</h3>
              <hr />
              <div className={styles.inputs}>
                <Input
                  label="Usuário"
                  placeholder="Digite seu usuário..."
                  value={form.usuario}
                  onChange={(e) => handleChange("usuario", e.target.value)}
                  error={erros.usuario}
                />
                <Input
                  label="Senha"
                  placeholder="Digite sua senha..."
                  type="password"
                  value={form.senha}
                  onChange={(e) => handleChange("senha", e.target.value)}
                  error={erros.senha}
                />
                <Input
                  label="Confirmar senha"
                  placeholder="Repita sua senha..."
                  type="password"
                  value={form.confirmarSenha}
                  onChange={(e) =>
                    handleChange("confirmarSenha", e.target.value)
                  }
                  error={erros.confirmarSenha}
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
