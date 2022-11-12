/** @format */
const chalk = require('chalk');
const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const createPath = require('../helpers/create-path');

const errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m', err);
    next(err);
}
const errorResponder = (err, req, res, next) => {
    res.header("Content-Type", 'application/json');
    res.status(err.response.status).send(JSON.stringify(err.response.data, null, 4));
}
const invalidPathHandler = (req, res, next) => {
    console.log(errorMsg('The URL you are trying to reach does not exist.'))
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), { title, description: 'The URL you are trying to reach does not exist.' });
}

module.exports = { errorLogger, errorResponder, invalidPathHandler }