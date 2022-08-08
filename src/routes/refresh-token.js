const express = require('express');
const router = express.Router();
const config = require('../../config.json');
const verifyToken = require('../middleware/md-refresh.js');

router.post(`${config.endpoint_path}/refreshToken`, verifyToken, (req, res) => {
    res.json({
        status: '200',
        message: 'Token refresh',
        token: req.token,
        refreshToken: req.refreshToken,
    });
})

module.exports = router;