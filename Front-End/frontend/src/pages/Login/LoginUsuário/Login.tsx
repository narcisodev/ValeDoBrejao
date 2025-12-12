// src/pages/Login.tsx
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Icon.png";
import Button from "../../../components/buttons/Button";
import Input from "../../../components/inputs/Input";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { api } from "../../../services/backendAPI";
import type { AxiosError } from "axios";
import { encrypt } from "../../../utils/crypto";

interface LoginResponse {
  token: string;
  user?: {
    nome: string;
  };
}

interface ErrorResponse {
  mensagem: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(""); // limpa erro anterior

    try {
      const response = await api.post<LoginResponse>("/login", {
        usuario: encrypt(usuario),
        senha,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        if (response.data.user?.nome) {
          localStorage.setItem("user_nome", response.data.user.nome);
        }
        navigate("/");
      } else {
        setErro("Usuário ou senha incorretos");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        setErro("Usuário ou senha incorretos");
      } else if (axiosError.request) {
        setErro("Não foi possível conectar ao servidor");
      } else {
        setErro("Ocorreu um erro inesperado, tente novamente");
      }

      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <section>
      <div>
        <div>
          <img src={logo} className={styles.logo} alt="logo" />
        </div>

        <form onSubmit={handleLogin}>
          <Input
            label="Usuário"
            placeholder="Digite seu usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <p className={styles.errorMessage}>{erro}</p>}

          <div>
            <Button type="submit">Entrar</Button>
          </div>
        </form>

        <div className={styles.forgotPassword}>
          <a href="/recuperar-senha">Esqueceu a senha?</a>
        </div>
      </div>
    </section>
  );
}
