const express = require('express');
const binder = require('./binder');
const <Model> = require('../models/<model>');

const router = new express.Router();

router.param('<model>', binder('<model>', <Model>));

router.get('/<model>s', (req, res) => {
    res.send('<model>s works!');
});

module.exports = router;
