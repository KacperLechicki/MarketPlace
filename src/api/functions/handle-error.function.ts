import { NextFunction, Request, Response } from 'express';
import { ServerResponse500 } from '../classes/server-response-500.class';
import { Error } from 'mongoose';
import { ApiResponseInterface } from '../interfaces/api-response/api-response.interface';

/**
 * This function handles errors by sending a 500 response with the error message.
 * @param res - The response object to send the error to.
 * @param error - The error to handle.
 */
export function handleError(res: Response, error: unknown): void {
	// Check if the response and error objects are not null
	if (!res || !error) {
		throw new Error('Response or error object is null');
	}

	// Send a 500 response with the error message
	res.status(500).json(new ServerResponse500(error));
}

/**
 * This function handles errors by checking the type of error and sending the appropriate response.
 * @param error - The error to handle.
 * @param req - The request object that caused the error.
 * @param res - The response object to send the error to.
 * @param next - The next function in the middleware chain.
 * @returns The response object with the error message.
 */
export function errorHandler(
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
): Response<unknown, Record<string, unknown>> {
	// Check if the error, request, response, and next objects are not null
	if (!error || !req || !res || !next) {
		throw new Error('Error, request, response, or next object is null');
	}

	// If the error is an UnauthorizedError, send a 400 response with an access denied message
	if (error.name === 'UnauthorizedError') {
		const response: ApiResponseInterface = {
			success: false,
			message: 'Access denied.',
			payload: null,
		};

		return res.status(400).json(response);
	}

	// Default error handling
	const response: ApiResponseInterface = {
		success: false,
		message: 'An error occurred.',
		payload: null,
	};

	return res.status(500).json(response);
}
