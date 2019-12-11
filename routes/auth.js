const express = require('express');

const router = express.Router();

const authMiddlewares = require('../middleware/auth');
const authController = require('../controllers/auth');

const { 
    checkUsername, 
    compareUsername, 
    checkEmail,
    compareEmail,
    checkPassword,
    checkConfirmPassowrd     
} = authMiddlewares;

const {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout
} = authController;

router.route('/register')
    .get(getRegister)
    .post(
        [
            checkUsername,
            compareUsername,
            checkEmail,
            compareEmail,
            checkPassword,
            checkConfirmPassowrd
        ],
        postRegister
    );

router.route('/login')
    .get(getLogin)
    .post(
        [
            checkUsername,
            checkPassword
        ],
        postLogin
    );

router.route('/logout')
    .get(logout);

module.exports = router;