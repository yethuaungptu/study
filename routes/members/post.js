var express = require('express');
var router = express.Router();

/* GET home page. */ 
router.get('/write', function(req, res, next) {
  res.render('posts/post-add');
});

module.exports = router;
