import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/LoginUsuário/Login";
import Main from "../pages/Main/Main";

//Listagem de Cadastros
import Usuarios from "../pages/Cadastros/Listagem/ListUsuários/ListaUsuarios";
import Fornecedores from "../pages/Cadastros/Listagem/ListFornecedores/ListaFornecedores";
import Produtos from "../pages/Cadastros/Listagem/ListProdutos/ListaProdutos";

//Cadastros
import CadastroUsuario from "../pages/Cadastros/Cadastro/CadUsuários/CadastroUsuario";
import CadastroProduto from "../pages/Cadastros/Cadastro/CadProdutos/CadastroProduto";
import CadastroFornecedor from "../pages/Cadastros/Cadastro/CadFornecedores/CadastroFornecedor";

//Vendas
import RegistrarVenda from "../pages/Vendas/Registrar Venda/RegistrarVenda";
import HistoricoVenda from "../pages/Vendas/Histórico de Vendas/HistoricoVendas";
import VendaDetalhes from "../pages/Vendas/VendasDetalhes/VendaDetalhe";

//Estoque
import InventarioGeral from "../pages/Estoque/InventárioGeral/InventarioGeral";
import MovimentacoesEstoque from "../pages/Estoque/MovimentaçõesEstoque/MovimentacoesEstoque";

//Financeiro
import FechamentoCaixa from "../pages/Financeiro/Fechamento de Caixa/FechamentoCaixa";
import FluxoCaixa from "../pages/Financeiro/Fluxo de Caixa/FluxoCaixa";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />

      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/usuarios/cadastro" element={<CadastroUsuario />} />

      <Route path="/fornecedores" element={<Fornecedores />} />
      <Route path="/fornecedores/cadastro" element={<CadastroFornecedor />} />

      <Route path="/produtos" element={<Produtos />} />
      <Route path="/produtos/cadastro" element={<CadastroProduto />} />

      <Route path="/vendas/registrar" element={<RegistrarVenda />} />
      <Route path="/vendas/historico" element={<HistoricoVenda />} />
      <Route path="/vendas/historico/buscar/:id" element={<VendaDetalhes />} />

      <Route path="/estoque/inventario" element={<InventarioGeral />} />
      <Route path="/estoque/movimentacao" element={<MovimentacoesEstoque />} />

      <Route
        path="/financeiro/fechamento-caixa"
        element={<FechamentoCaixa />}
      />
      <Route path="/financeiro/fluxo-caixa" element={<FluxoCaixa />} />
    </Routes>
  );
}
