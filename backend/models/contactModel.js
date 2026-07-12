const db = require("../config/database");

const guardarContacto = async (datos) => {

    const {

        nombre,

        correo,

        empresa,

        mensaje

    } = datos;

    await db.execute(

        `INSERT INTO contactos
        (nombre, correo, empresa, mensaje)
        VALUES (?, ?, ?, ?)`,

        [

            nombre,

            correo,

            empresa,

            mensaje

        ]

    );

};

const obtenerContactos = async () => {

    const [rows] = await db.execute(

        `SELECT * FROM contactos ORDER BY fecha DESC`

    );

    return rows;

};

const eliminarContacto = async (id) => {

    await db.execute(

        "DELETE FROM contactos WHERE id = ?",

        [id]

    );

};

module.exports = {

    guardarContacto,

    obtenerContactos,

    eliminarContacto

};