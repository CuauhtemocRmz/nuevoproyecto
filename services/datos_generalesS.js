const { raw } = require("body-parser");
//const {models} = require('../libs/conexion');
const models = require("../libs/conexion");

class DatosGeneralesService {

    //datosGenerales
    async agregarDatosGenerales(body){
        try{
            //let datosgeneralesagregados = await models.DatosGenerales.create(body);
            let sentencia = 'insert into datos_generales(nombre,direccion,telefono,email) '+
            'values (:nombre,:direccion,:telefono,:email)';
            let datosGeneralesAgregados = await objCon.query(
                sentencia,
                {
                    replacements:{
                       nombre:body.nombre,
                       direccion: body.direccion,
                       telefono:body.telefono,
                       email:body.email 
                    },
                    type: models.QueryTypes.UPDATE,
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