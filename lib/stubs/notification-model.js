const {Model} = require('objection');

class Notification extends Model{
    static get tableName(){
        return 'notifications';
    }

    static get relationMappings(){
        const <Model> = require('./<model>');

        return {
            <model>: {
                relation: Model.BelongsToOneRelation,
                modelClass: <Model>,
                join: {
                    from: 'notifications.<model>_id',
                    to: '<model>s.id'
                }
            }
        }
    }
}

module.exports = Notification;
