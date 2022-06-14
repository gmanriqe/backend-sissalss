const express = require('express');
const router = express.Router();

const mysqlConnection = require('./../../connections/database');

// GET all Medios Pago
const listMediosPago = (req, res) => {
    const query = `SELECT * FROM medios_pago order by nombre ASC`;

    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
}

router.get('/api/v1/list_medios_pago', listMediosPago)

module.exports = router;