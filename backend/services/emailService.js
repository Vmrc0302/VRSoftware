const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

const enviarCorreo = async ({ nombre, correo, empresa, mensaje }) => {

    const opciones = {

        from: process.env.EMAIL_USER,

        to: process.env.EMAIL_USER,

        subject: "📩 Nuevo contacto desde VRSoftware",

        html: `
            <h2>Nuevo mensaje recibido</h2>

            <p><strong>Nombre:</strong> ${nombre}</p>

            <p><strong>Correo:</strong> ${correo}</p>

            <p><strong>Empresa:</strong> ${empresa || "No especificada"}</p>

            <p><strong>Mensaje:</strong></p>

            <p>${mensaje}</p>
        `
    };

    await transporter.sendMail(opciones);

};

module.exports = enviarCorreo;