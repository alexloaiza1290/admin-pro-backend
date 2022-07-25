const { response } = require('express');
const bcryptj = require('bcryptjs');
const HospitalDB = require('../models/hospitalDB');
const { generarJWT } = require('../helpers/jwt');
const getHospitals = async (req, resp) => {
    const hospital = await HospitalDB.find({}, 'name');
    resp.json({
        ok: true,
        hospital: hospital,
    })
}
const createHospitals = async (req, resp = response) => {
    const { name } = req.body;
    try {

        const existHospital = await HospitalDB.findOne({ name });
        if (existHospital) {
            return resp.status(400).json({
                ok: false,
                msg: 'Error hospital ya registrado..!'
            });
        }

        const hospital = new HospitalDB(req.body);
        await hospital.save();
        //generar token
        resp.json({
            ok: true,
            hospital: hospital,
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado...!'
        });
    }
}
const updateHospitals = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const hospitalDB = await HospitalDB.findById(uid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital por ese id'
            });
        }

        // Actualizaciones
        const { name, ...campos } = req.body;
        campos.name = name;
        const hospitalActualizado = await HospitalDB.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const deleteHospitals = async (req, resp = response) => {
    //TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;

    try {
        const hospital = await HospitalDB.findById(uid);

        if (!hospital) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            })
        }
        await hospital.remove();
        resp.json({
            ok: true,
            ms: 'Hospital eliminado...!'
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
    getHospitals: getHospitals,
    createHospitals: createHospitals,
    updateHospitals: updateHospitals,
    deleteHospitals: deleteHospitals
}