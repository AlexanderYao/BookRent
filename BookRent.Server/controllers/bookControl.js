import Book from '../models/book';
import moment from 'moment';

export const index = (req, res, next) => {
	//Book.find().lean().exec((err, books) => res.json(books));

	let books = [];
	books.push({id:'26662689', title:'画的秘密', author:'[法] 马克-安托万·马修'});
	books.push({id:'1041482', title:'万历十五年', author:'[美] 黄仁宇'});
	books.push({id:'1056315', title:'总统是靠不住的', author:'[中] 林达'});
	books.push({id:'6827339', title:'琅琊榜', author:'[中] 海宴'});
	books.push({id:'1858513', title:'月亮和六便士', author:'[英] 威廉·萨默塞特·毛姆'});
	books.push({id:'19989296', title:'别逗了，费曼先生', author:'[美] R•P•费曼'});

	res.json(books);
};
