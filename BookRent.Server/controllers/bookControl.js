import Book from '../models/book';
import moment from 'moment';

export const index = (req, res, next) => {
	Book.find().lean().exec((err, books) => res.json(books));
};
