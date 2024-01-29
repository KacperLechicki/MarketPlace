import { app } from '../../../../app';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

export const setRateLimiterMiddleware = (): void => {
	const rateLimiter = new RateLimiterMemory({
		points: 10, // Maximum number of requests
		duration: 1, // Per second(s)
	});

	const rateLimiterMiddleware = (
		req: Request,
		res: Response,
		next: NextFunction
	): void => {
		// Use the client's IP address as the key for rate limiting
		const ip = req.ip;
		if (!ip) {
			// If the IP address is not available, send an error response
			res.status(400).json({ error: 'IP address is missing.' });
			return;
		}

		rateLimiter
			.consume(ip)
			.then((): void => {
				// If the request is within the limit, continue to the next middleware
				next();
			})
			.catch((error: unknown): void => {
				// If the request exceeds the limit, send an error response
				res.status(429).json(error);
			});
	};

	app.use(rateLimiterMiddleware);
};
