const path = require('path');
const fs = require('fs-extra');
const output = require('./output');

exports.create = (name) => {
    output.text(`Creating ${name} middleware`);
    const filePath = `src/middleware/${name}.js`;

    fs.copySync(path.join(__dirname, './stubs/middleware.js'), filePath);
    const middlewareBuffer = fs.readFileSync(filePath);

    let middleware = middlewareBuffer.toString();
    middleware = middleware.replace(/<name>/g, name);

    fs.writeFileSync(filePath, middleware);
    output.success('Middleware created');
};
