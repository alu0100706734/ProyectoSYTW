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
exports.Quiz = Quiz;

sequelize.sync().then(function() {

	Quiz.count().then(function (count){
		if (count === 0) {
			Quiz.create({ pregunta: 'Capital de Italia',
				      respuesta: 'Roma'
				    });
			Quiz.create({ pregunta: 'Capital de portugal',
				      respuesta: 'Lisboa'
				    })
			.then(function(){
console.log('Base de datos actualizada')});
	};
      }); 
     });
