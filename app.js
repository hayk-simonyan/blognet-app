const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoConnect = require('./util/database');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override');
const flash = require('connect-flash');

const articlesRouuter = require('./routes/articles');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const commentsRouter = require('./routes/comments');
const errorsRouter = require('./routes/errors');
const User = require('./models/user');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
//configure mongoose
mongoConnect();
mongoose.set('debug', true);

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initialize our app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(cors());
app.use(require('morgan')('dev'));
app.use(logger('dev'));
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());

//express-session config
app.use(session({
  secret: 'session-cars',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}));
// express-session & connect-mongodb-session
// const dbURL = 'mongodb://localhost/cars';
// const store = new MongoDBStroe({
//   uri: dbURL,
//   collection: 'sessions'
// });
// store.on('error', err => console.log(err));
// const sess = {
//   secret: 'session secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: true,
//     httpOnly: true
//   },
//   store: store
// }
// if(app.get('env') === 'production') {
//   app.set('trust proxy', 1)
//   sess.cookie.secure = true
// }
// app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/articles', adminRouter);
app.use(articlesRouuter);
app.use(authRouter);
app.use('/articles/:id/comments', commentsRouter);
app.use(errorsRouter);

// app.use((error, req, res, next) => {
//   res.status(500).render("500");
// });

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;