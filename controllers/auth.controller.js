const { response } = require('express');
const UserDB = require('../models/userDB');
const bcryptj = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, resp = response) => {
    const { email, password } = req.body;
    try {
        //verificar el emaail
        const emailValid = await UserDB.findOne({ email });
        if (!emailValid) {
            return resp.status(404).json({
                ok: false,
                msg: 'Error de email'
            });
        }
        //verificar contraseña
        const passwordValid = bcryptj.compareSync(password, emailValid.password);
        if (!passwordValid) {
            return resp.status(400).json({
                ok: false,
                msg: 'Error de contraseña'
            });
        }
        //generar el token
        const token = await generarJWT(UserDB.id);
        resp.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
module.exports = {
    login
}