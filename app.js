const express = require('express');
const app = express();
const port = 3000;

const clientes = require('./routes/clientes'); // No hace falta la extensión de archivo
const facturas = require('./routes/facturas');



app.use('/clientes', clientes);
app.use('/facturas', facturas);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})