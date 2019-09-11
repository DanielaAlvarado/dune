const authorize = (policy, operation) => {
    return async (req, res, next) => {
        try{
            if(!policy.before(req.user) && !(await policy[operation](req))){
                throw new Error();
            }

            next();
        }catch(error){
            res.status(401).send({
                message: 'Unauthorized'
            });
        }
    }
};

module.exports = authorize;
