import { Request } from 'express';
import jwt from 'jsonwebtoken';

/**
 * This function decodes the JWT token from the request headers.
 * @param req - The request object from the client.
 * @returns The decoded token if it exists and is valid, otherwise null.
 */
export async function decodeToken(req: Request): Promise<any> {
	// Get the token from the authorization header
	const token = req.headers.authorization?.split(' ')[1];

	// If there is no token, return null
	if (!token) {
		return null;
	}

	// Decode the token
	const decodedToken = jwt.decode(token);

	// If the token is not valid or not an object, return null
	if (!decodedToken || typeof decodedToken !== 'object') {
		return null;
	}

	// Return the decoded token
	return decodedToken;
}
