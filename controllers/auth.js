const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

const userController = {};

userController.index = (req, res) => {
    res.render('index', { user: req.user });
};

userController.getRegister = (req, res) => {
    res.render('register', { user: req.user });
};

userController.postRegister = (req, res) => {
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
        });
    });
};

userController.getLogin = (req, res) => {
    res.render('login', { user: req.user });
};

userController.postLogin = (req, res) => {
    passport.authenticate('local')(req, res, () => {
        res.redirect('/');
    });
};

userController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = userController;