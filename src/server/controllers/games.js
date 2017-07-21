import mongoose from "mongoose";
import Game from "../models/game";
import User from "../models/user";
// -------------------------------------------

exports.saveGame = function(req, res, next) {
	req.body.matchedFriends = req.params.id;

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
		            // result = new Model();
		        }
		        // Save the document
		      result.save();
			    console.log('adding to user list');
			    //duplicate games are saved in user list, need to fix
					User.findOneAndUpdate(
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
							}	
								//friends: {friendId: req.params.id} //Adds Lisa to Lisa 							
						},
						{upsert: true},
						function(err, res) {
							if (err) {
								console.log(err);
							} else {
								console.log(req.body.id)
								console.log('result');
								console.log(res.friends);
								console.log(result.matchedFriends);
								console.log('-----------------');
		// 						var r = [{"friendId":"597182233b24610b3c4a5e3c"}];
		// 						var f = [{"friendId":"597182233b24610b3c4a5e3c", 
  // 'num': 0,'games': []}];
  							var r = result.matchedFriends;
  							var f = res.friends;
  							f.num = 0;
  							f.games = [];
  							console.log(f);
								const friends = addFriends(JSON.parse(JSON.stringify(r)), JSON.parse(JSON.stringify(f)), result.name);
								console.log(friends);
								res.friends = friends;
								// res.friends = ['friends pineapple'];
								res.save();
							}
						}
					)
		    }
		});
}

var addFriends = (arr1, arr2, newgame)=>{
	console.log(arr1, arr2);
	for(var i in arr1){
		var exists = false;
    
		for(var j in arr2){
			if(arr2[j].friendId === arr1[i].friendId){
				exists = true;
				console.log('previous match '+arr1[i].friendId)
        arr2[j]['games'].push(newgame)
        arr2[j]['num']++;
				break;
			}

		}
		if(!exists){
				console.log('new match '+arr1[i].friendId)
				arr2.push({
					'friendId': arr1[i].friendId,
	        'num': 0,
          'games': [newgame]
        })
		}   
    //findAndUpdate('_id':arr1[i].friendId,)     
	}
	console.log('arr2');
	console.log(arr2)
	return arr2; 
}






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
		            // Create it
		            // result = new Game(req.body);
		            // result = new Model();
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