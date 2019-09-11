const validator = require('indicative');
const messages = require('./messages');

validator.validations.unique = async (data, field, message, args, get) => {
    const fieldValue = get(data, field);
    const Model = require('../models/' + args[0]);

    const instance = await Model.query().findOne({
        [args[1]]: fieldValue
    });

    if(instance){
        throw new Error(`The ${field} is already taken`);
    }
};

validator.validations.exists = async (data, field, message, args, get) => {
    const fieldValue = get(data, field);
    const Model = require('../models/' + args[0]);

    const instance = await Model.query().findOne({
        [args[1]]: fieldValue
    });

    if(!instance){
        throw new Error(`The ${field} does not exist`);
    }
};

validator.validated = async (data, rules, customMessages) => {
    return await validator.validate(data, rules, {
        ...messages,
        ...customMessages
    });
};

module.exports = validator;
