// Import the swagger-autogen module
import swaggerAutogen from 'swagger-autogen';

// Define the Swagger document
const doc = {
	info: {
		// Version of the API
		version: '3.0.0',
		// Title of the API
		title: 'Marketplace API Documentation',
		// Description of the API
		description:
			'REST API for E-commerce Webshop - Eclectify \n\n **${api} =>** /api/v1 \n\n **${auth} =>** /auth/v1',
	},
	// Base path for the API endpoints
	basePath: '',
};

// Define the output file for the generated Swagger document
const outputFile = './swagger-output.json';

// Define the routes to include in the Swagger document
const routes = ['./src/api/routes/*.routes.ts'];

// Generate the Swagger document
swaggerAutogen(outputFile, routes, doc);
