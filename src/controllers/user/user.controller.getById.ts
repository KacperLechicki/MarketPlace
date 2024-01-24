import { Request, Response } from 'express';
import { User, userDetailsAttributes } from '../../models/user/user.model';
import { handleError } from '../../api/functions/handle-error.function';
import { ApiResponseInterface } from '../../api/interfaces/api-response.interface';

export const getUserById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
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
