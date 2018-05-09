var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET blank page. */
router.get('/blank', function(req, res, next) {
  res.render('blank', { title: 'Blank' });
});

/* GET sign up page. */
router.get('/signup', function(req, res, next) {
  res.render('commons/sign-up', { title: 'Sign Up' });
});

/* POST sign up page. */
router.post('/signup', function(req, res, next) {
  var user = new User();
  user.name = req.body.username;
  user.phone = req.body.phone;
  user.email = req.body.email;
  user.password = req.body.password;
    //save to database using models

    User.find({email:req.body.email}, function (err,rtn) {
      if(err) throw err;
      if(rtn.length>0){
        req.flash('warn','Duplicated email!');
        res.redirect('/signup');
      }else{
        user.save(function (err, result) {
          if(err) throw err;
          req.flash('success', 'Registration successful. Welcome to '+ user.name);
          res.redirect('/signin');
        });
      }
    });

});

/* GET sign in page. */
router.get('/signin', function(req, res, next) {
  res.render('commons/sign-in', { title: 'Sign In' });
});

/* POST sign up page. */
router.post('/signup/duplicate', function(req, res, next) {
  User.findOne({email:req.body.email},function (err, rtn) {
    if(err) throw err;
    if(rtn != null) res.json({ status: false, msg: 'Duplicate email!!!'});
    else res.json({ status: true});
  });
});

/* POST sign in page. */
router.post('/signin', function(req, res, next) {
  User.findOne({ email: req.body.email}, function(err,user){
    if(err) throw err;
    if(user == null || !User.compare(req.body.password, user.password)){
      req.flash('warn', 'Email not exists or password not matched!!');
      res.redirect('/signin');
    }else {
      req.session.user = { name: user.name, email: user.email, role:user.role };
      if(user.role == 'ADMIN'){
        res.redirect('/admin');
      }else if (user.role == 'USER') {
        res.redirect('/members');
      }else {
        res.redirect('/staffs');
      }

    }
    console.log('user not exists or password not match!!');
    res.render('commons/sign-in',{title: 'Sign In', message:'Email not exists or password not matched!!'});
  });

});
router.get('/signout',function (req,res) {
  req.session.destroy();
  res.redirect('/');
});
router.get('/init', function(req, res, next) {
  var user = new User();
  user.name = 'Admin';
  user.phone = '0909';
  user.email = 'admin@gmail.com';
  user.password = 'admin123';
  user.role = 'ADMIN';
    //save to database using models


        user.save(function (err, result) {
          if(err) throw err;
          req.flash('success', 'Registration successful. Welcome to '+ user.name);
          res.redirect('/signin');
        });


});
router.get('/init/Staff', function(req, res, next) {
  var user = new User();
  user.name = 'Staff';
  user.phone = '0909';
  user.email = 'staff@gmail.com';
  user.password = 'staff123';
  user.role = 'STAFF';
    //save to database using models


        user.save(function (err, result) {
          if(err) throw err;
          req.flash('success', 'Registration successful. Welcome to '+ user.name);
          res.redirect('/signin');
        });


});
module.exports = router;
