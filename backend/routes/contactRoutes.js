const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {

    enviarMensaje,

    obtenerContactos,

    eliminarContacto

} = require("../controllers/contactController");

// Ruta pública
router.post("/contacto", enviarMensaje);

// Rutas protegidas
router.get("/contactos", verificarToken, obtenerContactos);

router.delete("/contactos/:id", verificarToken, eliminarContacto);

module.exports = router;