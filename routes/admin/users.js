var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest:'public/images/uploads'});
var User = require('../../models/User');

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('admin/users/user-add');
});

router.post('/add',upload.single('photo'), function(req, res, next) {
  var user = new User();
  user.name = req.body.name;
  user.phone = req.body.phone;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;
  user.insertedBy = req.session.user._id;
  user.updatedBy = req.session.user._id;
  if(req.file) user.photo = '/images/uploads/'+ req.file.filename;
    //save to database using models

    User.findOne({email:req.body.email}, function (err,rtn) {
      if(err) throw err;
      if(rtn){
        req.flash('warn','Duplicated email!');
        res.redirect('/admin/users/add');
      }else{
        user.save(function (err, result) {
          if(err) throw err;
          req.flash('success', 'Registration successful.');
          res.redirect('/admin/users/view/'+result._id);
        });
      }
    });
});

router.post('/modify',upload.single('photo'),  function(req, res, next) {
  User.findById(req.body.id, function (err, user) {
  if (err) throw (err);
  user.name = req.body.name;
  user.phone = req.body.phone;
  if(req.body.password)user.password = req.body.password;
  user.role = req.body.role;
  user.updated = new Date();
  user.updatedBy = req.session.user._id;
  if(req.file) user.photo = '/images/uploads/'+ req.file.filename;
  console.log('//////',user);
  user.save(function (err, rtn) {
    if (err) throw err;
    res.redirect('/admin/users/view/'+user._id);
  });
});
});

router.get('/delete/:id',function (req,res) {
    User.findById(req.params.id, function (err, user) {
    console.log(user);
    User.deleteOne({ _id:user.id }, function (err) {
    console.log('delete one');
    if (err) throw err;
    res.redirect('/admin/users/list');
  });
});
});

router.get('/samples', function(req, res, next) {
  var users = [];
  for(i= 0; i<200; i++){
    var user = new User();
    user.name = 'Name'+i;
    user.phone = '09898-'+i;
    user.email ='email'+i+'@gmail.com';
    user.password = 'YEgyi'+i;
    user.role = 'USER';
    users.push(user);
  }

    //save to database using models
        User.insertMany(users,function (err, result) {
          if(err) throw err;
          res.end('insert many user');
    });
});

router.get('/view/:id', function(req, res, next) {
  User.findOne({_id:req.params.id}).populate('updatedBy').populate('insertedBy').exec( function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    if(rtn){
      res.render('admin/users/user-view',{user:rtn});
    }else {
      throw new Error ('Data not found');
    }
  });
});

router.get('/modify/:id', function(req, res, next) {
  User.findOne({_id:req.params.id}, function (err,rtn) {
    if(err) throw err;
    if(rtn){
      res.render('admin/users/user-modify',{user:rtn});
    }else {
      throw new Error ('Data not found');
    }
  });
});



router.all('/list', function(req, res, next) {
  var query = {};
  if (req.body.keyword) {
    query = { $or: [ {name:{'$regex':req.body.keyword, '$options':'i'}},
                           {phone:{'$regex':req.body.keyword}},
                           {email:{'$regex':req.body.keyword, '$options':'i'}}
                             ]
   };
  }
  if(req.body.role){
    query.role =req.body.role;
  }
  var search = {
    keyword: req.body.keyword,
    role: req.body.role,
  };

  var sorting = {};
  if(req.body.sortingField) sorting[req.body.sortingField]= req.body.sortingMethod;

  var sort = {
    field : req.body.sortingField || '',
    method : req.body.sortingMethod || 1,
  };

  User.count(query, function (err, count) {
    var paging = {
      currpage: Number(req.body.currpage) || 1,
      perpage : Number(req.body.perpage) ||3,
      count : count,
      total: Math.ceil(count/(req.body.perpage || 3)),
      psize: 5,
      skip:{}
    };
  paging.start = (Math.ceil(paging.currpage/paging.psize)-1)* paging.psize + 1;
  paging.end = paging.start+ paging.psize -1;
  if(paging.end > paging.total) paging.end = paging.total;

  paging.skip.next = paging.psize * Math.ceil( paging.currpage/paging.psize) +1;
  paging.skip.prev = paging.skip.next - paging.psize*2;

  User.find(query).sort(sorting).skip(( paging.currpage - 1)* paging.perpage).limit(paging.perpage).exec(function (err,rtn) {
    if(err) throw err;
    res.render('admin/users/user-list',{user:rtn, search:search,paging:paging, sort: sort});
  });
  });
});
router.get('/modify', function(req, res, next) {
  res.render('admin/users/user-edit');
});

router.post('/add', function(req, res, next) {
  res.send('User Add post');
});

router.get('/list2', function(req, res, next) {
  res.render('admin/users/user-list2');
});

router.post('/list2', function(req, res, next) {
  User.find({}).limit(10).exec( function (err,doc) {
    if(err) res.json(500, {'err': err.message});
    else res.json({users: doc});
  });

});
router.post('/view/:id',function(req,res,next){
  User.findOne({_id:req.params.id}, function (err,rtn) {
    if(err) res.json(500, {'err': err.message});
    else res.json({user: rtn});
  });
});

module.exports = router;
