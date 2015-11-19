// var testUrl = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=DBEA0CA3DEB0EF987FA096FC6D81DAEC&steamid=76561198015453021&format=json';
var steamidMine = "76561198015453021";
var steamidTest = "76561197980047427";

var testUrl = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=DBEA0CA3DEB0EF987FA096FC6D81DAEC&format=json&input_json={"steamid":'+steamidTest+',"include_appinfo":true}'


// testUrl = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=DBEA0CA3DEB0EF987FA096FC6D81DAEC&format=json&input_json={"steamid":76561198015453021,"include_appinfo":true}'

var rp = require('request-promise');

rp(testUrl)
    .then(function (htmlString) {
    //     console.log(typeof htmlString);
    //     console.log(JSON.parse(htmlString));
    //     console.log(typeof htmlString);
    //     console.log(htmlString);
        return JSON.parse(htmlString)['response']['games'];
    })
    .then(function (gameJSON) {
    	console.log(typeof gameJSON);
    	console.log(Object.keys(gameJSON));
    	console.log(gameJSON);
    })
    .catch(function (err) {
        console.error(err);
    });