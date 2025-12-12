import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import funcionariosRoutes from "./routes/funcionarioRoutes";
import loginRoutes from "./routes/loginRoutes";
import { auth } from "./middlewares/auth";
import fornecedorRoutes from "./routes/fornecedorRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/login", loginRoutes);

app.use("/funcionarios", auth, funcionariosRoutes);
app.use("/fornecedores", auth, fornecedorRoutes);

const PORT = process.env.API_PORT;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
