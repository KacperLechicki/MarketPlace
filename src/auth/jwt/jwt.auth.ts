import { RequestHandler } from 'express';
import { isAdmin } from './functions/is-admin.function';
import { isOnlyUser } from './functions/is-only-user.function';
import { isUser } from './functions/is-user.function';

// Load the environment variables from the .env file
require('dotenv/config');

let { expressjwt: jwt } = require('express-jwt');

// Get the JWT secret from the environment variables
const secret = process.env.TOKEN_USER_SEED || '';

// Check if the JWT secret is not empty
if (!secret) {
	console.error('JWT secret is missing.');
	process.exit(1);
}

// Middleware to authenticate and authorize admin users
export const AdminGuard = (): RequestHandler => {
	return jwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: isAdmin,
	});
};

// Middleware to authenticate and authorize all users
export const UserGuard = (): RequestHandler => {
	return jwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: isUser,
	});
};

// Middleware to authenticate and authorize only non-admin users
export const OnlyUserGuard = (): RequestHandler => {
	return jwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: isOnlyUser,
	});
};
