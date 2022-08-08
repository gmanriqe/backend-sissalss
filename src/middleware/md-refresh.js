// 1ero paquetes de terceros
const jwt = require('jsonwebtoken');
// 2do mis paquetes
const config = require('../../config.json');

const tokenRefresh = async (req, res, next) => {
    const data = req.body;

    if (data) {
        const decodedToken = await jwt.verify(data.refreshToken, config.refresh_secret);
        const user = {
            id: decodedToken.id,
            usuario: decodedToken.usuario,
            email: decodedToken.email,
            rol: decodedToken.rol,
        }
        const token = await jwt.sign(user, config.secret, { expiresIn: config.token_expiration })
        const refreshToken = await jwt.sign(user, config.refresh_secret, { expiresIn: config.refresh_token_expiration });
        req.token = token;
        req.refreshToken = refreshToken;
    }

    next();
}

module.exports = tokenRefresh;