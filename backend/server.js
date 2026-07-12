const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {

    res.json({
        empresa: "VRSoftware",
        estado: "Servidor funcionando 🚀"
    });

});

// Rutas de la API
app.use("/api", contactRoutes);
app.use("/api", authRoutes);

// Iniciar servidor
app.listen(PORT, () => {

    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);

});