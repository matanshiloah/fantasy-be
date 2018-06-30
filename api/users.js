var RedisHandler = require('../modules/redisHandler');

module.exports = {
    getUserData: async id => {
        return await RedisHandler.getUserData(id);
    },
    validate: async (email, password) => {
        return await RedisHandler.validateUser(email, password);
    },
    create: async (name, email, password) => {
        return await RedisHandler.createUser(name, email, password);
    }
};