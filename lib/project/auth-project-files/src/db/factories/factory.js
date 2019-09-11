const {factory} = require('factory-girl');
const ObjectionAdapter = require('factory-girl-objection-adapter');
require('./userFactory')(factory);

factory.setAdapter(new ObjectionAdapter());

module.exports = factory;
