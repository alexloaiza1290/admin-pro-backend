const { Router } = require('express');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth.controller');
const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validatorFields
    ],
    login
);
module.exports = router;