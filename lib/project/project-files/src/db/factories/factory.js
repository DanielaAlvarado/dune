const {factory} = require('factory-girl');
const ObjectionAdapter = require('factory-girl-objection-adapter');

factory.setAdapter(new ObjectionAdapter());

module.exports = factory;
