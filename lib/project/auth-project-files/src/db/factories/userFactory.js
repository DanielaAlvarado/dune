const User = require('../../models/user');

const userFactory = (factory) => {
    factory.define('user', User, {
        email: factory.chance('email'),
        password: '$2a$08$roH56VTUPiLCwlNcoeUU6.fYg18Ay6mEg4W6a/q8b.PjwgKAeZgp2',
        name: factory.chance('name')
    });
}

module.exports = userFactory;
