const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).json({
            status: '403',
            message: 'No tienes autorizacion para acceder a este recurso',
        });
    }
}

module.exports = verifyToken;