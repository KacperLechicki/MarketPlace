import { Response } from 'express';
import { ServerResponse500 } from '../classes/server-response-500.class';

export function handleError(res: Response, error: unknown): void {
	res.status(500).json(new ServerResponse500(error));
}
