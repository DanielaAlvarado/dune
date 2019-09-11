const notify = async (model, notification, data) => {
    notification.data = data;
    await notification.run(model);
}

module.exports = notify;
