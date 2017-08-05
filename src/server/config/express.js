import path from "path";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import connectMongo from "connect-mongo";
import secrets from "./secrets";

const MongoStore = connectMongo(session);

export default function(app, passport) {
	// const PORT = process.env.PORT || 3000;
	// const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost/letsplay';
	// // var os = require("os");
	// // var hostname = os.hostname();
	// app.set("port", PORT);
	// app.set("host", 'localhost');
	// console.log('strawberry');
	// console.log(PORT);
	// X-Powered-By header has no functional value.
	// Keeping it makes it easier for an attacker to build the site's profile
	// It can be removed safely
	app.disable("x-powered-by")

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(express.static(path.join(process.cwd(), 'public')));

	const sess = {
		resave: true,
		saveUninitialized: true,
		secret: secrets.sessionSecret,
		proxy: false,
		name: "sessionId",
		// cookie: {
		// 	httpOnly: true,
		// 	secure: false
		// },
		store: new MongoStore({
			url: secrets.db,
			autoReconnect: true
		})
	}
  
	var node_env = process.env.NODE_ENV;
	console.log('--------------------------');
	console.log('===> 😊  Starting Server . . .');
	console.log('===>  Environment: ' + node_env);
	if(node_env === 'production') {
		console.log('===> 🚦  Note: In order for authentication to work in production');
		console.log('===>           you will need a secure HTTPS connection');
		// sess.cookie.secure = true; // Serve secure cookies
	}

	app.use(session(sess))

	app.use(passport.initialize())
	app.use(passport.session())

}
