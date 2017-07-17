import mongoose from "mongoose";
import Game from "../models/game";
import User from "../models/user";
// -------------------------------------------

exports.saveGame = function(req, res, next) {
	req.body.matchedFriends = req.params.id;

	Game
		.findOneAndUpdate(
			{id: req.body.id},
			{$addToSet: {matchedFriends: req.params.id}},
			{upsert: false},
			function(error, result) {
		    if (!error) {
		        // If the document doesn't exist
		        if (!result) {
		            // Create it
		            result = new Game(req.body);
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
			    console.log('adding to user list');
			    //duplicate games are saved in user list, need to fix
					User.update(
						{_id: req.params.id, "list.id": {$ne: req.body.id}},
						{$addToSet: {list: new Game(req.body)}},
						{upsert: true},
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