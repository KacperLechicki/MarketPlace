import { Request } from 'express';

/**
 * This function checks if the user is not an admin and if the user ID in the token matches the user ID in the request parameters.
 * It is used as a callback for the express-jwt middleware.
 *
 * @param req - The Express request object
 * @param token - The JWT token
 * @returns A promise that resolves to true if the user is not an admin and the user ID in the token does not match the user ID in the request parameters, and false otherwise
 */
export async function isUser(
	req: Request,
	token: { payload: { userId: string; isAdmin: boolean } }
): Promise<boolean> {
	// Check if the token payload exists and has an isAdmin and userId properties
	if (
		!token ||
		!token.payload ||
		typeof token.payload.isAdmin === 'undefined' ||
		typeof token.payload.userId === 'undefined'
	) {
		throw new Error('Invalid token payload.');
	}

	// If the user is not an admin and the user ID in the token does not match the user ID in the request parameters, the token is considered revoked
	if (!token.payload.isAdmin && token.payload.userId !== req.params.id) {
		return true;
	}

	// If the user is an admin or the user ID in the token matches the user ID in the request parameters, the token is not considered revoked
	return false;
}
