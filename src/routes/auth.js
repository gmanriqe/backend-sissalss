const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken'); // JWT

const mysqlConnection = require('../database.js');

router.post('/api/v1/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM usuario WHERE usuario = '${username}' AND contrasenia = '${password}'`;

    mysqlConnection.query(query, (err, rows, fields) => {
        console.log(rows)
        if (err) {
            res.status(500).json({
                status: '500',
                message: 'Error al iniciar sesion',
                error: err,
            });
        }

        if (rows.length > 0) {
            const token = jwt.sign({ id: rows[0].id }, 'secret', { expiresIn: 5 * 60 });

            res.status(200).json({
                status: '200',
                message: 'Inicio de sesion exitoso',
                token: token,
            });
        } else {
            res.status(401).json({
                status: '401',
                message: 'Usuario o contraseña incorrectos',
            });
        }
    })
})

module.exports = router;