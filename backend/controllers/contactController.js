const enviarCorreo = require("../services/emailService");

const {
    guardarContacto,
    obtenerContactos,
    eliminarContacto: eliminarContactoModel
} = require("../models/contactModel");

exports.enviarMensaje = async (req, res) => {

    try {

        const {
            nombre,
            correo,
            empresa,
            mensaje
        } = req.body;

        // Primero guardar en la base de datos
        await guardarContacto({
            nombre,
            correo,
            empresa,
            mensaje
        });

        // Intentar enviar el correo, pero sin detener el proceso si falla
        try {

            await enviarCorreo({
                nombre,
                correo,
                empresa,
                mensaje
            });

        } catch (error) {

            console.error("Error enviando correo:", error.message);

        }

        res.json({
            ok: true,
            mensaje: "✅ Mensaje enviado correctamente."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "❌ Error al guardar el mensaje."
        });

    }

};

exports.obtenerContactos = async (req, res) => {

    try {

        const contactos = await obtenerContactos();

        res.json(contactos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al obtener los contactos."
        });

    }

};

exports.eliminarContacto = async (req, res) => {

    try {

        await eliminarContactoModel(req.params.id);

        res.json({
            ok: true,
            mensaje: "Contacto eliminado correctamente."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al eliminar el contacto."
        });

    }

};