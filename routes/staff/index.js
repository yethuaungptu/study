var express = require('express');
var router = express.Router();

var notice = require('./notice');

// router.use(function(req, res, next){
//   if(req.session.user.role == 'STAFF'){
//     next();
//   }else {
//     req.flash('warn','Not Allowed Users! please login Staff Account');
//     res.redirect('/signin');// redirect to other page
//   }
// });
router.get('/', function(req, res, next) {
  res.render('staff/index');
});
router.use('/notice', notice);
module.exports = router;
