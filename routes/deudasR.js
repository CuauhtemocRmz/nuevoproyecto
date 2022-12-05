const express = require('express');

const router = express.Router();

router.get('/', async (req,res) =>{
    const respuesta = {
        "Mensaje":"ruta principal deudas",
        "Descripcion": "probando ruta de index deudas",

    }
    res.json(respuesta);
});

router.get('/obtenerdeudas', async (req,res) =>{
    const respuesta = {
        "Mensaje":"ruta principal deudas",
        "Descripcion": "probando ruta de index deudas",
    }
    res.json(respuesta);
});

router.get('/actualizardeuda', async (req,res) =>{
    const respuesta = {
        "Mensaje":"actualizar deudas",
        "Descripcion": "ruta de actualizar deuda",
    }
    res.json(respuesta);
});

router.get('/creardeuda', async (req,res) =>{
    const respuesta = {
        "Mensaje":"crear deuda",
        "Descripcion": "ruta de creacion de deudas",
    }
    res.json(respuesta);
});

router.get('/borrar deuda', async (req,res) =>{
    const respuesta = {
        "Mensaje":"borrar deuda",
        "Descripcion": "ruta para borrar deudas ",
    }
    res.json(respuesta);
});

module.exports = router;

