import { Request, Response } from 'express';
import { handleError } from '../../functions/handle-error.function';
import { User } from '../../models/user/user.model';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';
import { decodeToken } from '../../functions/decode-token.function';

export const deleteUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// #swagger.summary = 'Delete an user.'

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
