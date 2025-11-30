import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../components/buttons/Button";
import Input from "../../../components/inputs/Input";
import Navbar from "../../../components/navbar/Navbar";
import styles from "./styles.module.css";

export default function FechamentoCaixa() {
  const navigate = useNavigate();

  // Totais do sistema (fixos por enquanto)
  const totais = {
    vendas: { label: "Total em Vendas", value: 2580.9 },
    dinheiro: { label: "Total em Dinheiro", value: 830 },
    cartao: { label: "Total em Cartão", value: 1750.9 },
    pix: { label: "Total em PIX", value: 600 },
    despesas: { label: "Despesas do Dia", value: 320 },
    fechamento: { label: "Fechamento Final", value: 2260.9 },
  };

  // Valores contados pelo operador
  const [contado, setContado] = useState({
    dinheiro: "",
    pix: "",
    cartao: "",
  });

  // Converte strings para número
  const toNumber = (v: string) => Number(v.replace(",", ".") || 0);

  // Soma total contado
  const totalContado =
    toNumber(contado.dinheiro) +
    toNumber(contado.pix) +
    toNumber(contado.cartao);

  // Diferença entre contado e esperado
  const diferenca = totalContado - totais.fechamento.value;

  const mensagemDiferenca =
    diferenca === 0
      ? "Caixa batido (sem diferença)"
      : diferenca > 0
      ? `SOBRANDO R$ ${diferenca.toFixed(2)}`
      : `FALTANDO R$ ${(diferenca * -1).toFixed(2)}`;

  const corMensagem =
    diferenca === 0 ? "green" : diferenca > 0 ? "blue" : "red";

  return (
    <>
      <Navbar />
      <section>
        <div className="bloco">
          <div className={styles.secao}>
            <h1>Fechamento de Caixa</h1>
            <h3>Resumo do Dia</h3>
            <hr />

            {/* Valores do sistema */}
            <div className={styles.inputs}>
              {Object.values(totais).map((item, index) => (
                <Input
                  key={index}
                  label={item.label}
                  value={`R$ ${item.value.toFixed(2)}`}
                  readOnly
                />
              ))}
            </div>

            <h3>Valores Contados</h3>
            <hr />

            {/* Inputs do operador */}
            <div className={styles.inputs}>
              <Input
                label="Dinheiro Contado"
                value={contado.dinheiro}
                onChange={(e) =>
                  setContado((p) => ({ ...p, dinheiro: e.target.value }))
                }
                placeholder="Ex: 830,00"
              />

              <Input
                label="PIX Contado"
                value={contado.pix}
                onChange={(e) =>
                  setContado((p) => ({ ...p, pix: e.target.value }))
                }
                placeholder="Ex: 600,00"
              />

              <Input
                label="Cartão Contado"
                value={contado.cartao}
                onChange={(e) =>
                  setContado((p) => ({ ...p, cartao: e.target.value }))
                }
                placeholder="Ex: 1750,90"
              />
            </div>

            {/* Resultado */}
            <h3>Resultado</h3>
            <hr />

            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: corMensagem,
              }}
            >
              {mensagemDiferenca}
            </p>

            {/* Botões */}
            <div className={styles.botoes}>
              <Button
                type="button"
                color="red"
                onClick={() => navigate("/dashboard")}
              >
                Cancelar
              </Button>
            </div>
            <div className={styles.botoes}>
              <Button
                type="button"
                onClick={() => navigate("/comprovante-fechamento")}
              >
                Finalizar Fechamento
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
