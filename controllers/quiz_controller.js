var models = require ('../models/models.js');

exports.load = function (req, res, next, quizId){
	console.log("chviato quiz" + quizId);
	models.Quiz.find(quizId).then(
		function(quiz) {
			console.log("chivato quiz2" + quiz);
			if (quiz){
			  req.quiz=quiz;
			  next();
			} else {next (new Error('No existe quizId = ' + quizId));}
		}
 
	).catch(function(error) {next(error);});
};

exports.index = function (req,res) {
	models.Quiz.findAll().then(function(quizes) {
	  res.render ('quizes/index', {quizes : quizes});
	}).catch(function(error) {next(error);})
};



//GET /quiz/:id

exports.show = function(req,res){
		res.render('quizes/show', { quiz: req.quiz});
};



//GET /quizes/question
exports.question = function (req, res){
	models.Quiz.findAll().then(function(quiz){
	console.log("atun: " + quiz[0].respuesta);
	res.render('quizes/show', {quiz: quiz[0]});
	})
};

exports.new = function(req, res) {
	var quiz = models.Quiz.build({
		pregunta: "pregunta", respuesta: "respuesta"
	});
	res.render('quizes/new', {quiz: quiz});
};

exports.create = function(req,res) {
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
		res.redirect('/quizes');
	})
};

//GET /quizes/:id/answer
exports.answer = function (req, res) {
	models.Quiz.findAll().then(function(quiz){
		if (req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer', { respuesta: 'Correcto', quiz: quiz[0]});
		}
		else
			res.render('quizes/answer', { respuesta: 'Incorrecto', quiz: quiz[0]});
	});
};


