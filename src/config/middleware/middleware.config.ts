import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import { app } from '../../../app';
import { JWTGuard } from '../../auth/jwt/jwt.auth';
import { errorHandler } from '../../api/functions/handle-error.function';
require('dotenv/config');

const docs = process.env.DOCS_URL || '';

export const setMiddleware = (): void => {
	const port = 3000;

	app.use(cors());
	app.options('*', cors());

	app.use(express.json());

	app.use(morgan('tiny'));

	app.use(
		`${docs}`,
		swaggerUI.serve,
		swaggerUI.setup(
			require(path.resolve(__dirname, '../../../swagger-output.json'))
		)
	);

	app.use(JWTGuard());
	app.use(errorHandler);
};
