import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Prompt API - #7DaysOfCode",
      version: "1.0.0",
      description:
        "API para gerenciamento de templates e categorias de prompts, com integração à IA Gemini.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
  },
  // Caminho para os arquivos que contêm as anotações da API (nossos controllers)
  apis: ["./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  // Rota para servir a UI do Swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger UI disponível em /api-docs");
};
