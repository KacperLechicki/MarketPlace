import { Request, Response } from 'express';
import { User, userDetailsAttributes } from '../../models/user/user.model';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

/**
 * Get user by ID.
 */
export const getUserById = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get user by ID.'
		#swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }
		#swagger.parameters['id'] = { description: 'Id of user.' }
	*/

	try {
		// Check if the user ID is provided
		if (!req.params.id) {
			/*
				#swagger.responses[400] = {
					schema: { 
						success: false,
						message: 'User ID is required.',
						payload: 'null',
					},
				}
			*/

			res.status(400).json({
				success: false,
				message: 'User ID is required.',
				payload: null,
			});
			return;
		}

		// Fetch the user by ID, select only the attributes defined in userDetailsAttributes
		const user = await User.findById(req.params.id).select(
			userDetailsAttributes
		);

		// If the user is not found, return a 404 response
		if (!user) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: false,
						message: 'User not found.',
						payload: 'null',
					},
				}
			*/

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
                    message: 'User retrieved successfully.',
                    payload: '{ user }',
                },
            }
		*/

		// If the user is found, return a success response with the user
		const response: ApiResponseInterface = {
			success: true,
			message: 'User retrieved successfully.',
			payload: { user },
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		// If an error occurs, handle it
		handleError(res, error);
	}
};
