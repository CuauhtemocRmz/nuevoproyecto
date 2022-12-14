const express = require('express');

const personasR = require('./personasR.js');
const deudasR = require('./deudasR.js');
const abonosR = require('./abonosR.js');


function routerApi(app){
    const router = express.Router();
    app.use('/apiSistemaCobros/v1Dev',router);
    router.use('/personas',personasR);
    router.use('/deudas',deudasR);
    router.use('/abonos',abonosR);
}

module.exports = routerApi;