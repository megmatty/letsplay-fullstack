// Defining a User Model in mongoose
import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
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
	}
})


export default mongoose.model("Game", GameSchema);

