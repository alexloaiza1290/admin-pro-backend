const { response } = require('express');
const bcryptj = require('bcryptjs');
const UserDB = require('../models/userDB');
const { generarJWT } = require('../helpers/jwt');
const getUsers = async (req, resp) => {
    const user = await UserDB.find({}, 'name email role google');
    resp.json({
        ok: true,
        user,
    })
}
const createUsers = async (req, resp = response) => {
    const { email, password } = req.body;
    try {

        const existEmail = await UserDB.findOne({ email });
        if (existEmail) {
            return resp.status(400).json({
                ok: false,
                msg: 'Error correo ya registrado..!'
            });
        }

        const user = new UserDB(req.body);
        //encriptar contraseña
        const salt = bcryptj.genSaltSync();
        user.password = bcryptj.hashSync(password, salt);
        //guardar usuario
        await user.save();
        //generar token
        const token = await generarJWT(user.id);
        resp.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado...!'
        });
    }
}
const updateUsers = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const usuarioDB = await UserDB.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await UserDB.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await UserDB.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const deleteUsers = async (req, resp = response) => {
    //TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;

    try {
        const user = await UserDB.findById(uid);

        if (!user) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }
        await user.remove();
        resp.json({
            ok: true,
            ms: 'Usuario eliminado...!'
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado...!'
        });
    }
}
module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers
}