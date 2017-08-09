import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router';

mongoose.connect('mongodb://localhost:27017/BookRent');

// Initialize http server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(morgan('combined'));
app.use('/api/v1', router);

// Handle / route
// app.get('/', (req, res) =>
//   res.send('Hello World!')
// )

const server = app.listen(9000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
