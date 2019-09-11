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
npm install @dune/dunebird -g
```

## Usage
### Project creation
Create a project with the `new` command.
```
dune new my_project
```
Create a project with authentication by adding the --auth flag.
```
dune new my_project --auth
```

### Start server
Start the serve with the `serve` command.
```
dune serve
```
Start a development server using nodemon by adding the --dev flag.
```
dune serve --dev
```

### Migrations
Create a new migration by passing the name of the model to the `migration:create` command.
```
dune migration:create user
```
Run migrations with the `migration:run` command, specify environment with the `--env` argument with the value `dev` or `test`.
```
dune migration:run --env=dev
```

### Models
Create a new model by passing its name to the `model:create` command.
```
dune model:create user
```

### Factories
Create a new factory by passing the name of the model to the `factory:create` command.
```
dune factory:create user
```

### Seeds
Create a new seed by passing the name of the model to the `seed:create` command.
```
dune seed:create user
```

Run seeds with the `seed:run` command, specify environment with the `--env` argument with the value `dev` or `test`.
```
dune seed:run --env=dev
```

### Validators
Create a new validator by passing its name to the `validator:create` command.
```
dune validator:create storeUser
```

### Serializers
Create a new serializer by passing the name of the model to the `serializer:create` command.
```
dune serializer:create user
```

### Controllers
Create a new controller by passing the name of the model to the `controller:create` command.
```
dune controller:create user
```

### Routers
Create a new router by passing the name of the model to the `router:create` command.
```
dune router:create user
```

### Middleware
Create a new middleware by passing its name to the `middleware:create` command.
```
dune middleware:create auth
```

### Policies
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
```
