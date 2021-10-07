const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const clientes = require('./routes/clientes'); // No hace falta la extensión de archivo
const facturas = require('./routes/facturas');

app.use(cors()); // La API queda abierta a las peticiones desde cualquier dominio

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/clientes', clientes);
app.use('/facturas', facturas);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})