import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import { app } from '../../../app';
import { JWTGuard } from '../../auth/jwt/jwt.auth';
import { errorHandler } from '../../api/functions/handle-error.function';
import { swaggerDocs } from '../swagger/swagger.config';

export const setMiddleware = (): void => {
	const port = 3000;

	app.use(cors());
	app.options('*', cors());

	app.use(express.json());

	app.use(morgan('tiny'));

	//Swagger
	swaggerDocs(app, port);

	app.use(JWTGuard());
	app.use(errorHandler);
};
