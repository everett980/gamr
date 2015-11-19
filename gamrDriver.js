var Person = require('./person.js');
//console.log("abcde".localeCompare("abde"));

var gamrDriver = function(startingPeople) {
	this.people = [];
	if(typeof startingPeople === 'object') {
		this.people = startingPeople;
	}
}

gamrDriver.prototype.addPerson = function(userName) {
	//adds a person to the people array in O(n) time, where n is the number of person elements in people
	var addToPeople = new Person.Person(userName);
	for(var i = 0; i < this.people.length; i++) {
		var whereToInsert = this.people[i].userName.localeCompare(userName);
		if(whereToInsert === 0) {
			throw 'There is already a user with that name.'
		}
		if(whereToInsert > -1) {
			this.people.splice(i, 0, addObj);
			return;
		}
	}
	this.people.push(addToPeople);
}

gamrDriver.prototype.findPerson = function(userName, startIndex, endIndex) {
	var startI = startIndex;
	var endI = endIndex;
	if(typeof startI === 'undefined') startI = 0;
	if(typeof endI === 'undefined') endI = this.people.length - 1;
	var checkIndex = Math.ceil((endI - startI) / 2);
	var whereToInsert = userName.localeCompare(this.people[checkIndex].userName);
	return whereToInsert;
};
var myDriver = new gamrDriver();
// console.log(myDriver.people);
myDriver.addPerson('bob');
// console.log(myDriver.people);
myDriver.addPerson('george');
// console.log(myDriver.people);

console.log(myDriver.findPerson('bob'));
console.log(myDriver.findPerson('george'));





//### Old tests: ###
	/*
	var Bob = new Person('bob');
	Bob.addGame("tf2", 5);
	//console.log(Bob.gameData);
	Bob.addGame("Xenomorph", 3);
	//console.log(Bob.gameData);
	Bob.addGame("civ5", 1);
	//console.log(Bob.gameData);

	var George = new Person('george');
	George.addGame("tf2", 3);
	George.addGame("portal 1", 2);
	George.addGame("portal 10", 5);
	George.addGame("Xenomorph", 4);
	George.addGame("Zombie Slasher Simulator 2014", 4);

	console.log(George.geometricCompare(Bob));
	console.log(Bob.geometricCompare(George));
	*/