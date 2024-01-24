import express, { Express } from 'express';
import { connectDatabase } from './config/database-connection.config';
import { setMiddleware } from './config/middleware.config';
import { setAPIRoutes } from './api/api.routes';

export const app: Express = express();
const port = 3000;

//Middleware
setMiddleware();

//API Routes
setAPIRoutes();

connectDatabase();

app.listen(port, (): void => {
	console.log(`Server is running on http://localhost:${port}`);
});
