const { raw } = require("body-parser");
const objCon = require("../libs/conexion");
//const {models} = require('../libs/conexion');

class UsuariosInfoService {

    async agregarUsuarioInfo(body){
        try{
            let sentencia = 'insert into usuarios_info(usuarios_id,tipo_persona_id,datos_generales_id,status) '+
            'values (:usuarios_id,:tipo_persona_id,:datos_generales_id,1)';
            let datosInfoAgregados = await objCon.query(
                sentencia,
                {
                    replacements:{
                        usuarios_id:body.usuariosId,
                        tipo_persona_id: body.tipoPersonaId,
                        datos_generales_id:body.datosGeneralesId
                        },
                    type: objCon.QueryTypes.UPDATE,
                    returning:true
                }
            );
            return datosInfoAgregados;

        }catch(error){
            return error;
        }
    }
}
module.exports = UsuariosInfoService;