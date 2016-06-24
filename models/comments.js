module.exports = function (sequelize, dataTypes) {
	return sequelize.define(
	   'Comment',{
		texto: {
		   type: dataTypes.STRING,
		   validate: {notEmpty: {msg: "campo comentario vacio"}}
		},
		publicado: {
		   type: dataTypes.BOOLEAN,
		   defaultValue: false
		}

	    });
};
