import express, { Express } from 'express';
import { connectDatabase } from './config/database-connection.config';
import { setMiddleware } from './config/middleware.config';
import { setAPIRoutes } from './src/api/api.routes';
import { setAuthRoutes } from './src/auth/routes/auth.routes';

export const app: Express = express();
const port = 3000;

//Middleware
setMiddleware();

//API Routes
setAPIRoutes();

//Auth Routes
setAuthRoutes();

connectDatabase();

app.listen(port, (): void => {
	console.log(`Server is running on http://localhost:${port}`);
});
