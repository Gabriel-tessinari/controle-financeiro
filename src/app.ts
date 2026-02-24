import express, { Request, Response } from "express";
import devedoresRoutes from "./routes/devedores";
import dividasRoutes from "./routes/dividas";
import { httpLogger } from "./shared/utils/logger";

const app = express();
app.use(express.json());

app.use(httpLogger);

// Rotas
app.use("/devedores", devedoresRoutes);
app.use("/dividas", dividasRoutes);

app.get("/", (req: Request, res: Response): void => {
  res.send("API rodando 🚀");
});

const PORT = 3000;
app.listen(PORT, (): void => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
