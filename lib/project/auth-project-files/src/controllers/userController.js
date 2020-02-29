const bcrypt = require('bcryptjs');
const User = require('../models/user');
const userSerializer = require('../serializers/userSerializer');
const notify = require('../notifications/notify');
const welcomeNotification = require('../notifications/welcomeNotification');

exports.store = async (req, res) => {
    try{
        req.body.password = await bcrypt.hash(req.body.password, 8);
        const user = await User.query().insert(req.body);
        const token = await user.generateAuthToken();

        notify(user, welcomeNotification);

        res.status(201).send({
            user: userSerializer.serialize(user),
            token
        });
    }catch(error){
        res.status(500).send({
            message: 'Error while storing user'
        });
    }
};

exports.login = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if(!user){
            return res.status(400).send({
                message: 'Incorrect credentials'
            });
        }

        const token = await user.generateAuthToken();

        res.status(201).send({
            user: userSerializer.serialize(user),
            token,
            expires_in: process.env.TOKEN_EXP_TIME
        });
    }catch(error){
        res.status(500).send({
            message: 'Error while logging in'
        });
    }
}

exports.logout = async (req, res) => {
    try{
        await req.user.$relatedQuery('tokens').delete().where('token', req.token);

        res.send();
    }catch(error){
        res.status(500).send({
            message: 'Error while logging out'
        });
    }
}
