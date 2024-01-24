import { app } from '../app';
import { productRouter } from '../src/routes/product.routes';

require('dotenv/config');

const api = process.env.API_URL || '';

export const setAPIRoutes = (): void => {
	app.use(`${api}/products`, productRouter);
};
