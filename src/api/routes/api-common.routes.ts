import { app } from '../../../app';
import { categoryRouter } from './category/category.routes';
import { orderRouter } from './order/order.routes';
import { productRouter } from './product/product.routes';

// Load the environment variables from the .env file
require('dotenv/config');

// Get the API URL from the environment variables
const api = process.env.API_URL || '';

// Check if the API URL is not empty
if (!api) {
	console.error('API URL is missing.');
	process.exit(1);
}

/**
 * This function sets the routes for the API.
 * It mounts the productRouter, categoryRouter, and orderRouter on the API URL.
 */
export const setAPIRoutes = (): void => {
	// Use the productRouter for requests to the API URL
	app.use(
		`${api}/products`,
		productRouter
		// #swagger.tags = ['Product']
	);

	// Use the categoryRouter for requests to the API URL
	app.use(
		`${api}/categories`,
		categoryRouter
		// #swagger.tags = ['Category']
	);

	// Use the orderRouter for requests to the API URL
	app.use(
		`${api}/orders`,
		orderRouter
		// #swagger.tags = ['Order']
	);
};
