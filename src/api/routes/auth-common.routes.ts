import { app } from '../../../app';
import { userRouter } from './user/user.routes';

// Load the environment variables from the .env file
require('dotenv/config');

// Get the auth URL from the environment variables
const auth = process.env.AUTH_URL || '';

// Check if the auth URL is not empty
if (!auth) {
	console.error('Auth URL is missing.');
	process.exit(1);
}

/**
 * This function sets the routes for authentication.
 * It mounts the userRouter on the auth URL.
 */
export const setAuthRoutes = (): void => {
	// Use the userRouter for requests to the auth URL
	app.use(
		`${auth}/users`,
		userRouter
		// #swagger.tags = ['User']
	);
};
