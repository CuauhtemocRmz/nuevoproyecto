const express = require('express');

const router = express.Router();

router.get('/', async (req,res) =>{
    const respuesta = {
        "Mensaje":"ruta principal personas",
        "Descripcion": "probando ruta de index personas",

    }
    res.json(respuesta);
});

router.get('/obtenerpersonas', async (req,res) =>{
    const respuesta = {
        "Mensaje":"ruta principal personas",
        "Descripcion": "probando ruta de index personas",
    }
    res.json(respuesta);
});

router.get('/actualizarpersona', async (req,res) =>{
    const respuesta = {
        "Mensaje":"actualizar personas",
        "Descripcion": "ruta de actualizar persona",
    }
    res.json(respuesta);
});

router.get('/crearpersona', async (req,res) =>{
    const respuesta = {
        "Mensaje":"crear persona",
        "Descripcion": "ruta de creacion de personas",
    }
    res.json(respuesta);
});

router.get('/borrar persona', async (req,res) =>{
    const respuesta = {
        "Mensaje":"borrar persona",
        "Descripcion": "ruta para borrar personas ",
    }
    res.json(respuesta);
});

module.exports = router;

