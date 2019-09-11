const fs = require('fs-extra');
const path = require('path');
const shell = require ('shelljs');
const output = require('../output');

shell.config.silent = true;

exports.create = (name, auth) => {
    output.text('Generating project files');
    fs.copySync(path.join(__dirname, auth ? './auth-project-files': './project-files'), name);

    output.text('Initializing project');
    shell.cd(name);
    shell.exec('npm init -y');

    output.text('Configuring scripts');
    const packageBuffer = fs.readFileSync('package.json');
    let packageJSON = packageBuffer.toString();
    const package = JSON.parse(packageJSON);

    package.main = './src/index.js';
    package.scripts = {
        start: 'node src/index.js',
        dev: 'env-cmd -f ./config/dev.env nodemon src/index.js',
        'test-dev': 'env-cmd -f ./config/dev.env jest --watchAll --runInBand',
        test: 'env-cmd -f ./config/test.env jest --runInBand --forceExit'
    };

    packageJSON = JSON.stringify(package);
    fs.writeFileSync('package.json', packageJSON);

    output.text('Installing dependencies');
    shell.exec('npm install nodemon env-cmd jest supertest --save-dev');
    shell.exec('npm install express mysql knex objection bcryptjs jsonwebtoken indicative@5.0.8 factory-girl factory-girl-objection-adapter @sendgrid/mail');

    output.success('Done');
}

exports.serve = (dev) => {
    shell.exec('npm run ' + (dev ? 'dev' : 'start'), {
        silent: false
    });
}
