const path = require('path');
const fs = require('fs-extra');
const output = require('./output');

exports.create = (model) => {
    output.text(`Creating ${model} router`);
    const filePath = `src/routers/${model}Router.js`;

    fs.copySync(path.join(__dirname, './stubs/router.js'), filePath);
    const routerBuffer = fs.readFileSync(filePath);

    let router = routerBuffer.toString();
    router = router.replace(/<Model>/g, model.charAt(0).toUpperCase() + model.slice(1)).replace(/<model>/g, model);

    fs.writeFileSync(filePath, router);
    output.success('Router created');
};
