const redis = require('redis');
const { promisify } = require('util');

var client = redis.createClient();
var getAsync = promisify(client.get).bind(client);
var setAsync = promisify(client.set).bind(client);
var deleteAsync = promisify(client.del).bind(client);

client.on('error', err => {
    console.log('Error', err);
});

var getUserData = async userID => {
    var user = await getUser(userID);
    var team = await getTeam(userID);
    var players = await getPlayers(team.players);
    var table = await getTable();

    team.username = user.name;
    for (var i = 0; i < table.length; i++) {
        if (table[i].id == userID) {
            team.place = i + 1;
            break;
        }
    }

    return {
        team: team,
        players: players
    };
};

var getUser = async userID => {
    var users = JSON.parse(await getAsync('users'));

    if (userID) {
        return users[userID];
    }

    return users;
};

var getTeam = async userID => {
    var teams = JSON.parse(await getAsync('teams'));

    if (userID) {
        return teams[userID];
    }

    return teams;
};

var getAllPlayers = async () => {
    return await getPlayer();
};

var getPlayers = async playersIDs => {
    var players = [];

    for (var playerID in playersIDs) {
        players.push(await getPlayer(playerID));
    }

    return players;
};

var getPlayer = async playerID => {
    var players = JSON.parse(await getAsync('players'));

    if (playerID) {
        return players[playerID];
    }

    return players;
};

var getTable = async () => {
    var teams = await getTeam();
    var table = [];

    for (var id in teams) {
        var team = teams[id];

        delete team.players;
        table.push(team);
    }

    table = table.sort((team1, team2) => {
        return team2.agg_points > team1.agg_points;
    });

    return table;
};

var getTeams = async teamsIDs => {
    var allTeams = await getTeam();
    var teams = {};

    for (var id in allTeams) {
        teams[id] = allTeams[id];
        delete teams[id].players;
    }

    return teams;
};

var getClubs = async () => {
    return JSON.parse(await getAsync('clubs'));
};

var validateUser = async (email, password) => {
    var users = await getUser();

    for (var userID in users) {
        if (users[userID].mail === email && users[userID].password === password) {
            return { status: 'success', userID: userID };
        }
    }

    return { status: 'fail' };
};

var createUser = async (name, email, password) => {
    var users = await getUser();
    var userID = '1';

    if (users) {
        var userIDs = Object.keys(users);

        userID = (userIDs[userIDs.length - 1] + 1).toString();
    } else {
        users = {};
    }

    users[userID] = {
        id: parseInt(userID),
        name: name,
        mail: email,
        password: password
    };

    await setAsync('users', JSON.stringify(users));

    return { userID: userID };
}

var createTeam = async (userID, name) => {
    var teams = (await getTeams()) || {};

    teams[userID] = {
        id: parseInt(userID),
        name: name,
        agg_points: 0
    };

    await setAsync('teams', JSON.stringify(teams));

    return { status: 'success' };
}

// var push = async () => {
//     var data = require('../data/data');

//     for (var key in data) {
//         await setAsync(`${ key }`, JSON.stringify(data[key]));
//     }

//     return { status: 'ok' };
// };

// var deleteDoc = async () => {
//     await deleteAsync('users');
//     await deleteAsync('teams');
// }

module.exports = {
    // push: push,
    // deleteDoc: deleteDoc,
    getUserData: getUserData,
    getTable: getTable,
    getTeams: getTeams,
    getTeam: getTeam,
    getAllPlayers: getAllPlayers,
    getPlayers: getPlayers,
    getPlayer: getPlayer,
    getClubs: getClubs,
    validateUser: validateUser,
    createUser: createUser,
    createTeam: createTeam
};