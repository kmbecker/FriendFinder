// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friendData = require('../data/friends.js');
var path = require('path');




// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page. 
	// In each of the below cases when a user visits a link 
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table) 
	// ---------------------------------------------------------------------------

	app.get('/api/theList', function(req, res){
		res.json(friendData);
	});

	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a reservation request... this data is then sent to the server...
	// Then the server saves the data to the tableData array)
	// ---------------------------------------------------------------------------

	app.post('/api/theList', function(req, res){
		var lowestDifferenceInt = 50;
		var chosenMatch;
		friendData.forEach(function(storedUserObject){
			var difference = 0;
			for(i=0;i<storedUserObject.friendNumbers.length;i++){
				difference+=Math.abs(storedUserObject.friendNumbers[i] - req.body.friendNumbers[i]);
			} if(difference<lowestDifferenceInt){
				lowestDifferenceInt = difference;
				chosenMatch = storedUserObject;
			}
		});



		res.json(chosenMatch);
		friendData.push(req.body);

/*
		if(tableData.length < 5 ){
			tableData.push(req.body);
			res.json(true); // KEY LINE
		}

		// Or false if they don't have a table
		else{
			waitListData.push(req.body);
			res.json(false); // KEY LINE
		}
*/
	});


	app.post('/api/clear', function(req, res){
		// Empty out the arrays of data
		friendData = [];

		console.log(friendData);
	})
}