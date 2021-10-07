const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Ok facturas'
    })
})

module.exports = app;