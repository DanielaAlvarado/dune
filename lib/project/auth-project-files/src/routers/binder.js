const binder = (param, model) => {
    return async (req, res, next) => {
        try {
            const instance = await model.query().findById(req.params[param]);

            if(!instance){
                throw new Error();
            }

            req[param] = instance;
            next();
        }catch(error){
            res.status(404).send({
                message: `${param.charAt(0).toUpperCase() + param.slice(1)} not found`
            });
        }
    };
};

module.exports = binder;
