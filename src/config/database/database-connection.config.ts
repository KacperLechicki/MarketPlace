import mongoose from 'mongoose';

// Load the environment variables from the .env file
require('dotenv/config');

// Get the MongoDB connection string from the environment variables
const dbConnectionString = process.env.MONGO_DB_CONNECTION_STRING || '';

export const connectDatabase = (): void => {
	// Check if the MongoDB connection string is not empty
	if (!dbConnectionString) {
		console.error('MongoDB connection string is missing.');
		return;
	}

	// Connect to the MongoDB database
	mongoose
		.connect(dbConnectionString, {
			// Get the MongoDB database name from the environment variables
			dbName: process.env.MONGO_DB_NAME,
		})
		.then((): void => {
			// Log the name of the connected database
			console.log(`Database connected: ${mongoose.connection.db.databaseName}`);
		})
		.catch((err: string): void => {
			// Log any errors that occurred while connecting to the database
			console.error(err);
		});
};
