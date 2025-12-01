import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";

export function useAtalhosGlobais(): void {
  const navigate = useNavigate();

  useHotkeys("alt+1", () => navigate("/produtos"));
  useHotkeys("alt+2", () => navigate("/vendas/registrar"));
  useHotkeys("alt+3", () => navigate("/estoque/movimentacao"));
  useHotkeys("alt+4", () => navigate("/financeiro/fechamento-caixa"));

  useHotkeys("c+1", () => navigate("/usuarios"));
  useHotkeys("c+2", () => navigate("/fornecedores"));
  useHotkeys("c+3", () => navigate("/produtos"));

  useHotkeys("v+1", () => navigate("/vendas/registrar"));
  useHotkeys("v+2", () => navigate("/vendas/historico"));
  useHotkeys("v+3", () => navigate("/vendas/relatorios"));

  useHotkeys("e+1", () => navigate("/estoque/inventario"));
  useHotkeys("e+2", () => navigate("/estoque/movimentacao"));
  useHotkeys("e+3", () => navigate("/estoque/baixo-estoque-produtos"));

  useHotkeys("f+1", () => navigate("/financeiro/fechamento-caixa"));
  useHotkeys("f+2", () => navigate("/financeiro/fluxo-caixa"));
  useHotkeys("f+3", () => navigate("/financeiro/contas-pagar"));
  useHotkeys("f+4", () => navigate("/financeiro/relatorios-financeiros"));
}
