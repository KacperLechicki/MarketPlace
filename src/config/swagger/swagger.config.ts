import { Express, Request, Response } from 'express';
import swaggerDOC from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { version } from '../../../package.json';

import { BearerAuthSchema } from './security-schemas/bearer-auth.swagger.schema';

const options: swaggerDOC.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Marketplace API docs',
			version,
		},
		components: {
			securitySchemas: {
				...BearerAuthSchema,
			},
			schemas: {},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['**/*.swagger.docs.ts'],
};

const swaggerSpec = swaggerDOC(options);

export async function swaggerDocs(app: Express, port: number) {
	app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

	app.get('docs.json', (req: Request, res: Response): void => {
		res.setHeader('Content-Type', '*/*');
		res.send(swaggerSpec);
	});

	console.log(`Docs available at http://localhost:${port}/docs`);
}
