const passport = require('passport');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');
const flash = require('connect-flash');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: "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"
      }
    })
);

const userController = {};

userController.index = (req, res) => {
    res.render('index', { user: req.user });
};

userController.getRegister = (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const prevInputs = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }
    res.render('register', { user: req.user, prevInputs: prevInputs, validationErrors: [] });
};

userController.postRegister = (req, res) => {
    const validationErrors = validationResult(req);
    const { username, email, password, confirmPassword } = req.body;
    const prevInputs = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }
    if (!validationErrors.isEmpty()) {
        req.flash('error', validationErrors.array()[0].msg)
        return res.status(422).render(
            'register', 
            { prevInputs: prevInputs, validationErrors: validationErrors.array() });
    }
    User.register(new User({
        username: req.body.username,
        email: req.body.email
    }),
    req.body.password,
    (err, user) => {
        if(err) {
            return res.render('register', { user: user });
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
            return transporter.sendMail({
                to: email,
                from: 'tech@blog.com',
                subject: 'Welcome to techblog',
                html: '<h2>Welcome to the big tech community</h2>'
            })
        });
    });
};

userController.getLogin = (req, res) => {
    const { username, password } = req.body;
    const prevInputs = {
        username: username,
        password: password
    }
    res.render('login', { user: req.user, prevInputs: prevInputs, validationErrors: [] });
};

userController.postLogin = (req, res, next) => {
    const validationErrors = validationResult(req);
    const { username, password } = req.body;
    const prevInputs = {
        username: username,
        password: password
    }
    if (!validationErrors.isEmpty()) {
        req.flash('error', validationErrors.array()[0].msg)
        return res.status(422).render(
            'login', 
            { prevInputs: prevInputs, validationErrors: validationErrors.array() });
    }
    passport.authenticate('local')(req, res, (err, user) => {
        if(err) console.log(err);
        if(!user) console.log(user)
        User.findOne({ username: req.body.username })
            .then(user => {
                req.flash('success', 'Welcome back ' + req.user.username)
                return res.redirect('/articles');
            })
            .catch(err => {
                // DOES NOT WORK FIX LATER
                console.log(err)
                req.flash('error','Wrong username')
                res.redirect('/login')
            })       
    });
};

userController.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Logged out. See You soon');
    res.redirect('/articles');
};

module.exports = userController;