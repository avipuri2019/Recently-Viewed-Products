const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional, specify the format
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply globally if needed
      },
    ],
  },
  apis: ["./src/routes/v1/*.js"], // Path to your routes
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};
