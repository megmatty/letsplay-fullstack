"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bcryptNodejs = require("bcrypt-nodejs");

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: String
});

/**
 * Password hash middleware.
 */
// Defining a User Model in mongoose
// Code modified from https://github.com/sahat/hackathon-starter
UserSchema.pre("save", function (next) {
	var user = this;
	if (!user.isModified("password")) return next();
	_bcryptNodejs2.default.genSalt(5, function (err, salt) {
		if (err) return next(err);
		_bcryptNodejs2.default.hash(user.password, salt, null, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
	comparePassword: function comparePassword(candidatePassword, cb) {
		_bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, isMatch) {
			if (err) return cb(err);
			cb(null, isMatch);
		});
	}

	/**
 * Statics
 */
};UserSchema.statics = {};

exports.default = _mongoose2.default.model("User", UserSchema);