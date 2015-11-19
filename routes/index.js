var express = require('express');
var router = express.Router();
var path = require('path');
var swig = require('swig');
var chalk = require('chalk');
var models = require('../models/');
var Game = models.Game;

var rp = require('request-promise');


router.get('/', function(req, res) {
	res.render('index', {showGames : false});
})

router.get('/:steamID', function(req, res) {
	var id = req.params.steamID;
	if(isNaN(id)) {
		res.send(404);
	} else {
		Game.find({userID : id})
			.then(function(gameArr) {
				res.render('index', {games: gameArr, showGames : true});
			})
	}
})

router.get('/addSteamID/:steamID', function(req, res) {
	var id = req.params.steamID;
	if(isNaN(id)) {
		res.send(404);
	} else {
		var testUrl = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=DBEA0CA3DEB0EF987FA096FC6D81DAEC&format=json&input_json={"steamid":'+id+',"include_appinfo":true}';
		rp(testUrl)
			.then(function (htmlString) {
				return JSON.parse(htmlString)['response']['games'];
			})
			.then(function (gameJSON) {
				gameJSON = gameJSON.filter(function (gameEntry) {
					return gameEntry['playtime_forever'] > 60;
				});
				var gamesInSchemaForm = gameJSON.map(function (gameEntry) {
					return {
						title: gameEntry['name'],
						imgUrl: gameEntry['img_icon_url'],
						hoursPlayed: Math.floor(gameEntry['playtime_forever'] / 60),
						userID: id,
						appID: gameEntry['appid']
					}
				});

				Game.create(gamesInSchemaForm).then(function() {
					res.status(302).redirect('/'+id);
				})



				//res.json(gamesInSchemaForm);
			})
			.catch(function (err) {
				console.error(err);
				res.send(500);
			})
	}
})

router.delete('/delete/:steamID', function(req, res, next) {
	Game.remove({userID : req.params.steamID})
		.then(function (success) {
			res.redirect('/'+req.params.steamID);
		})
		.then(null, function (err) {
			console.error(err);
			res.sendStatus(500);
		})
})



module.exports = router;