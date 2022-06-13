const express = require('express')
const router = express.Router();

const jwt = require('jsonwebtoken'); // JWT
const verifyToken = require('./verify-token.js');

const mysqlConnection = require('../database.js');

// INSERT An quote
const addCita = (req, res) => {
    const {
        fecha_atencion,
        hora_atencion,
        id_medio_pago,
        id_cliente,
        observacion,
        monto_adelanto,
        estado
    } = req.body;

    const query = `INSERT INTO citas (fecha_atencion,
        hora_atencion,
        id_medio_pago,
        id_cliente,
        observacion,
        monto_adelanto,
        estado) VALUES (?,?,?,?,?,?,?)`;

    mysqlConnection.query(query, [fecha_atencion,
        hora_atencion,
        id_medio_pago,
        id_cliente,
        observacion,
        monto_adelanto,
        estado], (err, rows, fields) => {
            if (err) {
                res.status(500).json({
                    status: '500',
                    message: 'Error al registrar la cita',
                    error: err,
                });
            }

            return res.status(200).json({
                status: '200',
                message: 'Cita registrada con exito',
                id_cita: rows.insertId
            });
        }
    );
}

// LIST all quotes
const listCita = (req, res) => {
    mysqlConnection.query('SELECT * FROM usuario', (err, rows, fields) => {
        if (err) {
            res.status(500).json({
                status: '500',
                message: 'Error al listar las citas',
                error: err,
            });
        }
        
        jwt.verify(req.token, 'secret', (err, authData) => {
            if (err) {
                res.status(403).json({
                    status: '403',
                    message: 'No tienes autorizacion para acceder a este recurso',
                });
            }
    
            return res.status(200).json({
                status: '200',
                message: 'Lista de citas con éxito',
                authData,
                data: JSON.stringify(rows)
            });
        });
    });

    // jwt.verify(req.token, 'secret', (err, authData) => {
    //     if (err) {
    //         res.status(403).json({
    //             status: '403',
    //             message: 'No tienes autorizacion para acceder a este recurso',
    //         });
    //     }

    //     return res.status(200).json({
    //         status: '200',
    //         message: 'Lista de citas con éxito',
    //         authData,
    //         data: JSON.stringify(rows)
    //     });
    // });
}


// LIST all quotes
router.get('/api/v1/list_citas', verifyToken, listCita);
// INSERT An cites
router.post('/api/v1/add_cita', addCita);

module.exports = router;