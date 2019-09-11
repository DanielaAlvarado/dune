const path = require('path');
const fs = require('fs-extra');
const output = require('./output');

exports.setup = (model) => {
    output.text('Creating notifications migration');
    let filePath = `src/db/migrations/${Date.now()}_notifications.js`;

    fs.copySync(path.join(__dirname, './stubs/notifications-migration.js'), filePath);
    const notificationMigrationBuffer = fs.readFileSync(filePath);

    let notificationMigration = notificationMigrationBuffer.toString();
    notificationMigration = notificationMigration.replace('<model>', model);

    fs.writeFileSync(filePath, notificationMigration);
    output.success('Notifications migration created');

    output.text('Creating notification model');
    filePath = `src/models/notification.js`;

    fs.copySync(path.join(__dirname, './stubs/notification-model.js'), filePath);
    const notificationModelBuffer = fs.readFileSync(filePath);

    let notificationModel = notificationModelBuffer.toString();
    notificationModel = notificationModel.replace(/<Model>/g, model.charAt(0).toUpperCase() + model.slice(1)).replace(/<model>/g, model);

    fs.writeFileSync(filePath, notificationModel);
    output.success('Notifications model created');
};

exports.create = (name, model) => {
    output.text(`Creating ${name} notification`);
    const filePath = `./src/notifications/${name}Notification.js`;

    fs.copySync(path.join(__dirname, './stubs/notification.js'), filePath);
    const notificationBuffer = fs.readFileSync(filePath);

    let notification = notificationBuffer.toString();
    notification = notification.replace('<model>', model);

    fs.writeFileSync(filePath, notification);
    output.success('Notification created');
}
