import express, { Express } from 'express';
import morgan from 'morgan';
import { productRouter } from './src/routes/product.routes';
import { connectDatabase } from './config/database-connection.config';

require('dotenv/config');

const app: Express = express();
const port = 3000;
const cors = require('cors');

const api = process.env.API_URL || '';

app.use(cors());
app.options('*', cors());

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//API Routes
app.use(`${api}/products`, productRouter);

connectDatabase();

app.listen(port, (): void => {
	console.log(`Server is running on http://localhost:${port}`);
});
