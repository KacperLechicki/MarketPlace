import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { User } from '../../models/user/user.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

export const deleteUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		/* 
			#swagger.summary = 'Delete an user.'
			#swagger.parameters['auth'] = { description: 'A variable that stores part of the url.' }
			#swagger.parameters['id'] = { description: 'Id of user.' }

			#swagger.responses[200] = {
				schema: { 
					success: true,
					message: 'User deleted successfully.',
					payload: 'null',
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

		const user = await User.findByIdAndDelete(req.params.id);

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
			message: 'User deleted successfully.',
			payload: null,
		};

		res.status(200).json(response);
	} catch (error: unknown) {
		handleError(res, error);
	}
};
