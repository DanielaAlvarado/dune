const welcomeEmail = require('../emails/welcomeEmail');

const channels = ['database', 'email'];

exports.run = async (user) => {
    if(channels.includes('database')){
        await user.$relatedQuery('notifications').insert({
            content: `Hi ${user.name}, welcome to the notes app!`
        });
    }

    if(channels.includes('email')){
        welcomeEmail(user);
    }
};
