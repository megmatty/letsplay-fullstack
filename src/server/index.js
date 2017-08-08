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

// -------------------------------------------

// const connect = () => {
// 	mongoose.connect(secrets.db, (err, res) => {
// 		if (err) {
// 			console.log(`Error connecting to ${secrets.db}. ${err}`)
// 		} else {
// 			console.log(`Successfully connected to ${secrets.db}.`)
// 		}
// 	})
// }
// connect();

// mongoose.connection.on("error", console.error);
// mongoose.connection.on("disconnected", connect);

// -------------------------------------------
 
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

configurePassport(app, passport)
configureExpress(app, passport)

// -------------------------------------------

app.post("/login", users.login)
app.get("/logout", users.logout)
app.post("/register", users.register)

console.log(users);

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

app.get('/api', games.find);
app.get('/products', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});


//Mail
var nodemailer = require('nodemailer');

// var router = express.Router();
// app.use('/contact', router);

app.post('/contact', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res) {
	console.log(req.body);
	console.log('cucumber');
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'letsplayapp123@gmail.com', // Your email id
            pass: 'megmatty123' // Your password
        }
    });
   var text = 'Hello world from \n\n' + req.user.name + '\r\n' + req.body.message;
		var mailOptions = {
    from: req.user.email, // sender address
    to: req.body.to, // change this to req.body.to
    subject: "Let's Play - Friend Match Request", // Subject line
    // text: req.body.message, //, // plaintext body
    html: `Hello ${req.body.name}! <br /> <p>Let's Play user ${req.user.name} plays <b>${req.body.game}</b> and would like to play with you!</p> <p>${req.user.name} says: "${req.body.message}".</p> <p><a href="mailto:${req.user.email}">Click here to email them and get playing!</a></p> <br />-Let's Play` // You can choose to send an HTML body instead
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
			<meta name="viewport" content="width=1000">
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
// // const PORT = 3000;
// const PORT = process.env.PORT || 3000;
// const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost/letsplay';
// console.log('bananas');
// console.log(DATABASE_URL, PORT);

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

//this needs to be changed to run tests
// runServer();

// start listening to incoming requests

// app.listen(app.get("port"), (err) => {
// 	if (err) {
// 		console.err(err.stack);
// 		console('does this go through');
// 	} else {
// 		console.log(`App listening on port ${app.get("port")} [${process.env.NODE_ENV} mode]`)
// 	}
// });

module.exports = {app, runServer, closeServer};
