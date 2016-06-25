var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require ('../controllers/comment_controller');
var sessionController = require ('../controllers/session_controller');
var userController = require ('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});

// rutas de sesion
router.get ('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

//autoload
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);
router.param('userId', userController.load);

//rutas quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
//router.get('/quizes/question', sessionController.loginRequired, quizController.question);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.own, quizController.editar);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.own, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.own, quizController.destroy);


//rutas cuentas
router.get('/user', userController.new);
router.post('/user', userController.create);
router.get('/user/:userId(\\d+)/editar', sessionController.loginRequired, quizController.own, userController.editar);
router.put('/user/:userId(\\d+)', sessionController.loginRequired, quizController.own, userController.update);
router.delete('/user/:userId(\\d+)', sessionController.loginRequired, quizController.own, userController.destroy);
router.get('/user/:userId(\\d+)/perfil', quizController.perfil);

//rutas comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, quizController.own, commentController.publish);


module.exports = router;
