const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');
const output = require('./output');

exports.create = (model) => {
    output.text(`Creating ${model} test suite`);
    const filePath = `./tests/${model}.test.js`;

    fs.copySync(path.join(__dirname, './stubs/test.js'), filePath);
    const testBuffer = fs.readFileSync(filePath);

    let test = testBuffer.toString();
    test = test.replace('<Model>', model.charAt(0).toUpperCase() + model.slice(1)).replace('<model>', model);

    fs.writeFileSync(filePath, test);
    output.success('Test suite created');
};
