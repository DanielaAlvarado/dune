const path = require('path');
const fs = require('fs-extra');
const output = require('./output');

exports.create = (model) => {
    output.text(`Creating ${model} factory`);
    const filePath = `./src/db/factories/${model}Factory.js`;

    fs.copySync(path.join(__dirname, './stubs/factory.js'), filePath);
    const factoryBuffer = fs.readFileSync(filePath);

    let factory = factoryBuffer.toString();
    factory = factory.replace(/<Model>/g, model.charAt(0).toUpperCase() + model.slice(1)).replace(/<model>/g, model);

    fs.writeFileSync(filePath, factory);
    output.success('Factory created');
};
