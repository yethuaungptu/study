var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('admin/users/user-add');
});

router.get('/list', function(req, res, next) {
  res.render('admin/users/user-list');
});

router.get('/modify', function(req, res, next) {
  res.render('admin/users/user-edit');
});
module.exports = router;