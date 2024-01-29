// Import the swagger-ui-express module
import swaggerUI from 'swagger-ui-express';
// Import the path module
import path from 'path';

// Import the app object from the main application file
import { app } from '../../../../app';

// Load the environment variables from the .env file
require('dotenv/config');

// Get the base URL for the API documentation from the environment variables
const docs = process.env.DOCS_URL || '';

// Define a function to set up the Swagger middleware
export const setSwaggerMiddleware = (): void => {
	// Use the Swagger UI middleware
	app.use(
		// The base URL for the API documentation
		`${docs}`,
		// Serve the Swagger UI
		swaggerUI.serve,
		// Set up the Swagger UI with the API documentation
		swaggerUI.setup(
			// Load the API documentation from the swagger-output.json file
			require(path.resolve(__dirname, '../../../../swagger-output.json'))
		)
	);
};
