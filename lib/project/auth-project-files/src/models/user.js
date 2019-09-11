const {Model} = require('objection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class User extends Model{
    static get tableName(){
        return 'users';
    }

    static get relationMappings(){
        const Token = require('./token');
        const Notification = require('./notification');

        return {
            tokens: {
                relation: Model.HasManyRelation,
                modelClass: Token,
                join: {
                    from: 'users.id',
                    to: 'tokens.user_id'
                }
            },
            notifications: {
                relation: Model.HasManyRelation,
                modelClass: Notification,
                join: {
                    from: 'users.id',
                    to: 'notifications.user_id'
                }
            }
        }
    }

    static async findByCredentials(email, password){
        const user = await User.query().findOne({
            email
        });
        if(!user){
            return undefined;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return undefined;
        }

        return user;
    }

    async generateAuthToken(){
        const token = await this.$relatedQuery('tokens').insert({
            token: jwt.sign({
                id: this.id
            }, process.env.JWT_SECRET)
        });

        return token.token;
    }
}

module.exports = User;
