const { Router } = require('express');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validar-campos');

const { getUsers, createUsers, updateUsers } = require('../controllers/user.controller');
const router = Router();

router.get('/', getUsers);
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validatorFields
], createUsers);
router.put('/:id', [
    check('email', 'El email es obligatorio').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validatorFields
], updateUsers);
module.exports = router;