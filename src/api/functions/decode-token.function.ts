import { Request } from 'express';
import jwt from 'jsonwebtoken';

export async function decodeToken(req: Request): Promise<any> {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return null;
	}

	const decodedToken = jwt.decode(token);

	if (!decodedToken || typeof decodedToken !== 'object') {
		return null;
	}

	return decodedToken;
}
