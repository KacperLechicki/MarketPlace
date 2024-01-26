import { Request, Response } from 'express';
import { User, userDetailsAttributes } from '../../models/user/user.model';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const getUserById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Get user by id.'
			#swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }
			#swagger.parameters['id'] = { description: 'Id of user.' }

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'User retrieved successfully.',
					payload: 'user object',
				},
			}

			#swagger.responses[404] = {
				schema: { 
					success: false,
					message: 'User not found.',
					payload: 'null',
				},
			}
		*/

		const user = await User.findById(req.params.id).select(
			userDetailsAttributes
		);

		if (!user) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'User not found.',
				payload: null,
			};

			res.status(404).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'User retrieved successfully.',
			payload: user,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
