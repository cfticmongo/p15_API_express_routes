let logs = [];

exports.createLog = (req, res, next) => {
    logs.push({fecha: new Date(), usuario: req.body.creadoPor})
    console.log(logs);
    req.body.registrado = 'ok';
    next();
}