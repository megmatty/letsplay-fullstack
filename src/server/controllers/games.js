import mongoose from "mongoose";
import Game from "../models/game";
import User from "../models/user";
// -------------------------------------------

exports.saveGame = function(req, res, next) {
	req.body.matchedFriends = req.params.id;
	// Game.update({ id: req.body.id }, {}, (err, game) => {
	// 	// is email address already in use?
	// 	console.log(game);
	// 	if (game) {			
	// 		res.json({ success: false, message: "Game id already in db" })
	// 		return 
	// 	}
	// 	// go ahead and create the new user
	// 	else {
	// 		Game.create(req.body, (err) => {
	// 			if (err) {
	// 				console.error(err)
	// 				res.json({ success: false })
	// 				return
	// 			}
	// 			res.json({ success: true })
	// 			return 
	// 		})
	// 	}
	// });


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
						{_id: req.params.id},
						{$addToSet: {list: new Game(req.body)}},
						//matching object key in array is probably a 2 step process
						//https://stackoverflow.com/questions/41316056/mongodb-update-array-element-document-with-a-key-if-exists-else-push
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





	console.log(req.body);
	console.log(req.body.id);
	console.log(req.params);

}

      // .update(
      //     {entries: {$elemMatch: {date: Number(req.params.date)}}},
      //     {$set: {'entries.$.mood': req.body.mood, 
      //       'entries.$.activity': req.body.activity,
      //       'entries.$.journal': req.body.journal}}
      // )
      // .exec() 
      // .then(user => {
      //   res.redirect('/log');
      // }) 
      // .catch(err => { console.error(err); 


 // if (!req.user) {
 //      res.redirect('/');
 //    }
 //    Account 
 //      .find({_id : req.user.id},{entries: {$elemMatch: {date: Number(req.params.date)}}})
 //      .exec() 
 //      .then(user => {

 //       Entry
 //      	.findOne()
 //      	.exec()
 //      	.then(entry => {
 //      		var mood = user[0].entries[0].mood; 
 //      		var allMoods = entry.moods; 
 //      	     res.render('edit', {user : req.user, entries: user[0].entries[0], moods:entry.moods, activities:entry.activities, mood:mood });
      		
 //         	 })
		
 //      }) 
 //      .catch(err => { console.error(err); 
 //    res.status(500).redirect('/log'); });