const path = require('path');
const fs = require('fs-extra');
const output = require('./output');

exports.create = (name) => {
    output.text(`Creating ${name} email`);
    const filePath = `src/emails/${name}Email.js`;

    fs.copySync(path.join(__dirname, './stubs/email.js'), filePath);
    const emailBuffer = fs.readFileSync(filePath);

    let email = emailBuffer.toString();
    email = email.replace(/<name>/g, name);

    fs.writeFileSync(filePath, email);
    output.success('Email created');
};
