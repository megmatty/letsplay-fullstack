"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _game = require("../models/game");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -------------------------------------------

exports.login = function (req, res, next) {
	// Do email and password validation for the server
	_passport2.default.authenticate("local", function (err, user, info) {
		console.log(user._id);
		if (err) return next(err);
		if (!user) {
			return res.json({ success: false, message: info.message });
		}
		// ***********************************************************************
		// "Note that when using a custom callback, it becomes the application's
		// responsibility to establish a session (by calling req.login()) and send
		// a response."
		// Source: http://passportjs.org/docs
		// ***********************************************************************		
		// Passport exposes a login() function on req (also aliased as logIn())
		// that can be used to establish a login session		
		req.logIn(user, function (loginErr) {
			if (loginErr) {
				return res.json({ success: false, message: loginErr });
			}
			return res.json({ success: true, message: "authentication succeeded", player: user });
		});
	})(req, res, next);
};

// -------------------------------------------

exports.logout = function (req, res, next) {
	// the logout method is added to the request object automatically by Passport
	req.logout();
	console.log('logged out');
	return res.redirect('/login');
	// return res.json({ success: true })
};

// -------------------------------------------

exports.register = function (req, res, next) {

	_user2.default.findOne({ email: req.body.email }, function (err, user) {
		// is email address already in use?
		if (user) {
			res.json({ success: false, message: "Email already in use" });
			return;
		}
		// go ahead and create the new user
		else {
				_user2.default.create(req.body, function (err) {
					if (err) {
						console.error(err);
						res.json({ success: false });
						return;
					}
					res.json({ success: true });
					return;
				});
			}
	});
};
// -------------------------------------------

exports.getMatches = function (req, res, next) {
	console.log(req.user._id);
	_user2.default.findOne({ _id: req.user._id }, function (err, user) {
		return res.json({ player: user });
	});
};