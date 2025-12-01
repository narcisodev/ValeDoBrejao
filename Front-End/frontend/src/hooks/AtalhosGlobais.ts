import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";

export function useAtalhosGlobais(): void {
  const navigate = useNavigate();

  // Navegação principal — ALT+N
  useHotkeys("alt+1", () => navigate("/produtos"));
  useHotkeys("alt+2", () => navigate("/vendas/registrar"));
  useHotkeys("alt+3", () => navigate("/estoque/movimentacao"));
  useHotkeys("alt+4", () => navigate("/financeiro/fechamento-caixa"));
}
