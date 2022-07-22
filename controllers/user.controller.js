const { response } = require('express');
const bcryptj = require('bcryptjs');
const User = require('../models/userDB');
const userDB = require('../models/userDB');
const getUsers = async (req, resp) => {
    const user = await User.find({}, 'name lastName password email google');
    resp.json({
        ok: true,
        user
    })
}
const createUsers = async (req, resp = response) => {
    const { email, name, lastName, password } = req.body;

    try {
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return resp.status(400).json({
                ok: false,
                msg: 'Error correo ya registrado..!'
            });
        }

        const user = new User(req.body);
        //encriptar contraseña
        const salt = bcryptj.genSaltSync();
        user.password = bcryptj.hashSync(password, salt);
        //guardar usuario
        await user.save();
        resp.json({
            ok: true,
            user
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado...!'
        });
    }
}
const updateUsers = async (req, resp = response) => {
    const uid = req.params.id;

    try {
            resp.json({
                ok: true,
                uid
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
    updateUsers
}