const express = require('express');
const router = express.Router();
const mysqlConnection = require('./../../connections/database');

// GET all Documento Identidad
const listDocumentoIdentidad = (req, res) => {
    const query = `SELECT * FROM documento_identidad order by nombre ASC`;

    mysqlConnection.query(query, (err, rows, fields) => {
        if(err) {
            res.status(500).json({
                status: '500',
                message: 'Error al listar los tipos de documentos',
                error: err,
            });
        }

        return res.status(200).json({
            status: '200',
            message: 'Lista de tipos de documentos',
            data: JSON.stringify(rows)
        });
    });
}

router.get('/api/v1/list_documento_identidad', listDocumentoIdentidad)
module.exports = router;