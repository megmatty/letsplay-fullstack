"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackConfigDev = require("../../webpack/webpack.config.dev.js");

var _webpackConfigDev2 = _interopRequireDefault(_webpackConfigDev);

var _secrets = require("./config/secrets");

var _secrets2 = _interopRequireDefault(_secrets);

var _passport3 = require("./config/passport");

var _passport4 = _interopRequireDefault(_passport3);

var _express3 = require("./config/express");

var _express4 = _interopRequireDefault(_express3);

var _users = require("./controllers/users");

var _users2 = _interopRequireDefault(_users);

require("./models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -------------------------------------------

var app = (0, _express2.default)();

// -------------------------------------------

var connect = function connect() {
	_mongoose2.default.connect(_secrets2.default.db, function (err, res) {
		if (err) {
			console.log("Error connecting to " + _secrets2.default.db + ". " + err);
		} else {
			console.log("Successfully connected to " + _secrets2.default.db + ".");
		}
	});
};
connect();

_mongoose2.default.connection.on("error", console.error);
_mongoose2.default.connection.on("disconnected", connect);

// -------------------------------------------

var isDev = process.env.NODE_ENV === "development";

// if in development mode set up the middleware required for hot reloading and rebundling
if (isDev) {

	var compiler = (0, _webpack2.default)(_webpackConfigDev2.default);

	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true,
		publicPath: _webpackConfigDev2.default.output.publicPath
	}));

	app.use(require("webpack-hot-middleware")(compiler));
}

// -------------------------------------------

(0, _passport4.default)(app, _passport2.default);
(0, _express4.default)(app, _passport2.default);

// -------------------------------------------

app.post("/login", _users2.default.login);
app.get("/logout", _users2.default.logout);
app.post("/register", _users2.default.register);

app.get("*", function (req, res, next) {

	// if we are in production mode then an extension will be provided, usually ".min"
	var minified = process.env.MIN_EXT || "";

	// this is the HTML we will send to the client when they request any page. React and React Router
	// will take over once the scripts are loaded client-side
	var appHTML = "<!doctype html>\n\t<html lang=\"\">\n\t<head>\n\t\t<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n\t\t<title>React-Passport-Redux-Example</title>\n\t\t<style>\n\t\t\tbody {\n\t\t\t\tfont-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;\t\t\t\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div id=\"app\"></div>\n\t\t<script src=\"/assets/app" + minified + ".js\"></script>\n\t</body>\n\t</html>";

	res.status(200).end(appHTML);
});

// start listening to incoming requests
app.listen(app.get("port"), app.get("host"), function (err) {
	if (err) {
		console.err(err.stack);
	} else {
		console.log("App listening on port " + app.get("port") + " [" + process.env.NODE_ENV + " mode]");
	}
});