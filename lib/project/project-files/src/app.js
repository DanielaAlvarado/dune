const express = require('express');
require('./db/objection.js');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('it works!')
});

module.exports = app;
