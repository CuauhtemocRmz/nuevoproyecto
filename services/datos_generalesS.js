const { raw } = require("body-parser");
const objCon = require("../libs/conexion");
//const {models} = require('../libs/conexion');

class DatosGeneralesService {

    //datosGenerales
    async agregarDatosGenerales(body){
        try{
            //let datosgeneralesagregados = await models.DatosGenerales.create(body);
            let sentencia = 'insert into datos_generales(nombre,direccion,telefono,email,status) '+
            'values (:nombre,:direccion,:telefono,:email,1)';
            let datosGeneralesAgregados = await objCon.query(
                sentencia,
                {
                    replacements:{
                       nombre:body.nombre,
                       direccion: body.direccion,
                       telefono:body.telefono,
                       email:body.email 
                    },
                    type: objCon.QueryTypes.UPDATE,
                    returning:true
                }
            );
            return datosGeneralesAgregados;

        }catch(error){
            return error;

        }
    }
}
module.exports = DatosGeneralesService;