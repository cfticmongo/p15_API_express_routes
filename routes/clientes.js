const express = require('express');
const app = express();

app.get('/', (req, res) => { // Esta ruta equivale al endpoint http://localhost:3000/clientes
    res.status(200).json({
        mensaje: 'Clientes ok'
    })
})

app.get('/localidad', (req, res) => { // Esta ruta equivale al endpoint http://localhost:3000/clientes/localidad
    res.status(200).json({
        mensaje: 'Lorem ipsum...'
    })
})

module.exports = app;