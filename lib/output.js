const chalk = require('chalk');

exports.text = (out) => {
    console.log(chalk.blue(out));
};

exports.error = (out) => {
    console.log(chalk.red(out));
};

exports.success = (out) => {
    console.log(chalk.green(out));
};
