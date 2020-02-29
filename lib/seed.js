const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');
const output = require('./output');
const setEnv = require('./setEnv');

shell.config.silent = true;

exports.create = (model) => {
    output.text(`Creating ${model} seed`);
    const filePath = `src/db/seeds/${Date.now()}_${model}Seed.js`;

    fs.copySync(path.join(__dirname, './stubs/seed.js'), filePath);
    const seedBuffer = fs.readFileSync(filePath);

    let seed = seedBuffer.toString();
    seed = seed.replace(/<Model>/g, model.charAt(0).toUpperCase() + model.slice(1)).replace(/<model>/g, model);

    fs.writeFileSync(filePath, seed);
    output.success('Seed created');
};

exports.run = (env) => {
    output.text('Running seeds');

    if(env != 'prod'){
        setEnv(env);
    }
    
    shell.exec('node src/db/seeder.js', (code, stdout, stderr) => {
        if(stderr){
            return output.error('Error while running seeds');
        }

        output.success('Done');
    });
};
