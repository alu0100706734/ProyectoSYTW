var path = require ('path');

var databaseURL = process.env.DATABASE_URL          || 'sqlite://:@:/quiz';
var databaseStorage  = process.env.DATABASE_STORAGE || 'quiz.sqlite';
//                           1        2    3    4    5     6
var url = databaseURL.match(/(.*):\/\/(.*):(.*)@(.*):(.*)\/(.*)/);
var DB_name  = (url[6] || null); console.log("DB_name: "+DB_name);
var user     = (url[2] || null); console.log("database user: "+user);
var pwd      = (url[3] || null); console.log("password: "+pwd);

var protocol = (url[1] || null); console.log("protocol: "+protocol);
var dialect  = protocol;         console.log("dialect: "+dialect);
var port     = (url[5] || null); console.log("port: "+port);
var host     = (url[4] || null); console.log("host: "+host);
var storage  = databaseStorage;  console.log("database storage: "+storage);


var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user, pwd, 
        { 
          dialect: dialect, 
          protocol: protocol, 
          port: port,
          host: host,
          storage: storage,
          omitNull: true
        }
    );


var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname,'comments'));
var User = sequelize.import(path.join(__dirname,'user'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

Quiz.belongsTo(User);
User.hasMany(Quiz);


exports.User = User;
exports.Comment = Comment;
exports.Quiz = Quiz;



sequelize.sync({ force: true}).then(function(){

	User.count().then(function (count){
		if (count === 0) {
			User.create({username: 'admin', password: '1234', isAdmin: true});
			User.create({username: 'pepe', password:'5678'}).then(function(){
					console.log('Usuarios Creados')});
		};
	});


	Quiz.count().then(function (count){
		if (count === 0) {
			Quiz.create({ pregunta: 'Capital de Italia',
				      respuesta: 'Roma',
				      UserId: '1'
			 });

			Quiz.create({ pregunta: 'Despues del 4 viene el',
				      respuesta: '8',
				      UserId: '1'
			});
			Quiz.create({ pregunta: ' Velocidad media de una golondrina sin carga',
				      respuesta: 'de que especie?',
				      UserId: '1'
			});
			Quiz.create({ pregunta: 'eche eche eche, que beben las vacas',
				      respuesta: 'agua',
				      UserId: '1'
			});
			
			Quiz.create({ pregunta: 'Capital de portugal',
				      respuesta: 'Lisboa',
				      UserId: '1'
			})
			.then(function(){
console.log('Base de datos actualizada')});
		};
      }); 
});	
