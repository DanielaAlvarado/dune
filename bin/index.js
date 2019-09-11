#!/usr/bin/env node
const yargs = require('yargs');
const project = require('../lib/project/project');
const migration = require('../lib/migration');
const model = require('../lib/model');
const factory = require('../lib/factory');
const seed = require('../lib/seed');
const validator = require('../lib/validator');
const serializer = require('../lib/serializer');
const controller = require('../lib/controller');
const router = require('../lib/router');
const middleware = require('../lib/middleware');
const policy = require('../lib/policy');
const notification = require('../lib/notification');
const email = require('../lib/email');
const test = require('../lib/test');

yargs.version('1.1.0');

yargs.command({
    command: 'new [name]',
    describe: 'Create a new project',
    builder: {
        name: {
            describe: 'Name of the project',
            demandOption: true,
            type: 'string'
        },
        auth: {
            describe: 'Create a new project with authentication',
            demandOption: false,
            type: 'boolean'
        }
    },
    handler(argv){
        project.create(argv.name, argv.auth);
    }
});

yargs.command({
    command: 'serve',
    describe: 'Start express server',
    builder: {
        dev: {
            describe: 'Start express server with dev script',
            demandOption: false,
            type: 'boolean'
        }
    },
    handler(argv){
        project.serve(argv.dev);
    }
});

yargs.command({
    command: 'migration:create [model]',
    describe: 'Create a new migration',
    builder: {
        model: {
            describe: 'Model for the new migration',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        migration.create(argv.model);
    }
});

yargs.command({
    command: 'migration:run',
    describe: 'Run migrations',
    builder: {
        env: {
            describe: 'Environment to run migrations',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        migration.run(argv.env);
    }
});

// yargs.command({
//     command: 'migration:rollback',
//     describe: 'Rollback migrations',
//     builder: {
//         env: {
//             describe: 'Environment to rollback migrations',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler(argv){
//         migration.rollback(argv.env);
//     }
// });

yargs.command({
    command: 'model:create [name]',
    describe: 'Create a new model',
    builder: {
        name: {
            describe: 'Name for the new model',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        model.create(argv.name);
    }
});

yargs.command({
    command: 'factory:create [model]',
    describe: 'Create a new factory',
    builder: {
        model: {
            describe: 'Model for the new factory',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        factory.create(argv.model);
    }
});

yargs.command({
    command: 'seed:create [model]',
    describe: 'Create a new seed',
    builder: {
        model: {
            describe: 'Model for the new seed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        seed.create(argv.model);
    }
});

yargs.command({
    command: 'seed:run',
    describe: 'Run seeds',
    builder: {
        env: {
            describe: 'Environment to run seeds',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        seed.run(argv.env);
    }
});

yargs.command({
    command: 'validator:create [name]',
    describe: 'Create a new validator',
    builder: {
        name: {
            describe: 'Name for the new validator',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        validator.create(argv.name);
    }
});

yargs.command({
    command: 'serializer:create [model]',
    describe: 'Create a new serializer',
    builder: {
        model: {
            describe: 'Model for the new serializer',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        serializer.create(argv.model);
    }
});

yargs.command({
    command: 'controller:create [model]',
    describe: 'Create a new controller',
    builder: {
        model: {
            describe: 'Model for new controller',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        controller.create(argv.model);
    }
});

yargs.command({
    command: 'router:create [model]',
    describe: 'Create a new router',
    builder: {
        model: {
            describe: 'Model for the new router',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        router.create(argv.model);
    }
});

yargs.command({
    command: 'middleware:create [name]',
    describe: 'Create a new middleware',
    builder: {
        name: {
            describe: 'Name for the new middleware',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        middleware.create(argv.name);
    }
});

yargs.command({
    command: 'policy:create [model]',
    describe: 'Create a new policy',
    builder: {
        model: {
            describe: 'Model for new policy',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        policy.create(argv.model);
    }
});

yargs.command({
    command: 'notification:setup [model]',
    describe: 'Create notifications migration and model',
    builder: {
        model: {
            describe: 'Model for notifications',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notification.setup(argv.model);
    }
});

yargs.command({
    command: 'notification:create [name]',
    describe: 'Create a new notification',
    builder: {
        name: {
            describe: 'Name for new notification',
            demandOption: true,
            type: 'string'
        },
        model: {
            describe: 'Model for new notification',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notification.create(argv.name, argv.model);
    }
});

yargs.command({
    command: 'email:create [name]',
    describe: 'Create a new email',
    builder: {
        name: {
            describe: 'Name for new email',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        email.create(argv.name);
    }
});

yargs.command({
    command: 'test:create [model]',
    describe: 'Create a new test suite',
    builder: {
        model: {
            describe: 'Model for new test suite',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        test.create(argv.model);
    }
});

yargs.parse();
