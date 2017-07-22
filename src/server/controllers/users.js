import mongoose from "mongoose"
import passport from "passport"
import User from "../models/user"
import Game from "../models/game"

// -------------------------------------------

exports.login = function(req, res, next) {
	// Do email and password validation for the server
	passport.authenticate("local", function(err, user, info) {		
		console.log(user._id);
		if(err) return next(err)
		if(!user) {
			return res.json({ success: false, message: info.message })			
		}
		// ***********************************************************************
		// "Note that when using a custom callback, it becomes the application's
		// responsibility to establish a session (by calling req.login()) and send
		// a response."
		// Source: http://passportjs.org/docs
		// ***********************************************************************		
		// Passport exposes a login() function on req (also aliased as logIn())
		// that can be used to establish a login session		
		req.logIn(user, loginErr => {
			if(loginErr) {
				return res.json({ success: false, message: loginErr })
			}
			return res.json({ success: true, message: "authentication succeeded", player: user })
		})
	})(req, res, next)
}

// -------------------------------------------

exports.logout = function(req, res, next) {
	// the logout method is added to the request object automatically by Passport
	req.logout()
	return res.json({ success: true })
}

// -------------------------------------------

exports.register = function(req, res, next) {
	
	User.findOne({ email: req.body.email }, (err, user) => {
		// is email address already in use?
		if (user) {			
			res.json({ success: false, message: "Email already in use" })
			return 
		}
		// go ahead and create the new user
		else {
			User.create(req.body, (err) => {
				if (err) {
					console.error(err)
					res.json({ success: false })
					return
				}
				res.json({ success: true })
				return 
			})
		}
	})
}
// -------------------------------------------

// exports.getMatches = function(req, res, next) {
// 	const matches = [];
// 	const friends = [{}];
// 	Game.find(
// 		{}, {name: 1, matchedFriends: 1}, (err, games) => {
// 			games.forEach(function(game, i) {
// 				game.matchedFriends.forEach(function(friend, i) {
// 					let obj = {};
// 					obj.name = game.name;
// 					obj.friendId = friend;
// 					obj.number = 0;
// 					matches.push(obj);
// 				})
// 			})
// 			console.log(matches);
// 			matches.forEach(function(match, i) {
// 				let id = match.friendId;
// 				console.log(id);
// 				friends.forEach(function(friend, i) {
// 					console.log(friend);
// 					let F = {};
// 					if (friend.id && friend.id == id) {
// 						friend.num++;
// 					} else {
// 						friend.id = id;
// 						friend.num = 0;
// 					}
// 				friends.push(F);
// 				});	
// 			});
// 			console.log(friends);
// 			return res.json({ games: games })
// 		}
// 	)
// }
// [
// 	{
// 		_id,
// 		name,
// 		email,
// 		gamesmatched: [
// 			{game.name},
// 			{game}
// 		]
// 	}

// ]
















