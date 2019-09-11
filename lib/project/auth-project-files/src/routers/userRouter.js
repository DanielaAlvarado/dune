const express = require('express');
const binder = require('./binder');
const User = require('../models/user');
const storeUser = require('../validators/storeUser');
const userController = require('../controllers/userController');
const loginUser = require('../validators/loginUser');
const auth = require('../middleware/auth');

const router = new express.Router();
router.param('user', binder('user', User));

router.post('/users', storeUser, userController.store);
router.post('/users/login', loginUser, userController.login);
router.delete('/users/logout', auth, userController.logout);

module.exports = router;
