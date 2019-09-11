const path = require('path');
const fs = require('fs-extra');
const output = require('./output');

exports.create = (model) => {
    output.text(`Creating ${model} controller`);
    const filePath = `./src/controllers/${model}Controller.js`;

    fs.copySync(path.join(__dirname, './stubs/controller.js'), filePath);
    const controllerBuffer = fs.readFileSync(filePath);

    let controller = controllerBuffer.toString();
    controller = controller.replace(/<Model>/, model.charAt(0).toUpperCase() + model.slice(1)).replace(/<model>/, model);

    fs.writeFileSync(filePath, controller);
    output.success('Controller created');
};
