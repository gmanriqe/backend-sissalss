const express = require('express');
const router = express.Router();
const verifyToken = require('./verify-token.js');
const mysqlConnection = require('../../connections/database');
const config = require('../../config.json')

const listClients = async (req, res) => {
	mysqlConnection.query('SELECT * FROM cliente', (err, rows) => {
        if(err) {
            res.status(500).json({
                status: '500',
                message: 'Error al listar los clientes',
                error: err,
            });
        }

        return res.status(200).json({
            status: '200',
            message: 'Lista de clientes',
            data: JSON.stringify(rows)
        });
	});
}

/*
const addCliente = (req, res) => {
	const {
		nombres,
		apellidos,
		id_documento_identidad,
		numero_documento,
		fecha_nacimiento,
		telefono,
		observacion,
		sexo,
		id_ocupacion
	} = req.body;
	console.log(req.body)
	const query = `INSERT INTO clientes (nombres,
		apellidos,
		id_documento_identidad,
		numero_documento,
		fecha_nacimiento,
		telefono,
		observacion,
		sexo,
		id_ocupacion) VALUES (?,?,?,?,?,?,?,?,?)`;

	mysqlConnection.query(query, [nombres,
		apellidos,
		id_documento_identidad,
		numero_documento,
		fecha_nacimiento,
		telefono,
		observacion,
		sexo,
		id_ocupacion], (err, rows, fields) => {
			if (!err) {
				return res.status(200).json({
					status: 'Se registro con exito',
				});
			} else {
				console.log(err);
			}
		});
}
*/

// GET all clients
router.get(`${config.endpoint_path}/list_clients`, verifyToken, listClients);
// INSERT An client
// router.post('/api/v1/add_clientes', addCliente);

module.exports = router;
