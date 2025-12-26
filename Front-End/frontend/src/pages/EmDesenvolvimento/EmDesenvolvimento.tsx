import styles from "./styles.module.css";
import emDesenvolvimento from "../../assets/EmDesenvolvimento.png";

export default function EmDesenvolvimento() {
  return (
    <>
      <div className={styles.principal}>
        <div className={styles.conteudo}>
          <img
            className={styles.logo}
            src={emDesenvolvimento}
            alt="EmDesenvolvimento"
          />
          <h1>404</h1>
          <p>Em desenvolvimento</p>
        </div>
      </div>
    </>
  );
}
