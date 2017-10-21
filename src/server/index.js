import fs from "fs";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import webpack from "webpack";
import config from "../../webpack/webpack.config.dev.js";
import secrets from "./config/secrets";
import configurePassport from "./config/passport";
import configureExpress from "./config/express";
import users from "./controllers/users";
import games from "./controllers/games";
import "./models/user";
import "./models/game";

// -------------------------------------------

const app = express();
 
const isDev = process.env.NODE_ENV === "development";

// if in development mode set up the middleware required for hot reloading and rebundling
if(isDev) {

	const compiler = webpack(config)

	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}))

	app.use(require("webpack-hot-middleware")(compiler))
}


// -------------------------------------------

configurePassport(app, passport);
configureExpress(app, passport);

// -------------------------------------------



//Reg/login
app.post("/login", users.login);
app.get("/logout", users.logout);
app.post("/register", users.register);

//Game
app.post('/user/:id', function(req, res) {
	console.log('POST savegame tangerine');
	games.saveGame(req, res);
});

//Get new friend matches
app.put('/myprofile',	users.getMatches);

app.put('/user/:id', function(req, res) {
	games.deleteGame(req, res);
});

var cors = require('cors');
app.use(cors());

app.get('/games', games.find);
app.get('/users', games.userFind);


//Mail
var nodemailer = require('nodemailer');

app.post('/contact', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res) {
	console.log(req.body);
	console.log('cucumber');
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'letsplayapp123@gmail.com', 
            pass: 'megmatty123' 
        }
    });
		var mailOptions = {
    from: req.user.email, // sender address
    to: req.body.to, 
    subject: "Let's Play - Friend Match", // Subject line
    html: `Hello ${req.body.name}! <br /> <p>Let's Play user ${req.user.name} plays <b>${req.body.game}</b> and would like to play with you!</p> <p>${req.user.name} says: "${req.body.message}".</p> <p><a href="mailto:${req.user.email}">Click here to email them and get playing!</a></p> <br />-Let's Play` 
	};
		transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	        res.json({yo: 'error'});
	    }else{
	        console.log('Message sent: ' + info.response);
	        res.redirect('/');
	    };
	});

}

app.get("*", (req, res, next) => {	

	// if we are in production mode then an extension will be provided, usually ".min"
	const minified = process.env.MIN_EXT || "";

	// this is the HTML we will send to the client when they request any page. React and React Router
	// will take over once the scripts are loaded client-side
	const appHTML = 
		`<!doctype html>
		<html lang="">
		<head>
			<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
			<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
			<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
			<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
			<title>Let's Play</title>
		</head>
		<body>
			<div id="app"></div>
			<script src="https://fb.me/JSXTransformer-0.13.3.js"></script>
			
			<script src="/assets/app${minified}.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		</body>
		</html>`
	res.status(200).end(appHTML)

})
  

// this function connects to our database, then starts the server
let server;

// // this function connects to our database, then starts the server
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost/letsplay';
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
	console.log(databaseUrl);
	console.log('pajamas');
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      console.log(port);
      console.log('peanuts');
      if (err) {
      	console.log(err);
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
      	console.log(err);
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// // this function closes the server, and returns a promise. we'll
// // use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// // if server.js is called directly (aka, with `node server.js`), this block
// // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
} else if (isDev) {
	runServer();
};

module.exports = {app, runServer, closeServer};
