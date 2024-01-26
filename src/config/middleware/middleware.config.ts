import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import { app } from '../../../app';
import { errorHandler } from '../../api/functions/handle-error.function';
require('dotenv/config');

const docs = process.env.DOCS_URL || '';

export const setMiddleware = (): void => {
	app.use(
		`${docs}`,
		swaggerUI.serve,
		swaggerUI.setup(
			require(path.resolve(__dirname, '../../../swagger-output.json'))
		)
	);

	app.use(cors());
	app.options('*', cors());
	app.use(morgan('tiny'));
	app.use(errorHandler);
};
