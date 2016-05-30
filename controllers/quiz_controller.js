var models = require ('../models/models.js');

exports.index = function (req,res) {
	models.Quiz.findAll().then(function(quizzes) {
	  res.render ('quizes/index.ejs', {quizes : quizes});
	})
};


//GET /quizes/question
exports.question = function (req, res){
	models.Quiz.findAll().sucess(function(quiz){
	res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})
};

//GET /quizes/:id/answer
exports.answer = function (req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto2'});
		}
		else {
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto2'});
		}
        })
};

//GET /quiz/:id

exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: quiz});
	})
};
