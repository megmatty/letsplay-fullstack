"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GameSchema = new _mongoose2.default.Schema({
	id: Number,
	name: String,
	summary: String,
	first_release_date: Number,
	rating: Number,
	cover: {
		url: String,
		cloudinary_id: String,
		width: Number,
		height: Number
	},
	matchedFriends: Array
}); // Defining a User Model in mongoose
exports.default = _mongoose2.default.model("Game", GameSchema);