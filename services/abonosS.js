//const ObjCon = require('../libs/conexion');

//const AbonosModel = require('../db/models/abonosM');
//const modelAbonos = new AbonosModel();
const { models } = require('../libs/conexion')

class AbonosService{
    async obtenerAbonos(){
        //const sentencia = "select * from pruebas";
        //let [data] = await objCon.query(sentencia);
        var data = await models.Pruebas.findAll({raw:true});
        // console.log(data[1].id+1)
        const resultado = {
            "accion": "todos los abonos",
            "registros": data,
            "status":200,
            "mensaje":"servicio de obtener todos los abonos "
        }
        return resultado;
    }
}
module.exports = AbonosService;