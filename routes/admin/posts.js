var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest:'public/images/uploads'});

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('admin/posts/post-add');
});

router.post('/add', upload.single('photo'), function(req, res, next) {
   console.log('req', req);
 console.log('title:',req.body.title);
 console.log('image:', '/images/uploads/' + req.file.filename);
 console.log('contents:', req.body.contents);
 res.json({ status: true, msg: 'success', img: '/images/uploads/' + req.file.filename});
});


module.exports = router;
