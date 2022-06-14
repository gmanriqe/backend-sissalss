const express = require('express');
const router = express.Router();

const mysqlConnection = require('./../../connections/database');

// INSERT An Employee
const addEmpleados = (req, res) => {
    const {
        nombres,
        apellidos,
        id_documento_identidad,
        numero_documento,
        fecha_nacimiento,
        telefono,
        direccion,
        referencia,
        id_tipo_cargo
    } = req.body;
    const query = `INSERT INTO empleados (
        nombres, 
        apellidos, 
        id_documento_identidad,
        numero_documento,
        fecha_nacimiento,
        telefono,
        direccion,
        referencia,
        id_tipo_cargo) VALUES (?,?,?,?,?,?,?,?,?)`;

    mysqlConnection.query(query, [nombres,
        apellidos,
        id_documento_identidad,
        numero_documento,
        fecha_nacimiento,
        telefono,
        direccion,
        referencia,
        id_tipo_cargo], (err, rows, fields) => {
            if (!err) {
                return res.status(200).json({
                    status: 'Se registro con exito',
                });
            } else {
                console.log(err);
            }
        });
}

// router.get('/api/v1/empleados', getEmpleados)
router.post('/api/v1/addEmpleados', addEmpleados)

module.exports = router;