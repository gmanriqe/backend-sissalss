const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// INSERT An cita
const addCita = (req, res) => {
    const { fecha_atencion, hora_atencion, id_medio_pago, id_cliente } = req.body;

    const query = `
        SET @fecha_atencion = ?;
        SET @hora_atencion = ?;
        SET @id_medio_pago = ?;
        SET @id_cliente = ?;
        CALL sp_nueva_cita(@fecha_atencion, @hora_atencion, @id_medio_pago, @id_cliente, @id_cita); select @id_cita as citaID;
    `;
    
    mysqlConnection.query(query, [fecha_atencion, hora_atencion, id_medio_pago, id_cliente], (err, rows, fields) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err
            });
        }

        return res.status(200).json({
            data: rows[5][0].citaID,
            status: 'success',
            message: 'Cita registrada con exito',
        });
    });
}

// INSERT An cita details
const addCitaDetails = (req, res) => {
    console.log('por construir')
}


router.post('/api/v1/cita', addCita)
router.post('/api/v1/cita/:id/servicio', addCitaDetails)

module.exports = router;