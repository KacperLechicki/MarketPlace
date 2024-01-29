import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { User } from '../../models/user/user.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

/**
 * Delete a user by ID.
 */

export const deleteUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Delete a user by ID.'
		#swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }
		#swagger.parameters['id'] = { description: 'Id of user.' }
	*/

	try {
		/*
		#swagger.responses[400] = {
            schema: { 
                success: false,
                message: 'User ID is required.',
                payload: 'null',
            },
        } 
		*/

		// Check if the user ID is provided
		if (!req.params.id) {
			res.status(400).json({
				success: false,
				message: 'User ID is required.',
				payload: null,
			});
			return;
		}

		// Find and delete the user by ID
		const user = await User.findByIdAndDelete(req.params.id);

		/*
		#swagger.responses[404] = {
            schema: { 
                success: false,
                message: 'User not found.',
                payload: 'null',
            },
        } 
		*/

		// If the user is not found, return a 404 response
		if (!user) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'User not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		/*
		#swagger.responses[200] = {
            schema: { 
                success: true,
                message: 'User deleted successfully.',
                payload: 'null',
            },
        }
		*/

		// If the user is found and deleted, return a success response
		const response: ApiResponseInterface = {
			success: true,
			message: 'User deleted successfully.',
			payload: null,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurs, handle it
		handleError(res, error);
	}
};
