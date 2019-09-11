const express = require('express');
require('./db/objection.js');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(express.json());
app.use(userRouter);

app.get('/', (req, res) => {
    res.send('it works!')
});

module.exports = app;
