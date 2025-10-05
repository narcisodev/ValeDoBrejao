import Navbar from "../../../../components/navbar/Navbar";
import SelectFilter from "../../../../components/filtro/Filtro";
import styles from "./styles.module.css";
import { useState } from "react";
import Input from "../../../../components/inputs/Input";
import Lixo from "../../../../assets/lixo.png";
import Editar from "../../../../assets/editar.png";
import Button from "../../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  contato: string;
}

export default function Usuarios() {
  const [filtro, setFiltro] = useState<string | number>("");
  const navigate = useNavigate();

  // Dados fictícios
  const [fornecedores] = useState<Fornecedor[]>([
    {
      id: 1,
      nome: "Fornecedor 1",
      cnpj: "00.000.000/0001-00",
      contato: "99999-9999",
    },
    {
      id: 2,
      nome: "Fornecedor 2",
      cnpj: "11.111.111/1111-11",
      contato: "98888-8888",
    },
    {
      id: 3,
      nome: "Fornecedor 3",
      cnpj: "22.222.222/2222-22",
      contato: "97777-7777",
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
              { label: "Fornecedor", value: "fornecedor" },
              { label: "CNPJ", value: "cnpj" },
            ]}
            value={filtro}
            onChange={setFiltro}
            placeholder="Selecione..."
          />
          <Input label="Filtro" placeholder="Buscar..." />
        </div>

        <div className={`bloco ${styles.customBloco}`}>
          <div className={styles.Header}>
            <h1>Fornecedores</h1>
            <Button
              type="submit"
              onClick={() => navigate("/fornecedores/cadastro")}
            >
              Adicionar
            </Button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fornecedor</th>
                  <th>CNPJ</th>
                  <th>Contato</th>
                  <th>Editar</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {fornecedores.map((f) => (
                  <tr key={f.id}>
                    <td>{f.nome}</td>
                    <td>{f.cnpj}</td>
                    <td>{f.contato}</td>
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
