const jwt = require('jsonwebtoken');
const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'JWT no generado'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token invalido'
        })
    }
    next();
}

module.exports = {
    validarJWT
}