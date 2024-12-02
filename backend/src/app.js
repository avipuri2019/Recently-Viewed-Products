const express = require("express");
const v1Routes = require("./routes/v1/api");
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true })); // Parses application/x-www-form-urlencoded
require('dotenv').config();
const { swaggerUi, specs } = require("./docs/swagger");

app.use(express.json());

// Allow requests from localhost:3000 (your frontend)
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Swagger UI setup

app.use("/api/v1", v1Routes);
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;