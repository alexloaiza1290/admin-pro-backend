const { Router } = require('express');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validar-campos');

const { getUsers, createUsers, updateUsers, deleteUsers } = require('../controllers/user.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validarJWT, getUsers);
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validatorFields
    ],
    createUsers
);
router.put('/:id',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validatorFields
    ],
    updateUsers
);
router.delete('/:id',
    validarJWT,
    deleteUsers
);
module.exports = router;