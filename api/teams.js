var RedisHandler = require('../modules/redisHandler');

module.exports = {
    getTeam: async id => {
        return await RedisHandler.getTeam(id);
    },
    getTeams: async () => {
        return await RedisHandler.getTeams();
    },
    createTeam: async (userID, name) => {
        return await RedisHandler.createTeam(userID, name);
    }
};