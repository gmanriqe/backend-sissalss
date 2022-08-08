// 1ero paquetes de terceros
const jwt = require('jsonwebtoken'); // JWT
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
// 2do mis paquetes
const mysqlConnection = require('./../../connections/database');
const config = require('../../config.json')

router.post('/api/v1/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM usuario
    INNER JOIN rol
    ON usuario.id_rol = rol.id
    WHERE usuario = '${username}' OR email = '${username}'`;

    mysqlConnection.query(query, (err, rows, fields) => {
        if (err) {
            res.status(500).json({
                status: '500',
                message: 'Error al iniciar sesion',
                error: err,
            });
        }
        
        // Bcryp para comparar la contraseña
        if (rows.length > 0) {
            bcrypt.compare(password, rows[0].contrasenia, (err, result) => {
                if (err) {
                    res.status(500).json({
                        status: '500',
                        message: 'Error al iniciar sesion',
                        error: err,
                    });
                }
                console.log(rows[0])
                if(result) {
                    // Generar el token
                    const user = {
                        id: rows[0].id,
                        usuario: rows[0].usuario,
                        email: rows[0].email,
                        rol: rows[0].nombre,
                    }
                    const token = jwt.sign(user, config.secret, { expiresIn: config.token_expiration });
        
                    res.status(200).json({
                        status: '200',
                        message: 'Inicio de sesion exitoso',
                        token: token,
                    });
                }
                else {
                    res.status(401).json({
                        status: '401',
                        message: 'Contraseña incorrecta',
                    });
                }
            });
        } else {
            res.status(401).json({
                status: '401',
                message: 'Usuario no existe',
            });
        }
    })
})

module.exports = router;