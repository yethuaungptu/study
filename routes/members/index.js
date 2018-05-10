var express = require('express');
var router = express.Router();

var users = require('./users');
var posts = require('./post')

// router.use(function(req, res, next){
//   if(req.session.user.role == 'USER'){
//     next();
//   }else {
//     req.flash('warn','Not Allowed Users! please login Member Account');
//     res.redirect('/signin');// redirect to other page
//   }
// });
router.get('/', function(req, res, next) {
  res.render('members/index');
});
router.use('/users', users);
router.use('/posts', posts);
module.exports = router;
