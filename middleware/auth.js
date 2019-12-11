const { check, body } = require('express-validator');

const User = require('../models/user');

const authMiddlewares = {};

authMiddlewares.checkUsername = check('username')
    .isAlphanumeric()
    .withMessage('Username should contain letters and numbers only')
    .isLength({min: 4, max: 20})
    .withMessage('Username should be from 4 to 20 characters long');
    
authMiddlewares.compareUsername = check('username')
    .custom((value, {req}) => {
        return User.findOne({ username: value }).then(username => {
            if(username) {
                return Promise.reject('Username exists already, please pick a different one');
            };
        });
    });
            
authMiddlewares.checkEmail = check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail()

authMiddlewares.compareEmail = check('email')
    .custom((value, {req}) => {
        return User.findOne({ email: value }).then(email => {
            if(email) {
                return Promise.reject('Email exists already, please pick a different one');
            };
        });
    });

authMiddlewares.checkPassword = body('password')
    .isLength({min: 6, max: 20})
    .withMessage('Password should be from 6 to 20 characters long')
    .trim()

authMiddlewares.checkConfirmPassowrd = body('confirmPassword', 'Passwords should match')
    .custom((value, { req }) => { 
        if(value !== req.body.password) { 
            throw new Error('Passwords should match')
        } 
        return true 
    })

module.exports = authMiddlewares;