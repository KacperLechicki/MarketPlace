import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { User } from '../../models/user/user.model';

export const getUsersCount = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Get count of users.'
			#swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Users count retrieved successfully.',
					payload: 'usersCount: count',
				},
			}

			#swagger.responses[404] = {
				schema: { 
					success: false,
					message: 'Users not found.',
					payload: 'usersCount: 0',
				},
			}
		*/

		const usersCount = await User.countDocuments({});

		if (!usersCount) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Users not found.',
				payload: { usersCount: 0 },
			};

			res.status(404).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Users count retrieved successfully.',
			payload: { usersCount },
		};

		res.status(200).send(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
