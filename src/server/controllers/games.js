import mongoose from "mongoose";
import Game from "../models/game";
import User from "../models/user";
// -------------------------------------------

exports.saveGame = function(req, res, next) {
	req.body.matchedFriends = req.params.id;
	Game.findOneAndUpdate(
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

				
				result.save();  //Save the newFriend to the matchedFriends array
				//const final = result;
					
				console.log(' '); 
				console.log('saving '+req.user +' to  Match Friend list');
				var matches = JSON.parse(JSON.stringify(result.matchedFriends)); 
				var name = result.name; 
				console.log(matches);
				console.log(name);

				var previousUsers = [] 
				var promises = matches.map(function(match){ //Loop through matched friends list
					console.log('match ',match); 
					
					return new Promise(function(resolve, reject) {
						
						
						User.findOneAndUpdate(  //Find each friend by their id
							{_id: match.friendId},
							{upsert: true},
							(err, res) => {

								let r = JSON.parse(JSON.stringify(res))
								var user = JSON.parse(JSON.stringify(req.user))
								//console.log(r)							
								//console.log('req below');
								//console.log(req.user)
								let currentUser = 
									[{	
										"friendId": user._id,
										"email": user.email,
										"avatar": user.avatar,
										"name": user.name
									}]
											
								var resUser = {
									"friendId":r._id,
									"email": r.email,
									"avatar": r.avatar,
									"name": r.name
								}


								console.log(user._id, match.friendId); 
								console.log(user._id != match.friendId); 
								
								if(match.friendId != user._id){ 								
									let friends = addFriends(currentUser, r.friends, name);	
									res.friends = friends; //replace freinds array with new freinds array
									res.save(); //Save newFriend to that friend

									previousUsers.push(resUser); 
									console.log('prev users') 
									console.log(previousUsers)


								} else {

								}
	     							if (err) { return reject(err); }								
								resolve();


							}
						)
					})
				})
				

				Promise.all(promises).then(function() { 
					
					// console.log('all dropped)'); 
				
				
				
					User.findOneAndUpdate(  //Find this user  
						{_id: req.params.id, "list.id": {$ne: req.body.id}},
						// {$addToSet: {list: new Game(req.body)}},
						{$addToSet: 
							{
								//list: new Game(req.body),
								list:  {  //Adds Zelda to Lisa
										'name':req.body.name,
										'summary':req.body.summary,
										'id':req.body.id,
										'cover':req.body.cover
									}
							}},
						(err, response) => {
							//console.log('in this guy');

							let o = JSON.parse(JSON.stringify(response))						
							//console.log(o)
							//console.log(response)
						
							//console.log('prev')
							//console.log(previousUsers);
							let friends = addFriends(previousUsers, o.friends, name);	
							response.friends = friends; //replace freinds array with new freinds array
							console.log('freinds')
							console.log(friends);
							//console.log(response);
							
							response.save(); //Save  previous freinds array to this user. 			
						}

					
					)	
				
				}).catch(console.error)
						
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
				 'games': [newgame],
				 'email': arr1[i].email,
	  //extra info that needs to come from User.findById({_id: arr1[i].friendId})
			  'avatar': arr1[i].avatar,
			  'name': arr1[i].name
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
