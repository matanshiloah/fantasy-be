var RedisHandler = require('../modules/redisHandler');

module.exports = {
    getPlayer: async id => {
        return await RedisHandler.getPlayer(id);
    },
    getAllPlayers: async () => {
        return await RedisHandler.getAllPlayers();
    }
};