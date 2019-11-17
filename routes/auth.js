const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.route('/register')
    .get(authController.getRegister)
    .post(authController.postRegister);

router.route('/login')
    .get(authController.getLogin)
    .post(authController.postLogin);

router.route('/logout')
    .get(authController.logout);

module.exports = router;