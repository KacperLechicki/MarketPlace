import { app } from '../../../app';
import { userRouter } from './user/user.routes';

require('dotenv/config');

const auth = process.env.AUTH_URL || '';

export const setAuthRoutes = (): void => {
	app.use(`${auth}/users`, userRouter);
};
