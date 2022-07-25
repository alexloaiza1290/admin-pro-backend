const { response } = require('express');
const DoctorDB = require('../models/doctorDB');
const getDoctors = async (req, resp) => {
    const doctor = await DoctorDB.find({}, 'name');
    resp.json({
        ok: true,
        doctor: doctor,
    })
}
const createDoctors = async (req, resp = response) => {
    console.log(req.body);
    const {name} = req.body;
    try {
        const existDoctor = await DoctorDB.findOne({ name });
        if (existDoctor) {
            return resp.status(400).json({
                ok: false,
                msg: 'Error doctor ya registrado..!'
            });
        }

        const doctor = new DoctorDB(req.body);
        //encriptar contraseña
        await doctor.save();
        //generar token
        resp.json({
            ok: true,
            doctor: doctor,
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado...!'
        });
    }
}
const updateDoctors = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const doctorDB = await DoctorDB.findById(uid);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un doctor por ese id'
            });
        }

        // Actualizaciones
        const { name, ...campos } = req.body;

        campos.name = name;
        const doctorUpdates = await DoctorDB.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            doctor: doctorUpdates
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const deleteDoctors = async (req, resp = response) => {
    //TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;

    try {
        const doctor = await DoctorDB.findById(uid);

        if (!doctor) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe un doctor con ese id'
            })
        }
        await doctor.remove();
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
    getDoctors: getDoctors,
    createDoctors: createDoctors,
    updateDoctors: updateDoctors,
    deleteDoctors: deleteDoctors
}