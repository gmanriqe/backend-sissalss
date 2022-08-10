const express = require('express');
const router = express.Router();
const mysqlConnection = require('./../../connections/database');
const config = require('../../config.json')

const listMenu = async (req, res) => {
    let { username } = req.body
    let sql = `call sp_permissions_menu('${username}')`;

    mysqlConnection.query(sql, [username], (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: '500',
                message: 'Error al obtener los menus',
                error: err,
            });
        }
        
        
        if(rows[0].length > 0) {
            return res.status(200).json({
                status: '200',
                message: 'Lista de menus',
                data: rows,
            });
        } else {
            return res.status(404).json({
                status: '404',
                message: 'El usuario no existe',
            });
        }
    });
}
router.post(`${config.endpoint_path}/permissions_menu`, listMenu)

module.exports = router;