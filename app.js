var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var multer = require('multer');
const session = require('express-session');
const { flash } = require('express-flash-message');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage })//multer({ dest: 'public/images/products' })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var adminProductRouter = require('./routes/admin/product');
var cartRouter = require('./routes/cart');
var app = express();
nunjucks.configure('views', {
  autoescape: true,
  express: app,

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'nunjucks');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array('product_images', 12));
// express-session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
  })
);

app.use(function(req, res, next) {
  res.locals.user = req.session.user;

  console.log('req path', req.path.split('/')[1])
  if(!req.session.user && req.path.split('/')[1] == 'admin') {
    return res.redirect('/users/login')
  }
  if(req.session.user && req.path.split('/')[1] == 'admin' && req.session.user.users_role != 'admin') {
    return res.redirect('/users/login')
  }
  next();
});

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter)
//app.use('/admin/products', adminProductRouter)
const adminPath = '/admin'
app.use(adminPath + '/products', adminProductRouter);
app.use('/cart', cartRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});



module.exports = app;
