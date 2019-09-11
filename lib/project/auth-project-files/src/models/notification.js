const {Model} = require('objection');

class Notification extends Model{
    static get tableName(){
        return 'notifications';
    }

    static get relationMappings(){
        const User = require('./user');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'notifications.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Notification;
