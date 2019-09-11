const {Model} = require('objection');

class Token extends Model{
    static get tableName(){
        return 'tokens';
    }

    static get relationMappings(){
        const User = require('./user');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'tokens.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Token;
