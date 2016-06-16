module.exports = function(sequelize, dataTypes) {
	return sequelize.define ('Quiz',{
		pregunta: {
			 type: dataTypes.STRING,
		},
		respuesta: {
			 type: dataTypes.STRING,
		}
	});
}
