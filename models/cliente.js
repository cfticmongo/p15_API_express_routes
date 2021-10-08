const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nombre: String,
    cif: String,
    localidad: String
})

module.exports = mongoose.model('Cliente', ClienteSchema); // Enlaza a la colección del mismo nombre en minúsculas y plural