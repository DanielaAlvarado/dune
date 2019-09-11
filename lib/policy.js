const path = require('path');
const fs = require('fs-extra');
const output = require('./output');

exports.create = model => {
    console.log(path.join(__dirname, './stubs/policy.js'));
    output.text(`Creating ${model} migration`);
    const filePath = `./src/policies/${model}Policy.js`;

    fs.copySync(path.join(__dirname, './stubs/policy.js'), filePath);
    const policyBuffer = fs.readFileSync(filePath);

    let policy = policyBuffer.toString();
    policy = policy.replace(/<model>/g, model);

    fs.writeFileSync(filePath, policy);
    output.success('Policy created');
};
