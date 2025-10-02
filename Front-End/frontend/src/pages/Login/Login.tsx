import { useNavigate } from "react-router-dom";
import logo from "../../assets/Icon.png";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/Input";
import styles from "../Login/styles.module.css";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
  };

  return (
    <section>
      <div>
        <div>
          <img src={logo} className={styles.logo} alt="logo" />
        </div>
        <form>
          <Input label="Usuário" placeholder="Digite seu usuário" />
          <Input label="Senha" type="password" placeholder="Digite sua senha" />
        </form>
        <div className={styles.forgotPassword}>
          <a href="/recuperar-senha" className={styles.forgotPassword}>
            Esqueceu a senha?
          </a>
        </div>
        <Button type="submit" onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </section>
  );
}
