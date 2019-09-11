const path = require('path');
const fs = require('fs-extra');
const output = require('./output');

exports.create = (model) => {
    output.text(`Creating ${model} serializer`);
    const filePath = `src/serializers/${model}Serializer.js`;

    fs.copySync(path.join(__dirname, './stubs/serializer.js'), filePath);
    const serializerBuffer = fs.readFileSync(filePath);

    let serializer = serializerBuffer.toString();
    serializer = serializer.replace(/<model>/g, model);

    fs.writeFileSync(filePath, serializer);
    output.success('Serializer created');
};
