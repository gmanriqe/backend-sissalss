const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken'); // Token generator
const bcrypt = require('bcrypt'); // Password hashing

const mysqlConnection = require('../database.js');

router.post('/api/v1/login', (req, res) => {
    const { username, password } = req.body;

    // 1ero: Consulto a la BD si existe el usuario
    const query = `SELECT * FROM usuario WHERE usuario = '${username}'`;

    mysqlConnection.query(query, (err, rows, fields) => {
        if (err) {
            res.status(500).json({
                status: '500',
                message: 'Error al iniciar sesion',
                error: err,
            });
        }

        // 2do: Bcryp para comparar la contraseña
        if (rows.length > 0) {
            bcrypt.compare(password, rows[0].contrasenia, (err, result) => {
                if (err) {
                    res.status(500).json({
                        status: '500',
                        message: 'Error al iniciar sesion',
                        error: err,
                    });
                }

                if(result) {
                    // 3ro: Genero el token
                    const token = jwt.sign({ id: rows[0].id }, 'secret', { expiresIn: 5 * 60 });
        
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