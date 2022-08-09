// 1ero paquetes de terceros
const jwt = require('jsonwebtoken'); // JWT
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
// 2do mis paquetes
const mysqlConnection = require('./../../connections/database');
const config = require('../../config.json')

router.post(`${config.endpoint_path}/login`, (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM users
    INNER JOIN rol
    ON users.id_rol = rol.id
    WHERE username = '${username}' OR email = '${username}'`;

    mysqlConnection.query(query, (err, rows, fields) => {
        if (err) {
            return res.status(500).json({
                status: '500',
                message: 'Error al iniciar sesion',
                error: err,
            });
        }

        // Bcryp para comparar la contraseña
        if (rows.length > 0) {
            bcrypt.compare(password, rows[0].password, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: '500',
                        message: 'Error al iniciar sesion',
                        error: err,
                    });
                }

                if(result) {

                    const user = {
                        id: rows[0].id,
                        usuario: rows[0].usuario,
                        email: rows[0].email,
                        rol: rows[0].nombre,
                    }

                    const token = jwt.sign(user, config.secret, { expiresIn: config.token_expiration });
                    const refreshToken = jwt.sign(user, config.refresh_secret, { expiresIn: config.refresh_token_expiration });

                    return res.status(200).json({
                        status: '200',
                        message: 'Inicio de sesion exitoso',
                        token: token,
                        refreshToken: refreshToken
                    });
                }
                else {
                    return res.status(401).json({
                        status: '401',
                        message: 'Contraseña incorrecta',
                    });
                }
            });
        } else {
            return res.status(401).json({
                status: '401',
                message: 'Usuario no existe',
            });
        }
    })
})

module.exports = router;