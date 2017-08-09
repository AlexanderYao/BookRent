import mongoose from 'mongoose';
import Book from './models/book';

const books = [
	{
		isbn: '111',
		name: 'test',
		desc: 'desc',
		author: 'wwy',
	},
	{
		isbn: '222',
		name: 'test2',
		desc: 'desc2',
		author: 'wwy',
	},
];

mongoose.connect('mongodb://localhost:27017/BookRent');

books.map(data => {
	const book = new Book(data);
	book.save();
})