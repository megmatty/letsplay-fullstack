"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _game = require("../models/game");

var _game2 = _interopRequireDefault(_game);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -------------------------------------------

exports.saveGame = function (req, res, next) {
	req.body.matchedFriends = req.params.id;
	if (!req.user) {
		console.log('no user');return;
	};
	_game2.default.findOneAndUpdate({ id: req.body.id },
	// {$addToSet: {matchedFriends: req.params.id}},
	{ $addToSet: { matchedFriends: { friendId: req.params.id } } }, //Adds Lisa to Zelda } },
	{ upsert: false }, function (error, result) {
		if (!error) {
			// If the document doesn't exist
			if (!result) {
				// Create it
				req.body.matchedFriends = [{ friendId: req.params.id }];
				result = new _game2.default(req.body);
			}

			console.log(req);
			result.save(); //Save the newFriend to the matchedFriends array

			console.log(' ');
			console.log('saving ' + req.user + ' to  Match Friend list');
			var matches = JSON.parse(JSON.stringify(result.matchedFriends));
			var name = result.name;
			console.log(matches);
			console.log(name);

			var previousUsers = [];
			var x = 0;
			var promises = matches.map(function (match) {
				//Loop through matched friends list
				console.log('match ', match);

				return new Promise(function (resolve, reject) {

					_user2.default.findOneAndUpdate( //Find each friend by their id
					{ _id: match.friendId }, { upsert: true }, function (err, res) {
						console.log('mango');
						var r = JSON.parse(JSON.stringify(res));
						console.log('between cupcakes');
						var user = JSON.parse(JSON.stringify(req.user));
						//console.log(r)							
						//console.log('req below');
						//console.log(req.user)
						console.log('pineapple');

						var currentUser = [{
							"friendId": user._id,
							"email": user.email,
							"avatar": user.avatar,
							"name": user.name
						}];

						var resUser = {
							"friendId": r._id,
							"email": r.email,
							"avatar": r.avatar,
							"name": r.name

							// console.log(user._id, match.friendId); 
							// console.log(user._id != match.friendId); 

						};if (match.friendId != user._id) {
							var friends = addFriends(currentUser, r.friends, name);
							res.friends = friends; //replace freinds array with new freinds array
							res.save(); //Save newFriend to that friend

							previousUsers.push(resUser);
							// console.log('prev users') 
							// console.log(previousUsers)

						} else {}
						if (err) {
							return reject(err);
						}
						resolve();
					});
				});
			});

			Promise.all(promises).then(function () {

				console.log('all dropped)');

				_user2.default.findOneAndUpdate( //Find this user  
				{ _id: req.params.id, "list.id": { $ne: req.body.id } }, { $addToSet: {
						list: { //Adds Zelda to Lisa
							'name': req.body.name,
							'summary': req.body.summary,
							'id': req.body.id,
							'cover': req.body.cover,
							'rating': req.body.rating
						}
					}
				}, function (err, response) {
					console.log('in this guy');
					console.log(err, response);

					if (!err && response) {
						var o = JSON.parse(JSON.stringify(response));
						console.log(o);
						//console.log(response)
						//console.log('prev')
						//console.log(previousUsers);
						var friends = addFriends(previousUsers, o.friends, name);
						response.friends = friends; //replace freinds array with new freinds array
						console.log('friends');
						console.log(friends);
						//console.log(response);

						response.save(); //Save  previous freinds array to this user.} 	
					}
				});
			}).catch(console.error);
		}
	});
};

var addFriends = function addFriends(arr1, arr2, newgame) {
	//console.log(arr1, arr2);

	for (var i in arr1) {

		var exists = false;

		for (var j in arr2) {

			if (arr2[j].friendId === arr1[i].friendId && arr2[j]['games'].indexOf(newgame) < 0) {
				exists = true;
				//console.log('previous match '+ arr1[i].friendId);
				arr2[j]['games'].push(newgame);
				arr2[j]['num']++;
				break;
			}
		}
		if (!exists) {
			//console.log('new match ' + arr1[i].friendId);
			arr2.push({
				'friendId': arr1[i].friendId,
				'num': 0,
				'games': [newgame],
				'email': arr1[i].email,
				'avatar': arr1[i].avatar,
				'name': arr1[i].name
			});
		}
	}
	//console.log('arr2');
	return arr2;
};

var removeFriends = function removeFriends(arr1, arr2, newgame) {
	for (var i in arr1) {
		var exists = false;
		for (var j in arr2) {
			if (arr2[j].friendId == arr1[i].friendId) {
				exists = true;

				if (arr2[j]['num'] == 0) {
					//remove this 
					arr2.splice(j, 1);
				} else {

					console.log('previous match ' + arr1[i].friendId);
					arr2[j]['num']--;

					console.log(arr2[j]['games']);
					var index = arr2[j]['games'].indexOf(newgame);
					if (index > -1) {
						arr2[j]['games'].splice(index, 1);
					}
				}
				break;
			}
		}
	}
	return arr2;
};

exports.deleteGame = function (req, res, next) {
	console.log(req.body.id, req.params.id);
	_game2.default.findOneAndUpdate({ id: req.body.id }, { $pull: { matchedFriends: req.params.id } }, function (error, result) {
		console.log('removing from user list');
		console.log(result);

		var matches = JSON.parse(JSON.stringify(result.matchedFriends));

		matches = matches.filter(function (el) {
			return el.friendId !== req.params.id;
		});

		result.matchedFriends = matches;

		result.save();

		var previousUsers = [];
		var name = result.name;

		var promises = matches.map(function (match) {
			//Loop through matched friends list
			console.log('match ', match);

			return new Promise(function (resolve, reject) {

				_user2.default.findOneAndUpdate( //Find each friend by their id
				{ _id: match.friendId }, { upsert: true }, function (err, res) {

					var r = JSON.parse(JSON.stringify(res));
					var user = JSON.parse(JSON.stringify(req.user));
					var currentUser = [{
						"friendId": user._id,
						"email": user.email
					}];

					var resUser = {
						"friendId": r._id,
						"email": r.email
					};

					if (match.friendId != user._id) {
						var friends = removeFriends(currentUser, r.friends, name);
						res.friends = friends; //replace freinds array with new freinds array
						res.save(); //Save newFriend to that friend
						previousUsers.push(resUser);
					} else {}
					if (err) {
						return reject(err);
					}
					resolve();
				});
			});
		});

		Promise.all(promises).then(function () {

			console.log('all dropped)');

			_user2.default.findOneAndUpdate( //Find this user  
			{ _id: req.params.id }, { $pull: { list: { id: req.body.id } } }, function (err, response) {

				var o = JSON.parse(JSON.stringify(response));
				var friends = removeFriends(previousUsers, o.friends, name);
				response.friends = friends; //replace freinds array with new freinds array
				console.log('freinds');
				console.log(friends);

				response.save(); //Save  previous freinds array to this user. 			
			});
		}).catch(console.error);
	});
};

exports.find = function (req, res, next) {
	_game2.default.find({}, function (error, result) {
		console.log(result);
		return res.json({ data: result });
	});
};