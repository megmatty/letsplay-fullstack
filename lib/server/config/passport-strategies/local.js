"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passportLocal = require("passport-local");

var _user = require("../../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
By default, LocalStrategy expects to find credentials in parameters named username and password.
If your site prefers to name these fields differently, options are available to change the defaults.
*/
exports.default = new _passportLocal.Strategy({
  usernameField: "email"
}, function (email, password, done) {
  _user2.default.findOne({ email: email }, function (err, user) {
    if (!user) return done(null, false, { message: "Email " + email + " not found" });
    user.comparePassword(password, function (err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid email or password" });
      }
    });
  });
}); /*
     Configuring local strategy to authenticate strategies
     Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
     */