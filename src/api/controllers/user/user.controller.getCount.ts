import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response/api-response.interface';
import { User } from '../../models/user/user.model';

/**
 * Get users count.
 */
export const getUsersCount = async (
	req: Request,
	res: Response
): Promise<void> => {
	/*
		#swagger.summary = 'Get users count.'
        #swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }
	*/

	try {
		// Count all users in the database
		const usersCount = await User.countDocuments({});

		// If the count is zero, return a success response with a count of zero
		if (!usersCount) {
			/*
				#swagger.responses[404] = {
					schema: { 
						success: true,
						message: 'No users found.',
						payload: '{ usersCount: 0 }',
					},
				}
			*/

			const response: ApiResponseInterface = {
				success: false,
				message: 'No users found.',
				payload: { usersCount: 0 },
			};

			res.status(404).json(response);
			return;
		}

		/*
			#swagger.responses[200] = {
                schema: { 
                    success: true,
                    message: 'Users count retrieved successfully.',
                    payload: '{ usersCount }',
                },
            }
		*/

		// If the count is more than zero, return the count in the response
		const response: ApiResponseInterface = {
			success: true,
			message: 'Users count retrieved successfully.',
			payload: { usersCount },
		};

		res.status(200).send(response);
	} catch (error: unknown) {
		// If an error occurs, handle it
		handleError(res, error);
	}
};
