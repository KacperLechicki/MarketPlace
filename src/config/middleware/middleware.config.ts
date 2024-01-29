import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { app } from '../../../app';
import { errorHandler } from '../../api/functions/handle-error.function';
import { setSwaggerMiddleware } from './swagger/swagger.config';
import { setSessionCookieMiddleware } from './session-cookie/session-cookie.config';
import { setRateLimiterMiddleware } from './rate-limiter/rate-limiter.config';
import { NextFunction, Request, Response } from 'express';

export const setMiddleware = (): void => {
	// Use Helmet to help secure Express apps with various HTTP headers
	app.use(helmet());

	// Use bodyParser to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
	app.use(bodyParser.json({ limit: '1mb' }));

	// Enable CORS - Cross Origin Resource Sharing
	app.use(cors());
	app.options('*', cors());

	// Use morgan to log requests to the console for development use.
	app.use(morgan('tiny'));

	// Set up session cookie middleware
	setSessionCookieMiddleware();

	// Set up rate limiter middleware
	setRateLimiterMiddleware();

	// Set up Swagger middleware
	setSwaggerMiddleware();

	// Use custom error handler middleware
	app.use(errorHandler);

	// Add a middleware to check if the app is under maintenance
	app.use((req: Request, res: Response, next: NextFunction): void => {
		const isUnderMaintenance = process.env.MAINTENANCE_MODE === 'true';
		if (isUnderMaintenance) {
			res
				.status(503)
				.send('The application is under maintenance, please try again later.');
		} else {
			next();
		}
	});
};
