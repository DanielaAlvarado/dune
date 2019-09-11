const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');
const output = require('./output');
const setEnv = require('./setEnv');

shell.config.silent = true;

exports.create = (model) => {
    output.text(`Creating ${model} migration`);
    const filePath = `./src/db/migrations/${Date.now()}_${model}.js`;

    fs.copySync(path.join(__dirname, './stubs/migration.js'), filePath);
    const migrationBuffer = fs.readFileSync(filePath);

    let migration = migrationBuffer.toString();
    migration = migration.replace(/<table_name>/g, model + 's');

    fs.writeFileSync(filePath, migration);
    output.success('Migration created');
};

exports.run = (env) => {
    output.text('Running migrations');

    setEnv(env);
    shell.exec(`knex migrate:latest`, (code, stdout, stderr) => {
        if(stderr){
            console.log(stderr);
            return output.error('Error while running migrations');
        }

        output.success('Done');
    });
};

exports.rollback = (env) => {
    output.text('Rolling back migrations');

    setEnv(env);
    shell.exec('knex migrate:rollback', (code, stdout, stderr) => {
        if(stderr){
            console.log(stdout, stderr);
            return output.error('Error while rolling back migrations');
        }

        output.success('Done');
    });
};
