const express = require('express');
const app = express();
const uuid = require('uuid');

const logs = require('../middleware/logs');
const Cliente = require('../models/cliente');

// let clientes = [];

// Get para todos los registros

app.get('/', (req, res) => {
    Cliente.find({}).exec((err, data) =>  {
        res.status(200).json({
            mensaje: 'ok',
            clientes: data
        })
    })
})

// Get con parámetros (route-params) se definen con ruta/:nombreparametro/:nombreparametro

app.get('/cliente-id/:_id', (req, res) => {
    Cliente.findById(req.params._id, (err, data) => {
        if(err) {
            return res.status(500).json({
                mensaje: 'El servidor no se encuentra disponible'
            })
        }
        if(!data || data === null) {
            return res.status(404).json({
                mensaje: 'No se encontró ningún cliente con ese _id'
            })
        }
        res.status(200).json({
            mensaje: 'ok',
            cliente: data
        })
    })
})

// Get con parámetros (query-params) se definen en la url de la petición ruta?clave1=valor1&clave2=valor2

app.get('/cliente-localidad', (req, res) => {
    let clientesSeleccionados = [];
    clientesSeleccionados = clientes.filter(elem => {
        if(elem.localidad === req.query.localidad.toLowerCase()) {
            return elem;
        }
    })
    res.status(200).json({
        mensaje: 'ok',
        clientesSeleccionados
    })
})

// Post para crear un nuevo registro

app.post('/', logs.createLog, (req, res) => {
    if(!req.body || JSON.stringify(req.body) === JSON.stringify({})) {
        return res.status(400).json({
            mensaje: 'Datos de cliente no válido'
        })
    }
    let cliente = req.body;
    cliente._id = uuid.v4();
    cliente.nombre = cliente.nombre.toLowerCase();
    if(cliente.localidad) {
        cliente.localidad = cliente.localidad.toLowerCase();
    }
    clientes.push(cliente);
    res.status(200).json({
        mensaje: `El cliente ${cliente.nombre} ha sido creado correctamente`
    })
})

// Put para actualizar (o crear) un nuevo registro

app.put('/:_id', (req, res) => {
    if(!req.body || JSON.stringify(req.body) === JSON.stringify({})) {
        return res.status(400).json({
            mensaje: 'Datos de cliente no válido'
        })
    }
    let posicion = clientes.findIndex(elem => {
        return elem._id === req.params._id;
    })
    if (posicion < 0) {
        return res.status(404).json({
            mensaje: 'No se encontró ningún cliente con ese _id'
        })
    }
    if(req.body.nombre) {
      clientes[posicion].nombre = req.body.nombre.toLowerCase();
    }
    if(req.body.cif) {
        clientes[posicion].cif = req.body.cif;
    }
    if(req.body.localidad) {
        clientes[posicion].localidad = req.body.localidad.toLowerCase();
    }
    res.status(201).json({
        mensaje: `El cliente ${clientes[posicion].nombre} ha sido actualizado correctamente`
    })
})

// Delete elimina un registro

app.delete('/:_id', (req, res) => {
    let posicion = clientes.findIndex(elem => {
        return elem._id === req.params._id;
    })
    if (posicion < 0) {
        return res.status(404).json({
            mensaje: 'No se encontró ningún cliente con ese _id'
        })
    }
    let clienteEliminado = clientes.splice(posicion, 1);
    res.status(200).json({
        mensaje: `El cliente ${clienteEliminado[0].nombre} ha sido eliminado correctamente`
    })
})

module.exports = app;