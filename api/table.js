var RedisHandler = require('../modules/redisHandler');

module.exports = {
    getTable: async () => {
        return await RedisHandler.getTable();
    }
};