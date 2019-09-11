const path = require('path');
const fs = require('fs-extra');
const output = require('./output');

exports.create = (name) => {
    output.text(`Creating ${name} model`);
    const filePath = `./src/models/${name}.js`;

    fs.copySync(path.join(__dirname, './stubs/model.js'), filePath);
    const modelBuffer = fs.readFileSync(filePath);

    let model = modelBuffer.toString();
    model = model.replace(/<Model>/g, name.charAt(0).toUpperCase() + name.slice(1)).replace('<table_name>', name + 's');

    fs.writeFileSync(filePath, model);
    output.success('Model created');
};
