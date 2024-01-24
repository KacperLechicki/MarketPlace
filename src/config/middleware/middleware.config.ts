import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import { app } from '../../../app';
import { JWTGuard } from '../../auth/jwt/jwt.auth';

export const setMiddleware = (): void => {
	app.use(cors());
	app.options('*', cors());

	app.use(express.json());

	app.use(morgan('tiny'));

	app.use(JWTGuard());
};
