module.exports = function(sequelize, dataTypes) {
	return sequelize.define ('Quiz',{
		pregunta: {
			 type: dataTypes.STRING,
			 validate: { notEmpty: {msg: "->campo pregunta vacio"}}
		},
		respuesta: {
			 type: dataTypes.STRING,
			 validate: { notEmpty: {msg: "->campo respuesta vacio"}}
		},
	});
}
