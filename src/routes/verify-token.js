const jwt = require('jsonwebtoken')
const config = require('../../config.json')

const verifyToken = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const token = authorization.substring(7);

    let decodedToken = {}

    try {
        decodedToken = jwt.verify(token, config.secret);
    } catch (e) { 
        // si el token es invalido o expiro
        decodedToken.error = e;
    } 

    console.log('----', decodedToken)

    if(decodedToken.error == 'TokenExpiredError: jwt expired') {
        return res.status(401).json({
            status: '401',
            message: 'Token expirado',
        });
    }

    if(decodedToken.error == 'JsonWebTokenError: invalid signature') {
        return res.status(401).json({
            status: '401',
            message: 'Token inválido',
        });
    }

    next();
}

module.exports = verifyToken;