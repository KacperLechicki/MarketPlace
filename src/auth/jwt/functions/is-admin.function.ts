import { Request } from 'express';

/**
 * This function checks if the user is an admin.
 * It is used as a callback for the express-jwt middleware.
 *
 * @param req - The Express request object
 * @param token - The JWT token
 * @returns A promise that resolves to true if the user is not an admin, and false otherwise
 */
export async function isAdmin(
	req: Request,
	token: { payload: { isAdmin: boolean } }
): Promise<boolean> {
	// Check if the token payload exists and has an isAdmin property
	if (
		!token ||
		!token.payload ||
		typeof token.payload.isAdmin === 'undefined'
	) {
		throw new Error('Invalid token payload.');
	}

	// If the user is not an admin, the token is considered revoked
	if (!token.payload.isAdmin) {
		return true;
	}

	// If the user is an admin, the token is not considered revoked
	return false;
}
