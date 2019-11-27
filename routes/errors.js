const express = require('express');
const router = express.Router();

const errorController = require('../controllers/errors');

router.route('/500')
    .get(errorController.get500);

router.route('*')
    .get(errorController.get404);

module.exports = router;