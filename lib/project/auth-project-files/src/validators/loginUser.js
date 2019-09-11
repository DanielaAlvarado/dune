const {validated} = require('./validator');

const rules = {
    email: 'required|email',
    password: 'required|string'
};

const loginUser = async (req, res, next) => {
    try{
        await validated(req.body, rules);
        next();
    }catch(error){
        res.status(400).send({
            message: error[0].message
        });
    }
}

module.exports = loginUser;
