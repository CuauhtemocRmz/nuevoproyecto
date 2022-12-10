const {create} = require('domain');
const express = require('express');
const router = express.Router();

const UsuariosService = require('../services/usuariosS');
const UsuariosInfoService = require('../services/usuarios_infoS');
const TipoPersonaService = require('../services/tipo_personaS');
const DatosGeneralesService = require('../services/datos_generalesS');

const serviceUsuarios = new UsuariosService();
const serviceUsuariosInfo = new UsuariosInfoService();
const tipoPersonaService = new TipoPersonaService();
const serviceDatosGenerales = new DatosGeneralesService();

function dep(funcion,nombre){
    console.log("\n");
    console.log("---------------");
    console.log(nombre);
    console.log(funcion);
    console.log("---------------");
    console.log("\n");

}

router.get('/',async(req,res)=>{
    const respuesta = {
        "Mensaje":"Servicio principal de personas",
        "Descripcion":"Ruta principal de la categoria de personas",
        "ruta":"localhost:3001//apiSistemaCobros/v1Dev/personas/"
    }
    res.json(respuesta);
});

router.post('/agregarPersona',async(req,res)=>{
    let respuesta="";
    try{
        const {usuario,tipoPersona,datosGenerales} = req.body;
        const datosGeneralesAgregados = await serviceDatosGenerales.agregarDatosGenerales(datosGenerales);
        //depurar en consola
        dep(datosGeneralesAgregados,"datosGeneralesAgregados");

        const usuarioAgregado = await serviceUsuarios.agregarUsuario(usuario);
        //depurar en consola
        dep(usuarioAgregado,"usuarioAgregado");

        const usuarioInfoAgregado = {
            "usuariosId":usuarioAgregado[0],
            "tipoPersonaId":tipoPersona.id,
            "datosGeneralesId":datosGeneralesAgregados[0]
        };
            //depurar en consola
            dep(usuarioInfoAgregado,"usuarioInfoAgregado");

        const personaAgregada = await serviceUsuariosInfo.agregarUsuarioInfo(usuarioInfoAgregado);
    
        const personaNueva = {
            "usuario":usuarioAgregado,
            "datosGenerales":datosGeneralesAgregados,
            "tipoPersonaId":personaAgregada
        };
        //depurar en consola
        dep(personaNueva,"personaNueva");

        respuesta = {
            "status":200,
            "mensaje":"agregado correctamente",
            "data":personaNueva
        }
    }catch(error){
        console.log(error)
        respuesta ={
            "status":404,
            "mensaje":"no se pudo agregar",
            "error":error
        }
    }
    res.json(respuesta);
});


router.get('/obtenerPersonas',async(req,res)=>{
    let respuesta="";
    try{
        const personas= await serviceUsuarios.obtenerUsuarios();

        respuesta = {
            "status":200,
            "mensaje":"se obtuvieron las personas",
            "data":personas
        }
    } catch(error){
        respuesta = {
            "status":404,
            "mensaje": "no se pudo obtener",
            "error":error
        }
    }
    res.json(respuesta);
});

router.get('/obtenerPersona/:id',async (req,res) =>{
    let respuesta="";
    try{
        const {id} = req.params;
        const usuario = await serviceUsuarios.obtenerUsuario(id);
        dep (usuario,"usuario")

        respuesta = {
            "status":200,
            "mensaje":"se obtuvo la persona",
            "data":usuario
        }
    } catch(error){
        console.log(error)
        respuesta = {
            "status":404,
            "mensaje":"no se pudo obtener",
            "error":error
        }
    }
    res.json(respuesta);
})

router.patch('/actualizarPersona/:id',async(req,res)=>{
    let respuesta ="";
    try{
        const {id}= req.params;
        const usuarioActualizado = await serviceUsuarios.actualizarUsuario(id,req.body);
        respuesta= {
            "status":200,
            "Mensaje":"Se actualizo correctamente",
            "data":usuarioActualizado
        }
    }catch(error){
        respuesta = {
            "status":404,
            "Mensaje": "No se pudo actualizar",
            "error":error
        }
    }
    res.json(respuesta);
});

router.delete('/borrarPersona/:id',async(req,res) =>{
    let respuesta="";
    try{
        const {id} = req.params;
        const borrarUsuario = await serviceUsuarios.borrarUsuario(id);
        respuesta = 
        {
            "status":200,
            "mensaje":"eliminado correctamente",
            "data":borrarUsuario
        }
    } catch(error){
        respuesta = {
            "status": 404,
            "mensaje":"no se pudo borrar",
            "error":error
        }
    }
    res.json(respuesta);
});

module.exports = router;