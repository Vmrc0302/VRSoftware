const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            ok: false,
            mensaje: "Token no proporcionado."
        });

    }

    const token = authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            ok: false,
            mensaje: "Token inválido."
        });

    }

    try {

        const datos = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = datos;

        next();

    } catch (error) {

        return res.status(401).json({
            ok: false,
            mensaje: "Token expirado o inválido."
        });

    }

};

module.exports = verificarToken;