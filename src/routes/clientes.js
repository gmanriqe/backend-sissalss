const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

const listCliente = (req, res) => {
	mysqlConnection.query('SELECT * FROM clientes', (err, rows, fields) => {
		if (!err) {
			res.json(rows);
		} else {
			console.log(err);
		}
	});
}

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

// GET all clientes
router.get('/api/v1/list_clientes', listCliente);
// INSERT An client
router.post('/api/v1/add_clientes', addCliente);

module.exports = router;
