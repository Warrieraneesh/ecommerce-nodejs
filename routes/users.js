var express = require('express');
var router = express.Router();
var userModel = require('../models/users');


/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('./users.html');
});

router.post('/auth', async function(req, res) {

 var username = req.body.username
 var password = req.body.password
 var users = await userModel.getUsers(username, password)
 console.log(users)
 if(users.length > 0) {
   req.session.user = users[0];
   
   if(users[0].users_role == 'admin'){
	  return res.redirect('/admin/products')
   } 
   res.redirect('/');
 }else {
   res.send('Incorrect Username and Password !!');
 }

});

router.get('/logout', function (req, res) {
  req.session.user = null;
  //req.session.destroy();
  res.redirect('/users/login');

})

module.exports = router;
