import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/LoginUsuário/Login";
import Main from "../pages/Main/Main";

//Cadastros
import Usuarios from "../pages/Cadastros/Listagem/ListUsuários/ListaUsuarios";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/usuarios" element={<Usuarios />} />
    </Routes>
  );
}
