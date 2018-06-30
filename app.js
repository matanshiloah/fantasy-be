const express = require('express');
const app = express();
const Users = require('./api/users');
const Table = require('./api/table');
const Teams = require('./api/teams');
const Players = require('./api/players');
const Clubs = require('./api/clubs');
const Admin = require('./api/admin');
// const RedisHandler = require('./modules/redisHandler');

var Utils = require('./utils/utils');

var response = (res, data) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(data);
}

app.get('/', (req, res) => {
    res.send('Welcome to Matan\'s Fantasy');
});

app.get('/api/users/:id', async (req, res) => {
    response(res, await Users.getUserData(req.params.id));
});

app.get('/api/users/validate/:mail/:password', async (req, res) => {
    response(res, await Users.validate(req.params.mail, Utils.decryptPassword(req.params.password)));
});

app.get('/api/users/create/:name/:mail/:password', async (req, res) => {
    response(res, await Users.create(req.params.name, req.params.mail, Utils.decryptPassword(req.params.password)));
});

app.get('/api/table', async (req, res) => {
    response(res, await Table.getTable());
});

app.get('/api/team/:id', async (req, res) => {
    response(res, await Teams.getTeam(req.params.id));
});

app.get('/api/teams', async (req, res) => {
    response(res, await Teams.getTeams());
});

app.get('/api/teams/create/:id/:name', async (req, res) => {
    response(res, await Teams.createTeam(req.params.id, req.params.name));
});

app.get('/api/player/:id', async (req, res) => {
    response(res, await Players.getPlayer(req.params.id));
});

app.get('/api/players', async (req, res) => {
    response(res, await Players.getAllPlayers());
});

app.get('/api/clubs', async (req, res) => {
    response(res, await Clubs.getClubs());
});

app.get('/api/admin/validate/:username/:password', (req, res) => {
    response(res, Admin.validate(req.params.username, Utils.decryptPassword(req.params.password)));
});

// app.get('/push', async (req, res) => {
//     res.send(await RedisHandler.push());
// });

// app.get('/del', async (req, res) => {
//     res.send(await RedisHandler.deleteDoc());
// });

app.listen(process.env.PORT || 3005, () => {
    console.log('Listening on ' + process.env.PORT);
});