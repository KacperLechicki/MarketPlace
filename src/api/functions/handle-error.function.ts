import { NextFunction, Request, Response } from 'express';
import { ServerResponse500 } from '../classes/server-response-500.class';
import { Error } from 'mongoose';
import { ApiResponseInterface } from '../interfaces/api-response.interface';

export function handleError(res: Response, error: unknown): void {
	/* 
		#swagger.responses[500] = {
			schema: { 
				this.success = false,
				this.message = 'An error occurred.',
				this.error = error,
				this.payload = 'null',
			},
		} 
	*/
	res.status(500).json(new ServerResponse500(error));
}

export function errorHandler(
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
): Response<unknown, Record<string, unknown>> {
	if (error.name === 'UnauthorizedError') {
		const response: ApiResponseInterface = {
			success: false,
			message: 'Access denied.',
			payload: null,
		};

		return res.status(400).json(response);
	}

	if (error.name === 'ValidationError') {
		const response: ApiResponseInterface = {
			success: false,
			message: error.message,
			payload: null,
		};

		return res.status(401).json(response);
	}

	const response: ApiResponseInterface = {
		success: false,
		message: error.message,
		payload: null,
	};

	return res.status(500).json(response);
}
