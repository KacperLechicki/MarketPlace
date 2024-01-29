import { handleError } from '../../functions/handle-error.function';
import { Request, Response } from 'express';
import { User, userListAttributes } from '../../models/user/user.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

/**
 * Get all users.
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
	/*
		#swagger.summary = 'Get all users.'
		#swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }
	*/

	try {
		// Fetch all users, select only the attributes defined in userListAttributes, and sort by dateCreated
		const usersList = await User.find()
			.select(userListAttributes)
			.sort({ dateCreated: -1 });

		/*
			#swagger.responses[404] = {
				schema: { 
					success: false,
					message: 'Users not found.',
					payload: '[]',
				},
			}
		*/

		// If no users are found, return a success response with an empty array
		if (!usersList || usersList.length === 0) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Users not found.',
				payload: [],
			};

			res.status(404).json(response);
			return;
		}

		/*
			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Users retrieved successfully.',
					payload: '{ usersList }',
				},
			}
		*/

		// If users are found, return a success response with the users
		const response: ApiResponseInterface = {
			success: true,
			message: 'Users retrieved successfully.',
			payload: { usersList },
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurs, handle it
		handleError(res, error);
	}
};
