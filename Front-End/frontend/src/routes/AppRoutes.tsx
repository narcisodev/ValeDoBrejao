import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/LoginUsuário/Login";
import Main from "../pages/Main/Main";

//Listagem de Cadastros
import Usuarios from "../pages/Cadastros/Listagem/ListUsuários/ListaUsuarios";
import Fornecedores from "../pages/Cadastros/Listagem/ListFornecedores/ListaFornecedores";
import Produtos from "../pages/Cadastros/Listagem/ListProdutos/ListaProdutos";

//Cadastros
import CadastroUsuario from "../pages/Cadastros/Cadastro/CadUsuários/CadastroUsuario";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/fornecedores" element={<Fornecedores />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/usuarios/cadastro" element={<CadastroUsuario />} />
    </Routes>
  );
}
