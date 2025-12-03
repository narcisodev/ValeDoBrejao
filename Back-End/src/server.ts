import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import funcionariosRoutes from "./routes/funcionarioRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/funcionarios", funcionariosRoutes);

const PORT = process.env.API_PORT || 3001;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
