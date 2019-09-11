const {validated} = require('./validator');

const rules = {
    name: 'required|string',
    email: 'required|email|unique:user,email',
    password: 'required|string|confirmed'
};

const storeUser = async (req, res, next) => {
    try{
        await validated(req.body, rules);

        delete req.body.password_confirmation;
        next();
    }catch(error){
        res.status(400).send({
            message: error[0].message
        });
    }
}

module.exports = storeUser;
