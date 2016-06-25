module.exports = function(sequelize, dataTypes) {
	return sequelize.define ('User', {
		username: {
			type: dataTypes.STRING,
			unique: true,
			validate: {notEmpty: {msg:"->Introduce un nombre de usuario."}}
		},
		
		password: {
			type: dataTypes.STRING,
			validate: {notEmpty: {msg: "->Introduce una contraseña."}}
		},
		isAdmin: {
			type: dataTypes.BOOLEAN,
			defaultValue: false
		}
		
	});
}
