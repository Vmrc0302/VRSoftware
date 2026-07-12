const db = require("../config/database");

const buscarUsuario = async (usuario) => {

    const [rows] = await db.execute(

        "SELECT * FROM usuarios WHERE usuario = ? LIMIT 1",

        [usuario]

    );

    return rows[0];

};

module.exports = {

    buscarUsuario

};