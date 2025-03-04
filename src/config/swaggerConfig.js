import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Negocios y Productos",
      version: "1.0.0",
      description: "Documentación de la API para la gestión de negocios y productos",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Documentar las rutas de la API
};

const swaggerSpecs = swaggerJsdoc(options);

export { swaggerUi, swaggerSpecs };
