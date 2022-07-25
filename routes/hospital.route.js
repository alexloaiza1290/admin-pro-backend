const { Router } = require('express');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validar-campos');

const { getHospitals, createHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospital.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validarJWT, getHospitals);
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validatorFields
    ],
    createHospitals
);
router.put('/:id',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validatorFields
    ],
    updateHospitals
);
router.delete('/:id',
    validarJWT,
    deleteHospitals
);
module.exports = router;