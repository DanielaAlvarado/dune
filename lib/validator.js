const path = require('path');
const fs = require('fs-extra');
const output = require('./output');

exports.create = (name) => {
    output.text(`Creating ${name} validator`);
    const filePath = `src/validators/${name}.js`;

    fs.copySync(path.join(__dirname, './stubs/validator.js'), filePath);
    const validatorBuffer = fs.readFileSync(filePath);

    let validator = validatorBuffer.toString();
    validator = validator.replace(/<name>/g, name);

    fs.writeFileSync(filePath, validator);
    output.success('Validator created');
};
