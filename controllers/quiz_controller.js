var models = require ('../models/models.js');

exports.own = function(req,res,next){
	var quizOwn = req.quiz.UserId;
	var loginUser = req.session.user.id;
	var isAdmin = req.session.user.isAdmin;

	if (isAdmin || quizOwn == loginUser)
		next();
	else
		res.redirect('/');
};


exports.load = function (req, res, next, quizId){
	models.Quiz.find({
			where: {id: Number(quizId)},
			include: [{model: models.Comment}]
			}).then(function(quiz) {
				if (quiz){
			 	 req.quiz=quiz;
			 	 next();
			} else {next (new Error('No existe quizId = ' + quizId));}
		}
 
	).catch(function(error) {next(error);});
};

exports.index = function (req,res) {
	models.Quiz.findAll().then(function(quizes) {
	  res.render ('quizes/index', {quizes : quizes, errors: []});
	}).catch(function(error) {next(error);})
};


exports.show = function(req,res){
		res.render('quizes/show', { quiz: req.quiz, errors: []});
};


exports.answer = function (req, res) {
	models.Quiz.findAll().then(function(quiz){
		var resultado = 'Incorrecto';
		if (req.query.respuesta === req.quiz.respuesta)
			resultado = 'Correcto';
		res.render('quizes/answer', { quiz: req.quiz,respuesta: resultado, errors: []});
	});
};



exports.new = function(req, res) {
	var quiz = models.Quiz.build({
		pregunta: "pregunta", respuesta: "respuesta"
	});
	res.render('quizes/new', {quiz: quiz, errors: []});
};

exports.create = function(req,res) {
	req.body.quiz.UserId = req.session.user.id;
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
				if(err)
				   res.render('quizes/new', {quiz: quiz, errors: err.errors});
				else {
					quiz.save({fields: ["pregunta","respuesta","UserId"]}).then(function(){
						res.redirect('/quizes');
					});
				}
	});
};

exports.editar = function(req,res){
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update = function(req,res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz.validate().then(function(err){
		if (err){
			res. render('quizes/edit', {quiz: req.quiz, errors: err.errors});
		}
		else {
			req.quiz.save({ fields: ["pregunta", "respuesta"]})
				.then( function(){ res.redirect('/quizes');});
		}
	});
};


exports.res = function (req,res){
			var resultado = 'Incorrecto';
				if(req.query.respuesta === req.quiz.respuesta){
					req.session.user.aciertos = req.session.user.aciertos +1;
					resultado = 'Correcto';
				} else{
					req.session.user.fallos = req.session.user.fallos +1;
				}
				res.render('quizes/res', {quiz: req.quiz+1, respuesta: resultado, errors :[]});

};

exports.destroy = function (req,res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};


exports.question = function (req, res){
	models.Quiz.count().then(function(count){
		var aleatorio = Math.floor((Math.random() * count)+1);
		models.Quiz.find(aleatorio).then(function(pregunta){
    			res.render('quizes/question', {quiz: pregunta, aleatorio: aleatorio, errors: []});
		});
	});
};

exports.perfil = function(req,res){
	models.Quiz.findAll({where:{userId: req.user.id}}).then(function(quizes){
		res.render('quizes/perfil', {quizes: quizes, errors: []});
	}).catch(function(error){next(error)});
};



