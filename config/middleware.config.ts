import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import { app } from '../app';
import { JWTGuard } from '../src/auth/jwt/jwt.guard';

export const setMiddleware = (): void => {
	app.use(cors());
	app.options('*', cors());

	app.use(express.json());

	app.use(morgan('tiny'));

	app.use(JWTGuard());
};
