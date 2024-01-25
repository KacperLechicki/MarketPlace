import { Request, Response } from 'express';
import { User, userDetailsAttributes } from '../../models/user/user.model';
import { handleError } from '../../functions/handle-error.function';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { decodeToken } from '../../functions/decode-token.function';

export const getUserById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// #swagger.summary = 'Get user by id.'

		const userData = await decodeToken(req);

		if (!userData.isAdmin && userData.userId !== req.params.id) {
			const response: ApiResponseInterface = {
				success: false,
				message: 'Unauthorized.',
				payload: null,
			};

			res.status(401).json(response);
			return;
		}

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
