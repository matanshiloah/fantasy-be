var fs = require('fs');
var RedisHandler = require('../modules/redisHandler');

var credentials = JSON.parse(fs.readFileSync('.cred'));

module.exports = {
    validate: (username, password) => {
        if (username === credentials.username && password === credentials.password) {
            return { status: 'ok' };
        }

        return { status: 'fail' };
    }
};