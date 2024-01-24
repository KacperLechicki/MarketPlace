import { app } from '../../app';
import { categoryRouter } from '../routes/category.routes';
import { productRouter } from '../routes/product.routes';

require('dotenv/config');

const api = process.env.API_URL || '';

export const setAPIRoutes = (): void => {
	app.use(`${api}/products`, productRouter);
	app.use(`${api}/categories`, categoryRouter);
};
