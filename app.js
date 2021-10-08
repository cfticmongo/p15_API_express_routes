const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;

const clientes = require('./routes/clientes'); // No hace falta la extensión de archivo
const facturas = require('./routes/facturas');

const mongoURI = 'mongodb+srv://apitest:yS8K2Ay9Y1z5S2HJ@cluster0.dznjg.mongodb.net/erp?retryWrites=true&w=majority'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

app.use(cors()); // La API queda abierta a las peticiones desde cualquier dominio

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(mongoURI, options)
        .then(() => console.log('Dataserver conected'))
        .catch(err => console.log(err))

app.use('/clientes', clientes);
app.use('/facturas', facturas);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})