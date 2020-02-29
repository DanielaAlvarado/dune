const {Model} = require('objection');
const Knex = require('knex');
const config = require('../../knexfile');

const knex = Knex(config[process.env.NODE_ENV]);

Model.knex(knex);
