const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { buscarUsuario } = require("../models/userModel");

exports.login = async (req, res) => {

    try {

        const {

            usuario,

            password

        } = req.body;

        if (!usuario || !password) {

            return res.status(400).json({

                ok: false,

                mensaje: "Debes ingresar usuario y contraseña."

            });

        }

        const user = await buscarUsuario(usuario);

        if (!user) {

            return res.status(401).json({

                ok: false,

                mensaje: "Usuario o contraseña incorrectos."

            });

        }

        const passwordCorrecta = await bcrypt.compare(

            password,

            user.password

        );

        if (!passwordCorrecta) {

            return res.status(401).json({

                ok: false,

                mensaje: "Usuario o contraseña incorrectos."

            });

        }

        const token = jwt.sign(

            {

                id: user.id,

                usuario: user.usuario

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "8h"

            }

        );

        res.json({

            ok: true,

            token,

            usuario: user.usuario

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            ok: false,

            mensaje: "Error interno del servidor."

        });

    }

};