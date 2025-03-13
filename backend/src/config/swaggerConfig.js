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
      description: "Documentación de la API - TALLER DEL ARTESANO -",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Cart: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65b2d0b2d7e6e9001567b123" },
            user: { type: "string", example: "65a2d0b2d7e6e9001567b456" },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  product: { type: "string", example: "65a2d0b2d7e6e9001567b789" },
                  quantity: { type: "integer", example: 2 },
                },
              },
            },
          },
        },
        Ticket: {
          type: "object",
          properties: {
            _id: { type: "string", example: "65b2d0b2d7e6e9001567b555" },
            user: { type: "string", example: "65a2d0b2d7e6e9001567b456" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  product: { type: "string", example: "65a2d0b2d7e6e9001567b789" },
                  quantity: { type: "integer", example: 2 },
                },
              },
            },
            total: { type: "number", example: 29.99 },
            createdAt: { type: "string", format: "date-time", example: "2025-03-07T10:00:00Z" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Documentar las rutas de la API
};

const swaggerSpecs = swaggerJsdoc(options);

export { swaggerUi, swaggerSpecs };
