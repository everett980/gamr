var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var gameSchema = new Schema({
	title: {type: String, required: true},
	rating: {type: String, enum: ['1', '2', '3', '4', '5']},
	imgUrl: {type: String, required: true},
	hoursPlayed: {type: Number, required: true},
	appID: {type: Number, required: true},
	userID: {type: Number, required: true}
});

gameSchema.virtual('imgUrlGenerator').get(function() {
	return 'http://media.steampowered.com/steamcommunity/public/images/apps/'+this.appID+'/'+this.imgUrl+'.jpg';
})


var Game = mongoose.model('Game', gameSchema);

module.exports = {
	Game: Game
};