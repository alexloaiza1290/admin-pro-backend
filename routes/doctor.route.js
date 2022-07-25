const { Router } = require('express');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validar-campos');

const { getDoctors, createDoctors, updateDoctors, deleteDoctors } = require('../controllers/doctor.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validarJWT, getDoctors);
router.post('/',
    [
        //check('name', 'El nombre es obligatorio').not().isEmpty(),
        //check('idHospital', 'El id frl hodpital es obligatorio').not().isEmpty(),
        //check('idUsuarios', 'El iduduarii es obligatorio').not().isEmpty(),
        //validatorFields
    ],
    createDoctors
);
router.put('/:id',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validatorFields
    ],
    updateDoctors
);
router.delete('/:id',
    validarJWT,
    deleteDoctors
);
module.exports = router;