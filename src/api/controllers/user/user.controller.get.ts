import { handleError } from '../../functions/handle-error.function';
import { Request, Response } from 'express';
import { User, userListAttributes } from '../../models/user/user.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Get list of users.'
			#swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'Users retrieved successfully.',
					payload: 'list of users',
				},
			}
		*/

		const usersList = await User.find().select(userListAttributes);

		if (!usersList || usersList.length === 0) {
			const response: ApiResponseInterface = {
				success: true,
				message: 'Users not found.',
				payload: [],
			};

			res.status(200).json(response);
			return;
		}

		const response: ApiResponseInterface = {
			success: true,
			message: 'Users retrieved successfully.',
			payload: usersList,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
