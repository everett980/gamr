var Person = function(userName) {
	this.userName = userName;
	this.gameData = [];
}

Person.prototype.addGame = function(gameName, gameRating) {
	//adds new game to gameData in alphabetical order in O(n) time
	if(typeof gameName !== 'string') {
		throw 'The name of the game has to be a string!';
	}
	if(isNaN(gameRating) || gameRating < 1 || gameRating > 5) {
		throw 'The rating of the game has to be a number between 1 and 5';
	}
	var addObj = {gameName: gameName.toLowerCase(), gameRating: gameRating};
	for(var i = 0; i < this.gameData.length; i++) {
		if(this.gameData[i].gameName.localeCompare(gameName) > -1) {
			this.gameData.splice(i, 0, addObj);
			return;
		}
	}
	this.gameData.push(addObj);
};

Person.prototype.removeGame = function(gameName) {
	//searches through person's gameData to remove specified name
	//returns removed game if found, otherwise returns -1
	//handled in O(n) time
	for(var i = 0; i < this.gameData.length; i++) {
		if(this.gameData[i].gameName.localeCompare(gameName) === 0) {
			return this.gameData.splice(i, 1);
		}
	}
	return -1;
}

Person.prototype.geometricCompare = function(person2) {
	//calculates the Euclidean distance between two People by comparing the difference in ratings
	//on all games which both people have added to their gameData
	//handled in O(n+m) time, where n is the number of games this person has rated,
	//and m is the number of games person2 has rated
	var matches = 0;
	var distance = 0;
	for(var i = 0, j = 0; i<this.gameData.length && j<person2.gameData.length; ) {
		var isMatch = this.gameData[i].gameName.localeCompare(person2.gameData[j].gameName);
		if(isMatch < 0) {
			console.log(this.gameData[i].gameName + "--" + person2.gameData[j].gameName + '--' + isMatch);
			i++;
		}
		if(isMatch > 0) {
			console.log(this.gameData[i].gameName + "--" + person2.gameData[j].gameName + '--' + isMatch);
			j++;
		}
		if(isMatch === 0) {
			console.log(this.gameData[i].gameName + "--" + person2.gameData[j].gameName + '--' + isMatch);
			distance+=Math.pow((this.gameData[i].gameRating - person2.gameData[j].gameRating), 2);
			matches++;
			i++;
			j++;
		}
	}
	distance = Math.sqrt(distance);
	return {distance, matches};
}

module.exports.Person = Person;
