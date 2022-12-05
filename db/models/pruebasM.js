const {Model, DataTypes, Sequelize} = require('sequelize');

const PRUEBAS_TABLE = 'pruebas';

const PruebasSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    usuario:{
        allowNull:true,
        type: DataTypes.STRING,
        unique:false,
    }
}

    class Pruebas extends Model{
        static associate(){
            //associate
        }
    

    static config(sequelize){
        return{
            sequelize,
            tableName: PRUEBAS_TABLE,
            modelName: 'Pruebas',
            timestamps: false
        }
    }

}

module.exports = { PRUEBAS_TABLE, PruebasSchema, Pruebas};