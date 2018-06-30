var RedisHandler = require('../modules/redisHandler');

module.exports = {
    getClubs: async () => {
        return await RedisHandler.getClubs();
    }
};