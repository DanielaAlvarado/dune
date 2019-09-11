const setEnv = (env) => {
    require('dotenv').config({
        path: `./config/${env}.env`
    });
};

module.exports = setEnv;
