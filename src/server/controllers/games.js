import mongoose from "mongoose";
import Game from "../models/game";

// -------------------------------------------

exports.saveGame = function(req, res, next) {
	
	// User.findOne({ email: req.body.email }, (err, user) => {
	// 	// is email address already in use?
	// 	if (user) {			
	// 		res.json({ success: false, message: "Email already in use" })
	// 		return 
	// 	}
	// 	// go ahead and create the new user
	// 	else {
	// 		User.create(req.body, (err) => {
	// 			if (err) {
	// 				console.error(err)
	// 				res.json({ success: false })
	// 				return
	// 			}
	// 			res.json({ success: true })
	// 			return 
	// 		})
	// 	}
	// })

	console.log(req.body);

}