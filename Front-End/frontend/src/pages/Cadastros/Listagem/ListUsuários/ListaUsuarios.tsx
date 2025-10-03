import Navbar from "../../../../components/navbar/Navbar";
import SelectFilter from "../../../../components/filtro/Filtro";
import styles from "./styles.module.css";
import { useState } from "react";
import Input from "../../../../components/inputs/Input";
import Lixo from "../../../../assets/lixo.png";
import Editar from "../../../../assets/editar.png";
import Button from "../../../../components/buttons/Button";

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  contato: string;
  email: string;
  cargo: string;
}

export default function Usuarios() {
  const [filtro, setFiltro] = useState<string | number>("");

  // Dados fictícios
  const [usuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: "João Silva",
      cpf: "123.456.789-00",
      contato: "(99) 99999-9999",
      email: "joao@email.com",
      cargo: "Administrador",
    },
    {
      id: 2,
      nome: "Maria Souza",
      cpf: "987.654.321-00",
      contato: "(88) 98888-8888",
      email: "maria@email.com",
      cargo: "Funcionário",
    },
    {
      id: 3,
      nome: "Carlos Pereira",
      cpf: "111.222.333-44",
      contato: "(77) 97777-7777",
      email: "carlos@email.com",
      cargo: "Funcionário",
    },
  ]);

  return (
    <>
      <Navbar />
      <section>
        <div className="bloco">
          <SelectFilter
            label="Filtrar por:"
            options={[
              { label: "Nome", value: "nome" },
              { label: "CPF", value: "cpf" },
            ]}
            value={filtro}
            onChange={setFiltro}
            placeholder="Selecione..."
          />
          <Input label="Filtro" placeholder="Buscar..." />
        </div>

        <div className={`bloco ${styles.customBloco}`}>
          <div className={styles.Header}>
            <h1>Usuários</h1>
            <Button type="button">Adicionar</Button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Contato</th>
                  <th>Email</th>
                  <th>Cargo</th>
                  <th>Editar</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nome}</td>
                    <td>{u.cpf}</td>
                    <td>{u.contato}</td>
                    <td>{u.email}</td>
                    <td>{u.cargo}</td>
                    <td>
                      <button className={styles.iconButton}>
                        <img src={Editar} alt="Editar" />
                      </button>
                    </td>
                    <td>
                      <button className={styles.iconButton}>
                        <img src={Lixo} alt="Excluir" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
