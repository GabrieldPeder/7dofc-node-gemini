import 'dotenv/config';
import express from 'express';

// --- Importação dos Roteadores ---
import templateRoutes from './controllers/TemplateController';
import chatRoutes from './controllers/ChatController';
import categoryRoutes from './controllers/CategoryController'; // Importa o novo controller de categorias

const app = express();

// --- Middlewares ---
app.use(express.json());

// --- Montagem das Rotas ---
// Monta todas as rotas no prefixo /api/v1
app.use('/api/v1', chatRoutes);
app.use('/api/v1', templateRoutes);
app.use('/api/v1', categoryRoutes); // Adiciona as rotas de categoria à aplicação

// Exporta a instância 'app' para que os testes possam usá-la
export { app };
