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

        await enviarCorreo({
            nombre,
            correo,
            empresa,
            mensaje
        });

        await guardarContacto({
            nombre,
            correo,
            empresa,
            mensaje
        });

        res.json({
            ok: true,
            mensaje: "✅ Mensaje enviado correctamente."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: "❌ Error al enviar el mensaje."
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