var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes', quizController.index);
router.get('/quizes/question', quizController.question);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/lista', quizController.lista);
router.get('/quizes/:quizID(\\d+)', quizController.show);

module.exports = router;
