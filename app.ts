import express, { Express } from 'express';
import { connectDatabase } from './src/config/database/database-connection.config';
import { setMiddleware } from './src/config/middleware/middleware.config';
import { setAPIRoutes } from './src/api/routes/api-common.routes';
import { setAuthRoutes } from './src/api/routes/auth-common.routes';

export const app: Express = express();
const port = 3000;

//API Routes
setAPIRoutes();

//Auth Routes
setAuthRoutes();

//Middleware
setMiddleware();

//Database Connection
connectDatabase();

//Server
app.listen(port, (): void => {
	console.log(`Server is running on http://localhost:${port}`);
});
