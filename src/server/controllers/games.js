import mongoose from "mongoose";
import Game from "../models/game";
import User from "../models/user";
// -------------------------------------------


//Next steps:
	//1 - update the rest of the users after adding a game/friends to list
	//2 - get friend.name, friend.email, friend.avatar info inserted into friends array next to friendId: ??
						// friends: [
						// 	{
						// 		friendId: 59728fa9d31d5e04aa319b18,
						// 		name: "Max",
						// 		email: "max@fake.com",
						// 		avatar: "http://www.radfaces.com/images/avatars/lawrence-cohen.jpg",
						//		games: [
									// 	"God of War",
									// 	"The Legend of Zelda: Breath of the Wild"
									// ],
						//		num: 1
						// 	}
						// ]
	//3 - Exclude users own id from their own friends list
	//4 - Reverse the whole process for Delete

// function friendLook(id) {
// // let id = "59728fa9d31d5e04aa319b18";
// 	User
// 		.findById(
// 			id, function(err, friend) {
// 				const newFriend = {
// 					name: friend.name,
// 					email: friend.email,
// 					avatar: friend.avatar
// 				}
// 				// console.log(newFriend);
// 				return newFriend;
// 				}
// 		)
// }



exports.saveGame = function(req, res, next) {
	req.body.matchedFriends = req.params.id;
	console.log(req.user.email);
	Game
		.findOneAndUpdate(
			{id: req.body.id},
			// {$addToSet: {matchedFriends: req.params.id}},
			{$addToSet: {matchedFriends: {friendId: req.params.id}}}, //Adds Lisa to Zelda } },
			{upsert: false},
			function(error, result) {
		    if (!error) {
		        // If the document doesn't exist
		        if (!result) {
		            // Create it
		            req.body.matchedFriends = [{friendId: req.params.id}];
		            result = new Game(req.body);
		        }
		        const final = result; 
		        result.save();  //Save the newFriend to the matchedFriends array
			console.log(' '); 
			console.log('saving '+req.user.email +' to  Match Friend list');
			var matches = JSON.parse(JSON.stringify(final.matchedFriends)); 
			var name = final.name; 
			console.log(matches);
			console.log(name);
			matches.forEach(function(match){ //Loop through matched friends list
				console.log('match ',match); 
				
				User.findOneAndUpdate(  //Find each friend by their id
					{_id: match.friendId},
					{upsert: true},
					(err, res) => {
						console.log('current user');
						console.log(req.user)
						let currentUser = 
						[{	
							"friendId": req.user._id,
							"email": req.user.email
						}]
						console.log('res');
						console.log(res)
						

						const friends = addFriends(currentUser, JSON.parse(JSON.stringify(res.friends)), name);	
						console.log(friends)
						res.friends = friends; //replace freinds array with new freinds array
						//res.friends.push('niko');
						res.save(); //Save newFriend to that friend

					}
				)
			})
		    }
		});
}

var addFriends = (arr1, arr2, newgame)=>{
	//console.log(arr1, arr2);
	
	for(var i in arr1) {

		var exists = false;
    
		for(var j in arr2) {

			if(arr2[j].friendId === arr1[i].friendId){
				exists = true;
				//console.log('previous match '+ arr1[i].friendId);
        arr2[j]['games'].push(newgame);
        arr2[j]['num']++;
				break;
			}

		}
			if(!exists){
					//console.log('new match ' + arr1[i].friendId);
					arr2.push({
						'friendId': arr1[i].friendId,
		        'num': 0,
	          'games': [newgame]
	          //extra info that needs to come from User.findById({_id: arr1[i].friendId})
	          // 'avatar': "http://www.radfaces.com/images/avatars/lawrence-cohen.jpg",
	          // 'name': 'Hard Coded Man',
	          // 'email': 'hardcoded@fake.com'
	        });
			}   
    //findAndUpdate('_id':arr1[i].friendId,)     
	}
	//console.log('arr2');
	return arr2; 
}

					// User.findOneAndUpdate(
					// 	{_id: req.params.id, "list.id": {$ne: req.body.id}},
					// 	// {$addToSet: {list: new Game(req.body)}},
					// 	{$addToSet: 
					// 		{
					// 			//list: new Game(req.body),
					// 			list:  {  //Adds Zelda to Lisa
					// 					'name':req.body.name,
					// 					'summary':req.body.summary,
					// 					'id':req.body.id,
					// 					'cover':req.body.cover
					// 				}
					// 		}	
					// 			//friends: {friendId: req.params.id} //Adds Lisa to Lisa 							
					// 	},
					// 	{upsert: true},
					// 	function(err, res) {
					// 		if (err) {
					// 			console.log(err);
					// 		} else {
  			// 				var r = result.matchedFriends;
  			// 				var f = res.friends;
  			// 				f.num = 0;
  			// 				f.games = [];
  			// 				// console.log(f);
					// 			const friends = addFriends(JSON.parse(JSON.stringify(r)), JSON.parse(JSON.stringify(f)), result.name);
					// 			// console.log(friends);
					// 			res.friends = friends;
					// 			//needs to update all other users now with updated friends info
					// 			res.save();
					// 		}
					// 	}
					// )








































exports.deleteGame = function(req, res, next) {
	console.log(req.body.id, req.params.id);
	Game
		.findOneAndUpdate(
			{id: req.body.id},
			{$pull: {matchedFriends: req.params.id}},
			function(error, result) {
		    if (!error) {
		        // If the document doesn't exist
		        if (!result) {
		            //nothing
		        }
		        // Save the document
		        result.save(function(error) {
		            if (!error) {
		                // Do something with the document
		            } else {
		                throw error;
		            }
		        });
			    console.log('removing from user list');
			    //duplicate games are saved in user list, need to fix
					User.update(
						{_id: req.params.id},
						{$pull: {list: {id: req.body.id}}},
						function(err, result) {
							if (err) {
								console.log(err);
							} else {
								console.log(result);
							}
						}
					)
		    }
		});	
}
