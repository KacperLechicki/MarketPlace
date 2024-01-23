import express, { Express } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

require('dotenv/config');

const app: Express = express();
const port = 3000;
const api = process.env.API_URL || '';
const productsRouter = require('./src/modules/products/routers/products.router');
const cors = require('cors')

app.use(cors());
app.options('*', cors());

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//API
app.use(`${api}/products`, productsRouter);

//---------------------------

const dbConnectionString = process.env.MONGO_DB_CONNECTION_STRING || '';

mongoose
	.connect(dbConnectionString, {
		dbName: 'marketplace',
	})
	.then((): void => {
		console.log('Database connected');
	})
	.catch((err: string): void => {
		console.error(err);
	});

app.listen(port, (): void => {
	console.log(`Server is running on http://localhost:${port}`);
});
