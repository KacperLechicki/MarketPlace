import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
		version: '3.0.0',
		title: 'Marketplace API Documentation',
		description:
			'REST API for E-commerce Webshop - Eclectify \n\n **${api} =>** /api/v1 \n\n **${auth} =>** /auth/v1',
	},
	basePath: '',
};

const outputFile = './swagger-output.json';

const routes = ['./src/api/routes/*.routes.ts'];

swaggerAutogen(outputFile, routes, doc);
