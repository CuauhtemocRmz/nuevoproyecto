const { raw } = require("body-parser");
//const {models} = require('../libs/conexion');
const models = require("../libs/conexion");

class UsuariosService {
  async agregarUsuario(body) {
    //let usuarioAgregado = await models.Usuarios.create(body);
    //return usuarioAgregado;
    let usuarioAgregado;
    let sentencia = "insert into usuarios(usuario,pass) values (:usuario,:pass)";
    usuarioAgregado = await models.query(sentencia, {
      replacements: {
        usuario: body.usuario,
        pass: body.pass,
      },
      type: models.QueryTypes.INSERT,
      returning: true,
    });
    return usuarioAgregado;
  }

  async obtenerUsuarios() {
    //let resultado = await models.Usuarios.findAll({raw:true}):
    let resultado;
    let sentencia =
      "select us.id,us.usuario,us.pass" +
      ",tp.id,tp.identificador,tp.identificador_numerico,tp.descripcion" +
      ",dg.id,dg.nombre,dg.direccion,dg.telefono,dg.email" +
      ",ui.id as userInfoId " +
      "from usuarios_info ui " +
      "inner join usuarios us on (us.id=ui.usuarios_id) " +
      "inner join tipo_persona tp on (tp.id=ui.tipo_persona_id) " +
      "inner join datos_generales dg on (dg.id=ui.datos_generales_id) " +
      "where ui.status !=0";
    resultado = await models.query(sentencia, {
      type: models.QueryTypes.SELECT,
    });
    return resultado;
  }

  async obtenerUsuario(id) {
    let resultado;
    let sentencia =
      "select us.id as udId,us.usuario,us.pass" +
      ",tp.id,tp.identificador,tp.identificador_numerico,tp.descripcion" +
      ",dg.id,dg.nombre,dg.direccion,dg.telefono,dg.email" +
      ",ui.id as userInfoId " +
      "from usuarios_info ui " +
      "inner join usuarios us on (us.id=ui.usuarios_id) " +
      "inner join tipo_persona tp on (tp.id=ui.tipo_persona_id) " +
      "inner join datos_generales dg on (dg.id=ui.datos_generales_id) " +
      "where ui.status !=0 and ui.usuarios_id=:usuarioId";
    resultado = await models.query(sentencia, {
      replacements: {
        usuarioId: id,
      },
      type: models.QueryTypes.SELECT,
    });
    return resultado;
  }

  async actualizarUsuario(id, body) {
    let usuarioActualizado;
    let tipoUsuarioActualizado;
    let datosGeneralesActualizados;
    let sentencia =
      'update usuarios set usuario=:usuario,pass=:pass ' +
      'where id=:id and status !=0';
    usuarioActualizado = await models.query(sentencia, {
      replacements: {
        id: id,
        usuario: body.usuario,
        pass: body.pass,
      },
      type: models.QueryTypes.UPDATE,
      returning: true,
    });

    sentencia =
      "update datos_generales set " +
      "nombre=:nombre,direccion=:direccion" +
      "where id=:id and status !=0";
    datosGeneralesActualizados = await models.query(sentencia, {
      replacements: {
        id: body.dgId,
        nombre: body.nombre,
        direccion: body.direccion,
        telefono: body.telefono,
        email: body.email,
      },
      type: models.QueryTypes.UPDATE,
      returning: true,
    });

    sentencia = "update usuarios_info set tipo_persona_id=:tpId "+
    'where usuarios_id=:id and status !=0';
    tipoUsuarioActualizado = await models.query(
        sentencia,
        {
            replacements: {
                id:id,
                tpId:body.tpId
            },
            type: models.QueryTypes.UPDATE,
            returning:true
        }
    );
    const resultado = {
        "usuarioActualizado": usuarioActualizado,
        "tipoUsuarioActualizado": tipoUsuarioActualizado,
        "datosGeneralesActualizados": datosGeneralesActualizados
    }
    return resultado;
  }

  async borrarUsuario(id){
    try{
        const usuario = await this.obtenerUsuario(id);
        console.log(usuario[0].udId);
        let sentencia = 'update usuarios set status=:status '+
        'where id=:ide and status !=0;'
        let usuarioBorrado = await models.query(
            sentencia,{
                replacements: {
                    ide:usuario[0].udId,
                    status:0
                },
                type: models.QueryTypes.UPDATE,
                returning:true
            }
        );

        sentencia = 'update datos_generales set status=:status '+
        'where id=:ide and status !=0';
        let datosGeneralesBorrados = await models.query(
            sentencia,{
                replacements: {
                    ide:usuario[0].udId,
                    status:0
                },
                type: models.QueryTypes.UPDATE,
                returning:true
            }
        );
        const resultado = {
          "usuarioBorrado": usuarioBorrado,
          "datosGeneralesBorrados": datosGeneralesBorrados,
      }
      return resultado;   
     }catch(error){
      
        return error;
    }
  } 


}
module.exports = UsuariosService;
