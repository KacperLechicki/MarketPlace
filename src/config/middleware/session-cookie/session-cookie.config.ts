// Import the express-session module
import session from 'express-session';

// Import the app object from the main application file
import { app } from '../../../../app';

// Load the environment variables from the .env file
require('dotenv/config');

// Get the session secret from the environment variables
const sessionSecret = process.env.SESSION_SECRET || '';

export const setSessionCookieMiddleware = (): void => {
	// Check if the session secret is not empty
	if (!sessionSecret) {
		console.error('Session secret is missing.');
		return;
	}

	// Use the express-session middleware
	app.use(
		session({
			// The name of the session cookie
			name: 'MarketPlaceSession',
			// The secret used to sign the session ID cookie
			secret: sessionSecret,
			// Forces the session to be saved back to the session store, even if the session was never modified during the request
			resave: false,
			// Forces a session that is "uninitialized" to be saved to the store
			saveUninitialized: false,
		})
	);
};
