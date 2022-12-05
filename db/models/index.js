const{Pruebas, PruebasSchema} = require('./pruebasM')
function setupModels(sequelize){
    Pruebas.init(PruebasSchema,Pruebas.config(sequelize))
}

module.exports = setupModels;