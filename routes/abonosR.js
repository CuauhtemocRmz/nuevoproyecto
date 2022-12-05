const express = require('express');
const AbonosService = require('../services/abonosS');

const router = express.Router();
const serviceAbonos = new AbonosService();

router.get('/', async (req,res) =>{
    const respuesta = {
        "Mensaje":"ruta principal abonos",
        "Descripcion": "probando ruta de index abonos",
        "ruta":"localhost:3001//api/v1/abonos",
    }
    res.json(respuesta);
});

router.get('/obtenerAbonos', async (req,res) =>{
    const abonos = await serviceAbonos.obtenerAbonos();
    res.json(abonos);
});

router.get('/actualizarabono', async (req,res) =>{
    const respuesta = {
        "Mensaje":"actualizar abonos",
        "Descripcion": "ruta de actualizar abono",
    }
    res.json(respuesta);
});

router.get('/crearabono', async (req,res) =>{
    const respuesta = {
        "Mensaje":"crear abono",
        "Descripcion": "ruta de creacion de abonos",
    }
    res.json(respuesta);
});

router.get('/borrarabono', async (req,res) =>{
    const respuesta = {
        "Mensaje":"borrar abono",
        "Descripcion": "ruta para borrar abonos ",
    }
    res.json(respuesta);
});

module.exports = router;

