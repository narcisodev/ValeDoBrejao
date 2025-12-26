import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login/LoginUsuário/Login";
import Main from "../pages/Main/Main";

// Listagem de Cadastros
import Usuarios from "../pages/Cadastros/Listagem/ListUsuários/ListaUsuarios";
import Fornecedores from "../pages/Cadastros/Listagem/ListFornecedores/ListaFornecedores";
import Produtos from "../pages/Cadastros/Listagem/ListProdutos/ListaProdutos";

// Cadastros
import CadastroUsuario from "../pages/Cadastros/Cadastro/CadUsuários/CadastroUsuario";
import CadastroProduto from "../pages/Cadastros/Cadastro/CadProdutos/CadastroProduto";
import CadastroFornecedor from "../pages/Cadastros/Cadastro/CadFornecedores/CadastroFornecedor";

// Vendas
import RegistrarVenda from "../pages/Vendas/Registrar Venda/RegistrarVenda";
import HistoricoVenda from "../pages/Vendas/Histórico de Vendas/HistoricoVendas";
import VendaDetalhes from "../pages/Vendas/VendasDetalhes/VendaDetalhe";

// Estoque
import InventarioGeral from "../pages/Estoque/InventárioGeral/InventarioGeral";
import MovimentacoesEstoque from "../pages/Estoque/MovimentaçõesEstoque/MovimentacoesEstoque";

// Financeiro
import FechamentoCaixa from "../pages/Financeiro/Fechamento de Caixa/FechamentoCaixa";
import FluxoCaixa from "../pages/Financeiro/Fluxo de Caixa/FluxoCaixa";
import EmDesenvolvimento from "../pages/EmDesenvolvimento/EmDesenvolvimento";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Página pública */}
      <Route path="/login" element={<Login />} />

      {/* Páginas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <Usuarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios/cadastro"
        element={
          <ProtectedRoute>
            <CadastroUsuario />
          </ProtectedRoute>
        }
      />

      <Route
        path="/fornecedores"
        element={
          <ProtectedRoute>
            <Fornecedores />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fornecedores/cadastro"
        element={
          <ProtectedRoute>
            <CadastroFornecedor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/produtos"
        element={
          <ProtectedRoute>
            <Produtos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/produtos/cadastro"
        element={
          <ProtectedRoute>
            <CadastroProduto />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vendas/registrar"
        element={
          <ProtectedRoute>
            <RegistrarVenda />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendas/historico"
        element={
          <ProtectedRoute>
            <HistoricoVenda />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendas/historico/buscar/:id"
        element={
          <ProtectedRoute>
            <VendaDetalhes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/estoque/inventario"
        element={
          <ProtectedRoute>
            <InventarioGeral />
          </ProtectedRoute>
        }
      />
      <Route
        path="/estoque/movimentacao"
        element={
          <ProtectedRoute>
            <MovimentacoesEstoque />
          </ProtectedRoute>
        }
      />

      <Route
        path="/financeiro/fechamento-caixa"
        element={
          <ProtectedRoute>
            <FechamentoCaixa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financeiro/fluxo-caixa"
        element={
          <ProtectedRoute>
            <FluxoCaixa />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<EmDesenvolvimento />} />
    </Routes>
  );
}
