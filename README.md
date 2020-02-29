# Dune
More detailed documentation coming soon.

## Description
Dune is a CLI tool to create REST APIs using Node.js. It generates project files and implements the following packages:
* [express](https://www.npmjs.com/package/express)
* [knex](https://www.npmjs.com/package/knex)
* [objection](https://www.npmjs.com/package/objection)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [indicative](https://www.npmjs.com/package/indicative)
* [factory-girl](https://www.npmjs.com/package/factory-girl)
* [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [env-cmd](https://www.npmjs.com/package/env-cmd)
* [jest](https://www.npmjs.com/package/jest)
* [supertest](https://www.npmjs.com/package/supertest)

## Installation
Install this package globally using the `npm install` command.
```
npm install @dunebird/dune -g
```

## Usage
### Getting started
#### Project creation
Create a project with the `new` command followed by the project name.
```
dune new notes
```

Create a project with built-in authentication by adding the --auth flag.
```
dune new notes --auth
```

#### Configuration
Configure environment variables by editing the `.env` files inside the `/config` directory.

Since this tool uses [knex](https://www.npmjs.com/package/knex), you may want to install one of the following according to your `DB_CLIENT` environment variable.
```
npm install pg
npm install sqlite3
npm install mysql
npm install mysql2
```

#### Start server
Start the serve with the `serve` command.
```
dune serve
```

Start a development server using [nodemon](https://www.npmjs.com/package/nodemon) by adding the --dev flag.
```
dune serve --dev
```

### Database
Make sure to create databases according to the values specified with the `DB_NAME` variable in the configuration files.

#### Migrations
Create a new migration by passing the name of the model to the `migration:create` command. This will create a new [knex](https://www.npmjs.com/package/knex) migration file inside the `/src/db/migrations` directory.
```
dune migration:create note
```

Specify the `up` and `down` instructions using the functions provided by [knex Schema Builder](http://knexjs.org/#Schema).
```javascript
// /src/db/migrations/XXXXXXXXXXXXX_note.js
exports.up = (knex) => {
    return knex.schema.createTable('notes', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('title').notNullable();
        table.text('content').notNullable();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('notes');
};
```

Run migrations with the `migration:run` command, specify environment by using the `--env` argument with the value `dev` or `test`.
```
dune migration:run --env=dev
```

#### Models
Create a new model by passing its name to the `model:create` command. A new model file will be created in the `/src/models` directory.
```
dune model:create note
```

Return the name of the corresponding table in the `tableName()` method as specified in the [objection models documentation](https://vincit.github.io/objection.js/guide/models.html). Specify relationships in the `relationMappings()` method (see [objection relations documentation](https://vincit.github.io/objection.js/guide/relations.html)).
```javascript
// /src/models/note.js
const {Model} = require('objection');

class Note extends Model{
    static get tableName(){
        return 'notes';
    }

    static get relationMappings(){
        const User = require('./user');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'notes.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Note;
```

#### Factories
Create a new factory by passing the name of the model to the `factory:create` command. A new file will be created in the `/src/db/factories` directory.
```
dune factory:create note
```

Modify the file to define a factory according to the [factory-girl documentation](https://www.npmjs.com/package/factory-girl).
```javascript
// /src/db/factories/noteFactory.js
const Note = require('../../models/note');

const noteFactory = (factory) => {
    factory.define('note', Note, {
        title: factory.chance('sentence'),
        content: factory.chance('paragraph')
    });
}

module.exports = noteFactory;

```

Require the new factory inside the `/src/db/factories/factory.js` file.
```javascript
// /src/db/factories/factory.js
const {factory} = require('factory-girl');
const ObjectionAdapter = require('factory-girl-objection-adapter');
require('./userFactory')(factory);
require('./noteFactory')(factory); // new factory

factory.setAdapter(new ObjectionAdapter());

module.exports = factory;

```

#### Seeds
Create a new seed by passing the name of the model to the `seed:create` command. A new file will be created inside the `/src/db/seeds` directory.
```
dune seed:create note
```

Enter the seed's code inside the `exports.seed` function, don't forget to pass the `knex` parameter to the model's `knex()` function.
```javascript
// /src/db/seeds/XXXXXXXXXXXXX_noteSeed.js
const factory = require('../factories/factory');
const Note = require('../../models/note');
const User = require('../../models/user');

exports.seed = async (knex) => {
    Note.knex(knex);

    const users = await User.query();
    for(let i = 0; i < users.length; i++){
        await users[i].$relatedQuery('notes').insert(await factory.buildMany('note', 10));
    }
};
```

Run seeds with the `seed:run` command, specify environment with the `--env` argument with the value `dev` or `test`.
```
dune seed:run --env=dev
```

### HTTP
#### Routers
Create a new router by passing the name of the model to the `router:create` command. A new file with some default code will be created in the `/src/routers` directory.
```
dune router:create note
```

Require and register the router in the `/src/app.js` file as follows.
```javascript
// /src/app.js
const express = require('express');
require('./db/objection.js');
const userRouter = require('./routers/userRouter');
const noteRouter = require('./routers/noteRouter'); // import the router

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(noteRouter); // register the router

app.get('/', (req, res) => {
    res.send('it works!')
});

module.exports = app;

```

#### Controllers
Create a new controller by passing the name of the model to the `controller:create` command. A new file will be created in the `/src/controllers` directory.
```
dune controller:create note
```

You may now write some code inside one of the controller's functions and link it to a router.
```javascript
// /src/controllers/noteController.js snippet
exports.index = async (req, res) => {
    try{
        const notes = await Note.query();

        res.send(notes);
    }catch(error){
        res.status(500).send();
    }
};
```

```javascript
// /src/routers/noteRouter.js
const express = require('express');
const binder = require('./binder');
const Note = require('../models/note');
const noteController = require('../controllers/noteController'); // require controller

const router = new express.Router();

router.param('note', binder('note', Note));

router.get('/notes', noteController.index); // link route to controller's function

module.exports = router;
```

As a result, this would produce a collection of objects with the following structure.
```json
{
    "id": 2,
    "user_id": 1,
    "title": "note 2",
    "content": "this is another note"
}
```

#### Serializers
Serializers are useful to filter properties from models before sending their data to the client. Create a new serializer by passing the name of the model to the `serializer:create` command. This will create a new file in the `/src/serializers` directory.
```
dune serializer:create note
```

You may define different "filters" inside the `serialize` function.
```javascript
// /src/serializers/noteSerializer.js snippet
exports.serialize = (note, option) => {
    switch(option){
        case 'withoutIds':
            return {
                title: note.title,
                content: note.content
            }
            break;
        default:
            return {
                id: note.id,
                title: note.title,
                content: note.content
            };
    }
};
```

Now, you may use the serializer in a controller to filter data before sending it to the client. Use the `collection` function to serialize an array of model instances.
```javascript
// /src/controllers/noteController.js
const Note = require('../models/note');
const noteSerializer = require('../serializers/noteSerializer'); // require serializer

exports.index = async (req, res) => {
    try{
        const notes = await Note.query();

        res.send(noteSerializer.collection(notes, 'withoutIds')); // filter data
    }catch(error){
        res.status(500).send();
    }
};
```

Use the `serialize` method to serialize a single model instance.
```javascript
// /src/controllers/noteController.js snippet
exports.show = async (req, res) => {
    try{
        const note = await Note.query().findById(req.params.id);

        res.send(noteSerializer.serialize(note, 'withoutIds'));
    }catch(error){
        res.status(500).send();
    }
};
```

The `'withoutIds'` filter shown above as an example will now filter model instances to match the following structure.
```json
{
    "title": "note 1",
    "content": "this is a note"
}
```

#### Validators
Create a new validator by passing its name to the `validator:create` command.  A new file will be created in the `/src/validators` directory.
```
dune validator:create storeNote
```

Modify the `rules` variable inside the validator to implement rules over the received data. Use the [indicative documentation](https://indicative.adonisjs.com/guides/master/introduction) to find the available validation rules and their usage.
```javascript
// /src/validators/storeNote.js snippet
const rules = {
    title: 'required|string',
    content: 'required|string'
};
```

You can now use a validator as a middleware in your routers.
```javascript
// /src/routers/noteRouter.js snippet
router.post('/notes', storeNote, noteController.store);
```

#### Middleware
Create a new middleware by passing its name to the `middleware:create` command. A new file will be created in the `/src/middleware` directory.
```
dune middleware:create auth
```

<!-- ### Policies
Create a new policy by passing the name of the model to the `policy:create` command.
```
dune policy:create user
```

### Notifications
Set up the notification migration and model with the `notification:setup` command.
```
dune notification:setup
```

Create a new notification by passing its name to the `notification:create` command.
```
dune notification:create welcome
```

### Emails
Create a new email by passing its name to the `email:create` command.
```
dune email:create passwordVerification
```

### Tests
Create a new test by passing the name of the model to the `test:create` command.
```
dune test:create user
``` -->
