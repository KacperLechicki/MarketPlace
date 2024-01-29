import express, { Express } from 'express';
import { connectDatabase } from './src/config/database/database-connection.config';
import { setMiddleware } from './src/config/middleware/middleware.config';
import { setAPIRoutes } from './src/api/routes/api-common.routes';
import { setAuthRoutes } from './src/api/routes/auth-common.routes';

// Initialize express application
export const app: Express = express();
const port = 3000;

// Use express.json middleware to parse incoming JSON requests
app.use(express.json());

// Set up API routes
setAPIRoutes();

// Set up authentication routes
setAuthRoutes();

// Connect to the database
connectDatabase();

// Set up middleware
setMiddleware();

// Start the server and listen on the specified port
app.listen(port, (): void => {
	console.log(`Server is running on http://localhost:${port}`);
});
