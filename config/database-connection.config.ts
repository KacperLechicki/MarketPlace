import mongoose from 'mongoose';

require('dotenv/config');

const dbConnectionString = process.env.MONGO_DB_CONNECTION_STRING || '';

export const connectDatabase = (): void => {
	mongoose
		.connect(dbConnectionString, {
			dbName: process.env.MONGO_DB_NAME,
		})
		.then((): void => {
			console.log(`Database connected: ${mongoose.connection.db.databaseName}`);
		})
		.catch((err: string): void => {
			console.error(err);
		});
};
