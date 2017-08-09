import mongoose, { Schema } from 'mongoose';

var bookSchema = new Schema({
	isbn: {
		type: String,
		unique: true,
	},
	name: String,
	desc: String,
	author: String,
});

export default mongoose.model('book', bookSchema);