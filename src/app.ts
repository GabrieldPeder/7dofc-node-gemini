import "dotenv/config";
import express from "express";
import { setupSwagger } from "./swagger"; // Importa nossa configuração do Swagger

// --- Importação dos Roteadores ---
import templateRoutes from "./controllers/TemplateController";
import chatRoutes from "./controllers/ChatController";
import categoryRoutes from "./controllers/CategoryController";

const app = express();

// --- Middlewares ---
app.use(express.json());

// --- Montagem das Rotas ---
app.use("/api/v1", chatRoutes);
app.use("/api/v1", templateRoutes);
app.use("/api/v1", categoryRoutes);

// --- Configuração do Swagger ---
// Esta função configura a rota /api-docs
setupSwagger(app);

// Exporta a instância 'app' para que os testes possam usá-la
export { app };
